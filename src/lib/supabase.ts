import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** true, если Supabase сконфигурирован (есть env-переменные). */
export const isSupabaseConfigured = Boolean(url && key);

/**
 * Клиент Supabase. Если переменные не заданы (например, забыли прописать env
 * на Vercel), клиент не создаётся — блог покажет пустое состояние, а не упадёт.
 */
export const supabase = isSupabaseConfigured ? createClient(url!, key!) : null;
