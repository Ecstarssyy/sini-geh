import { getFirebaseAdminApp, getFirebaseStorage } from "@/app/firebase";
import { authConfig } from "@/config/server-config";
import { uuidv4 } from "@firebase/util";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { getTokens } from "next-firebase-auth-edge";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  //   const tokens = await getTokens(request.cookies, authConfig);
  //   if (!tokens) {
  //     return NextResponse.json(
  //       { message: "Unauthenticated user" },
  //       { status: 401 }
  //     );
  //   }

  const firebaseAdminApp = getFirebaseAdminApp();
  const db = getFirestore(firebaseAdminApp);
  const storage = getFirebaseStorage();

  try {
    // Parsing FormData dari request
    const formData = await request.formData();
    const gambarFile = formData.get("gambar") as File;
    const nama = formData.get("nama") as string;
    const ratingKuliner = formData.get("rating-kuliner") as string;
    const ratingHarga = formData.get("rating-harga") as string;
    const deskripsi = formData.get("deskripsi") as string;
    const alamat = formData.get("alamat") as string;
    const jamKerjaStart = formData.get("jam-kerja-start") as string;
    const jamKerjaStop = formData.get("jam-kerja-stop") as string;
    const hariKerjaStart = formData.get("hari-kerja-start") as string;
    const hariKerjaStop = formData.get("hari-kerja-stop") as string;
    const linkGmap = formData.get("link-gmap") as string;

    if (
      !gambarFile ||
      !nama ||
      !ratingKuliner ||
      !ratingHarga ||
      !deskripsi ||
      !alamat ||
      !jamKerjaStart ||
      !jamKerjaStop ||
      !hariKerjaStart ||
      !hariKerjaStop ||
      !linkGmap
    ) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // Generate unique filenames for the files
    const imageFileName = `images/${uuidv4()}.jpg`;

    // Mendapatkan referensi file untuk thumbnail dan banner
    const imageRef = storage.bucket().file(imageFileName);

    // Konversi ArrayBuffer ke Buffer sebelum mengunggah file
    const imageBuffer = Buffer.from(await gambarFile.arrayBuffer());

    // Mengunggah file thumbnail
    await imageRef.save(imageBuffer, {
      metadata: { contentType: gambarFile.type },
    });

    // Set file banner menjadi publik
    await imageRef.makePublic();

    // Menyimpan data berita ke Firestore
    const kulinersRef = await db.collection("news").add({
      nama,
      ratingKuliner,
      ratingHarga,
      deskripsi,
      alamat,
      jamKerjaStart,
      jamKerjaStop,
      hariKerjaStart,
      hariKerjaStop,
      linkGmap,
      gambarUrl: `https://storage.googleapis.com/${
        storage.bucket().name
      }/${imageFileName}`,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Kuliner created", id: kulinersRef.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating kuliners:", error);
    return NextResponse.json(
      { message: "Failed to create kuliners", error: String(error) },
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
