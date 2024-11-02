import { getFirebaseAdminApp, getFirebaseStorage } from "@/app/firebase";
import { getFirestore } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const firebaseAdminApp = getFirebaseAdminApp();
  const db = getFirestore(firebaseAdminApp);
  const storage = getFirebaseStorage();

  try {
    // Parsing FormData dari request
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const qualityRating = parseInt(formData.get("qualityRating") as string);
    const priceRating = parseInt(formData.get("priceRating") as string);
    const description = formData.get("description") as string;
    const address = formData.get("address") as string;
    const workingHoursStart = formData.get("workingHoursStart") as string;
    const workingHoursStop = formData.get("workingHoursStop") as string;
    const workingDays = formData.get("workingDays") as string;
    const gmapsLink = formData.get("gmapsLink") as string;
    const images = formData.getAll("images") as File[];

    if (
      !name ||
      !qualityRating ||
      !priceRating ||
      !description ||
      !address ||
      !workingHoursStart ||
      !workingHoursStop ||
      !workingDays ||
      !gmapsLink ||
      images.length === 0
    ) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // Generate unique filenames for the images
    const imageUrls = [];
    for (const image of images) {
      const imageFileName = `kuliner_images/${Date.now()}_${image.name}`;
      const imageRef = storage.bucket().file(imageFileName);
      const imageBuffer = Buffer.from(await image.arrayBuffer());

      // Mengunggah file gambar
      await imageRef.save(imageBuffer, {
        metadata: { contentType: image.type },
      });

      // Set file gambar menjadi publik
      await imageRef.makePublic();

      imageUrls.push(
        `https://storage.googleapis.com/${
          storage.bucket().name
        }/${imageFileName}`
      );
    }

    // Menyimpan data kuliner ke Firestore
    const kulinerRef = await db.collection("kuliner").add({
      name,
      qualityRating,
      priceRating,
      description,
      address,
      workingHours: {
        start: workingHoursStart,
        stop: workingHoursStop,
      },
      workingDays,
      gmapsLink,
      imageUrls,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Kuliner created", id: kulinerRef.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating kuliner:", error);
    return NextResponse.json(
      { message: "Failed to create kuliner", error: String(error) },
      { status: 500 }
    );
  }
}

interface Kuliner {
  id: string;
  name?: string; // Define name as optional
  qualityRating?: number;
  priceRating?: number;
  description?: string;
  address?: string;
  workingHours?: {
    start: string;
    stop: string;
  };
  workingDays?: string;
  gmapsLink?: string;
  imageUrls?: string[];
  createdAt?: Date;
}

export async function GET(request: NextRequest) {
  const firebaseAdminApp = getFirebaseAdminApp();
  const db = getFirestore(firebaseAdminApp);

  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);
    const search = url.searchParams.get("search") || ""; // Ambil query pencarian
    const isRandom = url.searchParams.get("random") === "true"; // Mode random
    const offset = (page - 1) * limit;

    let kulinerList = [];
    let totalItems = 0;

    if (isRandom) {
      // Mode random: ambil semua data dan pilih secara acak
      const snapshot = await db.collection("kuliner").get();
      totalItems = snapshot.size;

      const allData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Filter pencarian di mode random, jika ada
      const filteredData = allData.filter((item: Kuliner) =>
        search
          ? item.name && item.name.toLowerCase().includes(search.toLowerCase())
          : true
      );

      // Acak hasil dan batasi ke jumlah limit
      kulinerList = filteredData
        .sort(() => 0.5 - Math.random())
        .slice(0, limit);
    } else {
      // Mode normal: ambil semua data terlebih dahulu untuk memungkinkan filter substring
      const snapshot = await db
        .collection("kuliner")
        .orderBy("createdAt", "desc")
        .get();
      const allData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      totalItems = allData.length;

      // Filter pencarian substring secara manual
      const filteredData = allData.filter((item: Kuliner) =>
        search
          ? item.name && item.name.toLowerCase().includes(search.toLowerCase())
          : true
      );

      // Ambil hasil berdasarkan offset dan limit
      kulinerList = filteredData.slice(offset, offset + limit);
    }

    return NextResponse.json({
      kuliner: kulinerList,
      totalItems,
      currentPage: isRandom ? null : page,
      totalPages: isRandom ? null : Math.ceil(totalItems / limit),
    });
  } catch (error) {
    console.error("Error fetching kuliner:", error);
    return NextResponse.json(
      { message: "Failed to fetch kuliner", error: String(error) },
      { status: 500 }
    );
  }
}
