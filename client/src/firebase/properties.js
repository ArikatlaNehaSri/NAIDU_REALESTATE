import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "./config";

/* ADD PROPERTY (ADMIN) */
export const addProperty = async (property) => {
  await addDoc(collection(db, "properties"), {
    ...property,
    createdAt: new Date(),
  });
};

/* GET ALL PROPERTIES (USERS) */
export const getAllProperties = async () => {
  const q = query(
    collection(db, "properties"),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
