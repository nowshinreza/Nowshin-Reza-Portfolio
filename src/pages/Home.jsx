import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import AboutPreview from "../components/sections/AboutPreview";
import SkillsPreview from "../components/sections/SkillsPreview";
import ProjectsPreview from "../components/sections/ProjectsPreview";
import ContactPreview from "../components/sections/ContactPreview";
import { getPortfolio } from "../api/portfolioApi";
import { getProjects } from "../../../Backend/src/api/projectApi";

const Home = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const portfolioData = await getPortfolio();
        const projectData = await getProjects();

        setPortfolio(portfolioData);
        setProjects(projectData);
      } catch (error) {
        console.log(error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 transition-colors dark:bg-slate-950">
      <Navbar />

      <main className="pt-28">
        <Hero portfolio={portfolio} />
        <AboutPreview portfolio={portfolio} />
        <SkillsPreview portfolio={portfolio} />
        <ProjectsPreview projects={projects} />
        <ContactPreview portfolio={portfolio} />
      </main>
    </div>
  );
};

export default Home;