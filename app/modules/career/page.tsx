"use client";

import { useChat } from "ai/react";
import { SplitLayout } from "@/components/modules/SplitLayout";
import { ChatPane } from "@/components/modules/ChatPane";
import { CareerDesignBoard } from "@/components/modules/CareerDesignBoard";

export default function CareerDesignPage() {
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        initialMessages: [
            {
                id: "1",
                role: "assistant",
                content: "キャリア設計モジュールへようこそ。\nまずは、ざっくりと「10年後、どんな生活をしていたらうれしいか」を言葉にしてみましょう。",
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
                    title="キャリア設計チャット"
                    description="未来から逆算して考えます。"
                />
            }
            board={<CareerDesignBoard />}
        />
    );
}
