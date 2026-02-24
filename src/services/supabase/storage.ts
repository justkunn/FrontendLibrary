import {
  SUPABASE_ANON_KEY,
  SUPABASE_BUCKET,
  SUPABASE_URL,
} from "../../shared/config/env";
import { supabase } from "./client";

type UploadResult = {
  publicUrl: string;
  path: string;
};

function assertSupabaseConfig() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_BUCKET) {
    throw new Error(
      "Supabase config belum lengkap. Cek VITE_SUPABASE_URL/KEY/BUCKET."
    );
  }
}

function buildCoverPath(file: File, folder = "covers") {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const stamp = Date.now();
  const random = Math.random().toString(36).slice(2, 8);
  return `${folder}/${stamp}-${random}-${safeName}`;
}

async function uploadImage(file: File, folder: string): Promise<UploadResult> {
  assertSupabaseConfig();
  console.info("[supabase] upload start", {
    name: file.name,
    size: file.size,
    type: file.type,
    folder,
  });
  const path = buildCoverPath(file, folder);
  const { error } = await supabase.storage
    .from(SUPABASE_BUCKET)
    .upload(path, file, {
      upsert: false,
      contentType: file.type,
    });

  if (error) throw error;

  const { data } = supabase.storage.from(SUPABASE_BUCKET).getPublicUrl(path);
  console.info("[supabase] public url", data?.publicUrl ?? "(empty)");
  if (!data?.publicUrl)
    throw new Error("Gagal mendapatkan public URL dari Supabase.");

  return { publicUrl: data.publicUrl, path };
}

export async function uploadCoverImage(file: File): Promise<UploadResult> {
  return uploadImage(file, "covers");
}

export async function uploadEmployeeImage(file: File): Promise<UploadResult> {
  return uploadImage(file, "employee");
  
}
