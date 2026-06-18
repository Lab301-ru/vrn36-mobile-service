import { createClient } from "@supabase/supabase-js";

/**
 * Публичные параметры проекта блога (vrn36-blog). URL и publishable-ключ всё
 * равно попадают в клиентский бандл, доступ к данным ограничивает RLS —
 * поэтому держим их как значения по умолчанию, чтобы блог работал даже без
 * env-переменных. env (если задан) имеет приоритет.
 */
const FALLBACK_URL = "https://zuaafghnfjztjzdnpwdu.supabase.co";
const FALLBACK_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1YWFmZ2huZmp6dGp6ZG5wd2R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2ODc4NDUsImV4cCI6MjA5NzI2Mzg0NX0.NdG17XkUmkT0Dyc2my1pX6ZtFvno9rjuekYJHoYi0QU";

const url = (import.meta.env.VITE_SUPABASE_URL as string | undefined) || FALLBACK_URL;
const key = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) || FALLBACK_ANON_KEY;

/** true, если Supabase сконфигурирован (всегда true: есть значения по умолчанию). */
export const isSupabaseConfigured = Boolean(url && key);

/** Клиент Supabase для публичной части (блог). */
export const supabase = createClient(url, key);
