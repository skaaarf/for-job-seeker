"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Circle, Trophy, Flame, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function DashboardPage() {
    return (
        <div className="max-w-6xl mx-auto p-8 space-y-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Dashboard</h1>
                <p className="text-slate-500 mt-2">今日も少しずつ、自分のペースで進めていきましょう。</p>
            </header>

            {/* Progress Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ProgressCard
                    title="自己理解"
                    progress={5}
                    total={10}
                    status="進行中"
                    nextAction="嫌だった・しんどかった経験"
                    href="/modules/self"
                />
                <ProgressCard
                    title="キャリア設計"
                    progress={2}
                    total={8}
                    status="序盤"
                    nextAction="10年後の姿を描く"
                    href="/modules/career"
                />
                <ProgressCard
                    title="ESと面接"
                    progress={0}
                    total={6}
                    status="未着手"
                    nextAction="自己PRの骨組み作成"
                    href="/modules/es"
                />
            </div>

            {/* Today's Highlight */}
            <section className="bg-white border border-secondary rounded-2xl p-8 shadow-sm flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider">
                        Today's Focus
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">
                        キャリア設計で「10年後の姿」を<br />
                        一行だけ書いてみましょう。
                    </h2>
                    <p className="text-slate-600">
                        完璧でなくて大丈夫。「なんとなくこんな感じ」から始めると、意外と筆が進みますよ。
                    </p>
                    <Button className="rounded-full px-6" asChild>
                        <Link href="/modules/career">
                            今すぐ書く
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </Button>
                </div>
                <div className="shrink-0 w-32 h-32 bg-accent/10 rounded-full flex items-center justify-center">
                    <Trophy className="w-12 h-12 text-accent" />
                </div>
            </section>

            {/* Habit & Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-secondary rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-slate-700 flex items-center gap-2">
                            <Flame className="w-5 h-5 text-orange-500" />
                            現在の継続記録
                        </h3>
                        <span className="text-2xl font-bold text-slate-800">3 Days</span>
                    </div>
                    <div className="flex gap-2 justify-between">
                        {[...Array(7)].map((_, i) => (
                            <div key={i} className={`h-2 flex-1 rounded-full ${i < 3 ? 'bg-orange-500' : 'bg-slate-200'}`}></div>
                        ))}
                    </div>
                    <p className="text-xs text-slate-400 mt-2 text-right">目標まであと4日！</p>
                </div>

                <div className="bg-white border border-secondary rounded-2xl p-6 shadow-sm flex flex-col justify-center text-center space-y-3">
                    <div className="flex justify-center text-primary">
                        <TrendingUp className="w-8 h-8" />
                    </div>
                    <p className="text-lg font-bold text-slate-700">
                        「千里の道も一歩から」
                    </p>
                    <p className="text-xs text-slate-400">
                        - 今日の格言
                    </p>
                </div>
            </div>
        </div>
    );
}

function ProgressCard({ title, progress, total, status, nextAction, href }: any) {
    const percent = Math.round((progress / total) * 100);

    return (
        <div className="bg-white border border-secondary rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
                <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-md">{status}</span>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-500">
                    <span>進捗</span>
                    <span>{percent}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all duration-500" style={{ width: `${percent}%` }}></div>
                </div>
            </div>

            <div className="pt-4 border-t border-slate-50 mt-auto">
                <p className="text-xs text-slate-400 mb-1">次におすすめ</p>
                <Link href={href} className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1 group">
                    {nextAction}
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        </div>
    )
}
