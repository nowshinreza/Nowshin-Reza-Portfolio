import { useState, useEffect } from "react";
import { FaTimes, FaEye } from "react-icons/fa";

const SkillsPreview = ({ portfolio }) => {
  const [openImage, setOpenImage] = useState(null);

  const hasSkills = portfolio?.skills?.length > 0;
  const hasCertificates = portfolio?.certificates?.length > 0;

  useEffect(() => {
    document.body.style.overflow = openImage ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [openImage]);

  if (!hasSkills && !hasCertificates) return null;

  const SectionTitle = ({ children }) => (
    <div className="mb-9 flex justify-center">
      <div className="relative inline-flex items-center rounded-full border border-slate-300/80 bg-white/70 px-5 py-1.5 text-s font-semibold uppercase tracking-[0.25em] text-slate-700 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/10 dark:text-slate-300">
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/15 via-transparent to-cyan-400/15 blur-md" />
        <span className="relative">{children}</span>
      </div>
    </div>
  );

  return (
    <>
      <section className="relative px-6 py-10 overflow-hidden">

        {/* BACKGROUND */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 left-10 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]" />
          <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-cyan-400/10 blur-[140px]" />
        </div>

        <div className="relative mx-auto max-w-7xl rounded-[36px] border border-slate-300/80 bg-white/50 p-5 shadow-[0_35px_100px_rgba(15,23,42,0.10)] backdrop-blur-3xl dark:border-slate-800/60 dark:bg-slate-950/30">

          {/* ================= SKILLS ================= */}
          {hasSkills && (
            <div className="mb-10">
              <SectionTitle>Skills</SectionTitle>

              <div className="rounded-3xl border border-slate-300/70 bg-white/50 p-6 dark:border-slate-700/40 dark:bg-slate-900/30">
                <div className="grid gap-6 md:grid-cols-2">

                  {portfolio.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="rounded-3xl border border-slate-300/70 bg-white/70 p-6 dark:border-slate-700/50 dark:bg-slate-900/40"
                    >
                      <h3 className="mb-4 text-base font-semibold text-slate-900 dark:text-white">
                        {skill.category}
                      </h3>

                      <div className="flex flex-wrap gap-2.5">
                        {skill.items?.map((item, i) => (
                          <span
                            key={i}
                            className="rounded-full border border-slate-300/70 bg-white/80 px-3 py-1 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}

                </div>
              </div>
            </div>
          )}

          {/* ================= CERTIFICATES ================= */}
          {hasCertificates && (
            <div>
              <SectionTitle>Certificates</SectionTitle>

              <div className="rounded-3xl border border-slate-300/80 bg-white/60 p-5 dark:border-slate-700/50 dark:bg-slate-900/40">

                {/* 3 COLUMN GRID */}
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                  {portfolio.certificates.map((certificate, index) => (
                    <div
                      key={index}
                      onClick={() => setOpenImage(certificate.image)}
                      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-700/50 dark:bg-slate-900/40"
                    >

                      {/* IMAGE (SMALL + CLEAN) */}
                      <div className="relative h-20 w-full overflow-hidden">

                        {certificate.image && (
                          <>
                            {/* blur background */}
                            <img
                              src={certificate.image}
                              className="absolute inset-0 h-full w-full scale-150 object-cover blur-xl brightness-75"
                            />

                            {/* main image */}
                            <img
                              src={certificate.image}
                              className="relative h-full w-full object-cover transition duration-300 group-hover:scale-110"
                            />
                          </>
                        )}

                        {/* HOVER OVERLAY */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                          <FaEye className="text-white text-xl" />
                        </div>
                      </div>

                      {/* TEXT (VERY FOCUSED) */}
                      <div className="p-3 text-center">

                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {certificate.name}
                        </h4>

                        {certificate.issuer && (
                          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            {certificate.issuer}
                          </p>
                        )}

                      </div>

                    </div>
                  ))}

                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* IMAGE MODAL */}
      {openImage && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95">

          <button
            onClick={() => setOpenImage(null)}
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-lg"
          >
            <FaTimes />
          </button>

          <img
            src={openImage}
            className="max-h-[90vh] max-w-[95vw] object-contain"
          />
        </div>
      )}
    </>
  );
};

export default SkillsPreview;