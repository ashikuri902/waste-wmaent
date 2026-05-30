import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import {
  Truck,
  Shield,
  Heart,
  DollarSign,
  GraduationCap,
  TrendingUp,
  Clock,
  Eye,
  MapPin,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  ArrowUpRight,
  Star,
  Award,
  Users,
  Building2,
  Phone,
  Mail,
  Sparkles,
  Fuel,
  Wrench,
  Briefcase,
  Play,
  Quote,
  Leaf,
} from "lucide-react";

// Inline social icons (lucide-react doesn't ship brand icons)
const SocialFacebook = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.2-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3z"/></svg>
);
const SocialTwitter = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M18.9 5.2c-.7.3-1.4.5-2.2.6.8-.5 1.4-1.2 1.7-2.1-.8.5-1.6.8-2.5 1-.7-.8-1.8-1.3-3-1.3-2.3 0-4.1 1.8-4.1 4.1 0 .3 0 .6.1.9-3.4-.2-6.4-1.8-8.4-4.3-.4.6-.6 1.3-.6 2.1 0 1.4.7 2.7 1.8 3.4-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.7 3.3 4.1-.3.1-.7.1-1.1.1-.3 0-.5 0-.8-.1.5 1.7 2.1 2.9 3.9 2.9-1.4 1.1-3.2 1.8-5.2 1.8H2c1.8 1.2 4 1.8 6.3 1.8 7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1z"/></svg>
);
const SocialLinkedin = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM8.3 18.3H5.7V9.8h2.6v8.5zM7 8.6c-.8 0-1.5-.7-1.5-1.5S6.2 5.6 7 5.6s1.5.7 1.5 1.5S7.8 8.6 7 8.6zm11.3 9.7h-2.6v-4.1c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2v4.2h-2.6V9.8h2.5v1.2h.1c.3-.7 1.2-1.4 2.5-1.4 2.7 0 3.2 1.8 3.2 4.1v4.6z"/></svg>
);
const SocialInstagram = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.9.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.9.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.9-.9-1.4-.2-.4-.4-1-.4-2.2-.1-1.3-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.9-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.3-.1 1.6-.1 4.8-.1zM12 0C8.7 0 8.3 0 7.1.1 5.8.1 5 .3 4.2.6c-.8.3-1.5.7-2.2 1.4C1.3 2.7.9 3.4.6 4.2.3 5 .1 5.8.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.1 1.3.2 2.1.5 2.9.3.8.7 1.5 1.4 2.2.7.7 1.4 1.1 2.2 1.4.8.3 1.6.5 2.9.5C8.3 24 8.7 24 12 24s3.7 0 4.9-.1c1.3-.1 2.1-.2 2.9-.5.8-.3 1.5-.7 2.2-1.4.7-.7 1.1-1.4 1.4-2.2.3-.8.5-1.6.5-2.9.1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.1-1.3-.2-2.1-.5-2.9-.3-.8-.7-1.5-1.4-2.2C21.3 1.3 20.6.9 19.8.6 19 .3 18.2.1 16.9.1 15.7 0 15.3 0 12 0zm0 5.8c-3.4 0-6.2 2.8-6.2 6.2s2.8 6.2 6.2 6.2 6.2-2.8 6.2-6.2-2.8-6.2-6.2-6.2zm0 10.2c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm6.4-11.8c-.8 0-1.4.6-1.4 1.4s.6 1.4 1.4 1.4 1.4-.6 1.4-1.4-.6-1.4-1.4-1.4z"/></svg>
);
const SocialYoutube = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M23.5 6.2c-.3-1-1.1-1.8-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5c-1 .3-1.8 1.1-2.1 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8c.3 1 1.1 1.8 2.1 2.1 1.9.6 9.4.6 9.4.6s7.5 0 9.4-.5c1-.3 1.8-1.1 2.1-2.1.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.9zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg>
);
const SOCIALS = [SocialFacebook, SocialTwitter, SocialLinkedin, SocialInstagram, SocialYoutube];

// ====================== LINKS ======================
const APPLY_URL = "https://www.facebook.com";
const JOBS_URL = "https://www.facebook.com";
const CONTACT_URL = "https://www.facebook.com";

// ====================== DATA ======================
const NAV = [
  { label: "Benefits", href: "#benefits" },
  { label: "Careers", href: "#jobs" },
  { label: "Why Us", href: "#why" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

const STATS = [
  { value: 50000, suffix: "+", label: "Employees Nationwide", icon: Users },
  { value: 20000, suffix: "+", label: "Fleet Vehicles", icon: Truck },
  { value: 500, suffix: "+", label: "Locations in USA", icon: Building2 },
  { value: 98, suffix: "%", label: "Benefits Satisfaction", icon: Heart },
];

const BENEFITS = [
  { icon: DollarSign, title: "Weekly Pay", desc: "Competitive pay deposited directly to your account every single week.", color: "from-emerald-500/20 to-emerald-700/10" },
  { icon: Heart, title: "Medical Insurance", desc: "Comprehensive medical coverage for you and your entire family.", color: "from-blue-500/20 to-blue-700/10" },
  { icon: Eye, title: "Dental & Vision", desc: "Full dental and vision plans included in your benefits package.", color: "from-cyan-500/20 to-cyan-700/10" },
  { icon: TrendingUp, title: "401(k) Retirement", desc: "Company-matched retirement plan to secure your future.", color: "from-amber-500/20 to-amber-700/10" },
  { icon: Calendar, title: "Paid Time Off", desc: "Generous PTO, paid holidays, and personal days off each year.", color: "from-purple-500/20 to-purple-700/10" },
  { icon: GraduationCap, title: "CDL Training", desc: "Free CDL training and tuition reimbursement programs.", color: "from-pink-500/20 to-pink-700/10" },
  { icon: TrendingUp, title: "Career Growth", desc: "Clear pathways to leadership and management roles.", color: "from-rose-500/20 to-rose-700/10" },
  { icon: Shield, title: "Job Security", desc: "Essential industry with stable, recession-proof employment.", color: "from-emerald-500/20 to-teal-700/10" },
];

const JOBS = [
  {
    title: "CDL Truck Driver",
    salary: "$75,000 - $95,000",
    location: "Nationwide",
    schedule: "Full-time · Day Shift",
    requirements: ["Class A CDL Required", "1+ Year Experience", "Clean MVR", "DOT Medical Card"],
    tag: "High Demand",
    icon: Truck,
  },
  {
    title: "Residential Collection Driver",
    salary: "$65,000 - $85,000",
    location: "All 50 States",
    schedule: "Mon–Fri · Early AM",
    requirements: ["Class B CDL", "Home Daily", "Physical Stamina", "Safety Focused"],
    tag: "Home Daily",
    icon: Building2,
  },
  {
    title: "Roll-Off Driver",
    salary: "$70,000 - $90,000",
    location: "Major Metro Areas",
    schedule: "Full-time · Flexible",
    requirements: ["Class A or B CDL", "Commercial Exp.", "Heavy Lifting", "Customer Service"],
    tag: "Premium Pay",
    icon: Fuel,
  },
  {
    title: "Commercial Route Driver",
    salary: "$72,000 - $92,000",
    location: "Urban Centers",
    schedule: "4-Day Work Week",
    requirements: ["Class B CDL", "2+ Years Experience", "Route Knowledge", "Time Management"],
    tag: "4-Day Week",
    icon: MapPin,
  },
  {
    title: "Fleet Maintenance Technician",
    salary: "$60,000 - $85,000",
    location: "All Locations",
    schedule: "Day / Night Shifts",
    requirements: ["Diesel Cert.", "Hydraulic Systems", "Tool Set Required", "CDL Preferred"],
    tag: "Technical",
    icon: Wrench,
  },
  {
    title: "Transportation Supervisor",
    salary: "$80,000 - $110,000",
    location: "Regional Hubs",
    schedule: "Full-time · Salary",
    requirements: ["5+ Years Fleet Exp.", "DOT Compliance", "Leadership Skills", "CDL Required"],
    tag: "Leadership",
    icon: Briefcase,
  },
];

const WHY_JOIN = [
  { icon: Award, title: "Industry Leadership", desc: "We are the #1 environmental services provider in North America, setting the standard for excellence in waste management for over 50 years.", img: "https://images.pexels.com/photos/11115607/pexels-photo-11115607.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200" },
  { icon: Shield, title: "Stable Employment", desc: "Essential services mean essential jobs. Our team members enjoy recession-proof careers with consistent demand year after year.", img: "https://images.pexels.com/photos/15432186/pexels-photo-15432186.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200" },
  { icon: Truck, title: "Modern Equipment", desc: "Operate the latest fleet featuring automatic transmissions, backup cameras, and advanced safety technology across 20,000+ vehicles.", img: "https://images.pexels.com/photos/11077610/pexels-photo-11077610.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200" },
  { icon: Heart, title: "Safety Culture", desc: "Your safety is our #1 priority. Comprehensive training, modern PPE, and industry-leading safety protocols keep our team protected.", img: "https://images.pexels.com/photos/37367091/pexels-photo-37367091.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200" },
  { icon: Leaf, title: "Growth & Impact", desc: "Advance your career while making a real environmental impact. From driver to supervisor to regional management — the path is yours.", img: "https://images.pexels.com/photos/36397860/pexels-photo-36397860.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200" },
];

const TESTIMONIALS = [
  {
    quote: "I've been driving for 12 years and this is the best company I've ever worked for. The benefits are incredible, I'm home every night with my family, and I finally feel valued.",
    name: "Marcus Johnson",
    role: "CDL Driver · 12 Years",
    img: "https://images.pexels.com/photos/14797991/pexels-photo-14797991.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400",
    rating: 5,
  },
  {
    quote: "Started as a helper, got my CDL through their training program, and now I'm a route supervisor. They truly invest in your career growth.",
    name: "Sarah Mitchell",
    role: "Route Supervisor · 8 Years",
    img: "https://images.pexels.com/photos/14797989/pexels-photo-14797989.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400",
    rating: 5,
  },
  {
    quote: "The weekly pay and full benefits changed my life. My family has real healthcare coverage and I'm building retirement savings for the first time.",
    name: "David Rodriguez",
    role: "Residential Driver · 5 Years",
    img: "https://images.pexels.com/photos/6720522/pexels-photo-6720522.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400",
    rating: 5,
  },
  {
    quote: "Modern trucks, safe environment, great team. I retired from the military and this felt like the same brotherhood and purpose.",
    name: "James Thompson",
    role: "Fleet Technician · 6 Years",
    img: "https://images.pexels.com/photos/14797996/pexels-photo-14797996.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400",
    rating: 5,
  },
];

const PROCESS = [
  { step: "01", title: "Apply Online", desc: "Submit your application in under 5 minutes through our secure portal.", icon: Briefcase },
  { step: "02", title: "Recruiter Review", desc: "Our team reviews your qualifications within 24-48 business hours.", icon: Eye },
  { step: "03", title: "Interview", desc: "Meet with hiring managers — in-person or virtual interview options.", icon: Users },
  { step: "04", title: "Background Check", desc: "Complete standard DOT-compliant background and MVR screening.", icon: Shield },
  { step: "05", title: "Offer Letter", desc: "Receive a competitive offer with full benefits package details.", icon: CheckCircle2 },
  { step: "06", title: "Start Training", desc: "Begin paid training and orientation at your local facility.", icon: GraduationCap },
];

const FAQS = [
  { q: "Is a CDL required to apply?", a: "A valid Class A or B CDL is required for most driving positions. However, we offer paid CDL training programs for qualified candidates who don't yet have their license. Helper and technician roles may not require a CDL." },
  { q: "What benefits are available?", a: "We offer comprehensive benefits including medical, dental, and vision insurance, 401(k) with company match, paid time off, paid holidays, life insurance, disability coverage, tuition reimbursement, and employee wellness programs starting as early as day one." },
  { q: "Where are you hiring?", a: "We operate in all 50 states, the District of Columbia, and Canada with over 500 locations nationwide. Whether you're in a major metro area or a smaller community, we likely have openings near you." },
  { q: "Is training provided?", a: "Absolutely. All new hires receive paid orientation, safety training, and route-specific training. Our mentorship programs pair you with experienced drivers during your first weeks on the job." },
  { q: "What is the typical work schedule?", a: "Most residential routes operate Monday–Friday with early morning start times, meaning you're home every evening. Commercial and roll-off positions offer flexible 4-day work weeks. Overtime opportunities are available for those who want them." },
  { q: "How much do drivers earn?", a: "Driver compensation ranges from $65,000 to $95,000+ annually depending on role, experience, and location. Weekly pay, performance bonuses, and annual raises make total compensation highly competitive." },
];

const GALLERY = [
  { src: "https://images.pexels.com/photos/11077610/pexels-photo-11077610.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=900", title: "Urban Collection" },
  { src: "https://images.pexels.com/photos/11115607/pexels-photo-11115607.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=900", title: "Fleet Operations" },
  { src: "https://images.pexels.com/photos/15432186/pexels-photo-15432186.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=900", title: "Professional Team" },
  { src: "https://images.pexels.com/photos/37367091/pexels-photo-37367091.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=900", title: "Recycling Facility" },
  { src: "https://images.pexels.com/photos/15042280/pexels-photo-15042280.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=900", title: "Night Operations" },
  { src: "https://images.pexels.com/photos/36397860/pexels-photo-36397860.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=900", title: "Modern Equipment" },
  { src: "https://images.pexels.com/photos/5099276/pexels-photo-5099276.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=900", title: "Sustainability" },
  { src: "https://images.pexels.com/photos/5252350/pexels-photo-5252350.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=900", title: "Daily Operations" },
];

// ====================== HELPERS ======================
function AnimatedCounter({ target, suffix = "", duration = 2 }: { target: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

// ====================== NAV ======================
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass-dark py-3" : "py-5"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-shadow">
            <Truck className="w-5 h-5 text-navy-950" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display font-bold text-white text-sm sm:text-base">WM Careers</span>
            <span className="text-[10px] sm:text-xs text-emerald-400 font-medium tracking-wider uppercase">USA</span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={JOBS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-slate-200 hover:text-white transition-colors px-4 py-2"
          >
            View Positions
          </a>
          <a
            href={APPLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.03] transition-all"
          >
            Apply Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 text-white"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-dark mt-3 mx-4 rounded-2xl overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-2">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-slate-200 hover:bg-white/5 rounded-lg transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 px-4 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-center font-semibold"
              >
                Apply Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// ====================== HERO ======================
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* BG Image with parallax */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/11077610/pexels-photo-11077610.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=2400"
          alt="Waste management trucks and professional drivers"
          loading="eager"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/90 via-navy-950/75 to-navy-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/50 to-transparent" />
      </motion.div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div style={{ opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8"
          >
            <span className="relative flex w-2 h-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-xs sm:text-sm font-medium text-slate-200">Now Hiring · 2,400+ Open Positions Nationwide</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[1.02] tracking-tight text-white mb-6"
          >
            Drive Your Future <br />
            With <span className="text-gradient">Waste Management</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl leading-relaxed mb-10"
          >
            Join one of America's leading environmental service companies. Competitive pay, benefits,
            career growth, and long-term stability — all while making a real impact on your community.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <a
              href={APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/60 hover:scale-[1.03] transition-all text-base"
            >
              <span className="absolute inset-0 rounded-full bg-emerald-400 blur-xl opacity-30 group-hover:opacity-60 transition-opacity" />
              <span className="relative flex items-center gap-2">
                Apply Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            <a
              href={JOBS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full glass text-white font-semibold hover:bg-white/10 transition-all text-base"
            >
              View Open Positions
              <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-wrap items-center gap-x-8 gap-y-3 text-slate-400"
          >
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>DOT Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Fortune 500 Company</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Star className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              <span>4.8/5 Employee Rating</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 text-xs z-10"
      >
        <span className="uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-emerald-400 to-transparent"
        />
      </motion.div>
    </section>
  );
}

// ====================== MARQUEE ======================
function Marquee() {
  const items = ["Fortune 500", "NYSE Listed", "#1 Environmental Services", "50 Years of Excellence", "Veteran Friendly", "Equal Opportunity", "DOT Compliant", "CDL Training"];
  return (
    <section className="relative py-8 border-y border-white/5 bg-navy-950 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-4 px-8">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="font-display text-xl sm:text-2xl font-semibold text-slate-400">{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ====================== STATS ======================
function Stats() {
  return (
    <section className="relative py-24 bg-navy-950 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 sm:p-8 hover:border-emerald-400/30 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <s.icon className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-2">
                <AnimatedCounter target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-sm text-slate-400 font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ====================== SECTION HEADING ======================
function SectionHeading({ eyebrow, title, subtitle, align = "center" }: { eyebrow?: string; title: React.ReactNode; subtitle?: string; align?: "center" | "left" }) {
  return (
    <div className={`mb-16 ${align === "center" ? "text-center mx-auto" : ""} max-w-3xl`}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-5 ${align === "center" ? "" : ""}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-xs font-semibold text-emerald-400 tracking-widest uppercase">{eyebrow}</span>
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-[1.05] tracking-tight mb-4"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base sm:text-lg text-slate-400 leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

// ====================== BENEFITS ======================
function Benefits() {
  return (
    <section id="benefits" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Total Rewards"
          title={<>Benefits That <span className="text-gradient">Take Care</span> of You</>}
          subtitle="Industry-leading compensation and benefits designed to support you and your family at every stage of your career."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="group relative glass rounded-2xl p-6 hover:border-emerald-400/30 transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${b.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-all">
                  <b.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">{b.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ====================== JOBS ======================
function Jobs() {
  return (
    <section id="jobs" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-navy-950" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Open Positions"
          title={<>Find Your <span className="text-gradient">Next Career</span></>}
          subtitle="Explore current opportunities across the United States. Each role comes with full benefits, weekly pay, and a clear growth path."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {JOBS.map((job, i) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="group relative glass rounded-2xl p-6 hover:border-emerald-400/30 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/5 border border-emerald-500/20 flex items-center justify-center">
                  <job.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {job.tag}
                </span>
              </div>

              <h3 className="font-display text-xl font-bold text-white mb-4">{job.title}</h3>

              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <DollarSign className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="font-semibold">{job.salary}</span>
                  <span className="text-slate-500">/year</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  {job.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  {job.schedule}
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {job.requirements.map((r) => (
                  <span key={r} className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-slate-300 border border-white/10">
                    {r}
                  </span>
                ))}
              </div>

              <a
                href={APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto group/btn inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-emerald-600 border border-white/10 hover:border-emerald-400/50 text-white font-semibold transition-all"
              >
                Apply for This Role
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href={JOBS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass hover:bg-white/10 text-white font-semibold transition-all"
          >
            View All 2,400+ Positions
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ====================== WHY JOIN ======================
function WhyJoin() {
  return (
    <section id="why" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Choose Us"
          title={<>More Than a Job. <br className="hidden sm:block" /><span className="text-gradient">A Career.</span></>}
          subtitle="Here's what sets us apart from every other employer in the industry."
        />

        <div className="space-y-12 lg:space-y-24">
          {WHY_JOIN.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""}`}
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
                </div>
              </div>

              <div className={`${i % 2 === 1 ? "lg:pr-8" : "lg:pl-8"}`}>
                <div className="inline-flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">0{i + 1}</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight">
                  {item.title}
                </h3>
                <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-6">{item.desc}</p>
                <a
                  href={APPLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-emerald-400 font-semibold hover:text-emerald-300 group/link"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ====================== TESTIMONIALS ======================
function Testimonials() {
  const [idx, setIdx] = useState(0);

  const next = () => setIdx((i) => (i + 1) % TESTIMONIALS.length);
  const prev = () => setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-navy-950" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Real Stories"
          title={<>Hear From Our <span className="text-gradient">Team Members</span></>}
          subtitle="Real employees sharing their experiences, growth, and success stories."
        />

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-3xl p-8 sm:p-12 relative overflow-hidden"
            >
              <Quote className="absolute top-6 right-6 w-16 h-16 text-emerald-500/10" />

              <div className="flex gap-1 mb-6">
                {Array.from({ length: TESTIMONIALS[idx].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>

              <p className="text-xl sm:text-2xl lg:text-3xl text-white font-display font-medium leading-relaxed mb-8">
                "{TESTIMONIALS[idx].quote}"
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <img
                  src={TESTIMONIALS[idx].img}
                  alt={TESTIMONIALS[idx].name}
                  loading="lazy"
                  className="w-14 h-14 rounded-full object-cover border-2 border-emerald-400/50"
                />
                <div>
                  <div className="font-display font-bold text-white text-lg">{TESTIMONIALS[idx].name}</div>
                  <div className="text-sm text-emerald-400">{TESTIMONIALS[idx].role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-11 h-11 rounded-full glass hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${i === idx ? "w-8 bg-emerald-400" : "w-2 bg-white/20"}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-11 h-11 rounded-full glass hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ====================== GALLERY ======================
function Gallery() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Behind the Scenes"
          title={<>Our <span className="text-gradient">Operations</span> in Action</>}
          subtitle="From fleet operations to recycling facilities — see what a day with us looks like."
        />

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {GALLERY.map((g, i) => (
            <motion.figure
              key={g.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
              className="relative group break-inside-avoid overflow-hidden rounded-2xl border border-white/10 hover:border-emerald-400/30 transition-all"
              style={{ aspectRatio: i % 3 === 0 ? "4/5" : i % 3 === 1 ? "1/1" : "3/4" }}
            >
              <img
                src={g.src}
                alt={g.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform">
                <div className="text-white font-display font-bold text-sm">{g.title}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// ====================== PROCESS ======================
function Process() {
  return (
    <section id="process" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-navy-950" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Hiring Process"
          title={<>From Application to <span className="text-gradient">First Day</span></>}
          subtitle="Our streamlined hiring process gets you behind the wheel faster than you'd expect."
        />

        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-16 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROCESS.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative glass rounded-2xl p-6 hover:border-emerald-400/30 transition-all group"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                    <p.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="font-display text-4xl font-extrabold text-white/10 group-hover:text-emerald-500/30 transition-colors">
                    {p.step}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-2">{p.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ====================== FAQ ======================
function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title={<>Got <span className="text-gradient">Questions?</span></>}
          subtitle="Everything you need to know about joining our team."
        />

        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass rounded-2xl overflow-hidden hover:border-emerald-400/20 transition-colors"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left"
                aria-expanded={open === i}
              >
                <span className="font-display text-base sm:text-lg font-semibold text-white">{f.q}</span>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-emerald-400" />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-slate-400 leading-relaxed">{f.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ====================== FINAL CTA ======================
function FinalCTA() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-emerald-950/40" />
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-500/20 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
            <Play className="w-3 h-3 text-emerald-400 fill-emerald-400" />
            <span className="text-xs font-semibold text-emerald-400 tracking-widest uppercase">Now Accepting Applications</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6">
            Start Your Career <br />
            <span className="text-gradient">Today</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Take the next step toward a rewarding future with Waste Management.
            Apply in under 5 minutes — your new career is just one click away.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-xl shadow-emerald-500/40 hover:shadow-emerald-500/70 hover:scale-[1.03] transition-all text-base"
            >
              <span className="absolute inset-0 rounded-full bg-emerald-400 blur-xl opacity-40 group-hover:opacity-70 transition-opacity" />
              <span className="relative flex items-center gap-2">
                Apply Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            <a
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full glass text-white font-semibold hover:bg-white/10 transition-all text-base"
            >
              <Phone className="w-5 h-5" />
              Contact Recruiter
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-10 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              No experience required for some roles
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Paid CDL training available
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Benefits start day one
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ====================== FOOTER ======================
function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                <Truck className="w-5 h-5 text-navy-950" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-display font-bold text-white">WM Careers</span>
                <span className="text-xs text-emerald-400 font-medium tracking-wider uppercase">USA</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              America's leading environmental services company. Building careers, protecting communities.
            </p>
            <div className="flex gap-3">
              {SOCIALS.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social media"
                  className="w-9 h-9 rounded-full glass flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-400/30 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3 text-sm">
              {["About Us", "Careers", "Press", "Sustainability", "Investors"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-4 text-sm uppercase tracking-wider">Resources</h4>
            <ul className="space-y-3 text-sm">
              {["CDL Training", "Benefits Guide", "Safety Standards", "Employee Portal", "Veterans Program"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>1001 Fannin St, Houston, TX 77002</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href="tel:+18009627885" className="hover:text-emerald-400">1-800-962-7885</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href="mailto:careers@wm.com" className="hover:text-emerald-400">careers@wm.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © 2026 Waste Management Careers USA. All rights reserved. Equal Opportunity Employer.
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-500">
            <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Accessibility</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Cookie Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ====================== APP ======================
export default function App() {
  return (
    <div className="min-h-screen bg-navy-950 text-white overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <Benefits />
        <Jobs />
        <WhyJoin />
        <Testimonials />
        <Gallery />
        <Process />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
