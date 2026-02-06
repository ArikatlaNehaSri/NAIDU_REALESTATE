import { supabase } from "./client";

export const uploadImage = async (file) => {
  console.log("Supabase upload started");

  const fileName = `${Date.now()}-${file.name}`;

  console.log("Uploading to bucket: properties");

  const { data, error } = await supabase.storage
    .from("properties")
    .upload(fileName, file);

  if (error) {
    console.error("Supabase upload error:", error);
    throw error;
  }

  console.log("Upload success:", data);

  const { data: publicData } = supabase.storage
    .from("properties")
    .getPublicUrl(fileName);

  console.log("Public URL:", publicData.publicUrl);

  return publicData.publicUrl;
};
