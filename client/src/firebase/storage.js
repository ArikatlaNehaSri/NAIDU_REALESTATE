import { storage } from "./config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadImage = async (file) => {
  const imageRef = ref(
    storage,
    `properties/${Date.now()}-${file.name}`
  );

  await uploadBytes(imageRef, file);
  const url = await getDownloadURL(imageRef);

  return url;
};
