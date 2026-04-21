import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/layout/Navbar";

const ProjectDetails = () => {
  const { slug } = useParams();

  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= IMAGE VIEWER =================
  const [viewerOpen, setViewerOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const projectRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/projects/slug/${slug}`
        );

        const currentProject = projectRes?.data?.data || null;
        setProject(currentProject);

        const allProjectsRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/projects`
        );

        const filtered = (allProjectsRes?.data?.data || [])
          .filter((item) => item.slug !== slug)
          .slice(0, 30);

        setRelatedProjects(filtered);
      } catch (error) {
        console.error(error);
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [slug]);

  const galleryImages = useMemo(() => {
    if (!project?.images || !Array.isArray(project.images)) return [];

    return project.images
      .map((item) => {
        if (typeof item === "string") return item;
        if (item && typeof item === "object") {
          return item.url || item.image || item.secure_url || "";
        }
        return "";
      })
      .filter(Boolean);
  }, [project]);

  // ================= COMBINED IMAGES (COVER + GALLERY) =================
  const allImages = useMemo(() => {
    const imgs = [];

    if (project?.coverImage) {
      imgs.push(project.coverImage);
    }

    if (Array.isArray(galleryImages)) {
      imgs.push(...galleryImages);
    }

    return imgs;
  }, [project, galleryImages]);

  // ================= HANDLERS =================
  const openViewer = (index) => {
    setActiveIndex(index);
    setViewerOpen(true);
  };

  const closeViewer = () => setViewerOpen(false);

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  // ================= KEYBOARD CONTROL =================
  useEffect(() => {
    const handleKey = (e) => {
      if (!viewerOpen) return;

      if (e.key === "Escape") closeViewer();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [viewerOpen, allImages.length]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <Navbar />
        <div className="mx-auto max-w-7xl px-6 pt-32">
          <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            Loading project...
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <Navbar />
        <div className="mx-auto max-w-7xl px-6 pt-32">
          <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Project not found
            </h1>
            <Link
              to="/"
              className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 pt-32 pb-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_0.8fr]">

          {/* ================= MAIN ================= */}
          <section className="rounded-[36px] border border-slate-200 bg-white/70 p-10 shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/60">

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-navy-700 dark:text-blue-300">
              Project Overview
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
              {project.name}
            </h1>

            {project.type && (
              <p className="mt-3 text-lg font-medium text-slate-600 dark:text-slate-300">
                {project.type}
              </p>
            )}

            {/* COVER IMAGE */}
            <div className="mt-8 overflow-hidden rounded-[30px] border border-slate-200 shadow-md dark:border-slate-800">
              {project.coverImage ? (
                <img
                  src={project.coverImage}
                  onClick={() => openViewer(0)}
                  className="h-[380px] w-full object-contain transition hover:scale-105 duration-500 cursor-pointer"
                />
              ) : (
                <div className="h-[380px] w-full bg-gradient-to-br from-slate-900 to-blue-900" />
              )}
            </div>

            {/* DESCRIPTION */}
            {project.shortDescription && (
              <div className="mt-10">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Overview
                </h2>
                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                  {project.shortDescription}
                </p>
              </div>
            )}

            {project.fullDescription && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Details
                </h2>
                <p className="mt-3 whitespace-pre-line leading-7 text-slate-600 dark:text-slate-400">
                  {project.fullDescription}
                </p>
              </div>
            )}

            {/* ================= GALLERY ================= */}
            {galleryImages.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Gallery
                </h2>

                <div className="mt-5 grid gap-5 sm:grid-cols-3">

                  {galleryImages.slice(0, 40).map((img, i) => (
                    <div
                      key={i}
                      onClick={() => openViewer(i + 1)} // +1 because cover is index 0
                      className="group overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 cursor-pointer"
                    >
                      <img
                        src={img}
                        className="h-50 w-full object-contain transition duration-500 group-hover:scale-110"
                      />
                    </div>
                  ))}

                  {galleryImages.length > 40 && (
                    <div
                      onClick={() => openViewer(5)}
                      className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 cursor-pointer"
                    >
                      <img
                        src={galleryImages[40]}
                        className="h-64 w-full object-cover blur-sm scale-110"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-2xl font-bold">
                        +{galleryImages.length - 40}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            )}
          </section>

          {/* ================= SIDEBAR (UNCHANGED) ================= */}
          <aside className="space-y-8">
            <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-md dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Tools
              </h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {project.tools?.map((tool, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-md dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Links
              </h2>

              <div className="mt-5 space-y-3">
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    className="block rounded-2xl bg-slate-950 px-5 py-3 text-center text-white hover:bg-blue-900"
                  >
                    Live Preview
                  </a>
                )}

                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    className="block rounded-2xl border border-slate-300 px-5 py-3 text-center dark:border-slate-700 dark:text-white"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>

            <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-md dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                More Projects
              </h2>

              <div className="mt-5 space-y-4">
                {relatedProjects.map((p) => (
                  <Link
                    key={p._id}
                    to={`/project/${p.slug}`}
                    className="block rounded-2xl border border-slate-200 p-4 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
                  >
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {p.shortDescription}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* ================= FULLSCREEN VIEWER ================= */}
      {viewerOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">

          <button
            onClick={closeViewer}
            className="absolute top-6 right-6 text-white text-3xl"
          >
            ✕
          </button>

          <button
            onClick={prevImage}
            className="absolute left-6 text-white text-4xl"
          >
            ‹
          </button>

          <img
            src={allImages[activeIndex]}
            className="max-h-[85vh] max-w-[90vw] rounded-2xl shadow-2xl"
          />

          <button
            onClick={nextImage}
            className="absolute right-6 text-white text-4xl"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;