import { useState } from "react";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaEye,
  FaArrowRight,
  FaTimes,
} from "react-icons/fa";

const Hero = ({ portfolio }) => {
  const [showResumeModal, setShowResumeModal] = useState(false);

  const socialLinks = [
    {
      key: "facebook",
      href: portfolio?.socialLinks?.facebook,
      icon: <FaFacebookF size={13} />,
    },
    {
      key: "instagram",
      href: portfolio?.socialLinks?.instagram,
      icon: <FaInstagram size={13} />,
    },
    {
      key: "linkedin",
      href: portfolio?.socialLinks?.linkedin,
      icon: <FaLinkedinIn size={13} />,
    },
    {
      key: "github",
      href: portfolio?.socialLinks?.github,
      icon: <FaGithub size={13} />,
    },
  ].filter((i) => i.href);

  return (
    <>
      <section
        id="home"
        className="relative overflow-hidden px-4 py-14 sm:px-6 lg:px-8"
      >
        {/* background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />
          <div className="absolute bottom-0 left-0 h-[260px] w-[260px] rounded-full bg-cyan-400/10 blur-[120px]" />
        </div>

        <div className="mx-auto max-w-6xl">

          {/* PREMIUM BOX */}
          <div className="rounded-[28px] border border-slate-200 bg-white/60 shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/60">

            <div className="grid items-center gap-10 p-6 lg:grid-cols-2 lg:p-10">

              {/* LEFT SIDE (UNCHANGED) */}
              <div className="space-y-6">
                <div className="inline-flex items-center rounded-full border border-slate-200 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  Portfolio
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                  {portfolio?.name || "Your Name"}
                </h1>

                <p className="text-lg font-medium text-slate-600 dark:text-slate-300">
                  {portfolio?.title || "Full Stack Developer"}
                </p>

                <p className="max-w-xl text-base leading-7 text-slate-600 dark:text-slate-400">
                  {portfolio?.shortBio ||
                    "Building modern, scalable, and beautiful web experiences."}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  {portfolio?.resumeLink && (
                    <button
                      onClick={() => setShowResumeModal(true)}
                      className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-900 dark:bg-white dark:text-slate-900"
                    >
                      <FaEye size={13} />
                      View Resume
                    </button>
                  )}

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/70 px-6 py-3 text-sm font-semibold text-slate-800 backdrop-blur transition hover:border-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    Contact Me
                    <FaArrowRight size={12} />
                  </a>
                </div>
              </div>

              {/* RIGHT SIDE (PROFILE FOCUSED) */}
              <div className="flex justify-center">

                <div className="w-full max-w-sm overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-md dark:border-slate-800 dark:bg-slate-900">

                  {/* banner */}
                  <div className="relative h-[240px]">
                    {portfolio?.bannerImage ? (
                      <img
                        src={portfolio.bannerImage}
                        alt="banner"
                        className="h-full w-full object-cover opacity-90"
                      />
                    ) : (
                      <div className="h-full w-full bg-slate-900" />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>

                  {/* PROFILE (MORE DOMINANT) */}
                  <div className="relative -mt-16 flex justify-center">
                    <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-xl dark:border-slate-900">
                      {portfolio?.profileImage ? (
                        <img
                          src={portfolio.profileImage}
                          alt="profile"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-slate-200 text-2xl font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                          {portfolio?.name?.charAt(0) || "A"}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* SOCIAL */}
                  {socialLinks.length > 0 && (
                    <div className="flex justify-center gap-3 pt-5 pb-6">
                      {socialLinks.map((item) => (
                        <a
                          key={item.key}
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-900 hover:text-white dark:border-slate-700 dark:text-slate-300 dark:hover:bg-white dark:hover:text-slate-900"
                        >
                          {item.icon}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* HR OUTSIDE */}
          <div className="mt-10 border-t border-slate-200 dark:border-slate-800" />
        </div>
      </section>

      {/* MODAL */}
      {showResumeModal && portfolio?.resumeLink && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <button
            onClick={() => setShowResumeModal(false)}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-black shadow-lg"
          >
            <FaTimes />
          </button>

          <div className="max-h-[90vh] w-full max-w-5xl overflow-auto rounded-3xl bg-white p-3 shadow-2xl dark:bg-slate-900">
            <img
              src={portfolio.resumeLink}
              alt="resume"
              className="w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;