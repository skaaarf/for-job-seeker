"use client";

import React from "react";
import { Map, Calendar, Briefcase, Plus, Users } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function CareerDesignBoard() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <header>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-bold uppercase tracking-wider mb-2">
                    Career Design
                </div>
                <h1 className="text-3xl font-bold text-slate-800 tracking-tight">キャリア設計ボード</h1>
                <p className="text-slate-500 mt-2">
                    10年後の姿から逆算して、これからのキャリアステップを描きましょう。
                </p>
            </header>

            {/* 10 Year Vision */}
            <section className="bg-white border border-secondary p-6 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                        <Map className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">10年後の姿</h2>
                </div>
                <textarea
                    className="w-full text-xl md:text-2xl font-bold text-slate-700 border-none focus:ring-0 placeholder:text-slate-300 resize-none bg-transparent"
                    placeholder="例：教育とテクノロジーを掛け合わせた事業でリーダーになっている"
                    rows={2}
                />
                <div className="h-px bg-slate-100 my-4" />
                <p className="text-sm text-slate-400">
                    このビジョンを実現するために、どのようなステップが必要か考えていきます。
                </p>
            </section>

            {/* Life Stages Table */}
            <section className="space-y-4">
                <div className="flex items-center gap-2 text-slate-700 font-bold px-1">
                    <Calendar className="w-5 h-5 text-teal-500" />
                    ライフステージごとのイメージ
                </div>

                <div className="bg-white border border-secondary rounded-2xl overflow-hidden shadow-sm">
                    <div className="grid grid-cols-[100px_1fr_1fr_1fr] bg-slate-50 border-b border-secondary text-sm font-bold text-slate-600">
                        <div className="p-4">時期</div>
                        <div className="p-4 border-l border-secondary">仕事</div>
                        <div className="p-4 border-l border-secondary">年収・待遇</div>
                        <div className="p-4 border-l border-secondary">生活</div>
                    </div>

                    <StageRow period="20代後半" />
                    <StageRow period="30代前半" />
                    <StageRow period="30代後半" />
                </div>
            </section>

            {/* Job Candidates */}
            <section className="space-y-4">
                <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2 text-slate-700 font-bold">
                        <Briefcase className="w-5 h-5 text-teal-500" />
                        気になっている職種
                    </div>
                    <Button size="sm" variant="outline" className="h-8">
                        <Plus className="w-4 h-4 mr-1" />
                        職種を追加
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <JobCard
                        title="ITコンサルタント"
                        reason="課題解決と論理的思考を活かせる"
                        concern="激務ではないか心配"
                    />
                    <JobCard
                        title="Webマーケター"
                        reason="数字で成果が見えるのが好き"
                        concern="未経験から行けるか"
                    />
                    <button className="flex items-center justify-center p-6 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-500 transition-colors">
                        <Plus className="w-6 h-6 mb-1" />
                        <span className="text-sm font-bold">候補を追加</span>
                    </button>
                </div>
            </section>

            {/* Role Model */}
            <section className="bg-teal-50/50 border border-teal-100 rounded-2xl p-6">
                <div className="flex items-center gap-2 text-teal-800 font-bold mb-4">
                    <Users className="w-5 h-5" />
                    似ているキャリアパターンの人
                </div>
                <div className="bg-white p-4 rounded-xl border border-teal-100 shadow-sm flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-2xl">👨‍💻</div>
                    <div>
                        <div className="font-bold text-slate-800">T.K さん (29歳)</div>
                        <div className="text-xs text-slate-500 mb-2">営業 → ITコンサルタント</div>
                        <p className="text-sm text-slate-600">
                            「新卒で営業を経験したことで、クライアントの気持ちがわかるコンサルになれました。」
                        </p>
                    </div>
                </div>
            </section>

        </div>
    );
}

function StageRow({ period }: { period: string }) {
    return (
        <div className="grid grid-cols-[100px_1fr_1fr_1fr] border-b border-secondary last:border-0 hover:bg-slate-50/50 transition-colors group">
            <div className="p-4 text-sm font-bold text-slate-500 flex items-center">{period}</div>
            <div className="border-l border-secondary p-2">
                <textarea className="w-full h-full min-h-[60px] bg-transparent border-0 text-sm focus:ring-0 resize-none placeholder:text-slate-200" placeholder="入力..." />
            </div>
            <div className="border-l border-secondary p-2">
                <textarea className="w-full h-full min-h-[60px] bg-transparent border-0 text-sm focus:ring-0 resize-none placeholder:text-slate-200" placeholder="入力..." />
            </div>
            <div className="border-l border-secondary p-2">
                <textarea className="w-full h-full min-h-[60px] bg-transparent border-0 text-sm focus:ring-0 resize-none placeholder:text-slate-200" placeholder="入力..." />
            </div>
        </div>
    )
}

function JobCard({ title, reason, concern }: any) {
    return (
        <div className="bg-white border border-secondary rounded-xl p-4 shadow-sm relative group hover:border-teal-200 transition-colors">
            <h3 className="font-bold text-slate-800 mb-2">{title}</h3>
            <div className="space-y-2">
                <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Why</span>
                    <p className="text-sm text-teal-600">{reason}</p>
                </div>
                <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Worry</span>
                    <p className="text-sm text-slate-500">{concern}</p>
                </div>
            </div>
        </div>
    )
}
