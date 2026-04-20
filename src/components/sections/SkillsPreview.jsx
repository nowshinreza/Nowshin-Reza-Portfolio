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
        
        {/* MAIN WRAPPER */}
        <div className="relative mx-auto max-w-7xl rounded-[36px] border border-slate-300/80 bg-white/50 p-5 shadow-[0_35px_100px_rgba(15,23,42,0.10)] backdrop-blur-3xl dark:border-slate-800/60 dark:bg-slate-950/30">

          {/* ================= SKILLS ================= */}
          {hasSkills && (
            <div className="mb-8">

              {/* TITLE OUTSIDE */}
              <SectionTitle>Skills</SectionTitle>

              {/* BOX */}
              <div className="rounded-3xl border border-slate-300/70 bg-white/50 p-6 shadow-sm backdrop-blur-2xl dark:border-slate-700/40 dark:bg-slate-900/30">

  <div className="grid gap-6 md:grid-cols-2">

    {portfolio.skills.map((skill, index) => (
      <div
        key={index}
        className="group relative rounded-3xl border border-slate-300/70 bg-white/70 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-700/50 dark:bg-slate-900/40"
      >

        {/* soft glow */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-400/5 opacity-0 transition group-hover:opacity-100" />

        {/* CATEGORY (more premium header) */}
        <div className="relative mb-5 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-blue-900" />
          <h3 className="text-base font-semibold tracking-wide text-slate-900 dark:text-white">
            {skill.category}
          </h3>
        </div>

        {/* ITEMS */}
        <div className="relative flex flex-wrap gap-2.5">
          {skill.items?.map((item, i) => (
            <span
              key={i}
              className="rounded-full border border-slate-300/70 bg-white/80 px-3 py-1.5 text-sm text-slate-700 shadow-sm transition hover:scale-[1.03] hover:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
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

              {/* TITLE OUTSIDE */}
              <SectionTitle>Certificates</SectionTitle>

              {/* BOX */}
              <div className="rounded-3xl border border-slate-300/80 bg-white/60 p-5 shadow-sm backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/40">

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

                  {portfolio.certificates.map((certificate, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-2xl border border-slate-300/80 bg-white/70 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-700/50 dark:bg-slate-900/40"
                    >

                      {/* IMAGE */}
                      <div className="relative h-32 w-full overflow-hidden">

                        {certificate.image ? (
                          <>
                            <img
                              src={certificate.image}
                              className="absolute inset-0 h-full w-full scale-110 object-cover blur-md brightness-75"
                            />
                            <img
                              src={certificate.image}
                              className="relative h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />
                          </>
                        ) : (
                          <div className="flex h-full items-center justify-center text-slate-400">
                            Certificate Image
                          </div>
                        )}

                        {/* VIEW */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">

                          <button
                            onClick={() => setOpenImage(certificate.image)}
                            className="flex cursor-pointer items-center gap-2 rounded-full bg-white px-3 py-1.5 text-s font-semibold text-black shadow-lg transition hover:scale-105 active:scale-95"
                          >
                            <FaEye />
                            View
                          </button>

                        </div>
                      </div>

                      {/* TEXT */}
                      <div className="p-3">
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                          {certificate.name}
                        </h4>

                        {certificate.issuer && (
                          <p className="mt-0.5 text-s text-slate-600 dark:text-slate-400">
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

      {/* MODAL */}
      {openImage && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95">

          <button
            onClick={() => setOpenImage(null)}
            className="absolute right-6 top-6 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white text-black shadow-lg transition hover:scale-105"
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