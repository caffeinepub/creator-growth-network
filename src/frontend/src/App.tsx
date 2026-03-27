import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActor } from "@/hooks/useActor";
import {
  ArrowRight,
  BarChart2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Loader2,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type {
  CreatorSimulationOutput,
  InvestorSimulationOutput,
} from "./backend.d";

type Mode = "investor" | "creator";

function formatRp(value: bigint | number): string {
  const num = typeof value === "bigint" ? Number(value) : value;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num);
}

// ─── Slide Data ────────────────────────────────────────────────────────────

interface SlideItem {
  label: string;
  value?: string;
}

interface Slide {
  number: number;
  label: string;
  title: string;
  subtitle?: string;
  quote?: string;
  items?: SlideItem[];
  note?: string;
}

const investorSlides: Slide[] = [
  {
    number: 1,
    label: "Cover",
    title: "Creator Growth Network",
    subtitle: "Building Indonesia's Creator Monetization Ecosystem",
    quote:
      "Menjembatani kreator berbakat dengan peluang monetisasi yang nyata.",
  },
  {
    number: 2,
    label: "Problem",
    title: "Masalah",
    subtitle: "Kesenjangan Besar di Ekosistem Kreator Indonesia",
    items: [
      { label: "Ledakan kreator akibat PHK & pergeseran ekonomi digital" },
      { label: "> 80% kreator tidak menghasilkan pendapatan signifikan" },
      { label: "Brand kesulitan menemukan kreator terkurasi & terverifikasi" },
      {
        label:
          "Monetisasi masih bergantung pada ads & gift — tidak stabil & tidak scalable",
      },
    ],
  },
  {
    number: 3,
    label: "Solution",
    title: "Solusi",
    subtitle: "Ekosistem 3-in-1 yang Belum Pernah Ada",
    items: [
      {
        label: "Aggregator",
        value: "Monetisasi konten berbasis performa & views",
      },
      {
        label: "Incubator",
        value: "Scaling akun & strategi growth terstruktur",
      },
      {
        label: "Talent Agency",
        value: "Menjembatani brand & kreator secara data-driven",
      },
    ],
  },
  {
    number: 4,
    label: "Value Prop",
    title: "Value Proposition",
    quote:
      "Kami tidak hanya membantu kreator berkembang. Kami memastikan kreator menghasilkan uang secara konsisten.",
    items: [
      { label: "Performance-based monetization" },
      { label: "Data-driven creator scoring & curation" },
      { label: "Multi-platform distribution engine" },
      { label: "Transparent revenue sharing" },
    ],
  },
  {
    number: 5,
    label: "Business Model",
    title: "Model Bisnis",
    subtitle: "Diversifikasi Revenue Stream",
    items: [
      {
        label: "Ad Revenue Sharing",
        value: "40% retained by CGN",
      },
      {
        label: "Brand Deal Fee",
        value: "20–30% komisi per deal",
      },
      {
        label: "Content Licensing",
        value: "Repurpose & distribusi lintas platform",
      },
      {
        label: "IP & Channel Ownership",
        value: "Valuasi & ekuitas kanal inkubasi",
      },
    ],
  },
  {
    number: 6,
    label: "Market",
    title: "Peluang Pasar",
    subtitle: "Pasar yang Besar & Belum Tersaturasi",
    items: [
      {
        label: "Creator Economy Indonesia",
        value: "tumbuh pesat pasca-pandemi",
      },
      {
        label: "UMKM & brand besar",
        value: "meningkat permintaan influencer marketing",
      },
      {
        label: "Gap besar",
        value: "antara jumlah kreator vs kreator yang termonetisasi",
      },
    ],
  },
  {
    number: 7,
    label: "Traction",
    title: "Traction",
    subtitle: "Pilot Program — 3 Talent Awal",
    items: [
      { label: "@reniristy7" },
      { label: "@indrimickschat253" },
      { label: "@iwanpenyet" },
    ],
    note: "Target 3 Bulan: 1 viral account · 10M total views · 10+ brand deals",
  },
  {
    number: 8,
    label: "Revenue",
    title: "Proyeksi Revenue",
    subtitle: "Dari 3 Talent ke 20 Talent",
    items: [
      { label: "Ad Revenue", value: "Rp 20–30 juta/bulan" },
      { label: "Brand Deals", value: "Rp 10–20 juta/bulan" },
      { label: "Licensing", value: "Rp 5–10 juta/bulan" },
      { label: "Total 3 Talent", value: "Rp 35–60 juta/bulan" },
    ],
    note: "Scale ke 20 Talent: Rp 150–300 juta/bulan",
  },
  {
    number: 9,
    label: "Go-to-Market",
    title: "Go-to-Market Strategy",
    subtitle: "Fokus Pertumbuhan Organik & Viral",
    items: [
      { label: "Fokus micro creator dengan high growth potential" },
      { label: "Bangun viral case sebagai social proof" },
      { label: "Gunakan network distribusi & repost antar platform" },
      { label: "Scale ke agency partnership & brand integration" },
    ],
  },
  {
    number: 10,
    label: "Advantage",
    title: "Keunggulan Kompetitif",
    subtitle: "Hybrid Model yang Sulit Ditiru",
    items: [
      { label: "Performance-based monetization" },
      { label: "Multi-platform distribution engine" },
      { label: "Data-driven creator scoring" },
      { label: "Hybrid model: Aggregator + Agency + Incubator" },
    ],
  },
  {
    number: 11,
    label: "Team",
    title: "Tim Awal",
    subtitle: "Kompeten & Siap Eksekusi",
    items: [
      { label: "Founder", value: "Strategy & Growth" },
      { label: "Content Strategist", value: "Konten & kurasi" },
      { label: "Brand Partnership Lead", value: "Relasi brand & deal" },
      { label: "Data & Analytics", value: "Scoring & performa" },
    ],
  },
  {
    number: 12,
    label: "Funding",
    title: "Kebutuhan Pendanaan",
    subtitle: "Investasi Awal: Rp 300–500 Juta",
    items: [
      { label: "Operasional & Tim", value: "40%" },
      { label: "Marketing & Distribusi", value: "30%" },
      { label: "Teknologi & Tools", value: "20%" },
      { label: "Cadangan & Contingency", value: "10%" },
    ],
  },
  {
    number: 13,
    label: "Vision",
    title: "Visi Jangka Panjang",
    quote:
      "Menjadi platform monetisasi kreator terbesar di Indonesia — menghubungkan ribuan kreator dengan jutaan peluang.",
    subtitle: "Platform #1 Creator Monetization di Indonesia",
  },
];

const creatorSlides: Slide[] = [
  {
    number: 1,
    label: "Cover",
    title: "Gabung Creator Growth Network",
    subtitle: "Ubah Konten Kamu Jadi Penghasilan Konsisten",
    quote: "Kamu sudah punya konten. Saatnya kontenmu menghasilkan uang.",
  },
  {
    number: 2,
    label: "Masalah",
    title: "Kamu Bukan Sendiri",
    subtitle: "Masalah yang Hampir Semua Kreator Rasakan",
    items: [
      {
        label: "Sudah upload rutin tapi pendapatan tidak ada atau tidak stabil",
      },
      { label: "Tidak tahu cara mendapatkan brand deal yang sesuai niche" },
      { label: "Growth akun stagnan dan tidak ada arah yang jelas" },
    ],
  },
  {
    number: 3,
    label: "Solusi",
    title: "Kami Hadir untuk Kamu",
    subtitle: "3 Hal yang CGN Bantu",
    items: [
      {
        label: "Monetisasi",
        value: "Hasilkan uang dari kontenmu mulai hari ini",
      },
      { label: "Scale Akun", value: "Strategi growth yang terbukti berhasil" },
      {
        label: "Brand Deal",
        value: "Akses langsung ke brand yang mencari kreator seperti kamu",
      },
    ],
  },
  {
    number: 4,
    label: "Benefit",
    title: "Yang Kamu Dapatkan",
    subtitle: "Paket Lengkap untuk Kreator Serius",
    items: [
      { label: "Strategi konten yang disesuaikan dengan niche & audiensmu" },
      { label: "Distribusi multi-platform untuk maksimalkan jangkauan" },
      { label: "Akses jaringan brand lokal & nasional" },
      { label: "Tim support penuh yang siap bantu setiap langkah" },
    ],
  },
  {
    number: 5,
    label: "Cara Kerja",
    title: "Cara Kerjanya Sederhana",
    subtitle: "4 Langkah Menuju Penghasilan Konsisten",
    items: [
      {
        label: "Join & Asesmen",
        value: "Kamu daftar & kami analisis potensimu",
      },
      { label: "Penentuan Strategi", value: "Roadmap konten & target bersama" },
      { label: "Produksi Konten", value: "Kamu buat, kami bantu distribusi" },
      { label: "Monetisasi", value: "Revenue masuk secara transparan" },
    ],
  },
  {
    number: 6,
    label: "Bagi Hasil",
    title: "Skema Bagi Hasil",
    subtitle: "Transparan & Menguntungkan Kreator",
    items: [
      { label: "Ad Revenue", value: "60% untuk kamu" },
      { label: "Brand Deal", value: "70–80% untuk kamu" },
      { label: "Content Licensing", value: "50:50 dengan CGN" },
    ],
    note: "Tidak ada biaya tersembunyi. Pembayaran tepat waktu setiap bulan.",
  },
  {
    number: 7,
    label: "Target",
    title: "Target Hasil Nyata",
    subtitle: "Dalam 3 Bulan Bersama CGN",
    items: [
      { label: "Pertumbuhan followers yang signifikan & organik" },
      { label: "Minimal 1 konten viral per platform" },
      { label: "Pendapatan bulanan pertama dari brand deal" },
    ],
  },
  {
    number: 8,
    label: "Keunggulan",
    title: "Kenapa CGN?",
    subtitle: "Bukan Janji, Ini Komitmen",
    items: [
      { label: "Fokus pada hasil nyata, bukan sekadar follower palsu" },
      { label: "Transparansi penuh dalam setiap rupiah yang masuk" },
      { label: "Dukungan tim profesional di setiap langkahmu" },
      { label: "Network brand yang siap kolaborasi" },
    ],
  },
  {
    number: 9,
    label: "CTA",
    title: "Siap Mulai?",
    subtitle: "Daftarkan Dirimu Sekarang",
    quote: "Gabung sekarang & mulai monetisasi konten kamu bersama CGN.",
  },
  {
    number: 10,
    label: "Penutup",
    title: "Satu Kata dari Kami",
    quote:
      "Kami tidak mencari kreator besar. Kami mencari kreator yang siap berkembang.",
    subtitle: "Bergabunglah. Mari tumbuh bersama.",
  },
];

// ─── Slide Component ───────────────────────────────────────────────────────

function SlideCard({
  slide,
  mode,
}: {
  slide: Slide;
  mode: Mode;
}) {
  const isInvestor = mode === "investor";

  return (
    <div className="flex flex-col h-full min-h-[420px] justify-between p-8 md:p-12">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <span
            className="text-xs font-body font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full border"
            style={{
              color: "oklch(var(--cgn-accent))",
              borderColor: "oklch(var(--cgn-accent) / 0.3)",
              backgroundColor: "oklch(var(--cgn-accent) / 0.08)",
            }}
          >
            {slide.label}
          </span>
          <span
            className="text-xs font-body"
            style={{ color: "oklch(var(--cgn-text-muted))" }}
          >
            {slide.number} /{" "}
            {isInvestor ? investorSlides.length : creatorSlides.length}
          </span>
        </div>

        <h2
          className="font-display font-bold mb-3 leading-tight"
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            color: isInvestor
              ? "oklch(var(--cgn-accent))"
              : "oklch(var(--cgn-text))",
          }}
        >
          {slide.title}
        </h2>

        {slide.subtitle && (
          <p
            className="font-body text-base md:text-lg mb-6"
            style={{ color: "oklch(var(--cgn-text-muted))" }}
          >
            {slide.subtitle}
          </p>
        )}

        {slide.quote && (
          <blockquote
            className="font-display italic text-xl md:text-2xl leading-relaxed my-6 pl-4 border-l-4"
            style={{
              color: "oklch(var(--cgn-text))",
              borderColor: "oklch(var(--cgn-accent))",
            }}
          >
            &ldquo;{slide.quote}&rdquo;
          </blockquote>
        )}

        {slide.items && slide.items.length > 0 && (
          <ul className="space-y-3 mt-4">
            {slide.items.map((item) => (
              <li key={item.label} className="flex items-start gap-3">
                <span
                  className="mt-1 shrink-0"
                  style={{ color: "oklch(var(--cgn-accent))" }}
                >
                  {item.value ? (
                    <ArrowRight className="w-4 h-4" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                </span>
                <span
                  className="font-body text-sm md:text-base"
                  style={{ color: "oklch(var(--cgn-text))" }}
                >
                  {item.value ? (
                    <>
                      <strong>{item.label}</strong> — {item.value}
                    </>
                  ) : (
                    item.label
                  )}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {slide.note && (
        <div
          className="mt-6 p-3 rounded-lg text-sm font-body font-medium"
          style={{
            backgroundColor: "oklch(var(--cgn-accent) / 0.1)",
            color: "oklch(var(--cgn-accent))",
          }}
        >
          {slide.note}
        </div>
      )}
    </div>
  );
}

// ─── Simulation Form & Results ─────────────────────────────────────────────

const NICHES = [
  "Lifestyle",
  "Kuliner",
  "Edukasi",
  "Hiburan",
  "Gaming",
  "Fashion",
  "Teknologi",
  "Bisnis",
  "Kesehatan",
  "Olahraga",
];

const PLATFORMS = ["TikTok", "YouTube", "Instagram", "Twitter/X"];

const GRADE_INFO: Record<
  string,
  { label: string; color: string; desc: string }
> = {
  A: {
    label: "Elite Creator",
    color: "oklch(0.73 0.14 83)",
    desc: "Potensi monetisasi premium. Siap untuk brand deal besar.",
  },
  B: {
    label: "Rising Star",
    color: "oklch(0.70 0.21 42)",
    desc: "Pertumbuhan kuat. Beberapa optimasi bisa mempercepat scale.",
  },
  C: {
    label: "Potensial",
    color: "oklch(0.65 0.18 180)",
    desc: "Potensi ada, butuh strategi konten yang lebih terarah.",
  },
  D: {
    label: "Perlu Pengembangan",
    color: "oklch(0.60 0.20 30)",
    desc: "Butuh pendampingan intensif untuk membangun fondasi yang kuat.",
  },
};

// ─── Main App ──────────────────────────────────────────────────────────────

export default function App() {
  const { actor } = useActor();
  const [mode, setMode] = useState<Mode>("investor");
  const [slideIndex, setSlideIndex] = useState(0);
  const [slideDir, setSlideDir] = useState(1);

  // Simulation form state
  const [followers, setFollowers] = useState("");
  const [avgViews, setAvgViews] = useState("");
  const [niche, setNiche] = useState("");
  const [platform, setPlatform] = useState("");
  const [loading, setLoading] = useState(false);
  const [investorResult, setInvestorResult] =
    useState<InvestorSimulationOutput | null>(null);
  const [creatorResult, setCreatorResult] =
    useState<CreatorSimulationOutput | null>(null);
  const [simError, setSimError] = useState("");

  const slides = mode === "investor" ? investorSlides : creatorSlides;
  const isInvestor = mode === "investor";

  function switchMode(newMode: Mode) {
    if (newMode === mode) return;
    setMode(newMode);
    setSlideIndex(0);
    setSlideDir(1);
  }

  function goSlide(dir: number) {
    const next = slideIndex + dir;
    if (next < 0 || next >= slides.length) return;
    setSlideDir(dir);
    setSlideIndex(next);
  }

  async function handleSimulate() {
    if (!followers || !avgViews || !niche || !platform) {
      setSimError("Harap isi semua field sebelum menjalankan simulasi.");
      return;
    }
    if (!actor) {
      setSimError(
        "Koneksi ke backend belum siap. Coba lagi dalam beberapa detik.",
      );
      return;
    }
    setSimError("");
    setLoading(true);
    setInvestorResult(null);
    setCreatorResult(null);
    try {
      const input = {
        followersCount: BigInt(Number(followers)),
        averageViews: BigInt(Number(avgViews)),
        niche,
        platform,
      };
      if (mode === "investor") {
        const result = await actor.runInvestorSimulation(input);
        setInvestorResult(result);
      } else {
        const result = await actor.runCreatorSimulation(input);
        setCreatorResult(result);
      }
    } catch {
      setSimError("Terjadi kesalahan saat simulasi. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  const currentYear = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  return (
    <div
      className={`cgn-app min-h-screen font-body ${
        isInvestor ? "cgn-investor" : "cgn-creator"
      }`}
      style={{
        backgroundColor: "oklch(var(--cgn-bg))",
        transition: "background-color 0.4s ease",
      }}
    >
      {/* ── HEADER ─────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 border-b backdrop-blur-md"
        style={{
          backgroundColor: "oklch(var(--cgn-bg) / 0.92)",
          borderColor: "oklch(var(--cgn-border))",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm"
              style={{
                backgroundColor: "oklch(var(--cgn-accent))",
                color: isInvestor ? "oklch(0.13 0.04 258)" : "white",
              }}
            >
              CGN
            </div>
            <span
              className="hidden sm:block font-display font-semibold text-base"
              style={{ color: "oklch(var(--cgn-text))" }}
            >
              Creator Growth Network
            </span>
          </div>

          {/* Mode Toggle */}
          <div
            className="flex items-center p-1 rounded-full gap-1"
            style={{ backgroundColor: "oklch(var(--cgn-card))" }}
          >
            <button
              type="button"
              data-ocid="mode.toggle"
              onClick={() => switchMode("investor")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-body font-semibold transition-all duration-300"
              style={{
                backgroundColor: isInvestor
                  ? "oklch(var(--cgn-accent))"
                  : "transparent",
                color: isInvestor
                  ? "oklch(0.13 0.04 258)"
                  : "oklch(var(--cgn-text-muted))",
              }}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mode Investor</span>
              <span className="sm:hidden">Investor</span>
            </button>
            <button
              type="button"
              data-ocid="mode.toggle"
              onClick={() => switchMode("creator")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-body font-semibold transition-all duration-300"
              style={{
                backgroundColor: !isInvestor
                  ? "oklch(var(--cgn-accent))"
                  : "transparent",
                color: !isInvestor ? "white" : "oklch(var(--cgn-text-muted))",
              }}
            >
              <Zap className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mode Kreator</span>
              <span className="sm:hidden">Kreator</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO ───────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.section
          key={`${mode}-hero`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden"
        >
          {isInvestor ? (
            /* Investor Hero */
            <div
              className="relative px-4 md:px-8 py-20 md:py-32"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.13 0.04 258) 0%, oklch(0.19 0.05 258) 100%)",
              }}
            >
              {/* Background decoration */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 70% 50%, oklch(0.73 0.14 83) 0%, transparent 60%)",
                }}
              />
              <div className="relative max-w-4xl mx-auto text-center">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="font-body text-xs font-bold tracking-[0.25em] uppercase mb-4"
                  style={{ color: "oklch(var(--cgn-accent))" }}
                >
                  Creator Growth Network
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-display font-bold leading-tight mb-6"
                  style={{
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                    color: "oklch(0.96 0 0)",
                  }}
                >
                  Masa Depan Monetisasi
                  <br />
                  <span style={{ color: "oklch(var(--cgn-accent))" }}>
                    Kreator di Indonesia
                  </span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-body text-lg md:text-xl max-w-2xl mx-auto mb-8"
                  style={{ color: "oklch(0.72 0.02 265)" }}
                >
                  Platform ekosistem kreator 3-in-1: Aggregator, Incubator &
                  Talent Agency — satu solusi untuk monetisasi kreator Indonesia
                  secara masif.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap gap-4 justify-center"
                >
                  <a href="#pitch-deck">
                    <button
                      type="button"
                      data-ocid="hero.primary_button"
                      className="px-6 py-3 rounded-full font-body font-semibold text-sm transition-all hover:shadow-gold-glow"
                      style={{
                        backgroundColor: "oklch(var(--cgn-accent))",
                        color: "oklch(0.13 0.04 258)",
                      }}
                    >
                      Lihat Pitch Deck →
                    </button>
                  </a>
                  <a href="#simulasi">
                    <button
                      type="button"
                      data-ocid="hero.secondary_button"
                      className="px-6 py-3 rounded-full font-body font-semibold text-sm border transition-all"
                      style={{
                        borderColor: "oklch(var(--cgn-accent) / 0.4)",
                        color: "oklch(var(--cgn-accent))",
                      }}
                    >
                      Jalankan Simulasi
                    </button>
                  </a>
                </motion.div>

                {/* Stats Row */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto"
                >
                  {[
                    { icon: Users, label: "Target Talent", value: "20+" },
                    {
                      icon: DollarSign,
                      label: "Proyeksi Bulanan",
                      value: "Rp 300 Jt",
                    },
                    {
                      icon: TrendingUp,
                      label: "Growth Target",
                      value: "10M Views",
                    },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="text-center">
                      <Icon
                        className="w-5 h-5 mx-auto mb-2"
                        style={{ color: "oklch(var(--cgn-accent))" }}
                      />
                      <div
                        className="font-display font-bold text-lg"
                        style={{ color: "oklch(0.96 0 0)" }}
                      >
                        {value}
                      </div>
                      <div
                        className="font-body text-xs"
                        style={{ color: "oklch(0.62 0.015 265)" }}
                      >
                        {label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          ) : (
            /* Creator Hero */
            <div
              className="relative px-4 md:px-8 py-20 md:py-28"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.74 0.17 72) 0%, oklch(0.70 0.21 42) 100%)",
              }}
            >
              <div className="relative max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 text-white text-sm font-body font-semibold"
                >
                  <Zap className="w-4 h-4" />
                  Untuk Kreator Indonesia
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-display font-bold text-white leading-tight mb-4"
                  style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
                >
                  Kontenmu Sudah Ada.
                  <br />
                  Saatnya{" "}
                  <span className="underline decoration-white/50 decoration-4">
                    Menghasilkan
                  </span>
                  .
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-body text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8"
                >
                  CGN hadir untuk membantu kreator Indonesia mendapatkan
                  penghasilan konsisten dari konten yang mereka cintai.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap gap-4 justify-center"
                >
                  <a href="#pitch-deck">
                    <button
                      type="button"
                      data-ocid="hero.primary_button"
                      className="px-6 py-3 rounded-full font-body font-bold text-sm bg-white transition-all hover:shadow-orange-glow"
                      style={{ color: "oklch(0.70 0.21 42)" }}
                    >
                      Pelajari Lebih Lanjut →
                    </button>
                  </a>
                  <a href="#simulasi">
                    <button
                      type="button"
                      data-ocid="hero.secondary_button"
                      className="px-6 py-3 rounded-full font-body font-semibold text-sm border-2 border-white text-white transition-all hover:bg-white/10"
                    >
                      Cek Valuasi Akunmu
                    </button>
                  </a>
                </motion.div>
              </div>
            </div>
          )}
        </motion.section>
      </AnimatePresence>

      {/* ── PITCH DECK ─────────────────────────────────────── */}
      <section
        id="pitch-deck"
        className="py-16 md:py-24 px-4 md:px-8"
        style={{ backgroundColor: "oklch(var(--cgn-bg2))" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="font-display font-bold text-3xl md:text-4xl mb-3"
              style={{ color: "oklch(var(--cgn-text))" }}
            >
              {isInvestor ? "Pitch Deck" : "Kenali CGN"}
            </h2>
            <p
              className="font-body text-base"
              style={{ color: "oklch(var(--cgn-text-muted))" }}
            >
              {isInvestor
                ? "Navigasi slide untuk melihat detail investasi & proyeksi bisnis"
                : "Semua yang perlu kamu tahu sebelum bergabung"}
            </p>
          </div>

          {/* Slide Card */}
          <div
            className="relative rounded-2xl overflow-hidden shadow-xl border"
            style={{
              backgroundColor: "oklch(var(--cgn-card))",
              borderColor: "oklch(var(--cgn-border))",
            }}
          >
            <div className="min-h-[460px] md:min-h-[420px] relative">
              <AnimatePresence mode="wait" custom={slideDir}>
                <motion.div
                  key={`${mode}-${slideIndex}`}
                  custom={slideDir}
                  variants={{
                    enter: (dir: number) => ({
                      x: dir > 0 ? 60 : -60,
                      opacity: 0,
                    }),
                    center: { x: 0, opacity: 1 },
                    exit: (dir: number) => ({
                      x: dir > 0 ? -60 : 60,
                      opacity: 0,
                    }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <SlideCard slide={slides[slideIndex]} mode={mode} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div
              className="flex items-center justify-between px-6 md:px-8 py-4 border-t"
              style={{ borderColor: "oklch(var(--cgn-border))" }}
            >
              <button
                type="button"
                data-ocid="deck.pagination_prev"
                onClick={() => goSlide(-1)}
                disabled={slideIndex === 0}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-body text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80"
                style={{
                  backgroundColor: "oklch(var(--cgn-card2))",
                  color: "oklch(var(--cgn-text))",
                }}
              >
                <ChevronLeft className="w-4 h-4" />
                Prev
              </button>

              {/* Dots */}
              <div className="flex items-center gap-1.5">
                {slides.map((slide, i) => (
                  <button
                    type="button"
                    key={slide.label + slide.number}
                    onClick={() => {
                      setSlideDir(i > slideIndex ? 1 : -1);
                      setSlideIndex(i);
                    }}
                    className="rounded-full transition-all duration-200"
                    style={{
                      width: i === slideIndex ? 20 : 6,
                      height: 6,
                      backgroundColor:
                        i === slideIndex
                          ? "oklch(var(--cgn-accent))"
                          : "oklch(var(--cgn-border))",
                    }}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                data-ocid="deck.pagination_next"
                onClick={() => goSlide(1)}
                disabled={slideIndex === slides.length - 1}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-body text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80"
                style={{
                  backgroundColor: "oklch(var(--cgn-card2))",
                  color: "oklch(var(--cgn-text))",
                }}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Slide tabs */}
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {slides.map((s, i) => (
              <button
                type="button"
                key={s.label}
                data-ocid="deck.tab"
                onClick={() => {
                  setSlideDir(i > slideIndex ? 1 : -1);
                  setSlideIndex(i);
                }}
                className="px-3 py-1 rounded-full text-xs font-body font-medium transition-all"
                style={{
                  backgroundColor:
                    i === slideIndex
                      ? "oklch(var(--cgn-accent))"
                      : "oklch(var(--cgn-card))",
                  color:
                    i === slideIndex
                      ? isInvestor
                        ? "oklch(0.13 0.04 258)"
                        : "white"
                      : "oklch(var(--cgn-text-muted))",
                  border: "1px solid oklch(var(--cgn-border))",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── SIMULATION ─────────────────────────────────────── */}
      <section
        id="simulasi"
        className="py-16 md:py-24 px-4 md:px-8"
        style={{ backgroundColor: "oklch(var(--cgn-bg))" }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Badge
              className="mb-4 font-body"
              style={{
                backgroundColor: "oklch(var(--cgn-accent) / 0.12)",
                color: "oklch(var(--cgn-accent))",
                border: "none",
              }}
            >
              {isInvestor ? "📊 Investor Simulator" : "💡 Creator Simulator"}
            </Badge>
            <h2
              className="font-display font-bold text-3xl md:text-4xl mb-3"
              style={{ color: "oklch(var(--cgn-text))" }}
            >
              {isInvestor
                ? "Simulasi Potensi Investasi"
                : "Cek Valuasi Akun Kamu"}
            </h2>
            <p
              className="font-body text-base max-w-lg mx-auto"
              style={{ color: "oklch(var(--cgn-text-muted))" }}
            >
              {isInvestor
                ? "Masukkan data kreator untuk melihat proyeksi revenue, CPM, dan ROI jika kamu berinvestasi."
                : "Masukkan data akunmu untuk mengetahui valuasi, potensi penghasilan, dan rekomendasi dari CGN."}
            </p>
          </div>

          {/* Form Card */}
          <div
            className="rounded-2xl p-6 md:p-8 border shadow-xl"
            style={{
              backgroundColor: "oklch(var(--cgn-card))",
              borderColor: "oklch(var(--cgn-border))",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label
                  className="font-body text-sm font-semibold"
                  style={{ color: "oklch(var(--cgn-text))" }}
                >
                  Jumlah Followers
                </Label>
                <Input
                  data-ocid="sim.input"
                  type="number"
                  placeholder="Contoh: 50000"
                  value={followers}
                  onChange={(e) => setFollowers(e.target.value)}
                  className="font-body"
                  style={{
                    backgroundColor: "oklch(var(--cgn-card2))",
                    borderColor: "oklch(var(--cgn-border))",
                    color: "oklch(var(--cgn-text))",
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label
                  className="font-body text-sm font-semibold"
                  style={{ color: "oklch(var(--cgn-text))" }}
                >
                  Rata-rata Views per Konten
                </Label>
                <Input
                  data-ocid="sim.input"
                  type="number"
                  placeholder="Contoh: 5000"
                  value={avgViews}
                  onChange={(e) => setAvgViews(e.target.value)}
                  className="font-body"
                  style={{
                    backgroundColor: "oklch(var(--cgn-card2))",
                    borderColor: "oklch(var(--cgn-border))",
                    color: "oklch(var(--cgn-text))",
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label
                  className="font-body text-sm font-semibold"
                  style={{ color: "oklch(var(--cgn-text))" }}
                >
                  Niche Konten
                </Label>
                <Select value={niche} onValueChange={setNiche}>
                  <SelectTrigger
                    data-ocid="sim.select"
                    className="font-body"
                    style={{
                      backgroundColor: "oklch(var(--cgn-card2))",
                      borderColor: "oklch(var(--cgn-border))",
                      color: niche
                        ? "oklch(var(--cgn-text))"
                        : "oklch(var(--cgn-text-muted))",
                    }}
                  >
                    <SelectValue placeholder="Pilih niche..." />
                  </SelectTrigger>
                  <SelectContent>
                    {NICHES.map((n) => (
                      <SelectItem key={n} value={n} className="font-body">
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label
                  className="font-body text-sm font-semibold"
                  style={{ color: "oklch(var(--cgn-text))" }}
                >
                  Platform Utama
                </Label>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger
                    data-ocid="sim.select"
                    className="font-body"
                    style={{
                      backgroundColor: "oklch(var(--cgn-card2))",
                      borderColor: "oklch(var(--cgn-border))",
                      color: platform
                        ? "oklch(var(--cgn-text))"
                        : "oklch(var(--cgn-text-muted))",
                    }}
                  >
                    <SelectValue placeholder="Pilih platform..." />
                  </SelectTrigger>
                  <SelectContent>
                    {PLATFORMS.map((p) => (
                      <SelectItem key={p} value={p} className="font-body">
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {simError && (
              <p
                data-ocid="sim.error_state"
                className="mt-4 text-sm font-body"
                style={{ color: "oklch(0.60 0.20 25)" }}
              >
                {simError}
              </p>
            )}

            <button
              type="button"
              data-ocid="sim.submit_button"
              onClick={handleSimulate}
              disabled={loading}
              className="mt-6 w-full py-3 rounded-xl font-body font-bold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-60"
              style={{
                backgroundColor: "oklch(var(--cgn-accent))",
                color: isInvestor ? "oklch(0.13 0.04 258)" : "white",
              }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Menghitung...
                </>
              ) : (
                <>
                  <Target className="w-4 h-4" />
                  Jalankan Simulasi
                </>
              )}
            </button>
          </div>

          {/* ── Results ── */}
          <AnimatePresence>
            {loading && (
              <motion.div
                data-ocid="sim.loading_state"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-8 text-center"
              >
                <Loader2
                  className="w-8 h-8 animate-spin mx-auto mb-3"
                  style={{ color: "oklch(var(--cgn-accent))" }}
                />
                <p
                  className="font-body text-sm"
                  style={{ color: "oklch(var(--cgn-text-muted))" }}
                >
                  Menghitung simulasi...
                </p>
              </motion.div>
            )}

            {investorResult && !loading && (
              <motion.div
                data-ocid="sim.success_state"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-8"
              >
                <h3
                  className="font-display font-bold text-xl mb-6 text-center"
                  style={{ color: "oklch(var(--cgn-accent))" }}
                >
                  Hasil Simulasi Investor
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    {
                      label: "Estimasi CPM",
                      value: `Rp ${investorResult.estimatedCPM.toLocaleString("id-ID")}`,
                      icon: BarChart2,
                    },
                    {
                      label: "Nilai Brand Deal",
                      value: formatRp(investorResult.brandDealValue),
                      icon: Star,
                    },
                    {
                      label: "Proyeksi Revenue CGN",
                      value: formatRp(
                        investorResult.cgnProjectedMonthlyRevenue,
                      ),
                      icon: DollarSign,
                    },
                    {
                      label: "ROI Proyeksi",
                      value: `${investorResult.roiScalingProjectionPercent.toFixed(1)}%`,
                      icon: TrendingUp,
                    },
                  ].map(({ label, value, icon: Icon }) => (
                    <div
                      key={label}
                      className="rounded-xl p-4 border text-center"
                      style={{
                        backgroundColor: "oklch(var(--cgn-card))",
                        borderColor: "oklch(var(--cgn-accent) / 0.25)",
                      }}
                    >
                      <Icon
                        className="w-5 h-5 mx-auto mb-2"
                        style={{ color: "oklch(var(--cgn-accent))" }}
                      />
                      <div
                        className="font-display font-bold text-base md:text-lg mb-1"
                        style={{ color: "oklch(var(--cgn-accent))" }}
                      >
                        {value}
                      </div>
                      <div
                        className="font-body text-xs"
                        style={{ color: "oklch(var(--cgn-text-muted))" }}
                      >
                        {label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Scaling Table */}
                <div
                  className="rounded-xl border overflow-hidden"
                  style={{ borderColor: "oklch(var(--cgn-border))" }}
                >
                  <div
                    className="px-5 py-3 border-b"
                    style={{
                      backgroundColor: "oklch(var(--cgn-card2))",
                      borderColor: "oklch(var(--cgn-border))",
                    }}
                  >
                    <p
                      className="font-body font-semibold text-sm"
                      style={{ color: "oklch(var(--cgn-text))" }}
                    >
                      Proyeksi Revenue Jika Scaling Talent
                    </p>
                  </div>
                  <div
                    className="divide-y"
                    style={{ backgroundColor: "oklch(var(--cgn-card))" }}
                  >
                    {([5, 10, 20] as const).map((mult) => (
                      <div
                        key={mult}
                        className="flex items-center justify-between px-5 py-3"
                        style={{ borderColor: "oklch(var(--cgn-border))" }}
                      >
                        <span
                          className="font-body text-sm"
                          style={{ color: "oklch(var(--cgn-text-muted))" }}
                        >
                          Scale {mult}x Talent
                        </span>
                        <span
                          className="font-body font-bold text-sm"
                          style={{ color: "oklch(var(--cgn-accent))" }}
                        >
                          {formatRp(
                            BigInt(mult) *
                              investorResult.cgnProjectedMonthlyRevenue,
                          )}
                          /bln
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {creatorResult && !loading && (
              <motion.div
                data-ocid="sim.success_state"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-8 space-y-5"
              >
                <h3
                  className="font-display font-bold text-xl text-center"
                  style={{ color: "oklch(var(--cgn-accent))" }}
                >
                  Hasil Asesmen Kreator
                </h3>

                {/* Grade Card */}
                {(() => {
                  const grade = creatorResult.valuationGrade;
                  const info = GRADE_INFO[grade] ?? {
                    label: grade,
                    color: "oklch(0.60 0.10 150)",
                    desc: "",
                  };
                  return (
                    <div
                      className="rounded-xl p-6 border text-center"
                      style={{
                        backgroundColor: "oklch(var(--cgn-card))",
                        borderColor: `${info.color}40`,
                      }}
                    >
                      <div
                        className="font-display font-bold text-6xl mb-2"
                        style={{ color: info.color }}
                      >
                        {grade}
                      </div>
                      <div
                        className="font-display font-bold text-xl mb-2"
                        style={{ color: "oklch(var(--cgn-text))" }}
                      >
                        {info.label}
                      </div>
                      <p
                        className="font-body text-sm"
                        style={{ color: "oklch(var(--cgn-text-muted))" }}
                      >
                        {info.desc}
                      </p>
                    </div>
                  );
                })()}

                {/* Income + Growth */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className="rounded-xl p-5 border"
                    style={{
                      backgroundColor: "oklch(var(--cgn-card))",
                      borderColor: "oklch(var(--cgn-accent) / 0.25)",
                    }}
                  >
                    <p
                      className="font-body text-xs font-semibold uppercase tracking-wide mb-2"
                      style={{ color: "oklch(var(--cgn-text-muted))" }}
                    >
                      Estimasi Penghasilan Bulanan
                    </p>
                    <p
                      className="font-display font-bold text-2xl"
                      style={{ color: "oklch(var(--cgn-accent))" }}
                    >
                      {formatRp(creatorResult.estimatedMonthlyIncome)}
                    </p>
                    <p
                      className="font-body text-xs mt-2"
                      style={{ color: "oklch(var(--cgn-text-muted))" }}
                    >
                      Gabungan ad revenue + brand deal (60–80% untuk kreator)
                    </p>
                  </div>

                  <div
                    className="rounded-xl p-5 border"
                    style={{
                      backgroundColor: "oklch(var(--cgn-card))",
                      borderColor: "oklch(var(--cgn-accent) / 0.25)",
                    }}
                  >
                    <p
                      className="font-body text-xs font-semibold uppercase tracking-wide mb-2"
                      style={{ color: "oklch(var(--cgn-text-muted))" }}
                    >
                      Skor Potensi Growth
                    </p>
                    <div className="flex items-end gap-2 mb-3">
                      <span
                        className="font-display font-bold text-2xl"
                        style={{ color: "oklch(var(--cgn-accent))" }}
                      >
                        {Number(creatorResult.growthPotentialScore)}
                      </span>
                      <span
                        className="font-body text-sm mb-0.5"
                        style={{ color: "oklch(var(--cgn-text-muted))" }}
                      >
                        / 100
                      </span>
                    </div>
                    <Progress
                      value={Number(creatorResult.growthPotentialScore)}
                      className="h-2"
                      style={
                        {
                          // Override progress bar color via CSS
                          // The value drives the width
                        }
                      }
                    />
                  </div>
                </div>

                {/* Recommendations */}
                {creatorResult.recommendations.length > 0 && (
                  <div
                    className="rounded-xl p-5 border"
                    style={{
                      backgroundColor: "oklch(var(--cgn-card))",
                      borderColor: "oklch(var(--cgn-border))",
                    }}
                  >
                    <p
                      className="font-body text-xs font-semibold uppercase tracking-wide mb-3"
                      style={{ color: "oklch(var(--cgn-text-muted))" }}
                    >
                      Rekomendasi CGN untuk Kamu
                    </p>
                    <ul className="space-y-2">
                      {creatorResult.recommendations.map((rec, i) => (
                        <li
                          key={rec.slice(0, 20)}
                          className="flex items-start gap-3"
                          data-ocid={`sim.item.${i + 1}`}
                        >
                          <CheckCircle2
                            className="w-4 h-4 mt-0.5 shrink-0"
                            style={{ color: "oklch(var(--cgn-accent))" }}
                          />
                          <span
                            className="font-body text-sm"
                            style={{ color: "oklch(var(--cgn-text))" }}
                          >
                            {rec}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer
        className="py-8 px-4 md:px-8 border-t"
        style={{
          backgroundColor: "oklch(var(--cgn-bg))",
          borderColor: "oklch(var(--cgn-border))",
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center font-display font-bold text-xs"
              style={{
                backgroundColor: "oklch(var(--cgn-accent))",
                color: isInvestor ? "oklch(0.13 0.04 258)" : "white",
              }}
            >
              CGN
            </div>
            <span
              className="font-body text-sm font-semibold"
              style={{ color: "oklch(var(--cgn-text))" }}
            >
              Creator Growth Network
            </span>
          </div>

          <p
            className="font-body text-xs text-center"
            style={{ color: "oklch(var(--cgn-text-muted))" }}
          >
            © {currentYear}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "oklch(var(--cgn-accent))" }}
              className="hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
