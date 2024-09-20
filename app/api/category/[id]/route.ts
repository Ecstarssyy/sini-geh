import { getFirebaseAdminApp } from "@/app/firebase";
import { authConfig } from "@/config/server-config";
import { getFirestore } from "firebase-admin/firestore";
import { getTokens } from "next-firebase-auth-edge";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const tokens = await getTokens(request.cookies, authConfig);

  if (!tokens) {
    return NextResponse.json(
      { message: "Unauthenticated user" },
      { status: 401 }
    );
  }

  const { name } = await request.json();

  if (!name) {
    return NextResponse.json({ message: "name is required" }, { status: 400 });
  }

  const firebaseAdminApp = getFirebaseAdminApp();
  const db = getFirestore(firebaseAdminApp);

  try {
    const categoryRef = db.collection("categories").doc(params.id);
    await categoryRef.update({ name });

    return NextResponse.json({ message: "Category updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update category", error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const tokens = getTokens(request.cookies, authConfig);

  if (!tokens) {
    return NextResponse.json(
      { message: "Unauthenticated user" },
      { status: 401 }
    );
  }

  const firebaseAdminApp = getFirebaseAdminApp();
  const db = getFirestore(firebaseAdminApp);

  try {
    const categoryRef = db.collection("categories").doc(params.id);
    await categoryRef.delete();

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete category", error },
      { status: 500 }
    );
  }
}
