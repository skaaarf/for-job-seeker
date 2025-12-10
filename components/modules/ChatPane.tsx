"use client";

import { useEffect, useRef } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/components/ui/Button"; // Re-using cn utility

import { Message } from "ai";

// Define a subset of UseChatHelpers to avoid complex type imports if possible, or just accept what we need
interface ChatPaneProps {
    messages: Message[];
    input: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
    placeholder?: string;
    title?: string;
    description?: string;
}

export function ChatPane({
    messages = [],
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    placeholder = "メッセージを入力...",
    title,
    description
}: ChatPaneProps) {

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
        // Debug logging
        if (messages.length > 0) {
            console.log("ChatPane Messages:", JSON.stringify(messages[messages.length - 1], null, 2));
        }
    }, [messages]);

    return (
        <div className="flex flex-col h-full bg-white border-r border-secondary">
            {/* Header (Optional) */}
            {(title || description) && (
                <div className="p-4 border-b border-secondary">
                    {title && <h2 className="text-sm font-bold text-slate-800">{title}</h2>}
                    {description && <p className="text-xs text-slate-500 mt-1">{description}</p>}
                </div>
            )}

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50" ref={scrollRef}>
                {messages.map((msg) => {
                    // Hide tool result messages
                    if (msg.role === 'function' || msg.role === 'tool') return null;

                    // Check for native tool call
                    const isToolCall = msg.role === 'assistant' && !msg.content && msg.toolInvocations && msg.toolInvocations.length > 0;

                    // Check for hallucinated/text-based tool call
                    const isTextToolCall = msg.role === 'assistant' && msg.content && msg.content.trim().startsWith('{"tool_calls":');

                    if (isToolCall || isTextToolCall) {
                        return (
                            <div key={msg.id} className="flex justify-start w-full">
                                <div className="bg-transparent px-4 py-2 text-xs text-slate-400 italic">
                                    ボードを更新中...
                                </div>
                            </div>
                        );
                    }

                    return (
                        <div
                            key={msg.id}
                            className={cn(
                                "flex w-full",
                                msg.role === "user" ? "justify-end" : "justify-start"
                            )}
                        >
                            <div
                                className={cn(
                                    "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm whitespace-pre-wrap",
                                    msg.role === "user"
                                        ? "bg-primary text-primary-foreground rounded-br-none"
                                        : "bg-white border border-secondary text-slate-700 rounded-bl-none"
                                )}
                            >
                                {msg.content}
                            </div>
                        </div>
                    )
                })}
                {messages.length === 0 && (
                    <div className="text-center text-slate-400 text-sm mt-10">
                        まだ会話はありません。
                    </div>
                )}
                {isLoading && messages[messages.length - 1]?.role === "user" && (
                    <div className="flex justify-start w-full">
                        <div className="bg-white border border-secondary rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                            <span className="text-xs text-slate-400">考え中...</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-secondary">
                <div className="flex gap-2">
                    <Input
                        value={input}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                        className="flex-1 bg-slate-50 border-slate-200 focus:bg-white"
                    // Allow typing even while AI is thinking/updating
                    // disabled={isLoading} 
                    />
                    <Button type="submit" size="icon" className="shrink-0 bg-primary hover:bg-primary/90" disabled={!input.trim()}>
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </form>
        </div>
    );
}
