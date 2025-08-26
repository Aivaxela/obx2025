import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBShgfyIweYtXsnw_WqA9qfVmtQxcHFUdU",
  authDomain: "obx-2025.firebaseapp.com",
  projectId: "obx-2025",
  storageBucket: "obx-2025.firebasestorage.app",
  messagingSenderId: "562766672090",
  appId: "1:562766672090:web:57276b79c954d7864df5e3",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
