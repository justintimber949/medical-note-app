import Link from "next/link";
import { ArrowRight, Brain, Sparkles, FileText, Zap, Layers, MessageSquare, Database } from "lucide-react";

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
                Powered by Gemini 2.0 Flash & IndexedDB <span className="font-semibold text-blue-600">New</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Your Personal Medical <span className="text-blue-600">Knowledge Base</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Upload entire lectures in batches. Chat with your notes. Store everything locally. The ultimate study companion for medical students.
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
                See New Features <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Feature Showcase UI */}
          <div className="mt-16 flow-root sm:mt-24">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <div className="bg-white rounded-xl shadow-2xl ring-1 ring-gray-900/10 overflow-hidden relative">
                {/* Mockup of Dashboard */}
                <div className="grid grid-cols-12 h-[400px]">
                  {/* Sidebar Mockup */}
                  <div className="col-span-3 bg-gray-50 border-r border-gray-200 p-4 hidden md:block">
                    <div className="h-4 w-24 bg-gray-200 rounded mb-6"></div>
                    <div className="space-y-3">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-10 bg-white border border-gray-200 rounded-lg shadow-sm"></div>
                      ))}
                    </div>
                  </div>
                  {/* Main Content Mockup */}
                  <div className="col-span-12 md:col-span-9 p-6 bg-white relative">
                    <div className="absolute bottom-6 right-6 w-64 h-80 bg-white border border-gray-200 rounded-xl shadow-xl flex flex-col overflow-hidden">
                      <div className="bg-blue-600 p-3 text-white text-xs font-bold flex items-center gap-2">
                        <MessageSquare className="w-3 h-3" /> Medical AI Chat
                      </div>
                      <div className="flex-1 p-3 bg-gray-50 space-y-2">
                        <div className="bg-white p-2 rounded-lg text-xs text-gray-600 shadow-sm w-3/4 ml-auto">
                          What is the mechanism of action for...
                        </div>
                        <div className="bg-blue-600 p-2 rounded-lg text-xs text-white shadow-sm w-3/4">
                          Based on your notes, it inhibits...
                        </div>
                      </div>
                    </div>
                    <div className="h-32 border-2 border-dashed border-blue-200 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                      <span className="text-blue-500 font-medium">Batch Upload PDF/PPT</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-12 bg-gray-50 border border-gray-100 rounded-lg flex items-center px-4 justify-between">
                        <span className="text-sm text-gray-500">Lecture 1.pdf</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Completed</span>
                      </div>
                      <div className="h-12 bg-gray-50 border border-gray-100 rounded-lg flex items-center px-4 justify-between">
                        <span className="text-sm text-gray-500">Lecture 2.pptx</span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Processing Stage 2/3</span>
                      </div>
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
            <h2 className="text-base font-semibold leading-7 text-blue-600">Power Features</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Built for the modern medical student
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Layers className="w-6 h-6 text-blue-600" />}
              title="Batch Processing"
              description="Upload 20+ files at once. The system processes them sequentially with smart rate-limiting to protect your API key."
            />
            <FeatureCard
              icon={<MessageSquare className="w-6 h-6 text-purple-600" />}
              title="Context-Aware Chat"
              description="Ask questions and get answers based on ALL your generated notes. It's like having a tutor who memorized your entire library."
            />
            <FeatureCard
              icon={<Database className="w-6 h-6 text-amber-600" />}
              title="Persistent Library"
              description="Your notes are saved to a local database (IndexedDB). Close the tab, come back later, and pick up right where you left off."
            />
            <FeatureCard
              icon={<FileText className="w-6 h-6 text-green-600" />}
              title="Smart Transcription"
              description="Converts raw slides into clean, structured Markdown notes, preserving all medical terminology."
            />
            <FeatureCard
              icon={<Sparkles className="w-6 h-6 text-indigo-600" />}
              title="Deep Enrichment"
              description="Adds clinical correlates, mechanisms of action, and mnemonics to help you understand the 'Why'."
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6 text-red-600" />}
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
