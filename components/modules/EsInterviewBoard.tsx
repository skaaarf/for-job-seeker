"use client";

import React, { useState } from "react";
import { FileText, Mic, PenLine, CheckSquare, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function EsInterviewBoard() {
    const [activeTab, setActiveTab] = useState<"pr" | "gakuchika" | "motivation">("pr");

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <header>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider mb-2">
                    ES & Interview
                </div>
                <h1 className="text-3xl font-bold text-slate-800 tracking-tight">ESと面接対策ボード</h1>
                <p className="text-slate-500 mt-2">
                    文章にする前に「骨組み」を作りましょう。論理が通っていれば、面接でも迷わず話せます。
                </p>
            </header>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-secondary overflow-x-auto">
                <TabButton
                    active={activeTab === "pr"}
                    onClick={() => setActiveTab("pr")}
                    label="自己PR"
                    icon={FileText}
                />
                <TabButton
                    active={activeTab === "gakuchika"}
                    onClick={() => setActiveTab("gakuchika")}
                    label="ガクチカ"
                    icon={PenLine}
                />
                <TabButton
                    active={activeTab === "motivation"}
                    onClick={() => setActiveTab("motivation")}
                    label="志望動機"
                    icon={Mic}
                />
            </div>

            <div className="bg-white border border-secondary rounded-2xl p-8 shadow-sm min-h-[500px]">
                {activeTab === "pr" && <SelfPrForm />}
                {activeTab === "gakuchika" && <GakuchikaForm />}
                {activeTab === "motivation" && <MotivationForm />}
            </div>
        </div>
    );
}

function TabButton({ active, onClick, label, icon: Icon }: any) {
    return (
        <button
            onClick={onClick}
            className={`
        flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap
        ${active
                    ? "border-amber-500 text-amber-600 bg-amber-50/50"
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"}
      `}
        >
            <Icon className="w-4 h-4" />
            {label}
        </button>
    )
}

function SelfPrForm() {
    return (
        <div className="space-y-8 animate-in zoom-in-95 duration-300">
            <div className="grid gap-6">
                <FormSection title="一言サマリ (Catchphrase)" help="あなたの強みを一言で言うと？">
                    <input className="w-full text-lg font-bold border-b border-slate-200 focus:border-amber-500 outline-none py-2 bg-transparent placeholder:text-slate-300" />
                </FormSection>

                <FormSection title="伝えたい強み (Core Strength)" help="その強みは具体的にどんな能力？">
                    <textarea className="w-full min-h-[80px] rounded-lg bg-slate-50 border border-slate-100 p-3 text-sm focus:ring-2 focus:ring-amber-100 outline-none resize-none" />
                </FormSection>

                <FormSection title="エピソードの概要 (Episode)" help="その強みが発揮された具体的な場面は？">
                    <textarea className="w-full min-h-[120px] rounded-lg bg-slate-50 border border-slate-100 p-3 text-sm focus:ring-2 focus:ring-amber-100 outline-none resize-none" />
                </FormSection>

                <FormSection title="この強みを今後どう活かしたいか (Contribution)" help="会社に入ってからどう貢献できる？">
                    <textarea className="w-full min-h-[80px] rounded-lg bg-slate-50 border border-slate-100 p-3 text-sm focus:ring-2 focus:ring-amber-100 outline-none resize-none" />
                </FormSection>
            </div>
        </div>
    )
}

function GakuchikaForm() {
    return (
        <div className="space-y-6 animate-in zoom-in-95 duration-300">
            <p className="text-slate-400 text-sm">学生時代に力を入れたこと（ガクチカ）のSTARモデルを整理します。</p>
            <FormSection title="状況 (Situation)" help="どんな環境・状況で？" />
            <FormSection title="課題 (Task)" help="どんな課題があった？" />
            <FormSection title="行動 (Action)" help="あなたはそこで何をした？" />
            <FormSection title="結果 (Result)" help="どうなった？定量的な成果は？" />
        </div>
    )
}

function MotivationForm() {
    return (
        <div className="space-y-6 animate-in zoom-in-95 duration-300">
            <p className="text-slate-400 text-sm">なぜこの業界・この会社なのかの論理構成を整理します。</p>
            <FormSection title="興味のある業界・軸" help="" />
            <FormSection title="なぜその業界か (Why Industry)" help="原体験はある？" />
            <FormSection title="なぜこの会社か (Why Company)" help="他社ではだめな理由は？" />
            <FormSection title="キャリアビジョンとの接続" help="10年後の姿とどうつながる？" />
        </div>
    )
}

function FormSection({ title, help, children }: any) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-baseline">
                <label className="text-sm font-bold text-slate-700">{title}</label>
                <span className="text-xs text-slate-400">{help}</span>
            </div>
            {children || <textarea className="w-full min-h-[80px] rounded-lg bg-slate-50 border border-slate-100 p-3 text-sm focus:ring-2 focus:ring-amber-100 outline-none resize-none" />}
        </div>
    )
}
