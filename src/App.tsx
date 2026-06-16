import { Route, Routes } from "react-router-dom";
import { SiteLayout } from "@/components/SiteLayout";
import { ScrollManager } from "@/components/ScrollManager";
import { LandingPage } from "@/features/landing/LandingPage";
import { BlogPage } from "@/features/blog/BlogPage";
import { BlogPostPage } from "@/features/blog/BlogPostPage";

export function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
        </Route>
      </Routes>
    </>
  );
}
