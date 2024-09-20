import admin from "firebase-admin";
import { authConfig } from "../config/server-config";
import { getStorage } from "firebase-admin/storage";

const initializeApp = () => {
  if (!authConfig.serviceAccount) {
    return admin.initializeApp();
  }
  
  return admin.initializeApp({
    credential: admin.credential.cert(authConfig.serviceAccount),
    storageBucket: `${process.env.FIREBASE_DEFAULT_STORAGE_BUCKET}.appspot.com`,
  });
};

export const getFirebaseAdminApp = () => {
  if (admin.apps.length > 0) {
    return admin.apps[0] as admin.app.App;
  }

  // admin.firestore.setLogFunction(console.log);

  return initializeApp();
};

// Mendapatkan akses ke Firebase Storage
export const getFirebaseStorage = () => {
  const app = getFirebaseAdminApp();
  return getStorage(app); // Mengambil instance dari Firebase Storage
};
