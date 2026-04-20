const AboutPreview = ({ portfolio }) => {
  const hasEducation =
    portfolio?.education?.ssc?.institute ||
    portfolio?.education?.hsc?.institute ||
    portfolio?.education?.bsc?.institute;

  if (
    !portfolio?.aboutDescription &&
    !hasEducation &&
    !portfolio?.experiences?.length
  ) {
    return null;
  }

  const getGradeLabel = (level) => (level === "bsc" ? "CGPA" : "GPA");

  const educationItems = ["ssc", "hsc", "bsc"]
    .map((level) => ({
      level,
      ...portfolio?.education?.[level],
    }))
    .filter(
      (edu) =>
        edu?.institute ||
        edu?.exam ||
        edu?.group ||
        edu?.year ||
        edu?.result
    );

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8  sm:py-8 lg:py-8">

      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-10 h-96 w-96 rounded-full bg-blue-500/10 blur-[160px]" />
        <div className="absolute bottom-0 right-10 h-96 w-96 rounded-full bg-cyan-400/10 blur-[180px]" />
      </div>

      {/* TITLE */}
      <div className="mb-8 flex justify-center">
        <div className="relative inline-flex items-center rounded-full border border-slate-300 bg-white/70 px-6 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-slate-700 shadow-sm backdrop-blur-xl dark:border-white/15 dark:bg-white/10 dark:text-slate-200">

          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/10 via-transparent to-cyan-400/10 blur-lg" />

          <span className="relative text-base sm:text-lg font-semibold tracking-[0.2em]">
            About Me
          </span>
        </div>
      </div>

      {/* DESCRIPTION */}
      {portfolio?.aboutDescription && (
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
            {portfolio.aboutDescription}
          </p>
        </div>
      )}

      {/* MAIN WRAPPER */}
      <div className="relative rounded-[40px] border border-slate-300/80 bg-white/60 p-6 shadow-[0_35px_120px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:border-slate-700/50 dark:bg-slate-950/40 sm:p-10">

        {educationItems.length > 0 && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {educationItems.map((edu, index) => (
              <div
                key={index}
                className="group relative transition-transform duration-500 hover:-translate-y-2"
              >

                {/* OUTER GLOW */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 via-indigo-400/10 to-cyan-400/20 opacity-50 blur-md transition group-hover:opacity-80" />

                {/* CARD */}
                <div className="relative h-full rounded-3xl border border-slate-300/80 bg-white/80 p-6 pt-14 shadow-md backdrop-blur-xl transition-all duration-500 group-hover:shadow-2xl dark:border-slate-600/50 dark:bg-slate-900/50">

                  {/* YEAR BADGE (FIXED FOR LONG TEXT) */}
                  {edu?.year && (
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-full px-3 sm:px-0 flex justify-center">
                      <span className="max-w-[90%] break-words whitespace-normal text-center rounded-full border border-slate-300/80 bg-white px-3 sm:px-4 py-1 text-xs font-medium leading-tight text-slate-700 shadow-sm dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200">
                        {edu.year}
                      </span>
                    </div>
                  )}

                  {/* INNER GLOW */}
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-400/10 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />

                  {/* CONTENT */}
                  <div className="relative z-10">

                    {edu?.exam && (
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        {edu.exam}
                      </h3>
                    )}

                    {edu?.group && (
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {edu.group}
                      </p>
                    )}

                    {edu?.institute && (
                      <p className="mt-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                        {edu.institute}
                      </p>
                    )}

                    {/* RESULT */}
                    {edu?.result && (
                      <div className="mt-6 flex items-center justify-between border-t border-slate-300/80 pt-4 dark:border-slate-600/40">

                        <span className="text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
                          {getGradeLabel(edu.level)}
                        </span>

                        <span className="rounded-full border border-slate-300/80 bg-white px-3 py-1 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur-md dark:border-slate-600 dark:bg-slate-800 dark:text-white">
                          {edu.result}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* HOVER OVERLAY */}
                  <div className="pointer-events-none absolute inset-0 rounded-3xl bg-white/10 opacity-0 transition duration-500 group-hover:opacity-100 dark:bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DIVIDER */}
      <div className="mx-auto mt-10 sm:mt-12 h-[1px] w-full max-w-5xl bg-gradient-to-r from-transparent via-slate-400/60 to-transparent dark:via-slate-700/60" />
    </section>
  );
};

export default AboutPreview;