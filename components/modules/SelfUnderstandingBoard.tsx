"use client";

import React from "react";
import { ChevronDown, ChevronRight, PenTool, Heart, AlertCircle, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/Input";

export interface SelfUnderstandingState {
    highSchool: {
        title: string;
        description: string;
    };
    university: {
        title: string;
        description: string;
    };
}

export const initialSelfUnderstandingState: SelfUnderstandingState = {
    highSchool: { title: "", description: "" },
    university: { title: "", description: "" },
};

interface SelfUnderstandingBoardProps {
    data: SelfUnderstandingState;
    onChange: (data: SelfUnderstandingState) => void;
}

export function SelfUnderstandingBoard({ data, onChange }: SelfUnderstandingBoardProps) {
    const updateSection = (section: keyof SelfUnderstandingState, field: string, value: string) => {
        onChange({
            ...data,
            [section]: {
                ...data[section],
                [field]: value,
            },
        });
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <header>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
                    Self Understanding
                </div>
                <h1 className="text-3xl font-bold text-slate-800 tracking-tight">自己理解ノート</h1>
                <p className="text-slate-500 mt-2">
                    あなたの経験を「事実」「感情」「価値観」に分解して記録しましょう。
                </p>
            </header>

            {/* Activities */}
            <div className="space-y-6">
                <ActivitySection
                    icon={PenTool}
                    title="高校時代に一番がんばったこと"
                    defaultOpen={true}
                    color="blue"
                >
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">経験タイトル</label>
                            <Input
                                value={data.highSchool.title}
                                onChange={(e) => updateSection("highSchool", "title", e.target.value)}
                                className="bg-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">やったことの概要</label>
                            <textarea
                                value={data.highSchool.description}
                                onChange={(e) => updateSection("highSchool", "description", e.target.value)}
                                className="w-full min-h-[100px] rounded-md border border-input bg-white px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            />
                        </div>

                    </div>
                </ActivitySection>

                <ActivitySection
                    icon={BookOpen}
                    title="大学時代に一番がんばったこと"
                    color="teal"
                    defaultOpen={false}
                >
                    <div className="grid gap-4">
                        {/* Reusing structure for University section */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">経験タイトル</label>
                            <Input
                                value={data.university.title}
                                onChange={(e) => updateSection("university", "title", e.target.value)}
                                className="bg-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">やったことの概要</label>
                            <textarea
                                value={data.university.description}
                                onChange={(e) => updateSection("university", "description", e.target.value)}
                                className="w-full min-h-[100px] rounded-md border border-input bg-white px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            />
                        </div>

                    </div>
                </ActivitySection>

                <ActivitySection
                    icon={AlertCircle}
                    title="嫌だった・しんどかった経験"
                    color="rose"
                >
                    <div className="p-4 text-center text-slate-400 text-sm bg-slate-50 rounded-lg border border-dashed border-slate-200">
                        まだ入力されていません。
                    </div>
                </ActivitySection>

                <ActivitySection
                    icon={Heart}
                    title="子どものころから好きだったこと"
                    color="orange"
                >
                    <div className="p-4 text-center text-slate-400 text-sm bg-slate-50 rounded-lg border border-dashed border-slate-200">
                        まだ入力されていません。
                    </div>
                </ActivitySection>
            </div>
        </div>
    );
}

function ActivitySection({ icon: Icon, title, children, defaultOpen = false, color = "slate" }: any) {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);

    const colorStyles: any = {
        blue: "bg-blue-50 text-blue-600 border-blue-100",
        teal: "bg-teal-50 text-teal-600 border-teal-100",
        rose: "bg-rose-50 text-rose-600 border-rose-100",
        orange: "bg-orange-50 text-orange-600 border-orange-100",
        slate: "bg-slate-50 text-slate-600 border-slate-100",
    };

    return (
        <div className={`border border-secondary rounded-xl bg-white shadow-sm overflow-hidden transition-all duration-300 ${isOpen ? 'ring-1 ring-primary/20' : ''}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-left"
            >
                <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${colorStyles[color]}`}>
                        <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-slate-800">{title}</span>
                </div>
                {isOpen ? <ChevronDown className="w-5 h-5 text-slate-400" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
            </button>

            {isOpen && (
                <div className="p-4 pt-0 border-t border-slate-100/50 mt-2">
                    {children}
                </div>
            )}
        </div>
    )
}
