import { getFirebaseAdminApp } from "@/app/firebase";
import { authConfig } from "@/config/server-config";
import { getFirestore } from "firebase-admin/firestore";
import { getTokens } from "next-firebase-auth-edge";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const tokens = await getTokens(request.cookies, authConfig);

  if (!tokens) {
    return NextResponse.json(
      { message: "Unauthenticated user" },
      { status: 401 }
    );
  }

  const firebaseAdminApp = getFirebaseAdminApp();
  const db = getFirestore(firebaseAdminApp);

  try {
    const categoriesRef = db.collection("categories");
    const snapshot = await categoriesRef.get();

    const categories = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch categories", error },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const tokens = await getTokens(request.cookies, authConfig);

  if (!tokens) {
    return NextResponse.json(
      { message: "Unauthenticated user" },
      { status: 401 }
    );
  }

  const { name } = await request.json();

  if (!name) {
    return NextResponse.json({ message: "Name is required" }, { status: 400 });
  }

  const firebaseAdminApp = getFirebaseAdminApp();
  const db = getFirestore(firebaseAdminApp);

  try {
    const categoriesRef = db.collection("categories");
    const newCategoryRef = await categoriesRef.add({ name });

    return NextResponse.json(
      { id: newCategoryRef.id, message: "Category created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create category", error },
      { status: 500 }
    );
  }
}


