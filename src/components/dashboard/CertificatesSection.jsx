import { useRef } from "react";

const CertificateSection = ({
  labelClass,
  inputClass,
  certificateForm,
  setCertificateForm,
  addCertificate,
  portfolioData,
  removeCertificate,
  startEditCertificate,
  editingCertificateIndex,
  handleSavePortfolio,
  handleCertificateImageUpload,
  uploadingCertificateImage,
  removeCertificateImage,
}) => {
  const fileRef = useRef(null);

  const getImage = (certificate) =>
    certificate?.image || certificate?.images?.[0] || "";

  const clearFileInput = () => {
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleAddCertificate = () => {
    addCertificate();
    clearFileInput();
  };

  const handleEditCertificate = (index) => {
    const certificate = portfolioData.certificates[index];
    const image = getImage(certificate);

    setCertificateForm({
      name: certificate.name || "",
      issuer: certificate.issuer || "",
      image,
      images: Array.isArray(certificate.images)
        ? certificate.images
        : image
        ? [image]
        : [],
      credentialLink: certificate.credentialLink || "",
    });

    startEditCertificate(index);
    clearFileInput();
  };

  const handleSaveCertificates = (e) => {
    if (Array.isArray(portfolioData.certificates)) {
      portfolioData.certificates.forEach((certificate) => {
        const image = getImage(certificate);

        certificate.image = image;
        certificate.images = Array.isArray(certificate.images)
          ? certificate.images
          : image
          ? [image]
          : [];
      });
    }

    handleSavePortfolio(e);
  };

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Certificates
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
          Add your certificate name, issuer, image, and credential link.
        </p>
      </div>

      <div className="rounded-[28px] border border-slate-200/80 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/50">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>Certificate Name</label>
            <input
              type="text"
              value={certificateForm.name}
              onChange={(e) =>
                setCertificateForm((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              className={inputClass}
              placeholder="e.g. Machine Learning Specialization"
            />
          </div>

          <div>
            <label className={labelClass}>Issuer</label>
            <input
              type="text"
              value={certificateForm.issuer}
              onChange={(e) =>
                setCertificateForm((prev) => ({
                  ...prev,
                  issuer: e.target.value,
                }))
              }
              className={inputClass}
              placeholder="e.g. Coursera"
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Credential Link</label>
            <input
              type="text"
              value={certificateForm.credentialLink}
              onChange={(e) =>
                setCertificateForm((prev) => ({
                  ...prev,
                  credentialLink: e.target.value,
                }))
              }
              className={inputClass}
              placeholder="https://..."
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Certificate Image</label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleCertificateImageUpload}
              className={inputClass}
            />

            {uploadingCertificateImage && (
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Uploading certificate image...
              </p>
            )}

            {certificateForm.images?.length > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
                {certificateForm.images.map((img, index) => (
                  <div key={`${img}-${index}`} className="relative">
                    <img
                      src={img}
                      alt={`certificate-${index}`}
                      className="h-24 w-full rounded-2xl border border-slate-200 object-cover dark:border-slate-700"
                    />

                    <button
                      type="button"
                      onClick={() => removeCertificateImage(index)}
                      className="absolute right-2 top-2 rounded-lg bg-red-500 px-2 py-1 text-xs font-medium text-white"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddCertificate}
          className="mt-6 inline-flex rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
        >
          {editingCertificateIndex !== null
            ? "Update Certificate"
            : "Add Certificate"}
        </button>
      </div>

      <div className="space-y-6">
        {(portfolioData?.certificates || []).length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 p-6 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-400">
            No certificates added yet.
          </div>
        ) : (
          portfolioData.certificates.map((certificate, index) => {
            const certificateImage = getImage(certificate);

            return (
              <div
                key={`${certificate.name}-${index}`}
                className="group rounded-[30px] border border-slate-200/80 bg-white/85 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 dark:border-slate-700/70 dark:bg-slate-900/55"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-center gap-4">
                    {certificateImage ? (
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl border bg-slate-100 shadow-md dark:border-slate-700 dark:bg-slate-800">
                        <img
                          src={certificateImage}
                          alt={certificate.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl border bg-slate-100 text-[10px] text-slate-400 dark:border-slate-700 dark:bg-slate-800">
                        No image
                      </div>
                    )}

                    <div className="min-w-0">
                      <h3 className="truncate text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
                        {certificate.name}
                      </h3>

                      {certificate.issuer && (
                        <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-400">
                          {certificate.issuer}
                        </p>
                      )}

                      {certificate.credentialLink && (
                        <a
                          href={certificate.credentialLink}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-flex text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                        >
                          View Credential
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 sm:justify-end">
                    <button
                      type="button"
                      onClick={() => handleEditCertificate(index)}
                      className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 hover:bg-amber-100 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => removeCertificate(index)}
                      className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <button
        type="button"
        onClick={handleSaveCertificates}
        className="inline-flex rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
      >
        Save Certificates
      </button>
    </div>
  );
};

export default CertificateSection;