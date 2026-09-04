"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    if (!url.trim()) {
      setError("Please paste a YouTube video URL.");
      return;
    }

    setLoading(true);
    setSummary("");
    setError("");

    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          youtubeUrl: url.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Something went wrong. Please try again."
        );
      }

      setSummary(data.summary || "");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const scrollToSummarizer = () => {
    document
      .getElementById("summarizer")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-950 via-sky-950/70 to-black text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-[-220px] h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-sky-500/20 blur-[150px]" />

      <div className="pointer-events-none absolute left-[-180px] top-[42%] h-[350px] w-[350px] rounded-full bg-sky-500/10 blur-[140px]" />

      <div className="pointer-events-none absolute right-[-180px] top-[58%] h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-[140px]" />

      {/* ========================================================= */}
      {/* NAVBAR */}
      {/* ========================================================= */}

      <nav className="relative z-30 mx-auto w-full max-w-6xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-black/40 px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:px-5">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-sky-400/20 bg-white/10 shadow-lg shadow-sky-500/10">
  <img
    src="/logo.png"
    alt="KrishAIWorks Logo"
    className="h-full w-full object-cover"
  />
</div>

            <div>
              <h2 className="text-sm font-bold tracking-tight text-white sm:text-base">
                KrishAIWorks
              </h2>

              <p className="text-[9px] font-medium tracking-wide text-zinc-500 sm:text-[10px]">
                AI Solutions That Work
              </p>
            </div>
          </div>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-1 md:flex">
            <a
              href="#features"
              className="rounded-xl px-4 py-2 text-sm text-zinc-400 transition hover:bg-white/[0.05] hover:text-sky-300"
            >
              Features
            </a>

            <a
              href="#how"
              className="rounded-xl px-4 py-2 text-sm text-zinc-400 transition hover:bg-white/[0.05] hover:text-sky-300"
            >
              How To Use
            </a>

            <a
              href="#faq"
              className="rounded-xl px-4 py-2 text-sm text-zinc-400 transition hover:bg-white/[0.05] hover:text-sky-300"
            >
              FAQ
            </a>

            <button
              onClick={scrollToSummarizer}
              className="ml-2 rounded-xl border border-sky-400/20 bg-sky-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:bg-sky-400 active:scale-95"
            >
              Try Now
            </button>
          </div>

          {/* Mobile button */}
          <button
            onClick={scrollToSummarizer}
            className="rounded-xl border border-sky-400/20 bg-sky-500/10 px-4 py-2 text-xs font-semibold text-sky-300 transition hover:bg-sky-500/20 md:hidden"
          >
            Try Now
          </button>
        </div>
      </nav>

      {/* ========================================================= */}
      {/* HERO */}
      {/* ========================================================= */}

      <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-5 pb-20 pt-20 text-center sm:px-8 sm:pt-24">
        <div className="rounded-full border border-sky-400/20 bg-sky-500/10 px-4 py-2 text-xs text-sky-200 shadow-lg shadow-sky-950/30 backdrop-blur-xl">
          ✨ Powered by Gemini AI
        </div>

        <p className="mt-4 text-xs text-zinc-500">
          Built by{" "}
          <span className="font-semibold text-sky-400">KrishAIWorks</span>
        </p>

        <h1 className="mt-7 max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
          Turn YouTube Videos
          <br />
          <span className="bg-gradient-to-r from-sky-300 via-cyan-400 to-sky-500 bg-clip-text text-transparent">
            Into Smart Notes.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
          Turn long YouTube videos into clean, structured AI notes in
          seconds. Extract key ideas, important details, takeaways and useful
          information without watching the entire video.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-2.5">
          <span className="rounded-full border border-white/5 bg-white/[0.04] px-4 py-2 text-xs text-zinc-300 backdrop-blur-xl">
            🎥 YouTube Notes
          </span>

          <span className="rounded-full border border-white/5 bg-white/[0.04] px-4 py-2 text-xs text-zinc-300 backdrop-blur-xl">
            ⚡ AI Powered
          </span>

          <span className="rounded-full border border-white/5 bg-white/[0.04] px-4 py-2 text-xs text-zinc-300 backdrop-blur-xl">
            📚 Smart Learning
          </span>
        </div>

        {/* ========================================================= */}
        {/* SUMMARIZER */}
        {/* ========================================================= */}

        <div id="summarizer" className="mt-12 w-full max-w-4xl scroll-mt-8">
          <div className="rounded-[2rem] border border-sky-400/10 bg-zinc-950/60 p-5 shadow-2xl shadow-sky-950/30 backdrop-blur-2xl sm:p-7">
            <div className="mb-5 text-left">
              <h2 className="text-lg font-semibold text-white sm:text-xl">
                Summarize a YouTube Video
              </h2>

              <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
                Paste a YouTube video link below and let AI create smart notes
                for you.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
             <input
  type="url"
  value={url}
  onChange={(e) => setUrl(e.target.value)}
  placeholder="Paste YouTube video URL..."
  className="w-full h-14 rounded-2xl border border-sky-400/30 bg-black/30 px-5 text-base text-white placeholder:text-zinc-500 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
/>

              <button
                onClick={handleSummarize}
                disabled={loading}
                className="h-14 rounded-2xl bg-sky-500 px-7 text-sm font-semibold text-white shadow-xl shadow-sky-500/20 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-400 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 sm:px-8"
              >
                {loading ? "✨ Generating..." : "✨ Summarize"}
              </button>
            </div>

            {error && (
              <div className="mt-4 rounded-xl border border-red-400/10 bg-red-500/5 px-4 py-3 text-left text-xs leading-6 text-red-300">
                {error}
              </div>
            )}

            <p className="mt-3 text-left text-xs text-zinc-600">
              Supports YouTube videos with available transcripts.
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RESULT */}
        {/* ========================================================= */}

        {summary && (
          <div className="mt-10 w-full max-w-4xl text-left">
            <div className="rounded-[2rem] border border-sky-400/10 bg-zinc-950/70 p-6 shadow-2xl shadow-sky-950/30 backdrop-blur-2xl sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    📝 AI Summary
                  </h2>

                  <p className="mt-1 text-sm text-zinc-500">
                    Generated by Gemini AI
                  </p>
                </div>

                <span className="w-fit rounded-full border border-sky-400/20 bg-sky-500/10 px-4 py-2 text-xs font-medium text-sky-300">
                  Completed
                </span>
              </div>

              <SummaryContent summary={summary} />

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => navigator.clipboard.writeText(summary)}
                  className="rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400 active:scale-95"
                >
                  📋 Copy Summary
                </button>

                <button
                  onClick={() => {
                    setSummary("");
                    setUrl("");
                    setError("");
                  }}
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:bg-white/10 active:scale-95"
                >
                  🔄 New Video
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ========================================================= */}
      {/* WHY USE IT */}
      {/* ========================================================= */}

      <section
        id="features"
        className="relative z-10 mx-auto w-full max-w-6xl scroll-mt-10 px-5 py-24 sm:px-8"
      >
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto inline-flex rounded-full border border-sky-400/10 bg-sky-500/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
            Why Use It
          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Learn smarter, not longer.
          </h2>

          <p className="mt-4 text-sm leading-7 text-zinc-500">
            Everything is designed to turn long videos into useful,
            easy-to-understand information.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <FeatureCard
            icon="🧠"
            number="01"
            title="Smart AI Notes"
            description="Convert long videos into clean notes containing the most useful information."
          />

          <FeatureCard
            icon="⚡"
            number="02"
            title="Save Your Time"
            description="Understand the important parts without spending hours watching the complete video."
          />

          <FeatureCard
            icon="🎯"
            number="03"
            title="Focused Learning"
            description="Get key ideas, takeaways and important details in a simple format."
          />
        </div>
      </section>

      {/* ========================================================= */}
      {/* HOW TO USE */}
      {/* ========================================================= */}

      <section
        id="how"
        className="relative z-10 mx-auto w-full max-w-6xl scroll-mt-10 px-5 py-24 sm:px-8"
      >
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto inline-flex rounded-full border border-sky-400/10 bg-sky-500/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
            How To Use
          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Three simple steps.
          </h2>

          <p className="mt-4 text-sm leading-7 text-zinc-500">
            From video link to useful notes in just a few seconds.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <StepCard
            number="01"
            title="Copy Video URL"
            description="Copy the link of the YouTube video you want to turn into smart notes."
          />

          <StepCard
            number="02"
            title="Paste & Summarize"
            description="Paste the link into the box and let Gemini AI process the available transcript."
          />

          <StepCard
            number="03"
            title="Read Smart Notes"
            description="Get a clean AI-generated summary with important ideas and useful takeaways."
          />
        </div>
      </section>

      {/* ========================================================= */}
      {/* FAQ */}
      {/* ========================================================= */}

      <section
        id="faq"
        className="relative z-10 mx-auto w-full max-w-3xl scroll-mt-10 px-5 py-24 sm:px-8"
      >
        <div className="text-center">
          <div className="mx-auto inline-flex rounded-full border border-sky-400/10 bg-sky-500/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
            FAQ
          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-10 space-y-4">
          <Faq
            question="What YouTube videos can I summarize?"
            answer="Videos with an available transcript can be processed by the summarizer."
          />

          <Faq
            question="Do I need to watch the complete video?"
            answer="No. The goal is to extract the useful information so you can understand the video faster."
          />

          <Faq
            question="How is the summary generated?"
            answer="The summary is generated using Gemini AI after extracting the available YouTube transcript."
          />
        </div>
      </section>

      {/* ========================================================= */}
      {/* PREMIUM BOTTOM CTA */}
      {/* ========================================================= */}

      <section className="relative z-10 mx-auto w-full max-w-5xl px-5 py-20 sm:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-sky-400/10 bg-gradient-to-br from-sky-950/60 via-zinc-950/80 to-black px-6 py-14 text-center shadow-2xl shadow-sky-950/30 backdrop-blur-xl sm:px-12">
          <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[350px] w-[500px] -translate-x-1/2 rounded-full bg-sky-500/10 blur-[120px]" />

          <div className="relative">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-500/10 text-2xl shadow-lg shadow-sky-500/10">
              ▶
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-sky-400">
              KrishAIWorks
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Turn your next video into smart notes.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-500">
              Stop wasting hours. Extract the useful information with AI.
            </p>

            <button
              onClick={scrollToSummarizer}
              className="mt-8 inline-flex rounded-xl bg-sky-500 px-7 py-3 text-sm font-semibold text-white shadow-xl shadow-sky-500/20 transition hover:-translate-y-0.5 hover:bg-sky-400 active:scale-95"
            >
              ✨ Try It Now
            </button>
          </div>
        </div>
      </section>
{/* ========================================================= */}
{/* FOOTER */}
{/* ========================================================= */}

<footer className="relative z-10 border-t border-white/5 px-5 py-10">

  {/* ========================================================= */}
  {/* RELATED TOOLS */}
  {/* ========================================================= */}

  <div className="mx-auto max-w-6xl">

    <div className="mb-8 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400/70">
        Explore More
      </p>

      <h3 className="mt-2 text-xl font-semibold text-white">
        More AI Productivity Tools
      </h3>

      <p className="mt-2 text-sm text-zinc-500">
        Explore more useful tools from KrishAIWorks.
      </p>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

      {/* AI Study Assistant */}
      <a
        href="https://aistudyassistant.krishaiworks.com/"
        className="group rounded-2xl border border-sky-400/10 bg-white/[0.02] p-5 transition hover:border-sky-400/30 hover:bg-sky-400/[0.04]"
      >
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-sky-400/20 bg-sky-400/10 text-lg">
          🎓
        </div>

        <h4 className="font-semibold text-white transition group-hover:text-sky-400">
          AI Study Assistant
        </h4>

        <p className="mt-2 text-xs leading-5 text-zinc-500">
          Get AI-powered help with studying, learning, and revision.
        </p>
      </a>

      {/* Smart Notes */}
      <a
        href="https://smartnotes.krishaiworks.com/"
        className="group rounded-2xl border border-sky-400/10 bg-white/[0.02] p-5 transition hover:border-sky-400/30 hover:bg-sky-400/[0.04]"
      >
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-sky-400/20 bg-sky-400/10 text-lg">
          📝
        </div>

        <h4 className="font-semibold text-white transition group-hover:text-sky-400">
          Smart Notes
        </h4>

        <p className="mt-2 text-xs leading-5 text-zinc-500">
          Turn information into clear, organized, and useful notes.
        </p>
      </a>

      {/* AI YouTube Title & Description Generator */}
      <a
        href="https://aiyoutubetitledescriptiongenerator.krishaiworks.com/"
        className="group rounded-2xl border border-sky-400/10 bg-white/[0.02] p-5 transition hover:border-sky-400/30 hover:bg-sky-400/[0.04]"
      >
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-sky-400/20 bg-sky-400/10 text-lg">
          🎬
        </div>

        <h4 className="font-semibold text-white transition group-hover:text-sky-400">
          AI YouTube Title & Description Generator
        </h4>

        <p className="mt-2 text-xs leading-5 text-zinc-500">
          Create engaging YouTube titles and descriptions with AI.
        </p>
      </a>

      {/* AI Subtitle Generator */}
      <a
        href="https://aisubtitlegenerator.krishaiworks.com/"
        className="group rounded-2xl border border-sky-400/10 bg-white/[0.02] p-5 transition hover:border-sky-400/30 hover:bg-sky-400/[0.04]"
      >
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-sky-400/20 bg-sky-400/10 text-lg">
          💬
        </div>

        <h4 className="font-semibold text-white transition group-hover:text-sky-400">
          AI Subtitle Generator
        </h4>

        <p className="mt-2 text-xs leading-5 text-zinc-500">
          Generate subtitles and captions for your videos with AI.
        </p>
      </a>

    </div>
  </div>

  {/* ========================================================= */}
  {/* ORIGINAL FOOTER */}
  {/* ========================================================= */}

  <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-7 border-t border-white/5 pt-10 sm:flex-row">

    {/* Brand */}
    <div className="flex items-center gap-3">
      <img
        src="/logo.png"
        alt="KrishAIWorks Logo"
        className="h-12 w-12 rounded-full border border-sky-400/20 object-cover shadow-lg shadow-sky-500/10"
      />

      <div>
        <p className="font-semibold text-white">
          KrishAIWorks
        </p>

        <p className="mt-1 text-xs text-zinc-600">
          AI Solutions That Work
        </p>
      </div>
    </div>

    {/* Instagram */}
    <a
      href="https://instagram.com/KrishAIWorks"
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-zinc-500 transition hover:text-sky-400"
    >
      Instagram · @KrishAIWorks
    </a>

    {/* Copyright */}
    <div className="text-center sm:text-right">
      <p className="text-xs text-zinc-600">
        © {new Date().getFullYear()} KrishAIWorks
      </p>

      <p className="mt-1 text-xs text-zinc-700">
        Built with AI.
      </p>
    </div>

  </div>

</footer>
    </main>
  );
}

/* ============================================================= */
/* SUMMARY CONTENT */
/* ============================================================= */

function SummaryContent({ summary }: { summary: string }) {
  const lines = summary.split("\n");

  return (
    <div className="mt-7 rounded-2xl border border-white/5 bg-black/30 p-5 sm:p-7">
      <div className="space-y-7">
        {lines.map((line, index) => {
          const cleanLine = line.trim();

          if (!cleanLine) {
            return null;
          }

          const heading =
            /^(OVERVIEW|KEY POINTS|IMPORTANT DETAILS|ACTION ITEMS|FINAL TAKEAWAY)$/i.test(
              cleanLine
            );

          if (heading) {
            return (
              <div
                key={index}
                className="border-b border-sky-400/10 pb-2 pt-1"
              >
                <h3 className="text-sm font-extrabold tracking-wide text-white sm:text-base">
                  {cleanLine}
                </h3>
              </div>
            );
          }

          const bullet = cleanLine.startsWith("-");

          return (
            <p
              key={index}
              className={`text-sm leading-8 text-zinc-300 ${
                bullet ? "pl-3" : ""
              }`}
            >
              {bullet && (
                <span className="mr-2 font-bold text-sky-400">•</span>
              )}

              {bullet ? cleanLine.slice(1).trim() : cleanLine}
            </p>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================= */
/* FEATURE CARD */
/* ============================================================= */

function FeatureCard({
  icon,
  number,
  title,
  description,
}: {
  icon: string;
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-zinc-950/50 p-7 shadow-xl shadow-black/10 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-sky-400/20 hover:bg-sky-950/20">
      <div className="pointer-events-none absolute right-[-50px] top-[-50px] h-32 w-32 rounded-full bg-sky-500/5 blur-3xl transition group-hover:bg-sky-400/10" />

      <div className="relative flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-400/10 bg-sky-500/10 text-xl shadow-lg shadow-sky-500/5 transition group-hover:scale-105">
          {icon}
        </div>

        <span className="text-xs font-bold tracking-[0.2em] text-sky-500/60">
          {number}
        </span>
      </div>

      <h3 className="relative mt-6 text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="relative mt-3 text-sm leading-7 text-zinc-500">
        {description}
      </p>

      <div className="mt-6 h-px w-12 bg-sky-400/30 transition-all duration-300 group-hover:w-20 group-hover:bg-sky-400/60" />
    </div>
  );
}

/* ============================================================= */
/* STEP CARD */
/* ============================================================= */

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-zinc-950/50 p-7 shadow-xl shadow-black/10 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-sky-400/20">
      <div className="pointer-events-none absolute right-[-60px] top-[-60px] h-36 w-36 rounded-full bg-sky-500/5 blur-3xl transition group-hover:bg-sky-400/10" />

      <div className="relative flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-sky-400/15 bg-sky-500/10 text-sm font-bold text-sky-300">
          {number}
        </div>

        <div className="h-px w-16 bg-gradient-to-r from-sky-400/30 to-transparent" />
      </div>

      <h3 className="relative mt-6 text-xl font-semibold text-white">
        {title}
      </h3>

      <p className="relative mt-3 text-sm leading-7 text-zinc-500">
        {description}
      </p>
    </div>
  );
}

/* ============================================================= */
/* FAQ */
/* ============================================================= */

function Faq({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <details className="group rounded-2xl border border-white/[0.06] bg-zinc-950/40 p-5 shadow-lg shadow-black/10 backdrop-blur-xl transition hover:border-sky-400/15">
      <summary className="cursor-pointer list-none text-sm font-medium text-zinc-200 sm:text-base">
        <div className="flex items-center justify-between gap-4">
          <span>{question}</span>

          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-sky-400/10 bg-sky-500/5 text-lg text-sky-400 transition group-open:rotate-45">
            +
          </span>
        </div>
      </summary>

      <p className="mt-4 border-t border-white/5 pt-4 text-sm leading-7 text-zinc-500">
        {answer}
      </p>
    </details>
  );
}