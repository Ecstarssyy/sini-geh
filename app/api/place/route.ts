import { getFirebaseAdminApp, getFirebaseStorage } from "@/app/firebase";
import { authConfig } from "@/config/server-config";
import { uuidv4 } from "@firebase/util";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { getTokens } from "next-firebase-auth-edge";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // const tokens = await getTokens(request.cookies, authConfig);
  // if (!tokens) {
  //   return NextResponse.json(
  //     { message: "Unauthenticated user" },
  //     { status: 401 }
  //   );
  // }

  const firebaseAdminApp = getFirebaseAdminApp();
  const db = getFirestore(firebaseAdminApp);
  const storage = getFirebaseStorage();

  try {
    // Parsing FormData dari request
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const rating = formData.get("rating") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;
    const mapsUrl = formData.get("mapsUrl") as string;
    const address = formData.get("address") as string;
    const openingHours = formData.get("openingHours") as string;
    const workingDays = formData.get("workingDays") as string;
    const imageFile = formData.get("imageFile") as File;

    if (!name || !rating || !price || !description || !mapsUrl || !address || !openingHours || !workingDays || !imageFile) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // Generate unique filename for the image file
    const imageFileName = `tourist_images/${uuidv4()}.jpg`;

    // Mendapatkan referensi file untuk image
    const imageRef = storage.bucket().file(imageFileName);

    // Konversi file image ke Buffer sebelum mengunggah
    const arrayBuffer = await imageFile.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);

    // Mengunggah file image
    await imageRef.save(imageBuffer, {
      metadata: { contentType: imageFile.type },
    });

    // Set file image menjadi publik
    await imageRef.makePublic();

    // Menyimpan data wisata ke Firestore
    const touristSpotRef = await db.collection("touristSpots").add({
      name,
      rating: parseFloat(rating),
      price,
      description,
      mapsUrl,
      address,
      openingHours,
      workingDays,
      imageUrl: `https://storage.googleapis.com/${storage.bucket().name}/${imageFileName}`,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Tourist spot created", id: touristSpotRef.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating tourist spot:", error);
    return NextResponse.json(
      { message: "Failed to create tourist spot", error: String(error) },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const firebaseAdminApp = getFirebaseAdminApp();
  const db = getFirestore(firebaseAdminApp);

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const offset = (page - 1) * limit;

    const snapshot = await db.collection("touristSpots").orderBy("createdAt").offset(offset).limit(limit).get();
    const touristSpotList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(touristSpotList);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch tourist spots", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
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
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ message: "Missing id" }, { status: 400 });
    }

    // Mendapatkan data wisata berdasarkan id
    const touristSpotDoc = await db.collection("touristSpots").doc(id).get();
    if (!touristSpotDoc.exists) {
      return NextResponse.json({ message: "Tourist spot not found" }, { status: 404 });
    }

    const touristSpotData = touristSpotDoc.data();
    if (touristSpotData?.imageUrl) {
      // Mendapatkan referensi file image
      const imageFileName = touristSpotData.imageUrl.split(`/${storage.bucket().name}/`)[1];
      const imageRef = storage.bucket().file(imageFileName);

      // Menghapus file image dari storage
      await imageRef.delete();
    }

    // Menghapus data wisata dari Firestore
    await db.collection("touristSpots").doc(id).delete();

    return NextResponse.json(
      { message: "Tourist spot deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting tourist spot:", error);
    return NextResponse.json(
      { message: "Failed to delete tourist spot", error: String(error) },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  // const tokens = await getTokens(request.cookies, authConfig);
  // if (!tokens) {
  //   return NextResponse.json(
  //     { message: "Unauthenticated user" },
  //     { status: 401 }
  //   );
  // }

  const firebaseAdminApp = getFirebaseAdminApp();
  const db = getFirestore(firebaseAdminApp);
  const storage = getFirebaseStorage();

  try {
    const formData = await request.formData();
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const rating = formData.get("rating") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;
    const mapsUrl = formData.get("mapsUrl") as string;
    const address = formData.get("address") as string;
    const openingHours = formData.get("openingHours") as string;
    const workingDays = formData.get("workingDays") as string;
    const imageFile = formData.get("imageFile") as File;

    if (!id) {
      return NextResponse.json({ message: "Missing id" }, { status: 400 });
    }

    // Mendapatkan data wisata berdasarkan id
    const touristSpotDoc = await db.collection("touristSpots").doc(id).get();
    if (!touristSpotDoc.exists) {
      return NextResponse.json({ message: "Tourist spot not found" }, { status: 404 });
    }

    const updateData: any = {
      updatedAt: new Date(),
    };

    if (name) updateData.name = name;
    if (rating) updateData.rating = parseFloat(rating);
    if (price) updateData.price = price;
    if (description) updateData.description = description;
    if (mapsUrl) updateData.mapsUrl = mapsUrl;
    if (address) updateData.address = address;
    if (openingHours) updateData.openingHours = openingHours;
    if (workingDays) updateData.workingDays = workingDays;

    if (imageFile) {
      const touristSpotData = touristSpotDoc.data();
      if (touristSpotData?.imageUrl) {
        // Mendapatkan referensi file image lama
        const oldImageFileName = touristSpotData.imageUrl.split(`/${storage.bucket().name}/`)[1];
        const oldImageRef = storage.bucket().file(oldImageFileName);

        // Menghapus file image lama dari storage
        await oldImageRef.delete();
      }

      // Generate unique filename for the new image file
      const newImageFileName = `tourist_images/${uuidv4()}.jpg`;

      // Mendapatkan referensi file untuk image baru
      const newImageRef = storage.bucket().file(newImageFileName);

      // Konversi file image ke Buffer sebelum mengunggah
      const arrayBuffer = await imageFile.arrayBuffer();
      const imageBuffer = Buffer.from(arrayBuffer);

      // Mengunggah file image baru
      await newImageRef.save(imageBuffer, {
        metadata: { contentType: imageFile.type },
      });

      // Set file image menjadi publik
      await newImageRef.makePublic();

      updateData.imageUrl = `https://storage.googleapis.com/${storage.bucket().name}/${newImageFileName}`;
    }

    // Memperbarui data wisata di Firestore
    await db.collection("touristSpots").doc(id).update(updateData);

    return NextResponse.json(
      { message: "Tourist spot updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating tourist spot:", error);
    return NextResponse.json(
      { message: "Failed to update tourist spot", error: String(error) },
      { status: 500 }
    );
  }
}

// Command to post dummy data to the server using CMD
// Run this command in your terminal
/*
curl -X POST http://localhost:3000/api/place -F "name=Beautiful Beach" -F "rating=4.5" -F "price=50000" -F "description=A beautiful beach with clear water and white sand." -F "mapsUrl=https://goo.gl/maps/example" -F "address=Beach Street, Ocean City" -F "openingHours=09:00 AM - 05:00 PM" -F "workingDays=Monday-Sunday" -F "imageFile=@path/to/your/image.jpg"
*/