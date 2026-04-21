import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/layout/Navbar";

const ProjectDetails = () => {
  const { slug } = useParams();

  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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
          .slice(0, 3);

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

            {/* TITLE */}
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

            {/* COVER */}
            <div className="mt-8 overflow-hidden rounded-[30px] border border-slate-200 shadow-md dark:border-slate-800">
              {project.coverImage ? (
                <img
                  src={project.coverImage}
                  className="h-[380px] w-full object-contain transition hover:scale-105 duration-500"
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

            {/* GALLERY */}
            {galleryImages.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Gallery
                </h2>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  {galleryImages.map((img, i) => (
                    <div
                      key={i}
                      className="group overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800"
                    >
                      <img
                        src={img}
                        className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* ================= SIDEBAR ================= */}
          <aside className="space-y-8">

            {/* TOOLS */}
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

            {/* LINKS */}
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

            {/* RELATED */}
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
    </div>
  );
};

export default ProjectDetails;