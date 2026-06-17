import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import {
  deletePost,
  fetchAllPosts,
  savePost,
  slugify,
  uploadCover,
  type Post,
  type PostInput,
} from "@/features/blog/api";

const empty: PostInput = {
  slug: "",
  title: "",
  description: "",
  body: "",
  category: "Новости",
  coverUrl: null,
  readingMinutes: 3,
  published: true,
};

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setError("Неверный email или пароль");
  };

  return (
    <div className="mx-auto flex min-h-dvh max-w-sm flex-col justify-center px-5 py-16">
      <Link to="/" className="text-sm text-slate-400 transition hover:text-white">
        ← На сайт
      </Link>
      <h1 className="mt-6 text-2xl font-semibold text-white">Вход в админку</h1>
      <p className="mt-2 text-sm text-slate-400">Управление блогом VRN-36.</p>
      <form className="mt-6 grid gap-3" onSubmit={submit}>
        <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="input" type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button type="submit" className="btn btn-primary btn-lg w-full" disabled={busy}>
          {busy ? "Вход…" : "Войти"}
        </button>
      </form>
    </div>
  );
}

function PostEditor({ initial, onClose, onSaved }: { initial: PostInput; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState<PostInput>(initial);
  const [slugTouched, setSlugTouched] = useState(Boolean(initial.id));
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = <K extends keyof PostInput>(k: K, v: PostInput[K]) => setForm((f) => ({ ...f, [k]: v }));

  const onTitle = (title: string) => {
    setForm((f) => ({ ...f, title, slug: slugTouched ? f.slug : slugify(title) }));
  };

  const onCover = async (file?: File) => {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const url = await uploadCover(file);
      set("coverUrl", url);
    } catch {
      setError("Не удалось загрузить изображение");
    } finally {
      setUploading(false);
    }
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await savePost({ ...form, slug: form.slug || slugify(form.title) });
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка сохранения");
      setSaving(false);
    }
  };

  return (
    <form className="grid gap-4" onSubmit={save}>
      <label className="block">
        <span className="field-label">Заголовок</span>
        <input className="input" value={form.title} onChange={(e) => onTitle(e.target.value)} required />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="field-label">Категория</span>
          <input className="input" value={form.category} onChange={(e) => set("category", e.target.value)} />
        </label>
        <label className="block">
          <span className="field-label">Slug (адрес)</span>
          <input className="input" value={form.slug} onChange={(e) => { setSlugTouched(true); set("slug", e.target.value); }} />
        </label>
      </div>
      <label className="block">
        <span className="field-label">Краткое описание</span>
        <input className="input" value={form.description} onChange={(e) => set("description", e.target.value)} required />
      </label>
      <label className="block">
        <span className="field-label">Текст (## — подзаголовок, - — пункт списка, пустая строка — абзац)</span>
        <textarea
          className="input min-h-64 resize-y py-3 leading-7"
          value={form.body}
          onChange={(e) => set("body", e.target.value)}
          required
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="field-label">Минут чтения</span>
          <input className="input" type="number" min={1} value={form.readingMinutes} onChange={(e) => set("readingMinutes", Number(e.target.value) || 1)} />
        </label>
        <label className="block">
          <span className="field-label">Обложка (конвертируется в WebP)</span>
          <input className="input py-2.5" type="file" accept="image/*" onChange={(e) => onCover(e.target.files?.[0])} />
        </label>
      </div>
      {form.coverUrl && (
        <div className="flex items-center gap-3">
          <img src={form.coverUrl} alt="" className="h-16 w-28 rounded-lg object-cover" />
          <button type="button" className="text-sm text-slate-400 hover:text-white" onClick={() => set("coverUrl", null)}>
            Удалить обложку
          </button>
        </div>
      )}
      <label className="flex items-center gap-3">
        <input type="checkbox" checked={form.published} onChange={(e) => set("published", e.target.checked)} />
        <span className="text-sm text-slate-200">Опубликовать (показывать на сайте)</span>
      </label>

      {error && <p className="text-sm text-red-400">{error}</p>}
      <div className="flex flex-wrap gap-3">
        <button type="submit" className="btn btn-primary btn-md" disabled={saving || uploading}>
          {saving ? "Сохранение…" : uploading ? "Загрузка фото…" : "Сохранить"}
        </button>
        <button type="button" className="btn btn-secondary btn-md" onClick={onClose}>
          Отмена
        </button>
      </div>
    </form>
  );
}

export function AdminPage() {
  useDocumentMeta({ title: "Админка — VRN-36", description: "Управление блогом." });

  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [posts, setPosts] = useState<Post[]>([]);
  const [editing, setEditing] = useState<PostInput | null>(null);

  useEffect(() => {
    if (!supabase) {
      setSession(null);
      return;
    }
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  const reload = useMemo(
    () => () => {
      fetchAllPosts().then(setPosts).catch(() => setPosts([]));
    },
    [],
  );

  useEffect(() => {
    if (session) reload();
  }, [session, reload]);

  if (!isSupabaseConfigured) {
    return (
      <div className="mx-auto max-w-md px-5 py-32 text-center text-slate-400">
        Supabase не сконфигурирован. Добавьте VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY.
      </div>
    );
  }

  if (session === undefined) {
    return <div className="px-5 py-32 text-center text-slate-400">Загрузка…</div>;
  }

  if (!session) return <LoginForm />;

  const toEditInput = (p: Post): PostInput => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    description: p.description,
    body: p.body,
    category: p.category,
    coverUrl: p.coverUrl,
    readingMinutes: p.readingMinutes,
    published: p.published,
  });

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <Link to="/" className="text-sm text-slate-400 transition hover:text-white">← На сайт</Link>
          <h1 className="mt-2 text-2xl font-semibold text-white">Блог · админка</h1>
        </div>
        <button type="button" className="btn btn-secondary btn-sm" onClick={() => supabase?.auth.signOut()}>
          Выйти
        </button>
      </div>

      {editing ? (
        <div className="mt-8 panel p-6 sm:p-8">
          <h2 className="mb-6 text-lg font-semibold text-white">{editing.id ? "Редактировать статью" : "Новая статья"}</h2>
          <PostEditor
            initial={editing}
            onClose={() => setEditing(null)}
            onSaved={() => {
              setEditing(null);
              reload();
            }}
          />
        </div>
      ) : (
        <>
          <button type="button" className="btn btn-primary btn-md mt-8" onClick={() => setEditing({ ...empty })}>
            + Новая статья
          </button>
          <div className="mt-6 divide-y divide-white/8 overflow-hidden rounded-xl border border-[var(--hairline)] bg-[var(--surface)]">
            {posts.length === 0 && <p className="p-6 text-sm text-slate-400">Пока нет статей.</p>}
            {posts.map((p) => (
              <div key={p.id} className="flex items-center justify-between gap-4 p-4 sm:p-5">
                <div className="min-w-0">
                  <p className="truncate font-medium text-white">{p.title}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {p.category} · {p.published ? "опубликовано" : "черновик"}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setEditing(toEditInput(p))}>
                    Изменить
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm text-red-400"
                    onClick={async () => {
                      if (confirm(`Удалить «${p.title}»?`)) {
                        await deletePost(p.id);
                        reload();
                      }
                    }}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
