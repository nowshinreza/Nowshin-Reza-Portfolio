import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const ContactPreview = ({ portfolio }) => {
  const hasContact =
    portfolio?.contactInfo?.email ||
    portfolio?.contactInfo?.phone ||
    portfolio?.contactInfo?.address ||
    portfolio?.socialLinks?.facebook ||
    portfolio?.socialLinks?.instagram ||
    portfolio?.socialLinks?.linkedin ||
    portfolio?.socialLinks?.github;

  if (!hasContact) return null;

  const socialLinks = [
    {
      key: "facebook",
      href: portfolio?.socialLinks?.facebook,
      icon: <FaFacebookF size={14} />,
      label: "Facebook",
    },
    {
      key: "instagram",
      href: portfolio?.socialLinks?.instagram,
      icon: <FaInstagram size={14} />,
      label: "Instagram",
    },
    {
      key: "linkedin",
      href: portfolio?.socialLinks?.linkedin,
      icon: <FaLinkedinIn size={14} />,
      label: "LinkedIn",
    },
    {
      key: "github",
      href: portfolio?.socialLinks?.github,
      icon: <FaGithub size={14} />,
      label: "GitHub",
    },
  ].filter((item) => item.href);

  const infoItems = [
    portfolio?.contactInfo?.email && {
      key: "email",
      label: "Email",
      value: portfolio.contactInfo.email,
      icon: <FaEnvelope size={14} />,
      href: `mailto:${portfolio.contactInfo.email}`,
    },
    portfolio?.contactInfo?.phone && {
      key: "phone",
      label: "Phone",
      value: portfolio.contactInfo.phone,
      icon: <FaPhoneAlt size={13} />,
    },
    portfolio?.contactInfo?.address && {
      key: "address",
      label: "Location",
      value: portfolio.contactInfo.address,
      icon: <FaMapMarkerAlt size={13} />,
    },
  ].filter(Boolean);

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-4 py-10 sm:px-6 sm:py-12 lg:px-8"
    >
      <div className="relative mx-auto max-w-6xl rounded-[36px] border border-slate-300/60 bg-white/30 p-5 shadow-[0_30px_90px_rgba(15,23,42,0.12)] backdrop-blur-3xl dark:border-slate-800/40 dark:bg-slate-950/30">

        {/* GLOWS */}
        <div className="pointer-events-none absolute inset-y-0 left-[-80px] w-[220px] bg-blue-500/20 blur-[120px]" />
        <div className="pointer-events-none absolute inset-y-0 right-[-80px] w-[220px] bg-cyan-400/20 blur-[120px]" />
        <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-96 -translate-x-1/2 bg-sky-400/10 blur-[120px]" />

        <div className="mx-auto max-w-5xl">

          {/* TITLE */}
          <div className="mb-6 flex justify-center">
            <div className="relative inline-flex items-center rounded-full border border-slate-300/60 bg-white/50 px-4 py-1.5 text-[15px] font-semibold uppercase tracking-[0.25em] text-slate-600 shadow-md backdrop-blur-xl dark:border-white/10 dark:bg-white/10 dark:text-slate-300">
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 via-transparent to-cyan-400/20 blur-md" />
              <span className="relative z-10">Contact</span>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[0.60fr_0.60fr]">

            {/* LEFT BOX */}
            <div className="rounded-[28px] border border-slate-300/70 bg-white/30 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl transition-all duration-300 hover:shadow-[0_30px_90px_rgba(59,130,246,0.12)] dark:border-white/10 dark:bg-white/5 sm:p-6">

              <div className="grid gap-2.5">

                {infoItems.map((item) =>
                  item.href ? (
                    <a
                      key={item.key}
                      href={item.href}
                      className="group flex items-center gap-3 rounded-2xl border border-slate-300/60 bg-white/40 px-3 py-2.5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300/40 hover:bg-white/20 hover:shadow-[0_10px_25px_rgba(59,130,246,0.18)] dark:border-white/10 dark:bg-white/5"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-900/90 text-white transition-all duration-300 group-hover:scale-105 dark:bg-white dark:text-slate-900">
                        {item.icon}
                      </div>

                      <div className="min-w-0 flex-1 leading-tight">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                          {item.label}
                        </p>
                        <p className="mt-0.5 truncate text-sm font-medium text-slate-800 dark:text-slate-200">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-300/60 bg-white/40 px-3 py-2.5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-900/90 text-white dark:bg-white dark:text-slate-900">
                        {item.icon}
                      </div>

                      <div className="min-w-0 flex-1 leading-tight">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                          {item.label}
                        </p>
                        <p className="mt-0.5 text-sm font-medium text-slate-800 dark:text-slate-200">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  )
                )}

              </div>
            </div>

            {/* RIGHT BOX */}
            <div className="relative overflow-hidden rounded-[28px] border border-slate-300/70 bg-white/20 p-5 backdrop-blur-2xl shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-all duration-300 hover:shadow-[0_25px_90px_rgba(34,211,238,0.18)] dark:border-white/10 dark:bg-white/5">

              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-400/20 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-cyan-400/20 blur-3xl" />

              <div className="relative z-10">

                <div className="inline-flex items-center rounded-full border border-slate-300/60 bg-white/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
                  Social
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
                  {socialLinks.map((item) => (
                    <a
                      key={item.key}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-3 rounded-2xl border border-slate-300/60 bg-white/30 px-4 py-3 text-slate-700 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-300/40 hover:bg-white/20 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-900/90 text-white transition-all duration-300 group-hover:scale-110 dark:bg-white dark:text-slate-900">
                        {item.icon}
                      </span>
                      <span className="text-sm font-medium">{item.label}</span>
                    </a>
                  ))}
                </div>

              </div>
            </div>

          </div>

          {/* FOOTER */}
          <div className="mt-6 text-center text-xs tracking-wide text-slate-500 dark:text-slate-400">
            All rights reserved by Nowshin Reza © 2026
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactPreview;