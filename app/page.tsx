import Link from "next/link";
import { ArrowRight, Brain, Sparkles, FileText, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">MedicalNote AI</span>
        </div>
        <Link
          href="/setup"
          className="px-5 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Get Started
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">

          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-8 flex justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Powered by Gemini 2.0 Flash & 2.5 Pro <span className="font-semibold text-blue-600">New</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Transform Medical Lectures into <span className="text-blue-600">Mastery</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              The advanced AI companion for medical students. Turn complex PDF/PPT slides into enriched, structured, and visualized study notes in seconds.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/setup"
                className="group flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all"
              >
                Start Generating Notes
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#features" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Abstract UI Representation */}
          <div className="mt-16 flow-root sm:mt-24">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <div className="bg-white rounded-xl shadow-2xl ring-1 ring-gray-900/10 overflow-hidden">
                <div className="flex items-center gap-4 border-b border-gray-100 bg-gray-50/50 p-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="h-6 w-64 bg-gray-200 rounded-md opacity-50" />
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse" />
                    <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
                    <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse" />
                    <div className="h-32 w-full bg-blue-50 rounded-lg border border-blue-100 flex items-center justify-center">
                      <span className="text-blue-400 font-mono text-sm">Processing Lecture Slides...</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full w-fit text-xs font-medium">
                      <Sparkles className="w-3 h-3" />
                      AI Enrichment Active
                    </div>
                    <div className="h-4 w-full bg-gray-100 rounded" />
                    <div className="h-4 w-full bg-gray-100 rounded" />
                    <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                      <p className="text-sm text-gray-600 font-medium">Clinical Correlate</p>
                      <p className="text-xs text-gray-500 mt-1">Detailed explanation of pathophysiology...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Faster Learning</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to ace the exam
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FileText className="w-6 h-6 text-blue-600" />}
              title="Smart Transcription"
              description="Converts raw slides into clean, structured Markdown notes, preserving all medical terminology."
            />
            <FeatureCard
              icon={<Sparkles className="w-6 h-6 text-purple-600" />}
              title="Deep Enrichment"
              description="Adds clinical correlates, mechanisms of action, and mnemonics to help you understand the 'Why'."
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6 text-amber-600" />}
              title="Visual Synthesis"
              description="Generates ASCII art diagrams to visualize complex pathways and hierarchies instantly."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} MedicalNote AI. Built for students, by AI.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
