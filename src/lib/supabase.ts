import { createClient } from "@supabase/supabase-js";

/**
 * Публичные параметры проекта блога (vrn36-blog). URL и publishable-ключ всё
 * равно попадают в клиентский бандл, доступ к данным ограничивает RLS —
 * поэтому держим их как значения по умолчанию, чтобы блог работал даже без
 * env-переменных. env (если задан) имеет приоритет.
 */
const FALLBACK_URL = "https://zuaafghnfjztjzdnpwdu.supabase.co";
const FALLBACK_ANON_KEY = "sb_publishable_qA6NQ8nZbSPXYTo-W9nL-g_LgbZpXlP";

const url = (import.meta.env.VITE_SUPABASE_URL as string | undefined) || FALLBACK_URL;
const key = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) || FALLBACK_ANON_KEY;

/** true, если Supabase сконфигурирован (всегда true: есть значения по умолчанию). */
export const isSupabaseConfigured = Boolean(url && key);

/** Клиент Supabase для публичной части (блог). */
export const supabase = createClient(url, key);
