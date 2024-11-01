import { getFirebaseAdminApp, getFirebaseStorage } from "@/app/firebase";
import { getFirestore } from "firebase-admin/firestore";
import { v4 as uuidv4 } from "uuid"; // Tambahkan ini untuk menggunakan UUID
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const firebaseAdminApp = getFirebaseAdminApp();
  const db = getFirestore(firebaseAdminApp);
  const storage = getFirebaseStorage();

  try {
    // Mengambil ID dari params, bukan dari FormData
    const id = params.id;

    if (!id) {
      return NextResponse.json({ message: "Missing id" }, { status: 400 });
    }

    const kulinerRef = db.collection("kuliner").doc(id);

    // Dapatkan data kuliner sebelum menghapus (untuk menghapus gambar jika ada)
    const kulinerSnapshot = await kulinerRef.get();
    if (!kulinerSnapshot.exists) {
      return NextResponse.json(
        { message: "Kuliner not found" },
        { status: 404 }
      );
    }

    const kulinerData = kulinerSnapshot.data();

    // Hapus gambar dari storage jika ada
    if (kulinerData?.imageUrls && kulinerData.imageUrls.length > 0) {
      for (const imageUrl of kulinerData.imageUrls) {
        const fileName = imageUrl.split("/").pop(); // Ambil nama file dari URL
        const imageRef = storage.bucket().file(`kuliner_images/${fileName}`);
        await imageRef.delete(); // Hapus file gambar dari storage
      }
    }

    // Hapus dokumen kuliner dari Firestore
    await kulinerRef.delete();

    return NextResponse.json({ message: "Kuliner deleted successfully" });
  } catch (error) {
    console.error("Error deleting kuliner:", error);
    return NextResponse.json(
      { message: "Failed to delete kuliner", error: String(error) },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const firebaseAdminApp = getFirebaseAdminApp();
  const db = getFirestore(firebaseAdminApp);
  const storage = getFirebaseStorage();

  try {
    // Parsing FormData dari request
    const formData = await request.formData();

    // Membuat objek untuk menyimpan data yang akan di-update
    const updateData: any = {};

    const name = formData.get("name") as string | null;
    const qualityRating = formData.get("qualityRating")
      ? parseInt(formData.get("qualityRating") as string)
      : null;
    const priceRating = formData.get("priceRating")
      ? parseInt(formData.get("priceRating") as string)
      : null;
    const description = formData.get("description") as string | null;
    const address = formData.get("address") as string | null;
    const workingHoursStart = formData.get("workingHoursStart") as
      | string
      | null;
    const workingHoursStop = formData.get("workingHoursStop") as string | null;
    const workingDays = formData.get("workingDays") as string | null;
    const gmapsLink = formData.get("gmapsLink") as string | null;
    const images = formData.getAll("images") as File[] | null;

    // Memasukkan data yang ada ke dalam objek updateData
    if (name) updateData.name = name;
    if (qualityRating !== null) updateData.qualityRating = qualityRating;
    if (priceRating !== null) updateData.priceRating = priceRating;
    if (description) updateData.description = description;
    if (address) updateData.address = address;
    if (workingHoursStart || workingHoursStop) {
      updateData.workingHours = {
        ...(workingHoursStart && { start: workingHoursStart }),
        ...(workingHoursStop && { stop: workingHoursStop }),
      };
    }
    if (workingDays) updateData.workingDays = workingDays;
    if (gmapsLink) updateData.gmapsLink = gmapsLink;

    // Dapatkan data dokumen kuliner yang ada untuk menghapus gambar lama jika ada gambar baru
    const kulinerRef = db.collection("kuliner").doc(params.id);
    const kulinerSnapshot = await kulinerRef.get();
    if (!kulinerSnapshot.exists) {
      return NextResponse.json(
        { message: "Kuliner not found" },
        { status: 404 }
      );
    }

    const kulinerData = kulinerSnapshot.data();

    // Mengelola gambar: Jika ada gambar baru, kita akan hapus gambar lama dan unggah yang baru
    if (images && images.length > 0) {
      const imageUrls = [];

      // Hapus gambar lama jika ada
      if (kulinerData?.imageUrls && kulinerData.imageUrls.length > 0) {
        for (const oldImageUrl of kulinerData.imageUrls) {
          const fileName = oldImageUrl.split("/").pop(); // Ambil nama file dari URL
          const oldImageRef = storage
            .bucket()
            .file(`kuliner_images/${fileName}`);
          await oldImageRef.delete(); // Hapus gambar lama
        }
      }

      // Unggah gambar baru dengan penamaan menggunakan UUID
      for (const image of images) {
        const imageFileName = `kuliner_images/${uuidv4()}_${image.name}`; // Menggunakan UUID untuk nama unik
        const imageRef = storage.bucket().file(imageFileName);
        const imageBuffer = Buffer.from(await image.arrayBuffer());

        await imageRef.save(imageBuffer, {
          metadata: { contentType: image.type },
        });

        await imageRef.makePublic();
        imageUrls.push(
          `https://storage.googleapis.com/${
            storage.bucket().name
          }/${imageFileName}`
        );
      }

      updateData.imageUrls = imageUrls; // Update URL gambar baru
    }

    // Tambahkan timestamp update
    updateData.updatedAt = new Date();

    // Update data kuliner di Firestore
    await kulinerRef.update(updateData);

    return NextResponse.json({ message: "Kuliner updated successfully" });
  } catch (error) {
    console.error("Error updating kuliner:", error);
    return NextResponse.json(
      { message: "Failed to update kuliner", error: String(error) },
      { status: 500 }
    );
  }
}
