import { getFirebaseAdminApp, getFirebaseStorage } from "@/app/firebase";
import { getFirestore } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const firebaseAdminApp = getFirebaseAdminApp();
  const db = getFirestore(firebaseAdminApp);

  try {
    const { title, content, categoryId } = await request.json();

    if (!title || !content || !categoryId) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const newsRef = db.collection("news").doc(params.id);
    await newsRef.update({
      title,
      content,
      categoryId,
      updatedAt: new Date(),
    });

    return NextResponse.json({ message: "News updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update news", error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const firebaseAdminApp = getFirebaseAdminApp();
  const db = getFirestore(firebaseAdminApp);

  try {
    const newsRef = db.collection("news").doc(params.id);
    await newsRef.delete();

    return NextResponse.json({ message: "News deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete news", error },
      { status: 500 }
    );
  }
}
