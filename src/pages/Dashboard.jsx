import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import PortfolioSection from "../components/dashboard/PortfolioSection";
import AboutSection from "../components/dashboard/AboutSection";
import SkillsSection from "../components/dashboard/SkillsSection";
import CertificateSection from "../components/dashboard/CertificatesSection";
import ExperienceSection from "../components/dashboard/ExperienceSection";
import ContactSection from "../components/dashboard/ContactSection";
import AddProjectSection from "../components/dashboard/AddProjectSection";
import ManageProjectSection from "../components/dashboard/ManageProjectSection";
import { uploadImage, uploadMultipleImages } from "../api/uploadApi";
import { showError, showSuccess, confirmDelete } from "../utils/alert";

const Dashboard = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const defaultPortfolioData = useMemo(
    () => ({
      name: "",
      title: "",
      shortBio: "",
      aboutDescription: "",
      profileImage: "",
      bannerImage: "",
      resumeLink: "",
      education: {
        ssc: { exam: "", institute: "", group: "", result: "", year: "" },
        hsc: { exam: "", institute: "", group: "", result: "", year: "" },
        bsc: { exam: "", institute: "", group: "", result: "", year: "" },
      },
      socialLinks: {
        facebook: "",
        instagram: "",
        linkedin: "",
        github: "",
      },
      contactInfo: {
        email: "",
        phone: "",
        address: "",
      },
      skills: [],
      certificates: [],
      experiences: [],
    }),
    []
  );

  const defaultProjectForm = useMemo(
    () => ({
      name: "",
      slug: "",
      type: "",
      shortDescription: "",
      fullDescription: "",
      tools: "",
      coverImage: "",
      images: [],
      liveLink: "",
      githubLink: "",
      featured: false,
    }),
    []
  );

  const [activeSection, setActiveSection] = useState("portfolio");
  const [portfolioData, setPortfolioData] = useState(defaultPortfolioData);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [uploadingCertificateImage, setUploadingCertificateImage] =
    useState(false);
  const [uploadingProjectCover, setUploadingProjectCover] = useState(false);
  const [uploadingProjectImages, setUploadingProjectImages] = useState(false);

  const [skillForm, setSkillForm] = useState({
    category: "",
    items: "",
  });
  const [editingSkillIndex, setEditingSkillIndex] = useState(null);

  const [certificateForm, setCertificateForm] = useState({
    name: "",
    issuer: "",
    images: [],
    credentialLink: "",
  });
  const [editingCertificateIndex, setEditingCertificateIndex] = useState(null);

  const [experienceForm, setExperienceForm] = useState({
    company: "",
    role: "",
    duration: "",
    description: "",
  });
  const [editingExperienceIndex, setEditingExperienceIndex] = useState(null);

  const [projectForm, setProjectForm] = useState(defaultProjectForm);
  const [editingProjectId, setEditingProjectId] = useState(null);

  const labelClass =
    "mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300";

  const inputClass =
    "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-blue-400";

  const menuItems = [
    { key: "portfolio", label: "Portfolio" },
    { key: "about", label: "About" },
    { key: "skills", label: "Skills" },
    { key: "certificates", label: "Certificates" },
    { key: "experience", label: "Experience" },
    { key: "contact", label: "Contact" },
    { key: "add-project", label: "Add Project" },
    { key: "manage-project", label: "Manage Project" },
  ];

  const normalizePortfolio = (data) => ({
    ...defaultPortfolioData,
    ...data,
    education: {
      ssc: {
        ...defaultPortfolioData.education.ssc,
        ...(data?.education?.ssc || {}),
      },
      hsc: {
        ...defaultPortfolioData.education.hsc,
        ...(data?.education?.hsc || {}),
      },
      bsc: {
        ...defaultPortfolioData.education.bsc,
        ...(data?.education?.bsc || {}),
      },
    },
    socialLinks: {
      ...defaultPortfolioData.socialLinks,
      ...(data?.socialLinks || {}),
    },
    contactInfo: {
      ...defaultPortfolioData.contactInfo,
      ...(data?.contactInfo || {}),
    },
    skills: Array.isArray(data?.skills) ? data.skills : [],
    certificates: Array.isArray(data?.certificates)
  ? data.certificates.map((certificate) => ({
      ...certificate,
      image: certificate?.image || certificate?.images?.[0] || "",
      images: certificate?.image
        ? [certificate.image]
        : Array.isArray(certificate?.images)
        ? certificate.images
        : [],
    }))
  : [],
    experiences: Array.isArray(data?.experiences) ? data.experiences : [],
  });

  const fetchPortfolio = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/portfolio`, {
        withCredentials: true,
      });

      const data = res?.data?.data;
      if (data) {
        setPortfolioData(normalizePortfolio(data));
      } else {
        setPortfolioData(defaultPortfolioData);
      }
    } catch (error) {
      console.error("Failed to fetch portfolio", error);
      showError("Failed to fetch portfolio.");
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/projects`, {
        withCredentials: true,
      });
      setProjects(Array.isArray(res?.data?.data) ? res.data.data : []);
    } catch (error) {
      console.error("Failed to fetch projects", error);
      showError("Failed to fetch projects.");
    }
  };

  useEffect(() => {
    fetchPortfolio();
    fetchProjects();
  }, []);


const handleLogout = async () => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You will be logged out from your account.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, logout",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  try {
    await axios.post(
      `${API_URL}/api/auth/logout`,
      {},
      { withCredentials: true }
    );

    localStorage.removeItem("portfolio_admin");
    window.dispatchEvent(new Event("admin-auth-changed"));

    await Swal.fire({
      icon: "success",
      title: "Logged out successfully!",
      timer: 1500,
      showConfirmButton: false,
    });

    navigate("/login");
  } catch (error) {
    console.error("Logout request failed", error);

    localStorage.removeItem("portfolio_admin");
    window.dispatchEvent(new Event("admin-auth-changed"));

    await Swal.fire({
      icon: "info",
      title: "Logged out locally",
      text: "Server request failed, but you are logged out.",
      timer: 2000,
      showConfirmButton: false,
    });

    navigate("/login");
  }
};

  const handlePortfolioChange = (e) => {
    const { name, value } = e.target;
    setPortfolioData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedChange = (parent, field, value) => {
    setPortfolioData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const handleEducationChange = (level, field, value) => {
    setPortfolioData((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        [level]: {
          ...prev.education[level],
          [field]: value,
        },
      },
    }));
  };

  const handleSavePortfolio = async (e) => {
    if (e) e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_URL}/api/portfolio/upsert`,
        portfolioData,
        { withCredentials: true }
      );

      showSuccess(res?.data?.message || "Portfolio saved successfully.");
      await fetchPortfolio();
    } catch (error) {
      showError(error?.response?.data?.message || "Failed to save portfolio.");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingProfile(true);
      const url = await uploadImage(file);

      setPortfolioData((prev) => ({
        ...prev,
        profileImage: url,
      }));

      showSuccess("Profile image uploaded.");
    } catch (error) {
      showError("Failed to upload profile image.");
    } finally {
      setUploadingProfile(false);
    }
  };

  const handleBannerUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingBanner(true);
      const url = await uploadImage(file);

      setPortfolioData((prev) => ({
        ...prev,
        bannerImage: url,
      }));

      showSuccess("Banner image uploaded.");
    } catch (error) {
      showError("Failed to upload banner image.");
    } finally {
      setUploadingBanner(false);
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingResume(true);
      const url = await uploadImage(file);

      setPortfolioData((prev) => ({
        ...prev,
        resumeLink: url,
      }));

      showSuccess("Resume image uploaded.");
    } catch (error) {
      showError("Failed to upload resume image.");
    } finally {
      setUploadingResume(false);
    }
  };

  const handleCertificateImageUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    try {
      setUploadingCertificateImage(true);
      const urls = await uploadMultipleImages(files);

      setCertificateForm((prev) => ({
        ...prev,
        images: [...prev.images, ...urls],
      }));

      showSuccess("Certificate images uploaded.");
    } catch (error) {
      showError("Failed to upload certificate images.");
    } finally {
      setUploadingCertificateImage(false);
    }
  };

  const removeCertificateImage = (index) => {
    setCertificateForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const addSkill = () => {
    if (!skillForm.category.trim() || !skillForm.items.trim()) {
      showError("Skill category and items are required.");
      return;
    }

    const skillPayload = {
      category: skillForm.category.trim(),
      items: skillForm.items
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    if (editingSkillIndex !== null) {
      setPortfolioData((prev) => ({
        ...prev,
        skills: prev.skills.map((item, index) =>
          index === editingSkillIndex ? skillPayload : item
        ),
      }));
      setEditingSkillIndex(null);
      showSuccess("Skill updated.");
    } else {
      setPortfolioData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillPayload],
      }));
      showSuccess("Skill added.");
    }

    setSkillForm({
      category: "",
      items: "",
    });
  };

  const startEditSkill = (index) => {
    const skill = portfolioData.skills[index];
    setSkillForm({
      category: skill.category || "",
      items: Array.isArray(skill.items) ? skill.items.join(", ") : "",
    });
    setEditingSkillIndex(index);
  };

  const removeSkill = async (index) => {
    const ok = await confirmDelete("This skill category will be removed.");
    if (!ok) return;

    setPortfolioData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));

    if (editingSkillIndex === index) {
      setEditingSkillIndex(null);
      setSkillForm({
        category: "",
        items: "",
      });
    }

    showSuccess("Skill removed.");
  };

  const addCertificate = () => {
  if (!certificateForm.name.trim()) {
    showError("Certificate name is required.");
    return;
  }

  const firstImage =
    Array.isArray(certificateForm.images) && certificateForm.images.length > 0
      ? certificateForm.images[0]
      : "";

  const certificatePayload = {
    name: certificateForm.name.trim(),
    issuer: certificateForm.issuer.trim(),
    image: firstImage,
    credentialLink: certificateForm.credentialLink.trim(),
  };

  if (editingCertificateIndex !== null) {
    setPortfolioData((prev) => ({
      ...prev,
      certificates: prev.certificates.map((item, index) =>
        index === editingCertificateIndex ? certificatePayload : item
      ),
    }));

    setEditingCertificateIndex(null);
    showSuccess("Certificate updated.");
  } else {
    setPortfolioData((prev) => ({
      ...prev,
      certificates: [...prev.certificates, certificatePayload],
    }));

    showSuccess("Certificate added.");
  }

  setCertificateForm({
    name: "",
    issuer: "",
    images: [],
    credentialLink: "",
  });
};

  const startEditCertificate = (index) => {
    const certificate = portfolioData.certificates[index];
    setCertificateForm({
      name: certificate.name || "",
      issuer: certificate.issuer || "",
      images: Array.isArray(certificate.images)
        ? certificate.images
        : certificate.image
        ? [certificate.image]
        : [],
      credentialLink: certificate.credentialLink || "",
    });
    setEditingCertificateIndex(index);
  };

  const removeCertificate = async (index) => {
    const ok = await confirmDelete("This certificate will be removed.");
    if (!ok) return;

    setPortfolioData((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((_, i) => i !== index),
    }));

    if (editingCertificateIndex === index) {
      setEditingCertificateIndex(null);
      setCertificateForm({
        name: "",
        issuer: "",
        images: [],
        credentialLink: "",
      });
    }

    showSuccess("Certificate removed.");
  };

  const addExperience = () => {
    if (
      !experienceForm.company.trim() &&
      !experienceForm.role.trim() &&
      !experienceForm.duration.trim() &&
      !experienceForm.description.trim()
    ) {
      showError("Please enter at least one experience field.");
      return;
    }

    const experiencePayload = {
      company: experienceForm.company.trim(),
      role: experienceForm.role.trim(),
      duration: experienceForm.duration.trim(),
      description: experienceForm.description.trim(),
    };

    if (editingExperienceIndex !== null) {
      setPortfolioData((prev) => ({
        ...prev,
        experiences: prev.experiences.map((item, index) =>
          index === editingExperienceIndex ? experiencePayload : item
        ),
      }));
      setEditingExperienceIndex(null);
      showSuccess("Experience updated.");
    } else {
      setPortfolioData((prev) => ({
        ...prev,
        experiences: [...prev.experiences, experiencePayload],
      }));
      showSuccess("Experience added.");
    }

    setExperienceForm({
      company: "",
      role: "",
      duration: "",
      description: "",
    });
  };

  const startEditExperience = (index) => {
    const experience = portfolioData.experiences[index];
    setExperienceForm({
      company: experience.company || "",
      role: experience.role || "",
      duration: experience.duration || "",
      description: experience.description || "",
    });
    setEditingExperienceIndex(index);
  };

  const removeExperience = async (index) => {
    const ok = await confirmDelete("This experience will be removed.");
    if (!ok) return;

    setPortfolioData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index),
    }));

    if (editingExperienceIndex === index) {
      setEditingExperienceIndex(null);
      setExperienceForm({
        company: "",
        role: "",
        duration: "",
        description: "",
      });
    }

    showSuccess("Experience removed.");
  };

  const handleProjectChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProjectForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const startEditProject = (project) => {
    setProjectForm({
      name: project.name || "",
      slug: project.slug || "",
      type: project.type || "",
      shortDescription: project.shortDescription || "",
      fullDescription: project.fullDescription || "",
      tools: Array.isArray(project.tools) ? project.tools.join(", ") : "",
      coverImage: project.coverImage || "",
      images: Array.isArray(project.images) ? project.images : [],
      liveLink: project.liveLink || "",
      githubLink: project.githubLink || "",
      featured: Boolean(project.featured),
    });

    setEditingProjectId(project._id);
    setActiveSection("add-project");
  };

  const cancelEditProject = () => {
    setEditingProjectId(null);
    setProjectForm(defaultProjectForm);
  };

  const handleProjectCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingProjectCover(true);
      const url = await uploadImage(file);

      setProjectForm((prev) => ({
        ...prev,
        coverImage: url,
      }));

      showSuccess("Project cover uploaded.");
    } catch (error) {
      showError("Failed to upload project cover image.");
    } finally {
      setUploadingProjectCover(false);
    }
  };

  const handleProjectImagesUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    try {
      setUploadingProjectImages(true);
      const urls = await uploadMultipleImages(files);

      setProjectForm((prev) => ({
        ...prev,
        images: [...prev.images, ...urls],
      }));

      showSuccess("Project gallery images uploaded.");
    } catch (error) {
      showError("Failed to upload project gallery images.");
    } finally {
      setUploadingProjectImages(false);
    }
  };

  const removeProjectImage = async (index) => {
    const ok = await confirmDelete("This project image will be removed.");
    if (!ok) return;

    setProjectForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));

    showSuccess("Project image removed.");
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...projectForm,
        tools: projectForm.tools
          .split(",")
          .map((tool) => tool.trim())
          .filter(Boolean),
        images: projectForm.images,
      };

      if (editingProjectId) {
        const res = await axios.patch(
          `${API_URL}/api/projects/${editingProjectId}`,
          payload,
          { withCredentials: true }
        );

        showSuccess(res?.data?.message || "Project updated successfully.");
      } else {
        const res = await axios.post(`${API_URL}/api/projects`, payload, {
          withCredentials: true,
        });

        showSuccess(res?.data?.message || "Project created successfully.");
      }

      setProjectForm(defaultProjectForm);
      setEditingProjectId(null);
      await fetchProjects();
      setActiveSection("manage-project");
    } catch (error) {
      showError(error?.response?.data?.message || "Failed to save project.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    const ok = await confirmDelete("This project will be permanently removed.");
    if (!ok) return;

    try {
      setLoading(true);

      const res = await axios.delete(`${API_URL}/api/projects/${id}`, {
        withCredentials: true,
      });

      showSuccess(res?.data?.message || "Project deleted successfully.");
      await fetchProjects();
    } catch (error) {
      showError(error?.response?.data?.message || "Failed to delete project.");
    } finally {
      setLoading(false);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case "portfolio":
        return (
          <PortfolioSection
            handleSavePortfolio={handleSavePortfolio}
            labelClass={labelClass}
            inputClass={inputClass}
            portfolioData={portfolioData}
            handlePortfolioChange={handlePortfolioChange}
            loading={loading}
            message=""
            handleProfileUpload={handleProfileUpload}
            handleBannerUpload={handleBannerUpload}
            handleResumeUpload={handleResumeUpload}
            uploadingProfile={uploadingProfile}
            uploadingBanner={uploadingBanner}
            uploadingResume={uploadingResume}
          />
        );

      case "about":
        return (
          <AboutSection
            handleSavePortfolio={handleSavePortfolio}
            labelClass={labelClass}
            inputClass={inputClass}
            portfolioData={portfolioData}
            handlePortfolioChange={handlePortfolioChange}
            handleEducationChange={handleEducationChange}
            loading={loading}
            message=""
          />
        );

      case "skills":
        return (
          <SkillsSection
            labelClass={labelClass}
            inputClass={inputClass}
            skillForm={skillForm}
            setSkillForm={setSkillForm}
            addSkill={addSkill}
            portfolioData={portfolioData}
            removeSkill={removeSkill}
            startEditSkill={startEditSkill}
            editingSkillIndex={editingSkillIndex}
            handleSavePortfolio={handleSavePortfolio}
          />
        );

      case "certificates":
        return (
          <CertificateSection
            labelClass={labelClass}
            inputClass={inputClass}
            certificateForm={certificateForm}
            setCertificateForm={setCertificateForm}
            addCertificate={addCertificate}
            portfolioData={portfolioData}
            removeCertificate={removeCertificate}
            startEditCertificate={startEditCertificate}
            editingCertificateIndex={editingCertificateIndex}
            handleSavePortfolio={handleSavePortfolio}
            handleCertificateImageUpload={handleCertificateImageUpload}
            uploadingCertificateImage={uploadingCertificateImage}
            removeCertificateImage={removeCertificateImage}
          />
        );

      case "experience":
        return (
          <ExperienceSection
            labelClass={labelClass}
            inputClass={inputClass}
            experienceForm={experienceForm}
            setExperienceForm={setExperienceForm}
            addExperience={addExperience}
            portfolioData={portfolioData}
            removeExperience={removeExperience}
            startEditExperience={startEditExperience}
            editingExperienceIndex={editingExperienceIndex}
            handleSavePortfolio={handleSavePortfolio}
          />
        );

      case "contact":
        return (
          <ContactSection
            handleSavePortfolio={handleSavePortfolio}
            labelClass={labelClass}
            inputClass={inputClass}
            portfolioData={portfolioData}
            handleNestedChange={handleNestedChange}
            loading={loading}
            message=""
          />
        );

      case "add-project":
        return (
          <AddProjectSection
            labelClass={labelClass}
            inputClass={inputClass}
            projectForm={projectForm}
            handleProjectChange={handleProjectChange}
            handleCreateProject={handleCreateProject}
            handleProjectCoverUpload={handleProjectCoverUpload}
            handleProjectImagesUpload={handleProjectImagesUpload}
            removeProjectImage={removeProjectImage}
            uploadingProjectCover={uploadingProjectCover}
            uploadingProjectImages={uploadingProjectImages}
            loading={loading}
            editingProjectId={editingProjectId}
            cancelEditProject={cancelEditProject}
          />
        );

      case "manage-project":
        return (
          <ManageProjectSection
            projects={projects}
            handleDeleteProject={handleDeleteProject}
            startEditProject={startEditProject}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 pb-10 pt-28 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Manage portfolio content, contact info and projects.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-2xl bg-red-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
          >
            Logout
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <DashboardSidebar
            menuItems={menuItems}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            setMessage={() => {}}
          />

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;