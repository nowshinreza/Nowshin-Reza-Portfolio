import { useEffect, useMemo, useState } from "react";

const ProjectGallery = ({ coverImage = "", images = [], title = "Project" }) => {
  const [openViewer, setOpenViewer] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const mergedImages = useMemo(() => {
    const all = [coverImage, ...(Array.isArray(images) ? images : [])].filter(Boolean);

    return [...new Set(all)];
  }, [coverImage, images]);

  const previewImages = mergedImages.slice(0, 50);
  const extraCount = mergedImages.length - 5;

  const openAt = (index) => {
    setActiveIndex(index);
    setOpenViewer(true);
  };

  const closeViewer = () => {
    setOpenViewer(false);
  };

  const showPrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? mergedImages.length - 1 : prev - 1
    );
  };

  const showNext = () => {
    setActiveIndex((prev) =>
      prev === mergedImages.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    if (!openViewer) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeViewer();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [openViewer, mergedImages.length]);

  if (!mergedImages.length) return null;

  if (mergedImages.length === 1) {
    return (
      <>
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <button
            type="button"
            onClick={() => openAt(0)}
            className="block w-full"
          >
            <img
              src={mergedImages[0]}
              alt={title}
              className="h-[260px] w-full object-cover transition duration-300 hover:scale-[1.02] md:h-[460px]"
            />
          </button>
        </div>

        {openViewer && (
          <div className="fixed inset-0 z-[9999] bg-black/95">
            <button
              type="button"
              onClick={closeViewer}
              className="absolute right-4 top-4 z-20 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
            >
              Close
            </button>

            <div className="flex h-full w-full items-center justify-center p-4 md:p-10">
              <img
                src={mergedImages[activeIndex]}
                alt={`${title}-${activeIndex + 1}`}
                className="max-h-full max-w-full rounded-2xl object-contain"
              />
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-2 p-2 md:grid-cols-2 md:grid-rows-2">
          <button
            type="button"
            onClick={() => openAt(0)}
            className="group relative overflow-hidden rounded-[22px] md:row-span-2"
          >
            <img
              src={previewImages[0]}
              alt={`${title}-0`}
              className="h-[240px] w-full object-cover transition duration-300 group-hover:scale-105 md:h-full"
            />
          </button>

          {previewImages[1] && (
            <button
              type="button"
              onClick={() => openAt(1)}
              className="group relative overflow-hidden rounded-[22px]"
            >
              <img
                src={previewImages[1]}
                alt={`${title}-1`}
                className="h-[116px] w-full object-cover transition duration-300 group-hover:scale-105 md:h-[224px]"
              />
            </button>
          )}

          <div className="grid grid-cols-3 gap-2">
            {previewImages.slice(2, 50).map((img, idx) => {
              const realIndex = idx + 2;
              const isLastVisible = realIndex === 4 && extraCount > 0;

              return (
                <button
                  key={realIndex}
                  type="button"
                  onClick={() => openAt(realIndex)}
                  className="group relative overflow-hidden rounded-[18px]"
                >
                  <img
                    src={img}
                    alt={`${title}-${realIndex}`}
                    className="h-[116px] w-full object-cover transition duration-300 group-hover:scale-105 md:h-[224px]"
                  />

                  {isLastVisible && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/55 text-lg font-bold text-white">
                      +{extraCount}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {openViewer && (
        <div className="fixed inset-0 z-[9999] bg-black/95">
          <button
            type="button"
            onClick={closeViewer}
            className="absolute right-4 top-4 z-20 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
          >
            Close
          </button>

          {mergedImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={showPrev}
                className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 px-4 py-3 text-2xl font-bold text-white backdrop-blur hover:bg-white/20"
              >
                ‹
              </button>

              <button
                type="button"
                onClick={showNext}
                className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 px-4 py-3 text-2xl font-bold text-white backdrop-blur hover:bg-white/20"
              >
                ›
              </button>
            </>
          )}

          <div className="flex h-full w-full items-center justify-center p-4 md:p-10">
            <img
              src={mergedImages[activeIndex]}
              alt={`${title}-${activeIndex + 1}`}
              className="max-h-full max-w-full rounded-2xl object-contain"
            />
          </div>

          {mergedImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 overflow-x-auto rounded-2xl bg-white/10 px-3 py-2 backdrop-blur">
              {mergedImages.map((img, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`overflow-hidden rounded-xl border-2 ${
                    activeIndex === index
                      ? "border-white"
                      : "border-transparent opacity-70"
                  }`}
                >
                  <img
                    src={img}
                    alt={`thumb-${index}`}
                    className="h-14 w-14 object-cover md:h-16 md:w-16"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProjectGallery;