"use client";

import React, { ReactNode } from "react";

interface SplitLayoutProps {
    chat: ReactNode;
    board: ReactNode;
}

export function SplitLayout({ chat, board }: SplitLayoutProps) {
    return (
        <div className="flex flex-col md:flex-row h-screen overflow-hidden">
            {/* Chat Pane (Fixed Width on Desktop) */}
            <aside className="w-full md:w-[400px] shrink-0 h-[40vh] md:h-full border-b md:border-b-0 md:border-r border-secondary bg-white z-10 transition-all">
                {chat}
            </aside>

            {/* Board Pane (Flexible) */}
            <main className="flex-1 h-[60vh] md:h-full overflow-y-auto bg-slate-50/50 relative">
                <div className="min-h-full p-4 md:p-8 max-w-5xl mx-auto">
                    {board}
                </div>
            </main>
        </div>
    );
}
