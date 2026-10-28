import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  Shield,
  Layers,
  Sparkles,
  CheckCircle2,
  BarChart2,
  ArrowRight,
  Zap,
} from "lucide-react";
import { PlatformFlowConfig } from "./types";

interface InteractivePlatformFlowProps {
  config: PlatformFlowConfig;
  className?: string;
}

// Vibrant sharp green (more green, razor-sharp, no fuzzy shadow)
const FLOW_GREEN = "#00c853";

export function InteractivePlatformFlow({
  config,
  className = "",
}: InteractivePlatformFlowProps) {
  // Reveal Stages:
  // 0: First Card: Central Platform Header reveals & glows Electric Blue
  // 1: Left Input & Right Output Cards reveal with 90° flowing conduits & glow Green
  // 2: Platform Facilities reveals with vertical conduit & glows Cyan
  // 3: myHelm Governance reveals with vertical conduit & glows Amber
  // 4: Orchestrator reveals with vertical conduit & glows Purple
  // 5: Below All Cards: Fixed Agents Lane reveals & each agent card glows in its icon color
  // 6: Final Sign-off / Complete Harmony State (all cards resting with #38bdf8 border)
  const TOTAL_STAGES = 6;
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const upperFlowRef = useRef<HTMLDivElement | null>(null);
  const card1Ref = useRef<HTMLDivElement | null>(null);
  const leftCardRef = useRef<HTMLDivElement | null>(null);
  const rightCardRef = useRef<HTMLDivElement | null>(null);

  interface LineCoords {
    leftStart: { x: number; y: number };
    leftCorner: { x: number; y: number };
    leftTarget: { x: number; y: number };
    rightStart: { x: number; y: number };
    rightCorner: { x: number; y: number };
    rightTarget: { x: number; y: number };
  }
  const [lineCoords, setLineCoords] = useState<LineCoords | null>(null);

  const [activeStage, setActiveStage] = useState<number>(0);
  const [linesMet, setLinesMet] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Trigger green glow on left & right cards exactly when green conduit reaches them
  useEffect(() => {
    if (activeStage === 1) {
      setLinesMet(false);
      const timer = setTimeout(() => {
        setLinesMet(true);
      }, 400); // Syncs with 450ms SVG path travel duration
      return () => clearTimeout(timer);
    } else if (activeStage > 1) {
      setLinesMet(true);
    } else {
      setLinesMet(false);
    }
  }, [activeStage]);

  // Trigger flow progression when the user scrolls into this section
  useEffect(() => {
    if (hasStarted) return;
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setHasStarted(true);
          setActiveStage(0);
          setIsPlaying(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [hasStarted]);

  // Auto-progression timer (plays through all stages smoothly, then stops at final state)
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    const stageDuration =
      activeStage === 0
        ? 1400
        : activeStage === 1
        ? 2000
        : activeStage === 5
        ? 2800
        : 1500;

    timerRef.current = setTimeout(() => {
      setActiveStage((prev) => {
        if (prev < TOTAL_STAGES) {
          const next = prev + 1;
          if (next >= TOTAL_STAGES) {
            setIsPlaying(false);
          }
          return next;
        } else {
          setIsPlaying(false);
          return prev;
        }
      });
    }, stageDuration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, activeStage, TOTAL_STAGES]);

  // Dynamic SVG Conduit Measurements
  const updateLineCoords = () => {
    if (
      !upperFlowRef.current ||
      !card1Ref.current ||
      !leftCardRef.current ||
      !rightCardRef.current
    ) {
      return;
    }
    const containerRect = upperFlowRef.current.getBoundingClientRect();
    const card1Rect = card1Ref.current.getBoundingClientRect();
    const leftCardRect = leftCardRef.current.getBoundingClientRect();
    const rightCardRect = rightCardRef.current.getBoundingClientRect();

    // Card 1 mid Y (vertical center of Card 1)
    const card1MidY = card1Rect.top - containerRect.top + card1Rect.height / 2;

    // Left card top-center
    const leftTopX =
      leftCardRect.left - containerRect.left + leftCardRect.width / 2;
    const leftTopY = leftCardRect.top - containerRect.top;

    // Right card top-center
    const rightTopX =
      rightCardRect.left - containerRect.left + rightCardRect.width / 2;
    const rightTopY = rightCardRect.top - containerRect.top;

    // Card 1 left & right horizontal anchors
    const card1LeftX = card1Rect.left - containerRect.left;
    const card1RightX = card1Rect.right - containerRect.left;

    setLineCoords({
      leftStart: { x: card1LeftX, y: card1MidY },
      leftCorner: { x: leftTopX, y: card1MidY },
      leftTarget: { x: leftTopX, y: leftTopY },
      rightStart: { x: card1RightX, y: card1MidY },
      rightCorner: { x: rightTopX, y: card1MidY },
      rightTarget: { x: rightTopX, y: rightTopY },
    });
  };

  useEffect(() => {
    const update = () => updateLineCoords();
    update();
    const timer = setTimeout(update, 60);
    const el = upperFlowRef.current;
    let ro: ResizeObserver | null = null;
    if (el && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => update());
      ro.observe(el);
    }
    window.addEventListener("resize", update);
    return () => {
      clearTimeout(timer);
      if (ro) ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const CORNER_R = 14;
  const getLeftPath = (coords: LineCoords) => {
    const { leftStart, leftCorner, leftTarget } = coords;
    return `M ${leftStart.x} ${leftStart.y} L ${leftCorner.x + CORNER_R} ${leftCorner.y} Q ${leftCorner.x} ${leftCorner.y} ${leftCorner.x} ${leftCorner.y + CORNER_R} L ${leftTarget.x} ${leftTarget.y}`;
  };

  const getRightPath = (coords: LineCoords) => {
    const { rightStart, rightCorner, rightTarget } = coords;
    return `M ${rightStart.x} ${rightStart.y} L ${rightCorner.x - CORNER_R} ${rightCorner.y} Q ${rightCorner.x} ${rightCorner.y} ${rightCorner.x} ${rightCorner.y + CORNER_R} L ${rightTarget.x} ${rightTarget.y}`;
  };

  const handleTogglePause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleReplay = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setLinesMet(false);
    setActiveStage(0);
    setHasStarted(true);
    setIsPlaying(true);
  };

  const handleJumpToStage = (stageIdx: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setHasStarted(true);
    setActiveStage(stageIdx);
    if (stageIdx === 1) {
      setLinesMet(true);
    }
    setIsPlaying(false);
  };

  // Status badge copy
  const getStatusText = () => {
    switch (activeStage) {
      case 0:
        return `Step 1: ${config.platformStack.platformName} Initialized`;
      case 1:
        return `Step 2: Input & Output Connected via Flowing Pipelines`;
      case 2:
        return `Step 3: ${config.platformStack.facilitiesTitle} Online`;
      case 3:
        return `Step 4: ${config.platformStack.helmTitle} Security & Policy Verified`;
      case 4:
        return `Step 5: ${config.platformStack.orchestratorTitle} Coordinating`;
      case 5:
        return `Step 6: ${config.agentsTitle} Active`;
      case 6:
        return `Final State: ${config.finalStateBadge} ✓ Governed End to End`;
      default:
        return "Operating Model Ready";
    }
  };

  // Icons
  const InputIcon = config.input.icon;
  const OutputIcon = config.output.icon;
  const PlatformIcon = config.platformStack.platformIcon;
  const FacilitiesIcon = config.platformStack.facilitiesIcon;
  const HelmIcon = config.platformStack.helmIcon;
  const OrchestratorIcon = config.platformStack.orchestratorIcon;

  // Reveal condition flags: 1st Card is always visible initially; remaining cards reveal step by step
  const isPlatformHeaderRevealed = true;
  const isLeftRightRevealed = activeStage >= 1;
  const isFacilitiesRevealed = activeStage >= 2;
  const isHelmRevealed = activeStage >= 3;
  const isOrchestratorRevealed = activeStage >= 4;
  const isAgentsRevealed = activeStage >= 5;

  // Global resting border & shadow tokens (consistent light-blue elevated cards)
  const RESTING_BORDER = "#38bdf8";
  const RESTING_SHADOW =
    "0 4px 16px rgba(2, 132, 199, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)";

  const RESTING_STYLE: React.CSSProperties = {
    borderWidth: "1.5px",
    borderStyle: "solid",
    borderColor: RESTING_BORDER,
    boxShadow: RESTING_SHADOW,
    transform: "translateY(0)",
    transition:
      "opacity 0.4s ease, transform 0.4s ease, border-color 0.35s ease, box-shadow 0.35s ease",
  };

  const getCardStyle = (
    isRevealed: boolean,
    isActive: boolean,
    hex: string,
    glow: string
  ): React.CSSProperties => {
    if (!isRevealed) {
      return {
        borderWidth: "1.5px",
        borderStyle: "solid",
        borderColor: RESTING_BORDER,
        boxShadow: RESTING_SHADOW,
        opacity: 0,
        transform: "translateY(12px)",
        pointerEvents: "none",
        transition:
          "opacity 0.4s ease, transform 0.4s ease, border-color 0.35s ease, box-shadow 0.35s ease",
      };
    }

    if (isActive) {
      return {
        borderWidth: "1.5px",
        borderStyle: "solid",
        borderColor: hex,
        boxShadow: `0 0 14px ${glow}, 0 2px 8px rgba(0, 0, 0, 0.04)`,
        opacity: 1,
        transform: "translateY(0)",
        pointerEvents: "auto",
        transition:
          "opacity 0.4s ease, transform 0.4s ease, border-color 0.35s ease, box-shadow 0.35s ease",
      };
    }

    // Revealed & Resting
    return {
      borderWidth: "1.5px",
      borderStyle: "solid",
      borderColor: RESTING_BORDER,
      boxShadow: RESTING_SHADOW,
      opacity: 1,
      transform: "translateY(0)",
      pointerEvents: "auto",
      transition:
        "opacity 0.4s ease, transform 0.4s ease, border-color 0.35s ease, box-shadow 0.35s ease",
    };
  };

  // Dynamic Agent Color Resolver (resolves exact hex color and refined soft glow)
  const getAgentColor = (agent: any) => {
    const colorStr = `${agent.iconColor || ""} ${agent.iconBg || ""} ${
      agent.borderColor || ""
    }`.toLowerCase();

    if (colorStr.includes("rose") || colorStr.includes("red")) {
      return {
        hex: "#f43f5e",
        glow: "rgba(244, 63, 94, 0.4)",
        restingBg: "bg-rose-50 text-rose-600 border border-rose-200",
      };
    }
    if (colorStr.includes("teal")) {
      return {
        hex: "#0d9488",
        glow: "rgba(13, 148, 136, 0.4)",
        restingBg: "bg-teal-50 text-teal-600 border border-teal-200",
      };
    }
    if (colorStr.includes("purple") || colorStr.includes("violet")) {
      return {
        hex: "#9333ea",
        glow: "rgba(147, 51, 234, 0.4)",
        restingBg: "bg-purple-50 text-purple-600 border border-purple-200",
      };
    }
    if (
      colorStr.includes("amber") ||
      colorStr.includes("yellow") ||
      colorStr.includes("orange")
    ) {
      return {
        hex: "#f59e0b",
        glow: "rgba(245, 158, 11, 0.4)",
        restingBg: "bg-amber-50 text-amber-600 border border-amber-200",
      };
    }
    if (colorStr.includes("indigo")) {
      return {
        hex: "#6366f1",
        glow: "rgba(99, 102, 241, 0.4)",
        restingBg: "bg-indigo-50 text-indigo-600 border border-indigo-200",
      };
    }
    if (colorStr.includes("cyan")) {
      return {
        hex: "#06b6d4",
        glow: "rgba(6, 182, 212, 0.4)",
        restingBg: "bg-cyan-50 text-cyan-600 border border-cyan-200",
      };
    }
    if (colorStr.includes("emerald") || colorStr.includes("green")) {
      return {
        hex: "#10b981",
        glow: "rgba(16, 185, 129, 0.4)",
        restingBg: "bg-emerald-50 text-emerald-600 border border-emerald-200",
      };
    }
    if (colorStr.includes("blue")) {
      return {
        hex: "#145BFF",
        glow: "rgba(20, 91, 255, 0.4)",
        restingBg: "bg-blue-50 text-blue-600 border border-blue-200",
      };
    }
    // Default Sky
    return {
      hex: "#0284c7",
      glow: "rgba(2, 132, 199, 0.4)",
      restingBg: "bg-sky-50 text-sky-600 border border-sky-200",
    };
  };

  // Card Render Helpers
  const renderInputCard = (cardRef?: React.Ref<HTMLDivElement>) => {
    const isInputActive = activeStage === 1 && linesMet;

    return (
      <div
        ref={cardRef}
        style={getCardStyle(
          isLeftRightRevealed,
          isInputActive,
          "#00c853",
          "rgba(0, 200, 83, 0.45)"
        )}
        className="w-full rounded-2xl bg-white p-4 sm:p-5 text-center flex flex-col items-center justify-between min-h-[220px] z-10"
      >
        {/* Icon Badge - Steady, consistent styling */}
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl mb-2.5 bg-sky-50 text-[#0284c7] border border-sky-300 shadow-xs">
          <InputIcon className="h-6 w-6" />
        </div>

        <div className="mb-2">
          <h3 className="font-bold text-base text-[#0B1638] mb-1">
            {config.input.title}
          </h3>
          {config.input.desc && (
            <p className="text-xs text-[#475569] leading-relaxed max-w-[210px] mx-auto font-normal">
              {config.input.desc}
            </p>
          )}
          {config.input.items && (
            <div className="flex flex-col gap-1 mt-2 text-left w-full px-2">
              {config.input.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 text-[11px] text-[#475569]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0284c7]" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pill */}
        <span className="inline-block rounded-full px-3.5 py-1 text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-300">
          {config.input.badge}
        </span>
      </div>
    );
  };

  const renderOutputCard = (cardRef?: React.Ref<HTMLDivElement>) => {
    const isOutputActive = activeStage === 1 && linesMet;

    return (
      <div
        ref={cardRef}
        style={getCardStyle(
          isLeftRightRevealed,
          isOutputActive,
          "#00c853",
          "rgba(0, 200, 83, 0.45)"
        )}
        className="w-full rounded-2xl bg-white p-4 sm:p-5 text-center flex flex-col items-center justify-between min-h-[220px] z-10"
      >
        {/* Icon Badge - Steady, consistent styling */}
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl mb-2.5 bg-emerald-50 text-[#00c853] border border-emerald-300 shadow-xs">
          <OutputIcon className="h-6 w-6" />
        </div>

        <div className="mb-2">
          <h3 className="font-bold text-base text-[#0B1638] mb-1">
            {config.output.title}
          </h3>
          {config.output.desc && (
            <p className="text-xs text-[#475569] leading-relaxed max-w-[210px] mx-auto font-normal">
              {config.output.desc}
            </p>
          )}
          {config.output.items && (
            <div className="flex flex-col gap-1 mt-2 text-left w-full px-2">
              {config.output.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 text-[11px] text-[#475569]"
                >
                  <CheckCircle2 className="h-3 w-3 shrink-0 text-[#00c853]" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pill */}
        <span className="inline-block rounded-full px-3.5 py-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-300">
          {config.output.badge}
        </span>
      </div>
    );
  };

  const renderCard1 = (cardRef?: React.Ref<HTMLDivElement>) => {
    const isCard1Active = activeStage === 0;

    return (
      <div
        ref={cardRef}
        style={getCardStyle(
          true,
          isCard1Active,
          "#145BFF",
          "rgba(20, 91, 255, 0.4)"
        )}
        className="w-full rounded-2xl bg-white px-4 py-3 sm:py-3.5 text-center flex items-center justify-between min-h-[76px] h-[76px] z-10"
      >
        <div className="flex items-center gap-3.5 text-left">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-xs bg-[#145BFF] shrink-0">
            <PlatformIcon className="h-6 w-6" />
          </div>
          <div className="flex flex-col justify-center">
            <h3
              style={{ margin: 0, padding: 0 }}
              className="font-extrabold text-base sm:text-lg text-[#0B1638] leading-tight"
            >
              {config.platformStack.platformName}
            </h3>
            <p
              style={{ margin: 0, padding: 0, marginTop: "2px" }}
              className="text-xs text-sky-700 font-semibold leading-normal"
            >
              {config.platformStack.platformTagline}
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-flex rounded-full bg-sky-50 border border-sky-300 px-3 py-1 text-[10px] font-bold text-sky-800 tracking-wider uppercase">
          Core Platform
        </span>
      </div>
    );
  };

  // Sharp, thin vertical connector line without shadow or arrow tip
  const renderVerticalConnector = (isRevealed: boolean) => (
    <div className="flex flex-col items-center justify-center my-1 h-7 relative w-full overflow-hidden">
      <div className="w-[1.5px] h-full bg-slate-300" />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isRevealed ? 1 : 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{ transformOrigin: "top" }}
        className="absolute top-0 w-[1.75px] h-full bg-[#00c853] rounded-full"
      />
    </div>
  );

  const renderCard2 = () => {
    const isCard2Active = activeStage === 2;

    return (
      <div
        style={getCardStyle(
          isFacilitiesRevealed,
          isCard2Active,
          "#0ea5e9",
          "rgba(14, 165, 233, 0.4)"
        )}
        className="w-full rounded-2xl bg-white p-3.5 text-left flex items-center gap-3.5 min-h-[68px] h-[68px] z-10"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl shrink-0 bg-sky-50 text-[#0ea5e9] border border-sky-200 shadow-xs">
          <FacilitiesIcon className="h-5 w-5" />
        </div>
        <div className="flex flex-col justify-center">
          <h4
            style={{ margin: 0, padding: 0 }}
            className="font-bold text-sm text-[#0B1638] leading-tight"
          >
            {config.platformStack.facilitiesTitle}
          </h4>
          <p
            style={{ margin: 0, padding: 0, marginTop: "2px" }}
            className="text-xs text-[#475569] font-normal leading-normal"
          >
            {config.platformStack.facilitiesDesc}
          </p>
        </div>
      </div>
    );
  };

  const renderCard3 = () => {
    const isCard3Active = activeStage === 3;

    return (
      <div
        style={getCardStyle(
          isHelmRevealed,
          isCard3Active,
          "#f59e0b",
          "rgba(245, 158, 11, 0.4)"
        )}
        className="w-full rounded-2xl bg-white p-3.5 text-left flex items-center justify-between min-h-[68px] h-[68px] z-10"
      >
        <div className="flex items-center gap-3.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl shrink-0 bg-amber-50 text-amber-600 border border-amber-200 shadow-xs">
            <HelmIcon className="h-5 w-5" />
          </div>
          <div className="flex flex-col justify-center">
            <h4
              style={{ margin: 0, padding: 0 }}
              className="font-bold text-sm text-[#0B1638] leading-tight"
            >
              {config.platformStack.helmTitle}
            </h4>
            <p
              style={{ margin: 0, padding: 0, marginTop: "2px" }}
              className="text-xs text-[#475569] font-medium leading-normal"
            >
              {config.platformStack.helmDesc}
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-flex rounded-full bg-amber-50 border border-amber-300 px-2.5 py-0.5 text-[10px] font-bold text-amber-800 tracking-wide uppercase">
          Security Gate
        </span>
      </div>
    );
  };

  const renderCard4 = () => {
    const isCard4Active = activeStage === 4;

    return (
      <div
        style={getCardStyle(
          isOrchestratorRevealed,
          isCard4Active,
          "#8b5cf6",
          "rgba(139, 92, 246, 0.4)"
        )}
        className="w-full rounded-2xl bg-white p-3.5 text-left flex items-center gap-3.5 min-h-[68px] h-[68px] z-10"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl shrink-0 bg-purple-50 text-purple-600 border border-purple-200 shadow-xs">
          <OrchestratorIcon className="h-5 w-5" />
        </div>
        <div className="flex flex-col justify-center">
          <h4
            style={{ margin: 0, padding: 0 }}
            className="font-bold text-sm text-[#0B1638] leading-tight"
          >
            {config.platformStack.orchestratorTitle}
          </h4>
          <p
            style={{ margin: 0, padding: 0, marginTop: "2px" }}
            className="text-xs text-[#475569] font-normal leading-normal"
          >
            {config.platformStack.orchestratorDesc}
          </p>
        </div>
      </div>
    );
  };

  const isFixedAgentsActive = hasStarted && activeStage === 5;

  return (
    <div ref={sectionRef} className={`w-full mx-auto ${className}`}>
      {/* ── SECTION HEADER ── */}
      <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-4 py-1.5 aqe-label-text text-emerald-800">
          {config.kicker}
        </span>
        <h2 className="aqe-section-heading mt-4 text-center text-[#0f172a] max-w-4xl">
          {config.heading}
        </h2>
        <p className="aqe-paragraph mt-4 text-[#475569] max-w-3xl mx-auto font-medium">
          {config.subtitle}
        </p>
      </div>

      {/* ── INTERACTIVE OPERATING FRAME (Widened to page borders) ── */}
      <div className="relative rounded-3xl border-2 border-slate-300/80 bg-white shadow-[0_20px_50px_-15px_rgba(15,23,42,0.07)] overflow-hidden w-full">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50/80 px-4 py-3 sm:px-6 sm:py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#00c853] animate-pulse" />
            <span className="text-xs sm:text-[13px] font-semibold text-slate-700">
              Interactive {config.platformStack.platformName} Operating Model
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/50 bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-800 transition-all shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00c853] animate-ping" />
              <span>{getStatusText()}</span>
            </div>

            {/* Pause Button */}
            {hasStarted && activeStage < TOTAL_STAGES && (
              <button
                type="button"
                onClick={handleTogglePause}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 active:scale-95"
                aria-label={isPlaying ? "Pause playback" : "Resume playback"}
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-3.5 w-3.5 text-slate-600" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5 text-emerald-600 fill-emerald-600" />
                    <span>Resume</span>
                  </>
                )}
              </button>
            )}

            {/* Replay Button */}
            <button
              type="button"
              onClick={handleReplay}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 active:scale-95"
              aria-label="Replay animation"
            >
              <RotateCcw className="h-3.5 w-3.5 text-slate-600" />
              <span>Replay</span>
            </button>
          </div>
        </div>

        {/* ── MAIN DIAGRAM CANVAS ── */}
        <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-[#F4F8FC] via-[#F8FAFD] to-[#EFF5FB] relative overflow-hidden">
          {/* Subtle Ambient Background Gradients */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-100/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-blue-100/20 blur-3xl" />

          {/* ══════════════════════════════════════════════════════════════
              UPPER FLOW (DESKTOP): 3-Column Layout with 90° Traveling Conduits
              Left & Right Cards moved down to 3rd Card Level (myHelm).
              Lines from Card 1 travel horizontal, then 90° down into the cards.
              Sharp lines: no shadow, thinner stroke, vibrant green (#00c853).
             ══════════════════════════════════════════════════════════════ */}
          <div
            ref={upperFlowRef}
            className="hidden lg:flex items-start justify-between relative z-10 w-full min-h-[420px]"
          >
            {/* SVG 90-Degree Elbow Conduits Layer (Sharp, no shadow blur, thinner) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
              {lineCoords && (
                <>
                  {/* Left Conduit (Card 1 -> Left Card): Base Track */}
                  <path
                    d={getLeftPath(lineCoords)}
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                  {/* Left Conduit (Card 1 -> Left Card): Sharp Vibrant Green Flow */}
                  <motion.path
                    d={getLeftPath(lineCoords)}
                    fill="none"
                    stroke={FLOW_GREEN}
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: isLeftRightRevealed ? 1 : 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  />

                  {/* Right Conduit (Card 1 -> Right Card): Base Track */}
                  <path
                    d={getRightPath(lineCoords)}
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                  {/* Right Conduit (Card 1 -> Right Card): Sharp Vibrant Green Flow */}
                  <motion.path
                    d={getRightPath(lineCoords)}
                    fill="none"
                    stroke={FLOW_GREEN}
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: isLeftRightRevealed ? 1 : 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  />

                  {/* Terminal / Port Pin Nodes */}
                  {isLeftRightRevealed && (
                    <>
                      <circle
                        cx={lineCoords.leftStart.x}
                        cy={lineCoords.leftStart.y}
                        r="2.5"
                        fill={FLOW_GREEN}
                      />
                      <circle
                        cx={lineCoords.leftTarget.x}
                        cy={lineCoords.leftTarget.y}
                        r="3.5"
                        fill={FLOW_GREEN}
                      />
                      {activeStage === 1 && linesMet && (
                        <circle
                          cx={lineCoords.leftTarget.x}
                          cy={lineCoords.leftTarget.y}
                          r="7"
                          fill={FLOW_GREEN}
                          className="animate-ping opacity-75 origin-center"
                        />
                      )}
                      <circle
                        cx={lineCoords.rightStart.x}
                        cy={lineCoords.rightStart.y}
                        r="2.5"
                        fill={FLOW_GREEN}
                      />
                      <circle
                        cx={lineCoords.rightTarget.x}
                        cy={lineCoords.rightTarget.y}
                        r="3.5"
                        fill={FLOW_GREEN}
                      />
                      {activeStage === 1 && linesMet && (
                        <circle
                          cx={lineCoords.rightTarget.x}
                          cy={lineCoords.rightTarget.y}
                          r="7"
                          fill={FLOW_GREEN}
                          className="animate-ping opacity-75 origin-center"
                        />
                      )}
                    </>
                  )}
                </>
              )}
            </svg>

            {/* Horizontal Segment Directional Badges */}
            {lineCoords && isLeftRightRevealed && (
              <>
                {/* Left Horizontal Segment Label */}
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.15 }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
                  style={{
                    left: `${
                      (lineCoords.leftStart.x + lineCoords.leftCorner.x) / 2
                    }px`,
                    top: `${lineCoords.leftStart.y}px`,
                  }}
                >
                  <span className="bg-white border border-[#00c853]/60 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-emerald-800 shadow-2xs whitespace-nowrap">
                    {config.input.lineLabel}
                  </span>
                </motion.div>

                {/* Right Horizontal Segment Label */}
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.15 }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
                  style={{
                    left: `${
                      (lineCoords.rightStart.x + lineCoords.rightCorner.x) / 2
                    }px`,
                    top: `${lineCoords.rightStart.y}px`,
                  }}
                >
                  <span className="bg-white border border-[#00c853]/60 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-emerald-800 shadow-2xs whitespace-nowrap">
                    {config.output.lineLabel}
                  </span>
                </motion.div>
              </>
            )}

            {/* ── LEFT COLUMN: INPUT CARD (Aligned to 3rd Card Level) ── */}
            <div className="w-[260px] xl:w-[290px] shrink-0 flex flex-col items-center pt-[216px] z-10">
              {renderInputCard(leftCardRef)}
            </div>

            {/* ── CENTER COLUMN: 4-LAYER VERTICAL STACK + EXTENDED CONDUIT TO AGENTS ── */}
            <div className="w-[440px] xl:w-[490px] shrink-0 flex flex-col items-center z-10">
              {/* Card 1: Platform Header */}
              {renderCard1(card1Ref)}

              {/* Vertical Pipe: Card 1 -> Card 2 (no arrow tip, thin, sharp green) */}
              {renderVerticalConnector(isFacilitiesRevealed)}

              {/* Card 2: Platform Facilities */}
              {renderCard2()}

              {/* Vertical Pipe: Card 2 -> Card 3 (no arrow tip, thin, sharp green) */}
              {renderVerticalConnector(isHelmRevealed)}

              {/* Card 3: myHelm (Security Gate) */}
              {renderCard3()}

              {/* Vertical Pipe: Card 3 -> Card 4 (no arrow tip, thin, sharp green) */}
              {renderVerticalConnector(isOrchestratorRevealed)}

              {/* Card 4: Orchestrator */}
              {renderCard4()}

              {/* Connecting line: Starts directly from 4th card and connects directly to below Fixed Agents card */}
              <div className="hidden lg:flex flex-col items-center justify-center relative w-full h-16 xl:h-20 overflow-hidden mt-0.5 -mb-2">
                <div className="w-[1.5px] h-full bg-slate-200" />
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: isAgentsRevealed ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  style={{ transformOrigin: "top" }}
                  className="absolute top-0 w-[1.75px] h-full bg-[#00c853] rounded-full"
                />
              </div>
            </div>

            {/* ── RIGHT COLUMN: OUTPUT CARD (Aligned to 3rd Card Level) ── */}
            <div className="w-[260px] xl:w-[290px] shrink-0 flex flex-col items-center pt-[216px] z-10">
              {renderOutputCard(rightCardRef)}
            </div>
          </div>

          {/* ── MOBILE FLOW (< lg screens): Top-to-Bottom Sequential ── */}
          <div className="flex lg:hidden flex-col items-center gap-1 relative z-10 w-full">
            {renderCard1()}
            {renderVerticalConnector(isLeftRightRevealed)}
            {renderInputCard()}
            {renderVerticalConnector(isFacilitiesRevealed)}
            {renderCard2()}
            {renderVerticalConnector(isHelmRevealed)}
            {renderCard3()}
            {renderVerticalConnector(isOrchestratorRevealed)}
            {renderCard4()}
            {renderVerticalConnector(isLeftRightRevealed)}
            {renderOutputCard()}
            {/* Mobile connecting line to Fixed Agents card */}
            <div className="flex flex-col items-center justify-center relative w-full h-8 overflow-hidden my-1">
              <div className="w-[1.5px] h-full bg-slate-200" />
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: isAgentsRevealed ? 1 : 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{ transformOrigin: "top" }}
                className="absolute top-0 w-[1.75px] h-full bg-[#00c853] rounded-full"
              />
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════
              LOWER FLOW: BELLOW ALL CARDS (FIXED AGENTS LANE - Stage 5 Reveal)
             ══════════════════════════════════════════════════════════════ */}
          <div
            style={
              !isAgentsRevealed
                ? {
                    borderWidth: "2px",
                    borderStyle: "solid",
                    borderColor: RESTING_BORDER,
                    boxShadow: RESTING_SHADOW,
                    opacity: 0,
                    transform: "translateY(16px)",
                    pointerEvents: "none",
                    transition: "opacity 0.4s ease, transform 0.4s ease",
                  }
                : isFixedAgentsActive
                ? {
                    borderWidth: "1.5px",
                    borderStyle: "solid",
                    borderColor: "#0284c7",
                    boxShadow:
                      "0 0 16px rgba(2, 132, 199, 0.3), 0 4px 18px rgba(2, 132, 199, 0.08)",
                    opacity: 1,
                    transform: "translateY(0)",
                    pointerEvents: "auto",
                    transition:
                      "opacity 0.4s ease, transform 0.4s ease, border-color 0.35s ease, box-shadow 0.35s ease",
                  }
                : {
                    borderWidth: "1.5px",
                    borderStyle: "solid",
                    borderColor: RESTING_BORDER,
                    boxShadow: RESTING_SHADOW,
                    opacity: 1,
                    transform: "translateY(0)",
                    pointerEvents: "auto",
                    transition:
                      "opacity 0.4s ease, transform 0.4s ease, border-color 0.35s ease, box-shadow 0.35s ease",
                  }
            }
            className="rounded-2xl bg-white p-5 sm:p-6"
          >
            {/* Header Badge */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative inline-flex items-center gap-3">
                <span className="hidden sm:block h-px w-16 bg-[#38bdf8]/60" />
                <span className="rounded-full border border-[#38bdf8] px-5 py-1.5 text-xs font-bold tracking-widest uppercase shadow-xs bg-white text-sky-700 shadow-[0_2px_8px_rgba(2,132,199,0.1)] transition-colors">
                  {config.agentsTitle}
                </span>
                <span className="hidden sm:block h-px w-16 bg-[#38bdf8]/60" />
              </div>
            </div>

            {/* Agent Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-flow-col lg:auto-cols-fr gap-3.5 items-stretch relative">
              {config.agents.map((agent, idx) => {
                const AgentIcon = agent.icon;
                const agentColor = getAgentColor(agent);
                const isAgentActive = activeStage === 5;

                return (
                  <div
                    key={agent.id}
                    style={
                      !isAgentsRevealed
                        ? {
                            borderWidth: "1.5px",
                            borderStyle: "solid",
                            borderColor: RESTING_BORDER,
                            boxShadow: RESTING_SHADOW,
                            opacity: 0,
                            transform: "translateY(10px)",
                            pointerEvents: "none",
                            transition: `opacity 0.4s ease, transform 0.4s ease`,
                          }
                        : isAgentActive
                        ? {
                            borderWidth: "1.5px",
                            borderStyle: "solid",
                            borderColor: agentColor.hex,
                            boxShadow: `0 0 12px ${agentColor.glow}, 0 2px 8px rgba(0, 0, 0, 0.04)`,
                            opacity: 1,
                            transform: "translateY(0)",
                            pointerEvents: "auto",
                            transition: `opacity 0.4s ease ${
                              idx * 0.08
                            }s, transform 0.4s ease ${
                              idx * 0.08
                            }s, border-color 0.35s ease ${
                              idx * 0.08
                            }s, box-shadow 0.35s ease ${idx * 0.08}s`,
                          }
                        : {
                            borderWidth: "1.5px",
                            borderStyle: "solid",
                            borderColor: RESTING_BORDER,
                            boxShadow: RESTING_SHADOW,
                            opacity: 1,
                            transform: "translateY(0)",
                            pointerEvents: "auto",
                            transition: `opacity 0.4s ease, transform 0.4s ease, border-color 0.35s ease, box-shadow 0.35s ease`,
                          }
                    }
                    className="relative rounded-xl bg-white p-3.5 flex flex-col items-center text-center justify-between z-10"
                  >
                    {/* Icon Badge - Clean, steady icon styling (does NOT glow, per requirement) */}
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-full border mb-2.5 transition-colors duration-300 ${agentColor.restingBg}`}
                    >
                      <AgentIcon className="h-5 w-5" />
                    </div>

                    {/* Agent Name */}
                    <h5 className="font-bold text-xs sm:text-[13px] text-[#0B1638] leading-tight mb-1">
                      {agent.name}
                    </h5>

                    {/* Optional Role */}
                    {agent.role && (
                      <span className="aqe-caption text-[12px] font-semibold text-sky-700 mb-1">
                        {agent.role}
                      </span>
                    )}

                    {/* Agent Description */}
                    <p className="aqe-caption text-[#475569] leading-snug line-clamp-2 font-normal">
                      {agent.desc}
                    </p>

                    {/* Sequential Arrow on Desktop (except last agent) */}
                    {idx < config.agents.length - 1 && (
                      <div className="hidden lg:flex items-center justify-center absolute -right-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full border bg-white shadow-2xs border-[#38bdf8] text-sky-600 shadow-xs">
                          <ChevronRight className="h-3 w-3" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Optional SDET-Style Bottom Knowledge Bar */}
            {config.bottomBar && (
              (() => {
                const BottomBarIcon = config.bottomBar.icon || BarChart2;
                return (
                  <div
                    style={RESTING_STYLE}
                    className="mt-5 rounded-xl bg-white p-3 flex flex-wrap items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#145BFF] text-white shadow-xs">
                        <BottomBarIcon className="h-4 w-4" />
                      </div>
                      <span className="font-bold text-[#0B1638]">
                        {config.bottomBar.title}
                      </span>
                      <span className="text-slate-300">|</span>
                      <span className="font-semibold text-sky-700">
                        {config.bottomBar.category}
                      </span>
                    </div>
                    <p className="text-[#475569] text-[11px] font-normal">
                      {config.bottomBar.desc}
                    </p>
                  </div>
                );
              })()
            )}

            {/* Footer Note */}
            {config.agentsFooterNote && (
              <div className="mt-4 text-center">
                <span className="inline-block rounded-full bg-white border border-[#38bdf8]/60 px-4 py-1 text-[11px] font-medium text-slate-700 shadow-2xs">
                  {config.agentsFooterNote}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            BOTTOM STAGE NAVIGATION (Clickable 6 Stages Matching Reveal)
           ══════════════════════════════════════════════════════════════ */}
        <div className="border-t border-slate-200 bg-slate-50/90 p-4 sm:p-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {[
              {
                id: 0,
                label: "01 PLATFORM",
                desc: config.platformStack.platformName,
              },
              {
                id: 1,
                label: "02 I/O FLOW",
                desc: `${config.input.title} ──> ${config.output.title}`,
              },
              {
                id: 2,
                label: "03 FACILITIES",
                desc: config.platformStack.facilitiesTitle,
              },
              {
                id: 3,
                label: "04 GOVERNANCE",
                desc: config.platformStack.helmTitle,
              },
              {
                id: 4,
                label: "05 ORCHESTRATE",
                desc: config.platformStack.orchestratorTitle,
              },
              {
                id: 5,
                label: "06 FIXED AGENTS",
                desc: config.agentsTitle,
              },
            ].map((stage) => {
              const isSelected = activeStage === stage.id;
              const isCompleted = activeStage > stage.id;

              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => handleJumpToStage(stage.id)}
                  className={`flex flex-col items-start p-2.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? "border-2 border-[#145BFF] bg-blue-50/70 shadow-[0_2px_12px_rgba(20,91,255,0.15)] ring-2 ring-[#145BFF]/30"
                      : isCompleted
                      ? "border border-[#38bdf8] bg-white hover:bg-sky-50/30 shadow-[0_2px_8px_rgba(2,132,199,0.08)]"
                      : "border border-slate-200 bg-white hover:border-[#38bdf8]"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`aqe-caption text-[12px] font-bold tracking-wider ${
                        isSelected
                          ? "text-[#145BFF]"
                          : isCompleted
                          ? "text-sky-700"
                          : "text-slate-500"
                      }`}
                    >
                      {stage.label}
                    </span>
                    {isCompleted && (
                      <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
                    )}
                  </div>
                  <span className="text-xs font-semibold text-[#0B1638] truncate w-full mt-0.5">
                    {stage.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InteractivePlatformFlow;
