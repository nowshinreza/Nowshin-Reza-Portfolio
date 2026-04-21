import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import { getTheme, applyTheme } from "../../utils/theme";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [theme, setThemeState] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    setThemeState(getTheme());
  }, []);

  useEffect(() => {
    const syncAdminState = () => {
      setIsAdminLoggedIn(localStorage.getItem("portfolio_admin") === "true");
    };

    syncAdminState();

    window.addEventListener("storage", syncAdminState);
    window.addEventListener("admin-auth-changed", syncAdminState);

    return () => {
      window.removeEventListener("storage", syncAdminState);
      window.removeEventListener("admin-auth-changed", syncAdminState);
    };
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"];

      let current = "#home";

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop - 120;
          const bottom = top + el.offsetHeight;

          if (window.scrollY >= top && window.scrollY < bottom) {
            current = `#${section}`;
          }
        }
      }

      setActiveSection(current);
    };

    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    applyTheme(nextTheme);
    setThemeState(nextTheme);
  };

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setActiveSection(href);
    }
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        scrollToSection(href);
      }, 500);
    } else {
      scrollToSection(href);
    }
  };

  const base =
    "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full";

  const active =
    "bg-white/80 text-blue-600 shadow-md scale-110 dark:bg-slate-800 dark:text-white";

  const inactive =
    "text-slate-700 dark:text-slate-300 hover:scale-105 hover:bg-white/60 dark:hover:bg-slate-800/60";

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6">
        <div className="flex items-center justify-between rounded-[30px] border border-slate-200/60 bg-white/70 px-4 py-3 shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-slate-800/60 dark:bg-slate-950/60">
          
          <Link to="/" className="flex items-center gap-3">
            <div>
              <h1 className="text-base font-bold text-slate-900 dark:text-white">
                Md. Adnan Parvez
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Portfolio
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/60 p-2 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/60">
            {navLinks.map((item) => (
              <button
                key={item.label}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`${base} ${
                  activeSection === item.href ? active : inactive
                }`}
              >
                {item.label}

                <span
                  className={`absolute left-1/2 -bottom-1 h-[2px] -translate-x-1/2 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-cyan-400 transition-all duration-300 ${
                    activeSection === item.href ? "w-[60%]" : "w-0"
                  }`}
                />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-800 transition hover:scale-110 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            >
              {theme === "light" ? <FaMoon size={14} /> : <FaSun size={14} />}
            </button>

            {isAdminLoggedIn ? (
              <Link
                to="/dashboard"
                className="hidden rounded-full bg-gradient-to-r from-blue-600 to-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-110 md:inline-flex"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="hidden rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-110 dark:bg-white dark:text-slate-950 md:inline-flex"
              >
                Login
              </Link>
            )}

            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-800 transition hover:scale-110 dark:border-slate-700 dark:bg-slate-900 dark:text-white md:hidden"
            >
              {menuOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="mt-3 rounded-[26px] border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-900/95 md:hidden">
            <div className="flex flex-col gap-2">
              {navLinks.map((item) => (
                <button
                  key={item.label}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`${base} ${
                    activeSection === item.href ? active : inactive
                  } text-left`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;