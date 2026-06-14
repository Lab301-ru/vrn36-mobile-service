import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "missing-anon-key";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
);

/** Единый разбор ошибок PostgREST: показываем русские сообщения из БД как есть. */
export function throwIfError(error: { message: string } | null): void {
  if (error) throw new Error(error.message);
}
