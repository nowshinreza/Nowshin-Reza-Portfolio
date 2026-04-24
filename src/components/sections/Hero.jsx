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
  const [zoom, setZoom] = useState(1);

  const socialLinks = [
    {
      key: "facebook",
      href: portfolio?.socialLinks?.facebook,
      icon: <FaFacebookF size={15} />,
    },
    {
      key: "instagram",
      href: portfolio?.socialLinks?.instagram,
      icon: <FaInstagram size={15} />,
    },
    {
      key: "linkedin",
      href: portfolio?.socialLinks?.linkedin,
      icon: <FaLinkedinIn size={15} />,
    },
    {
      key: "github",
      href: portfolio?.socialLinks?.github,
      icon: <FaGithub size={15} />,
    },
  ].filter((i) => i.href);

  return (
    <>
      <section
        id="home"
        className="relative overflow-hidden px-4 py-14 sm:px-6 lg:px-8"
      >
        {/* BACKGROUND */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />
          <div className="absolute bottom-0 left-0 h-[260px] w-[260px] rounded-full bg-cyan-400/10 blur-[120px]" />
        </div>

        <div className="mx-auto max-w-6xl">
          {/* MAIN CARD */}
          <div className="rounded-[28px] border border-slate-200 bg-white/60 shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/60">
            <div className="grid items-center gap-10 p-6 lg:grid-cols-2 lg:p-10">

              {/* LEFT */}
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tight text-[#223d77] dark:text-white sm:text-5xl">
                  {portfolio?.name || "Please wait a few seconds…"}
                </h1>

                <div className="h-[2px] w-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />

                <p className="text-lg font-semibold tracking-wide text-slate-700 dark:text-slate-300">
                  {portfolio?.title || "Server is loading and may take a few seconds"}
                </p>

                <p className="max-w-xl text-base leading-7 text-slate-600 dark:text-slate-400">
                  {portfolio?.shortBio ||
                    "Thank you for your patience"}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  {portfolio?.resumeLink && (
                    <button
                      onClick={() => {
                        setZoom(1);
                        setShowResumeModal(true);
                      }}
                      className="inline-flex items-center gap-2 rounded-full bg-blue-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-700 dark:bg-white dark:text-slate-900"
                    >
                      <FaEye size={14} />
                      View Resume
                    </button>
                  )}
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex justify-center">

                <div className="w-full max-w-sm overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-md dark:border-slate-800 dark:bg-slate-900">

                  {/* BANNER */}
                  <div className="relative h-[280px] overflow-hidden">
                    {portfolio?.bannerImage ? (
                      <img
                        src={portfolio.bannerImage}
                        alt="banner"
                        className="h-full w-full object-contain object-center"
                      />
                    ) : (
                      <div className="h-full w-full bg-slate-900" />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>

                  {/* 🔥 PREMIUM ICON PANEL (NEW DESIGN) */}
                  {socialLinks.length > 0 && (
                    <div className="relative flex justify-center py-6">

                      {/* background glow panel */}
                      <div className="absolute inset-x-6 top-2 bottom-2 rounded-2xl bg-gradient-to-r from-blue-500/10 via-cyan-400/10 to-indigo-500/10 blur-xl" />

                      {/* glass container */}
                      <div className="relative flex gap-4 rounded-2xl border border-slate-200/60 bg-white/60 px-12 py-3 shadow-lg backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/40">

                        {socialLinks.map((item) => (
                          <a
                            key={item.key}
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                            className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition duration-300 hover:-translate-y-1 hover:bg-slate-900 hover:text-white dark:border-slate-700 dark:text-slate-300 dark:hover:bg-white dark:hover:text-slate-900"
                          >
                            {/* hover glow */}
                            <span className="absolute inset-0 rounded-full bg-blue-400/60 opacity-0 blur-md transition group-hover:opacity-100" />
                            <span className="relative">
                              {item.icon}
                            </span>
                          </a>
                        ))}

                      </div>
                    </div>
                  )}

                </div>
              </div>

            </div>
          </div>

          <div className="mt-10 border-t border-slate-200 dark:border-slate-800" />
        </div>
      </section>

      {/* RESUME MODAL (UNCHANGED) */}
      {showResumeModal && portfolio?.resumeLink && (
        <div className="fixed inset-0 z-[9999] flex flex-col bg-black/90 backdrop-blur-md">

          <button
            onClick={() => setShowResumeModal(false)}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-black shadow-lg"
          >
            <FaTimes />
          </button>

          <div className="flex flex-1 items-center justify-center p-6">
            <img
              src={portfolio.resumeLink}
              alt="resume"
              style={{ transform: `scale(${zoom})`, transition: "0.25s" }}
              className="max-h-[95vh] max-w-full object-contain"
            />
          </div>

        </div>
      )}
    </>
  );
};

export default Hero;