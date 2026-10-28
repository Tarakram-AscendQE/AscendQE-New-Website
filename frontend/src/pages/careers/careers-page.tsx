import { ScrollToTop } from "@/shared/ScrollToTop";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Lightbulb,
  TrendingUp,
  Users,
  Heart,
  MapPin,
  Briefcase,
  GraduationCap,
  Upload,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Reveal } from "../../components/ui/shared";

const MAX_RESUME_SIZE = 1 * 1024 * 1024; // 1 MB limit
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^\d{10}$/;

// ─── Data Definitions ──────────────────────────────────────────────────────────

const WHY_JOIN = [
  {
    icon: Lightbulb,
    title: "Innovation First",
    body: "Work on cutting-edge AI technologies and shape the future of quality engineering.",
    borderGrad: "linear-gradient(90deg, #1763ff, #60a5fa)",
    iconBg: "bg-[#eff4ff]",
    iconColor: "text-[#1763ff]",
  },
  {
    icon: TrendingUp,
    title: "Growth Mindset",
    body: "Continuous learning opportunities, mentorship, and clear career progression paths.",
    borderGrad: "linear-gradient(90deg, #10b981, #34d399)",
    iconBg: "bg-[#ecfdf5]",
    iconColor: "text-[#059669]",
  },
  {
    icon: Users,
    title: "Collaborative Culture",
    body: "Work with talented peers in an inclusive, supportive environment.",
    borderGrad: "linear-gradient(90deg, #6366f1, #818cf8)",
    iconBg: "bg-[#eef2ff]",
    iconColor: "text-[#4f46e5]",
  },
  {
    icon: Heart,
    title: "Work-Life Balance",
    body: "Flexible work arrangements, generous PTO, and comprehensive benefits.",
    borderGrad: "linear-gradient(90deg, #f59e0b, #fbbf24)",
    iconBg: "bg-[#fffbeb]",
    iconColor: "text-[#d97706]",
  },
];

const POSITIONS = [
  {
    title: "Senior QE Automation Engineer",
    location: "Remote / Hybrid",
    type: "Full-time",
    exp: "5+ years",
    body: "Lead the development of AI-powered test automation frameworks and mentor junior engineers. Work on cutting-edge GenAI integration for self-healing tests.",
    tags: ["Python", "Selenium", "AI/ML", "CI/CD"],
    border: "#1763ff",
  },
  {
    title: "Machine Learning Engineer - QE Platform",
    location: "Remote / Hybrid",
    type: "Full-time",
    exp: "3+ years",
    body: "Build ML models for defect prediction, test optimization, and intelligent test generation. Work with LLMs and contribute to our AI research initiatives.",
    tags: ["TensorFlow", "PyTorch", "NLP", "LLMs"],
    border: "#0ea5e9",
  },
  {
    title: "Full Stack Developer",
    location: "Remote",
    type: "Full-time",
    exp: "4+ years",
    body: "Build and scale our myDiya platform with modern web technologies. Work on both frontend and backend to create exceptional user experiences.",
    tags: ["React", "Node.js", "TypeScript", "AWS"],
    border: "#2563eb",
  },
  {
    title: "QE Solutions Consultant",
    location: "Remote / On-site",
    type: "Full-time",
    exp: "6+ years",
    body: "Work directly with enterprise clients to design and implement QE transformation strategies. Combine technical expertise with business acumen to drive client success.",
    tags: ["QE Strategy", "Client Consulting", "Test Automation", "Agile/DevOps"],
    border: "#10b981",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionBadge({ no, label }: { no: string; label: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="flex h-7 items-center rounded-full bg-[#eff4ff] px-2.5 py-1 font-mono text-xs font-bold text-[#1763ff] ring-1 ring-[#dbe6ff]">
        {no}
      </span>
      <span className="text-xs font-bold uppercase tracking-widest text-[#69758a]">{label}</span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function CarrersPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<typeof POSITIONS[0] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ fullName?: string; email?: string; phone?: string }>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleApplyClick = (position: typeof POSITIONS[0]) => {
    setSelectedPosition(position);
    setShowModal(true);
    setSubmitMessage(null);
    setSelectedFile(null);
    setFileError(null);
    setFieldErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > MAX_RESUME_SIZE) {
        setSelectedFile(null);
        e.target.value = "";
        const actualSizeMB = (file.size / (1024 * 1024)).toFixed(2);
        setFileError(`File size (${actualSizeMB} MB) exceeds the 1 MB limit. Please upload a resume up to 1 MB.`);
        return;
      }
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleApplySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitMessage(null);

    const formEl = e.currentTarget;
    const rawName = ((formEl.elements.namedItem("fullName") as HTMLInputElement)?.value || "").trim();
    const rawEmail = ((formEl.elements.namedItem("email") as HTMLInputElement)?.value || "").trim();
    const rawPhone = ((formEl.elements.namedItem("phone") as HTMLInputElement)?.value || "").trim();

    const newErrors: { fullName?: string; email?: string; phone?: string } = {};
    if (!rawName) {
      newErrors.fullName = "Full name is required.";
    }
    if (!rawEmail || !EMAIL_REGEX.test(rawEmail)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!rawPhone || !PHONE_REGEX.test(rawPhone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number.";
    }

    setFieldErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    if (!selectedFile) {
      setFileError("Please select a resume file (PDF or DOCX, max 1 MB).");
      return;
    }

    if (selectedFile.size > MAX_RESUME_SIZE) {
      const actualSizeMB = (selectedFile.size / (1024 * 1024)).toFixed(2);
      setFileError(`File size (${actualSizeMB} MB) exceeds the 1 MB limit. Please upload a resume up to 1 MB.`);
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      if (selectedPosition) {
        formData.append('jobTitle', selectedPosition.title);
      }

      const response = await fetch('/apply-job.php', {
        method: 'POST',
        body: formData, // fetch automatically sets the correct multipart/form-data headers
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Failed to submit application');
      }

      setSubmitMessage({
        type: 'success',
        text: 'Application submitted successfully! We will review your application and get back to you soon.',
      });
      setTimeout(() => setShowModal(false), 3000);
    } catch (err: any) {
      setSubmitMessage({
        type: 'error',
        text: err.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#0b1831]">
      {/* ── Hero Section (Light, matching all other AscendQE pages) ── */}
      <section className="relative overflow-hidden bg-[#f7f9fd] bg-[radial-gradient(ellipse_at_80%_45%,#dceeff66,transparent_50%)] pt-14 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24 border-b border-[#DCE5F5]">
        <div className="relative mx-auto w-full px-6 sm:px-12 md:px-[88px] lg:px-24">
          <p className="mb-6 text-xs text-[#69758a]">
            <a href="/" className="hover:text-[#1763ff] transition-colors">Home</a>
            <span className="mx-1.5 text-[#cbd5e1]">›</span>
            <span className="text-[#1763ff] font-semibold">Careers</span>
          </p>

          <Reveal>
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#DCE5F5] bg-[#EAF1FF] px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1763ff]" />
              <span className="aqe-label-text text-[#1763ff]">JOIN ASCENDQE</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1
              className="aqe-hero-heading text-[#0B1638] tracking-tight leading-[1.05]"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
            >
              Build the Future of <br />
              <span className="text-[#1763ff]">AI-Powered Quality Engineering</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="aqe-intro mt-6 max-w-2xl text-[#263653] leading-relaxed">
              Join a team of innovators transforming quality engineering with AI. We're looking
              for passionate individuals who want to make an impact on how the world builds software.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button
                onClick={() => document.getElementById("open-positions")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 rounded-xl bg-[#1763ff] hover:bg-[#0e53e6] px-6 py-3 font-semibold text-white shadow-[0_8px_24px_-10px_rgba(23,99,255,0.6)] transition-all hover:scale-[1.02] active:scale-95"
              >
                View Open Positions <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => document.getElementById("why-join")?.scrollIntoView({ behavior: "smooth" })}
                className="rounded-xl border border-[#DCE5F5] bg-white px-6 py-3 font-semibold text-[#0B1638] shadow-sm transition-all hover:bg-[#EAF1FF] active:scale-95"
              >
                Why AscendQE
              </button>
            </div>
          </Reveal>

          {/* Mini Badges */}
          <Reveal delay={0.4}>
            <div className="mt-14 flex flex-wrap gap-4">
              {[
                { title: "Mission-driven", subtitle: "AI-first company" },
                { title: "4 open roles", subtitle: "and growing" },
                { title: "25+ years", subtitle: "domain expertise" },
                { title: "Global reach", subtitle: "enterprise clients" },
              ].map((badge) => (
                <div
                  key={badge.title}
                  className="rounded-xl border border-[#DCE5F5] bg-white/90 backdrop-blur px-5 py-3.5 shadow-sm transition-all hover:border-[#1763ff]/40 hover:shadow-md"
                >
                  <div className="text-[13px] font-bold text-[#0B1638]">{badge.title}</div>
                  <div className="text-[12px] font-semibold text-[#1763ff] mt-0.5">{badge.subtitle}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Why Join AscendQE ── */}
      <section id="why-join" className="relative scroll-mt-[50px] bg-white px-6 py-20 sm:py-24">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(23,99,255,0.2), transparent)" }}
        />
        <div className="mx-auto w-full px-6 sm:px-12 md:px-[88px] lg:px-24">
          <Reveal>
            <SectionBadge no="01" label="Why Join AscendQE" />
            <h2
              className="text-[#0b1831] font-[750] tracking-tight leading-[1.15]"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
            >
              More than a job — <span className="italic text-[#69758a] font-normal">a career that makes a difference.</span>
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_JOIN.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <div className="group relative overflow-hidden rounded-2xl border border-[#e0e5ef] bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-[#1763ff]/30 hover:shadow-[0_12px_32px_-12px_rgba(23,99,255,0.12)]">
                  <div
                    className="absolute inset-x-0 top-0 h-[3px] rounded-t-2xl opacity-90"
                    style={{ background: item.borderGrad }}
                  />
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.iconBg}`}>
                    <item.icon className={`h-5 w-5 ${item.iconColor}`} />
                  </div>
                  <h3 className="mt-5 font-bold text-[#0b1831] text-[17px]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[#69758a] text-[14px] leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open Positions ── */}
      <section id="open-positions" className="relative scroll-mt-[50px] bg-[#f8fafc] px-6 py-20 sm:py-24 border-t border-[#e0e5ef]">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <SectionBadge no="02" label="Open Positions" />
            <h2
              className="text-[#0b1831] font-[750] tracking-tight leading-[1.15]"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
            >
              Join our growing team and make <span className="italic text-[#69758a] font-normal">an impact from day one.</span>
            </h2>
          </Reveal>

          <div className="mt-12 flex flex-col gap-5">
            {POSITIONS.map((job, i) => (
              <Reveal key={job.title} delay={i * 0.08}>
                <div 
                  title="Openings are on hold"
                  className="group relative rounded-2xl border border-[#e0e5ef] bg-white p-6 sm:p-7 shadow-sm transition-all hover:border-slate-300 hover:shadow-md cursor-default"
                >
                  <div
                    className="absolute inset-y-0 left-0 w-1.5 rounded-l-2xl transition-colors"
                    style={{ backgroundColor: job.border }}
                  />

                  <div className="pl-3 sm:flex sm:items-start sm:justify-between">
                    <div className="flex-1 pr-4">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="font-bold text-[#0b1831] text-lg sm:text-xl">
                          {job.title}
                        </h3>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                          On Hold
                        </span>
                      </div>
                      <div className="mt-2.5 flex flex-wrap gap-4 text-xs font-medium text-[#69758a]">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-[#1763ff]" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Briefcase className="h-3.5 w-3.5 text-[#1763ff]" />
                          {job.type}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <GraduationCap className="h-3.5 w-3.5 text-[#1763ff]" />
                          {job.exp}
                        </span>
                      </div>
                      <p className="mt-4 text-[#5c6780] text-sm sm:text-[15px] leading-relaxed">
                        {job.body}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {job.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-lg bg-[#eff4ff] px-2.5 py-1 text-[11px] font-semibold text-[#1763ff] ring-1 ring-inset ring-[#dbe6ff]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 shrink-0 sm:mt-0" title="Openings are on hold">
                      <button
                        type="button"
                        disabled
                        aria-disabled="true"
                        className="flex items-center gap-2 rounded-xl bg-slate-100 border border-slate-200 px-5 py-2.5 text-[13px] font-semibold text-slate-400 cursor-not-allowed select-none shadow-none"
                      >
                        <span>Apply Now</span>
                        <ArrowRight className="h-3.5 w-3.5 text-slate-300" />
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Don't See Your Role? (Clean Light Card matching site style) ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F8FAFF] to-[#F5F8FF] py-20 lg:py-28 border-t border-[#DCE5F5]">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="relative rounded-[26px] bg-[#EAF1FF] border border-[#DCE5F5] p-9 sm:p-12 md:p-14 shadow-[0_4px_24px_rgba(20,91,255,0.06)]">
            <Reveal>
              <h2
                className="aqe-section-heading text-[#0B1638]"
                style={{ fontSize: "clamp(2rem, 3.5vw, 2.75rem)", lineHeight: 1.15, fontWeight: 700 }}
              >
                Don't See Your Role?
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mx-auto mt-4 max-w-xl text-[15px] sm:text-[16px] text-[#263653] leading-relaxed">
                We're always looking for talented individuals. Send us your resume and tell us why you'd be a great fit for
                AscendQE.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-8">
                <a
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-xl bg-[#1763ff] hover:bg-[#0e53e6] px-8 py-3.5 font-semibold text-white shadow-[0_8px_24px_-10px_rgba(23,99,255,0.6)] transition-all hover:shadow-[0_12px_28px_rgba(23,99,255,0.4)] hover:-translate-y-0.5 active:scale-95"
                >
                  Get in Touch <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Application Modal ── */}
      <AnimatePresence>
        {showModal && selectedPosition && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-[#071327]/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-[20px] bg-white border border-[#e0e5ef] shadow-[0_25px_70px_-15px_rgba(7,19,39,0.4)]"
            >
              {/* Modal Header */}
              <div className="relative shrink-0 bg-[#071327] px-8 py-7">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                  aria-label="Close modal"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="text-[11px] font-bold tracking-widest text-[#719fff] uppercase">APPLY NOW</div>
                <h3 className="mt-1 text-2xl font-bold text-white tracking-tight">{selectedPosition.title}</h3>
                <div className="mt-3.5 flex flex-wrap gap-5 text-[12.5px] font-medium text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-[#719fff]" />
                    {selectedPosition.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5 text-[#719fff]" />
                    {selectedPosition.type}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <GraduationCap className="h-3.5 w-3.5 text-[#719fff]" />
                    {selectedPosition.exp}
                  </span>
                </div>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleApplySubmit} className="overflow-y-auto px-8 py-8">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-[13px] font-semibold text-[#0b1831]">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        name="fullName"
                        placeholder="Jane Smith"
                        onInput={(e) => {
                          e.currentTarget.value = e.currentTarget.value.replace(/[0-9]/g, "");
                          setFieldErrors((prev) => ({ ...prev, fullName: undefined }));
                        }}
                        className={`w-full rounded-xl border ${
                          fieldErrors.fullName
                            ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                            : "border-[#e0e5ef] focus:border-[#1763ff] focus:ring-[#1763ff]"
                        } bg-white px-4 py-2.5 text-[13px] text-[#0b1831] outline-none transition-colors focus:ring-1 placeholder:text-slate-400`}
                      />
                      {fieldErrors.fullName && (
                        <p className="mt-1 aqe-caption font-medium text-red-500">{fieldErrors.fullName}</p>
                      )}
                    </div>
                    <div>
                      <label className="mb-2 block text-[13px] font-semibold text-[#0b1831]">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        name="email"
                        placeholder="jane@example.com"
                        onChange={(e) => {
                          const val = e.target.value.trim();
                          if (val && !EMAIL_REGEX.test(val)) {
                            setFieldErrors((prev) => ({ ...prev, email: "Please enter a valid email address." }));
                          } else {
                            setFieldErrors((prev) => ({ ...prev, email: undefined }));
                          }
                        }}
                        className={`w-full rounded-xl border ${
                          fieldErrors.email
                            ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                            : "border-[#e0e5ef] focus:border-[#1763ff] focus:ring-[#1763ff]"
                        } bg-white px-4 py-2.5 text-[13px] text-[#0b1831] outline-none transition-colors focus:ring-1 placeholder:text-slate-400`}
                      />
                      {fieldErrors.email && (
                        <p className="mt-1 aqe-caption font-medium text-red-500">{fieldErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-[13px] font-semibold text-[#0b1831]">
                        Phone Number (10 digits) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        name="phone"
                        inputMode="numeric"
                        maxLength={10}
                        pattern="[0-9]{10}"
                        placeholder="9876543210"
                        onInput={(e) => {
                          const digitsOnly = e.currentTarget.value.replace(/\D/g, "").slice(0, 10);
                          e.currentTarget.value = digitsOnly;
                          if (digitsOnly.length > 0 && digitsOnly.length < 10) {
                            setFieldErrors((prev) => ({ ...prev, phone: "Phone number must be 10 digits." }));
                          } else {
                            setFieldErrors((prev) => ({ ...prev, phone: undefined }));
                          }
                        }}
                        className={`w-full rounded-xl border ${
                          fieldErrors.phone
                            ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                            : "border-[#e0e5ef] focus:border-[#1763ff] focus:ring-[#1763ff]"
                        } bg-white px-4 py-2.5 text-[13px] text-[#0b1831] outline-none transition-colors focus:ring-1 placeholder:text-slate-400`}
                      />
                      {fieldErrors.phone && (
                        <p className="mt-1 aqe-caption font-medium text-red-500">{fieldErrors.phone}</p>
                      )}
                    </div>
                    <div>
                      <label className="mb-2 block text-[13px] font-semibold text-[#0b1831]">
                        Years of Experience <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="experience"
                        required
                        defaultValue=""
                        className="w-full appearance-none rounded-xl border border-[#e0e5ef] bg-white px-4 py-2.5 text-[13px] text-[#0b1831] outline-none transition-colors focus:border-[#1763ff] focus:ring-1 focus:ring-[#1763ff]"
                      >
                        <option value="" disabled>
                          Select range
                        </option>
                        <option value="0-1">0-1 years</option>
                        <option value="1-3">1-3 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5+">5+ years</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-[13px] font-semibold text-[#0b1831]">LinkedIn Profile</label>
                    <input
                      type="url"
                      className="w-full rounded-xl border border-[#e0e5ef] bg-white px-4 py-2.5 text-[13px] text-[#0b1831] outline-none transition-colors focus:border-[#1763ff] focus:ring-1 focus:ring-[#1763ff] placeholder:text-slate-400"
                      name="linkedin"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>

                  <div>
                    <span className="mb-2 block text-[13px] font-semibold text-[#0b1831]">
                      Resume / CV <span className="text-red-500">*</span>
                    </span>
                    <label
                      className={`group flex cursor-pointer justify-center rounded-xl border-2 border-dashed px-6 py-8 transition-all ${
                        fileError
                          ? "border-red-400 bg-red-50/40 hover:border-red-500 hover:bg-red-50"
                          : selectedFile
                          ? "border-[#1763ff] bg-[#eff4ff]"
                          : "border-[#cbd5e1] bg-[#f8fafc] hover:border-[#1763ff] hover:bg-[#eff4ff]/40"
                      }`}
                    >
                      <div className="text-center">
                        <Upload
                          className={`mx-auto h-6 w-6 transition-colors ${
                            fileError
                              ? "text-red-500"
                              : selectedFile
                              ? "text-[#1763ff]"
                              : "text-[#69758a] group-hover:text-[#1763ff]"
                          }`}
                        />
                        <div className="mt-3 text-sm font-semibold text-[#0b1831]">
                          {selectedFile ? (
                            <span className="text-[#0b1831]">
                              {selectedFile.name}{" "}
                              <span className="text-xs font-normal text-[#69758a]">
                                ({(selectedFile.size / 1024).toFixed(0)} KB)
                              </span>
                            </span>
                          ) : (
                            "Click to upload PDF or DOCX"
                          )}
                        </div>
                        <p className={`mt-1 aqe-caption font-medium ${fileError ? "text-red-500 font-semibold" : "text-[#69758a]"}`}>
                          Max 1 MB (PDF, DOC, DOCX)
                        </p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          className="sr-only"
                          name="resume"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                        />
                      </div>
                    </label>
                    {fileError && (
                      <p className="mt-2 text-[12px] font-semibold text-red-600 flex items-center gap-1.5">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500"></span>
                        {fileError}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-[13px] font-semibold text-[#0b1831]">Cover Letter</label>
                    <textarea
                      rows={3}
                      className="w-full rounded-xl border border-[#e0e5ef] bg-white px-4 py-2.5 text-[13px] text-[#0b1831] outline-none transition-colors focus:border-[#1763ff] focus:ring-1 focus:ring-[#1763ff] placeholder:text-slate-400"
                      name="coverLetter"
                      placeholder="Tell us why you're a great fit for this role..."
                    />
                  </div>

                  {submitMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`rounded-xl p-4 text-[13px] font-medium flex items-center gap-2.5 ${
                        submitMessage.type === "success"
                          ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
                          : "border border-red-200 bg-red-50 text-red-700"
                      }`}
                    >
                      {submitMessage.type === "success" ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                      )}
                      <span>{submitMessage.text}</span>
                    </motion.div>
                  )}
                </div>

                <div className="mt-8 flex items-center justify-between pt-2">
                  <span className="aqe-caption font-medium text-[#69758a]">
                    <span className="text-red-500">*</span> Required fields
                  </span>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex min-w-[170px] items-center justify-center gap-2 rounded-xl bg-[#1763ff] hover:bg-[#0e53e6] px-6 py-3 text-[14px] font-semibold text-white shadow-[0_4px_14px_rgba(23,99,255,0.25)] transition-all hover:shadow-[0_6px_20px_rgba(23,99,255,0.35)] hover:-translate-y-0.5 active:scale-95 disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                    {!isSubmitting && <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const CareersPage = CarrersPage;
