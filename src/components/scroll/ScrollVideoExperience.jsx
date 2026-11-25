import { useEffect, useRef, useState } from "react";
import "./scroll-video.css";

// const VIDEO_SRC = "/videos/hi-fi-diagnostic-scroll-01.mp4";
const VIDEO_SRC = "https://pub-0041017a9f364df0955018fc3ffe74bd.r2.dev/hi-fi-diagnostic-journey-01.mp4";

const STAGES = [
  {
    progress: 0.0,
    title: "Patient Preparation",
    subtitle: "A comfortable beginning to your diagnostic journey.",
  },
  {
    progress: 0.12,
    title: "Medical Preparation",
    subtitle: "Professional care and preparation.",
  },
  {
    progress: 0.25,
    title: "Blood Collection",
    subtitle: "A careful and controlled collection process.",
  },
  {
    progress: 0.4,
    title: "Blood Sample Collection",
    subtitle: "Your sample is collected securely.",
  },
  {
    progress: 0.53,
    title: "Sample Tube Filling",
    subtitle: "The sample is transferred into the collection tube.",
  },
  {
    progress: 0.66,
    title: "Sample Storage",
    subtitle: "Secure handling of your blood sample.",
  },
  {
    progress: 0.78,
    title: "Laboratory Testing",
    subtitle: "Advanced diagnostic analysis.",
  },
  {
    progress: 0.89,
    title: "Report Generation",
    subtitle: "Your diagnostic results are prepared.",
  },
  {
    progress: 0.97,
    title: "Report Delivery",
    subtitle: "Your health report, delivered with care.",
  },
];

export default function ScrollVideoExperience() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const progressFillRef = useRef(null);
  const targetTimeRef = useRef(0);
  const frameRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const activeStage = STAGES.reduce(
    (active, stage) => (progress >= stage.progress ? stage : active),
    STAGES[0],
  );

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    let disposed = false;
    let rafId = null;

    const seekVideo = () => {
      if (
        disposed ||
        video.readyState < 2 ||
        video.seeking ||
        !Number.isFinite(video.duration)
      ) {
        return;
      }

      const target = Math.max(
        0,
        Math.min(video.duration - 0.05, targetTimeRef.current),
      );

      if (Math.abs(video.currentTime - target) > 0.08) {
        video.currentTime = target;
      }
    };

    const updateScrollProgress = () => {
      rafId = null;

      if (disposed) return;

      const rect = section.getBoundingClientRect();
      const maxScroll = section.offsetHeight - window.innerHeight;

      const nextProgress =
        maxScroll > 0 ? Math.max(0, Math.min(1, -rect.top / maxScroll)) : 0;

      targetTimeRef.current = Number.isFinite(video.duration)
        ? nextProgress * Math.max(0, video.duration - 0.05)
        : 0;

      if (progressFillRef.current) {
        progressFillRef.current.style.width = `${nextProgress * 100}%`;
      }

      setProgress(nextProgress);
      seekVideo();
    };

    const requestUpdate = () => {
      if (rafId !== null) return;

      rafId = requestAnimationFrame(updateScrollProgress);
      frameRef.current = rafId;
    };

    const handleMetadata = () => {
      if (disposed) return;

      setDuration(video.duration || 0);
      setVideoReady(true);
      requestUpdate();
    };

    const handleSeeked = () => {
      if (disposed) return;

      // If another scroll occurred during seeking,
      // catch up to the latest requested video time.
      if (Math.abs(video.currentTime - targetTimeRef.current) > 0.08) {
        seekVideo();
      }
    };

    const handleError = () => {
      if (disposed) return;

      setVideoError(true);
      console.error("Video loading error:", video.error);
    };

    video.pause();
    video.muted = true;
    video.playsInline = true;

    video.addEventListener("loadedmetadata", handleMetadata);
    video.addEventListener("loadeddata", requestUpdate);
    video.addEventListener("seeked", handleSeeked);
    video.addEventListener("error", handleError);

    window.addEventListener("scroll", requestUpdate, {
      passive: true,
    });

    window.addEventListener("resize", requestUpdate);

    if (video.readyState >= 1) {
      handleMetadata();
    }

    requestUpdate();

    return () => {
      disposed = true;

      video.removeEventListener("loadedmetadata", handleMetadata);
      video.removeEventListener("loadeddata", requestUpdate);
      video.removeEventListener("seeked", handleSeeked);
      video.removeEventListener("error", handleError);

      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);

      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
        frameRef.current = null;
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="scroll-video-track"
      aria-label="Hi-Fi Diagnostic patient journey"
    >
      <div className="scroll-video-sticky">
        <video
          ref={videoRef}
          className="scroll-video-element"
          src={VIDEO_SRC}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-label="Blood collection and laboratory testing journey"
        />

        <div className="scroll-video-overlay" />

        <header className="scroll-video-header">
          <span className="scroll-video-brand">HI-FI DIAGNOSTIC</span>
          <span className="scroll-video-tag">YOUR HEALTH. OUR PRIORITY.</span>
        </header>

        <div className="scroll-video-content">
          {!videoReady && !videoError && (
            <p className="scroll-video-loading">
              Loading medical experience...
            </p>
          )}

          {videoError && (
            <p className="scroll-video-loading">
              Unable to load video. Please check the video file.
            </p>
          )}

          <div className="scroll-video-caption" key={activeStage.title}>
            <span className="scroll-video-step">
              PATIENT JOURNEY /{" "}
              {String(STAGES.indexOf(activeStage) + 1).padStart(2, "0")}
            </span>

            <h2>{activeStage.title}</h2>
            <p>{activeStage.subtitle}</p>
          </div>
        </div>

        <footer className="scroll-video-footer">
          <div className="scroll-video-progress">
            <div
              ref={progressFillRef}
              className="scroll-video-progress-fill"
              style={{ width: "0%" }}
            />
          </div>

          <div className="scroll-video-footer-info">
            <span>SCROLL TO EXPLORE</span>
            <span>{Math.round(progress * 100)}%</span>
          </div>
        </footer>

        <div className="scroll-video-scroll-hint">
          <span>SCROLL DOWN</span>
          <span className="scroll-video-arrow">↓</span>
        </div>
      </div>

      <span className="sr-only">
        Video duration: {Math.round(duration)} seconds. Scroll to control
        playback.
      </span>
    </section>
  );
}
