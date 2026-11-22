import { useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles, Target, Clock } from "lucide-react";

const slides = [
  {
    id: 1,
    tag: "FOCUS NOTES · 1 OF 3",
    title: "Plan your day with clear priorities",
    description:
      "Start with high-impact tasks first and keep your active workload limited to three key deliverables.",
    icon: Target,
    theme: "slide-indigo",
  },
  {
    id: 2,
    tag: "FOCUS NOTES · 2 OF 3",
    title: "Break complex work into small steps",
    description:
      "Move tasks steadily from To do to In progress and Completed to maintain visible momentum.",
    icon: Clock,
    theme: "slide-emerald",
  },
  {
    id: 3,
    tag: "FOCUS NOTES · 3 OF 3",
    title: "Review progress before wrapping up",
    description:
      "Audit upcoming deadlines, clear completed items, and set tomorrow's top priority before signing off.",
    icon: Sparkles,
    theme: "slide-amber",
  },
];

export default function FocusNotes() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const currentSlide = slides[activeIndex];
  const SlideIcon = currentSlide.icon;

  return (
    <section className={`focus-carousel ${currentSlide.theme}`} aria-label="Focus Notes Carousel">
      <div className="carousel-content">
        <div className="carousel-badge-row">
          <span className="carousel-icon-wrap">
            <SlideIcon size={16} />
          </span>
          <span className="carousel-tag">{currentSlide.tag}</span>
        </div>
        <h2 className="carousel-title">{currentSlide.title}</h2>
        <p className="carousel-desc">{currentSlide.description}</p>
      </div>

      <div className="carousel-controls">
        <div className="carousel-indicators" role="tablist" aria-label="Focus Notes Slides">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              aria-label={`Go to slide ${index + 1}`}
              className={`indicator-dot ${activeIndex === index ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>

        <div className="carousel-nav-btns">
          <button
            type="button"
            className="carousel-btn"
            onClick={handlePrev}
            aria-label="Previous focus note"
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>
          <button
            type="button"
            className="carousel-btn"
            onClick={handleNext}
            aria-label="Next focus note"
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}