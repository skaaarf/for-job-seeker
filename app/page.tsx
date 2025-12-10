"use client";

import Link from "next/link";
import { ArrowRight, User, Map, FileText, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 text-primary text-xs font-bold uppercase tracking-wider shadow-sm backdrop-blur-sm">
            <Sparkles className="w-3 h-3" />
            AI Career Coach
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
            将来のこと、<br className="md:hidden" />
            ひとりで抱え込まなくていい。
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-lg mx-auto md:mx-0 leading-relaxed">
            「味方くん」は、あなたの専属AIキャリアコーチ。<br />
            自己理解からES作成まで、対話しながら一緒に進めましょう。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
            <Button size="lg" className="rounded-full text-base px-8 shadow-lg shadow-primary/20" asChild>
              <Link href="/modules/self">
                まずは自己理解から
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full text-base px-8 bg-white/80 backdrop-blur" asChild>
              <Link href="/dashboard">
                ダッシュボードを見る
              </Link>
            </Button>
          </div>
        </div>

        {/* Visual Decoration (Mock) */}
        <div className="flex-1 w-full max-w-md relative pb-10 md:pb-0">
          <div className="relative aspect-square bg-white rounded-2xl shadow-xl border border-slate-100 p-6 flex flex-col gap-4 transform rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="flex gap-3 items-start">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl rounded-tl-none border border-slate-100 text-sm text-slate-700">
                こんにちは！今日はどんなことを考えたいですか？
              </div>
            </div>
            <div className="flex gap-3 items-start flex-row-reverse pb-8">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-slate-500" />
              </div>
              <div className="bg-primary p-3 rounded-2xl rounded-tr-none text-sm text-white shadow-md">
                自分の強みがわからなくて...
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl rounded-tl-none border border-slate-100 text-sm text-slate-700">
                大丈夫、一緒に過去の経験から探していきましょう。
              </div>
            </div>
          </div>
          {/* Decorative blobs */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10"></div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ModuleCard
          href="/modules/self"
          icon={User}
          title="自己理解"
          description="これまでの経験から、あなたの強みや価値観、避けたいパターンを言語化して整理します。"
          colorClass="bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
        />
        <ModuleCard
          href="/modules/career"
          icon={Map}
          title="キャリア設計"
          description="10年後の理想の姿から逆算して、今後の人生ステージや職種候補、ライフプランを設計します。"
          colorClass="bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white"
        />
        <ModuleCard
          href="/modules/es"
          icon={FileText}
          title="ES・面接対策"
          description="自己PRやガクチカ、志望動機の「骨組み」を作成し、面接で話す内容を明確にします。"
          colorClass="bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white"
        />
      </section>
    </div>
  );
}

function ModuleCard({ href, icon: Icon, title, description, colorClass }: any) {
  return (
    <Link
      href={href}
      className="group relative bg-white border border-secondary rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 ${colorClass}`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center justify-between">
        {title}
        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-500 transition-colors" />
      </h3>
      <p className="text-slate-500 text-sm leading-relaxed flex-1">
        {description}
      </p>
    </Link>
  )
}
