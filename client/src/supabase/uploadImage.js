import { supabase } from "./client";

export const uploadImage = async (file) => {
  if (!file) return null;

  // ✅ create UNIQUE filename every time
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 10)}.${fileExt}`;

  const { error } = await supabase.storage
    .from("properties")
    .upload(fileName, file);

  if (error) {
    console.error("Supabase upload error:", error);
    throw error;
  }

  // ✅ get PUBLIC URL
  const { data } = supabase.storage
    .from("properties")
    .getPublicUrl(fileName);

  return data.publicUrl;
};
