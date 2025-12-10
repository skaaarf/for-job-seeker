"use client";

import { useChat } from "ai/react";
import { SplitLayout } from "@/components/modules/SplitLayout";
import { ChatPane } from "@/components/modules/ChatPane";
import { EsInterviewBoard } from "@/components/modules/EsInterviewBoard";

export default function EsInterviewPage() {
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        initialMessages: [
            {
                id: "1",
                role: "assistant", // Removed 'as const' to avoid type issues if Message type is strict, though usually fine
                content: "ES・面接対策モジュールへようこそ。\nまずは「自己PR」の骨組みから作っていきましょう。あなたが一番伝えたい強みは何ですか？",
            },
        ],
    });

    return (
        <SplitLayout
            chat={
                <ChatPane
                    messages={messages}
                    input={input}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                    title="面接対策チャット"
                    description="論理構成を壁打ちします。"
                />
            }
            board={<EsInterviewBoard />}
        />
    );
}
