"use client";

import React from "react";
import { PenTool, Target, Zap, Trophy, Heart, Lightbulb, TrendingUp, Smile } from "lucide-react";
import { Input } from "@/components/ui/Input";

export interface EpisodeCardData {
    title: string;
    period: string;
    // STAR
    situation: string;
    task: string;
    action: string;
    result: string;
    // Analysis
    strengths: string;
    values: string;
    emotions: string;
    learnings: string;
}

export const initialEpisodeCardData: EpisodeCardData = {
    title: "",
    period: "",
    situation: "",
    task: "",
    action: "",
    result: "",
    strengths: "",
    values: "",
    emotions: "",
    learnings: "",
};

interface EpisodeCardProps {
    data: EpisodeCardData;
}

export function EpisodeCard({ data }: EpisodeCardProps) {
    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            <header className="border-b border-slate-100 pb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
                    Episode Card
                </div>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                    {data.title || "無題のエピソード"}
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                    {data.period || "時期未設定"}
                </p>
            </header>

            {/* STAR Model Section */}
            <section className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">STAR Model</h3>

                <CardField
                    icon={PenTool}
                    label="状況 (Situation)"
                    value={data.situation}
                    color="slate"
                    placeholder="どのような環境、背景でしたか？"
                />
                <CardField
                    icon={Target}
                    label="課題 (Task)"
                    value={data.task}
                    color="amber"
                    placeholder="解決すべき問題や目標は何でしたか？"
                />
                <CardField
                    icon={Zap}
                    label="行動 (Action)"
                    value={data.action}
                    color="blue"
                    placeholder="具体的にどのような行動を取りましたか？"
                />
                <CardField
                    icon={Trophy}
                    label="結果 (Result)"
                    value={data.result}
                    color="emerald"
                    placeholder="どのような成果が出ましたか？数字や変化は？"
                />
            </section>

            {/* Analysis Section */}
            <section className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Analysis</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CardField
                        icon={TrendingUp}
                        label="発揮された強み"
                        value={data.strengths}
                        color="indigo"
                        minHeight="min-h-[80px]"
                    />
                    <CardField
                        icon={Heart}
                        label="価値観"
                        value={data.values}
                        color="rose"
                        minHeight="min-h-[80px]"
                    />
                    <CardField
                        icon={Smile}
                        label="感情の動き"
                        value={data.emotions}
                        color="orange"
                        minHeight="min-h-[80px]"
                    />
                    <CardField
                        icon={Lightbulb}
                        label="学び・気づき"
                        value={data.learnings}
                        color="violet"
                        minHeight="min-h-[80px]"
                    />
                </div>
            </section>
        </div>
    );
}

interface CardFieldProps {
    icon: any;
    label: string;
    value: string;
    color: "slate" | "blue" | "emerald" | "amber" | "indigo" | "rose" | "orange" | "violet";
    placeholder?: string;
    minHeight?: string;
}

function CardField({ icon: Icon, label, value, color, placeholder, minHeight = "min-h-[100px]" }: CardFieldProps) {
    const colorStyles = {
        slate: "bg-slate-50 text-slate-600 border-slate-200",
        blue: "bg-blue-50 text-blue-600 border-blue-200",
        emerald: "bg-emerald-50 text-emerald-600 border-emerald-200",
        amber: "bg-amber-50 text-amber-600 border-amber-200",
        indigo: "bg-indigo-50 text-indigo-600 border-indigo-200",
        rose: "bg-rose-50 text-rose-600 border-rose-200",
        orange: "bg-orange-50 text-orange-600 border-orange-200",
        violet: "bg-violet-50 text-violet-600 border-violet-200",
    };

    return (
        <div className="bg-white rounded-xl border border-secondary shadow-sm overflow-hidden">
            <div className={`px-4 py-2 border-b border-secondary/50 flex items-center gap-2 ${colorStyles[color].split(' ')[0]}`}>
                <Icon className={`w-4 h-4 ${colorStyles[color].split(' ')[1]}`} />
                <span className={`text-xs font-bold ${colorStyles[color].split(' ')[1]}`}>{label}</span>
            </div>
            <div className={`p-4 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap ${minHeight} ${!value ? "text-slate-400 italic" : ""}`}>
                {value || placeholder || "..."}
            </div>
        </div>
    );
}
