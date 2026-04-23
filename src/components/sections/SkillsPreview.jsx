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
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/10 via-transparent to-cyan-400/10 blur-md" />
        <span className="relative">{children}</span>
      </div>
    </div>
  );

  return (
    <>
      <section className="relative overflow-hidden px-6 py-10">
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
                <div className="grid gap-6 md:grid-cols-3">
                  {portfolio.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="
                        group relative overflow-hidden rounded-3xl
                        border border-slate-300/70
                        bg-white/70 p-6
                        transition-all duration-400 ease-out
                        hover:-translate-y-1.5 hover:shadow-[0_15px_40px_rgba(59,130,246,0.12)]
                        dark:border-slate-700/50 dark:bg-slate-900/40
                      "
                    >
                      {/* SOFT GLOW */}
                      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-400 group-hover:opacity-100">
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 via-transparent to-cyan-400/10 blur-lg" />
                      </div>

                      {/* SUBTLE BORDER EFFECT */}
                      <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-blue-300/30 transition-all duration-400" />

                      {/* CONTENT */}
                      <div className="relative z-10">
                        <h3 className="mb-4 text-base font-semibold text-slate-900 dark:text-white">
                          {skill.category}
                        </h3>

                        <div className="flex flex-wrap gap-2.5">
                          {skill.items?.map((item, i) => (
                            <span
                              key={i}
                              className="
                                rounded-full border border-slate-300/70
                                bg-white/80 px-3 py-1 text-sm
                                text-slate-700
                                transition-all duration-300
                                group-hover:border-blue-200/60 group-hover:bg-blue-50/60
                                dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300
                                dark:group-hover:bg-slate-800/70
                              "
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* VERY LIGHT SHIMMER */}
                      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100">
                        <div className="absolute -left-1/2 top-0 h-full w-1/3 rotate-12 bg-white/10 blur-lg transition-all duration-700 group-hover:left-full" />
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
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {portfolio.certificates.map((certificate, index) => (
                    <div
                      key={index}
                      onClick={() =>
                        certificate.image && setOpenImage(certificate.image)
                      }
                      className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/90 p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700/50 dark:bg-slate-900/50"
                    >
                      {/* SMALL IMAGE LEFT */}
                      <div className="relative h-16 w-20 flex-shrink-0 overflow-hidden rounded-xl">
                        {certificate.image ? (
                          <>
                            <img
                              src={certificate.image}
                              alt={certificate.name || "Certificate"}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition duration-300 group-hover:opacity-100">
                              <FaEye className="text-sm text-white" />
                            </div>
                          </>
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-slate-100 text-[10px] text-slate-400 dark:bg-slate-800">
                            No image
                          </div>
                        )}
                      </div>

                      {/* TEXT RIGHT */}
                      <div className="min-w-0 flex-1">
                        <h4 className="line-clamp-2 text-sm font-bold leading-snug text-slate-900 dark:text-white">
                          {certificate.name}
                        </h4>

                        {certificate.issuer && (
                          <p className="mt-1 line-clamp-1 text-xs text-slate-500 dark:text-slate-400">
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
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 px-4"
          onClick={() => setOpenImage(null)}
        >
          <button
            onClick={() => setOpenImage(null)}
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-lg"
          >
            <FaTimes />
          </button>

          <img
            src={openImage}
            alt="Certificate Preview"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[95vw] rounded-2xl object-contain"
          />
        </div>
      )}
    </>
  );
};

export default SkillsPreview;