import { getFirebaseAdminApp, getFirebaseStorage } from "@/app/firebase";
import { authConfig } from "@/config/server-config";
import { uuidv4 } from "@firebase/util";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { getTokens } from "next-firebase-auth-edge";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const tokens = await getTokens(request.cookies, authConfig);
  if (!tokens) {
    return NextResponse.json(
      { message: "Unauthenticated user" },
      { status: 401 }
    );
  }

  const firebaseAdminApp = getFirebaseAdminApp();
  const db = getFirestore(firebaseAdminApp);
  const storage = getFirebaseStorage();

  try {
    // Parsing FormData dari request
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const categoryId = formData.get("categoryId") as string;
    const thumbnailFile = formData.get("thumbnailFile") as File;
    const bannerFile = formData.get("bannerFile") as File;

    if (!title || !content || !categoryId || !thumbnailFile || !bannerFile) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // Generate unique filenames for the files
    const thumbnailFileName = `thumbnails/${uuidv4()}.jpg`;
    const bannerFileName = `banners/${uuidv4()}.jpg`;

    // Mendapatkan referensi file untuk thumbnail dan banner
    const thumbnailRef = storage.bucket().file(thumbnailFileName);
    const bannerRef = storage.bucket().file(bannerFileName);

    // Konversi ArrayBuffer ke Buffer sebelum mengunggah file
    const thumbnailBuffer = Buffer.from(await thumbnailFile.arrayBuffer());
    const bannerBuffer = Buffer.from(await bannerFile.arrayBuffer());

    // Mengunggah file thumbnail
    await thumbnailRef.save(thumbnailBuffer, {
      metadata: { contentType: thumbnailFile.type },
    });

    // Mengunggah file banner
    await bannerRef.save(bannerBuffer, {
      metadata: { contentType: bannerFile.type },
    });

    // Set file banner menjadi publik
    await bannerRef.makePublic();

    // Set file thumbnail menjadi publik
    await thumbnailRef.makePublic();

    // Menyimpan data berita ke Firestore
    const newsRef = await db.collection("news").add({
      title,
      content,
      categoryId,
      thumbnailUrl: `https://storage.googleapis.com/${
        storage.bucket().name
      }/${thumbnailFileName}`,
      bannerUrl: `https://storage.googleapis.com/${
        storage.bucket().name
      }/${bannerFileName}`,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "News created", id: newsRef.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating news:", error);
    return NextResponse.json(
      { message: "Failed to create news", error: String(error) },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const firebaseAdminApp = getFirebaseAdminApp();
  const db = getFirestore(firebaseAdminApp);

  try {
    const snapshot = await db.collection("news").get();
    const newsList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(newsList);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch news", error },
      { status: 500 }
    );
  }
}
