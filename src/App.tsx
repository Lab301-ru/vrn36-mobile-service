import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { SiteLayout } from "@/components/SiteLayout";
import { ScrollManager } from "@/components/ScrollManager";
import { LandingPage } from "@/features/landing/LandingPage";

// Маршруты вне главной грузятся лениво — меньше вес первой загрузки.
const BlogPage = lazy(() => import("@/features/blog/BlogPage").then((m) => ({ default: m.BlogPage })));
const BlogPostPage = lazy(() => import("@/features/blog/BlogPostPage").then((m) => ({ default: m.BlogPostPage })));
const PrivacyPage = lazy(() => import("@/features/legal/PrivacyPage").then((m) => ({ default: m.PrivacyPage })));
const AdminPage = lazy(() => import("@/features/admin/AdminPage").then((m) => ({ default: m.AdminPage })));

function Fallback() {
  return <div className="px-5 py-32 text-center text-slate-500">Загрузка…</div>;
}

export function App() {
  return (
    <>
      <ScrollManager />
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
          </Route>
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
