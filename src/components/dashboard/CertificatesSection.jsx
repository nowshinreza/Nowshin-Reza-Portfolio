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
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Certificates
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
          Add your certificate name, issuer, image, and credential link in a
          clean and professional way.
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
              type="file"
              multiple
              accept="image/*"
              onChange={handleCertificateImageUpload}
              className="w-full rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            />

            {uploadingCertificateImage && (
              <p className="mt-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                Uploading certificate image...
              </p>
            )}

            {certificateForm.images?.length > 0 && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {certificateForm.images.map((img, index) => (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-700 dark:bg-slate-900"
                  >
                    <img
                      src={img}
                      alt={`Certificate ${index + 1}`}
                      className="h-36 w-full rounded-xl object-contain bg-slate-100 dark:bg-slate-800"
                    />

                    <button
                      type="button"
                      onClick={() => removeCertificateImage(index)}
                      className="absolute right-3 top-3 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white shadow hover:bg-red-500"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={addCertificate}
          className="mt-6 inline-flex rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
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
          portfolioData.certificates.map((certificate, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-[30px] border border-slate-200/80 bg-white/85 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 dark:border-slate-700/70 dark:bg-slate-900/55"
            >
              <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-4">
                  {certificate.images?.[0] && (
                    <div className="h-20 w-28 flex-shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-md dark:border-slate-700 dark:bg-slate-800">
                      <img
                        src={certificate.images[0]}
                        alt={certificate.name}
                        className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="min-w-0">
                    <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
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
                        className="mt-3 inline-flex text-sm font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        View Credential
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 sm:justify-end">
                  <button
                    type="button"
                    onClick={() => startEditCertificate(index)}
                    className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 transition-all duration-300 hover:scale-[1.03] hover:bg-amber-100 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300 dark:hover:bg-amber-500/20"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => removeCertificate(index)}
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition-all duration-300 hover:scale-[1.03] hover:bg-red-100 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/20"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <button
        type="button"
        onClick={handleSavePortfolio}
        className="inline-flex rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
      >
        Save Certificates
      </button>
    </div>
  );
};

export default CertificateSection;