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
  return (
    <div className="space-y-12">

      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          Certificates
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Add certificate name, issuer, images and credential link.
        </p>
      </div>

      {/* FORM */}
      <div className="rounded-3xl border border-slate-200 bg-white/60 p-6 shadow-xl backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/40">

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
            />
          </div>

        </div>

        <button
          type="button"
          onClick={addCertificate}
          className="mt-6 rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-900 dark:bg-white dark:text-slate-900"
        >
          {editingCertificateIndex !== null
            ? "Update Certificate"
            : "Add Certificate"}
        </button>
      </div>

      {/* CARDS */}
      <div className="space-y-10">

        {(portfolioData?.certificates || []).length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
            No certificates added yet.
          </div>
        ) : (
          portfolioData.certificates.map((certificate, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white/60 shadow-2xl backdrop-blur-xl transition hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-900/40"
            >

              {/* FULL BLUR BACKGROUND */}
              <div className="absolute inset-0">
                {certificate.images?.[0] && (
                  <img
                    src={certificate.images[0]}
                    alt={certificate.name}
                    className="h-full w-full object-cover scale-125 blur-3xl opacity-70"
                  />
                )}
                <div className="absolute inset-0 bg-black/50" />
              </div>

              {/* CENTER CONTENT */}
              <div className="relative z-10 flex min-h-[260px] flex-col items-center justify-center text-center px-6">

                {/* BIG TITLE */}
                <h3 className="text-3xl font-bold tracking-tight text-white drop-shadow-lg sm:text-4xl">
                  {certificate.name}
                </h3>

                {/* ISSUER */}
                <p className="mt-3 text-sm font-medium text-slate-200">
                  {certificate.issuer}
                </p>

                {/* LINK */}
                {certificate.credentialLink && (
                  <a
                    href={certificate.credentialLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 text-sm font-semibold text-blue-300 hover:text-blue-200 underline"
                  >
                    View Credential
                  </a>
                )}

                {/* ACTIONS */}
                <div className="mt-6 flex gap-3">

                  <button
                    onClick={() => startEditCertificate(index)}
                    className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => removeCertificate(index)}
                    className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>
          ))
        )}

      </div>

      {/* SAVE */}
      <button
        onClick={handleSavePortfolio}
        className="mt-6 rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-900 dark:bg-white dark:text-slate-900"
      >
        Save Certificates
      </button>

    </div>
  );
};

export default CertificateSection;