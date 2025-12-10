"use client";

import { useState, useEffect, useRef } from "react";
import { useChat } from "ai/react";
import { Message } from "ai";
import { ChatPane } from "@/components/modules/ChatPane";
import { EpisodeCard, EpisodeCardData, initialEpisodeCardData } from "@/components/modules/EpisodeCard";
import { Plus, MessageSquare, Menu } from "lucide-react";
// import { v4 as uuidv4 } from 'uuid'; // You might need to install uuid or just use a simple random string for now

// Simple ID generator if uuid is not available
const generateId = () => Math.random().toString(36).substring(2, 9);

interface Episode {
    id: string;
    title: string;
    updatedAt: Date;
    messages: Message[];
    cardData: EpisodeCardData;
}

export default function SelfUnderstandingPage() {
    // ---- State ----
    const [episodes, setEpisodes] = useState<Episode[]>([
        {
            id: "default",
            title: "最初のエピソード",
            updatedAt: new Date(),
            messages: [{
                id: "welcome",
                role: "assistant",
                content: "こんにちは。自己理解モジュールへようこそ。\nまずは、あなたの人生で「一番印象に残っている出来事」や「頑張ったこと」について、エピソードのタイトルを決めて教えてください。"
            }],
            cardData: { ...initialEpisodeCardData, title: "新規エピソード" }
        }
    ]);
    const [currentEpisodeId, setCurrentEpisodeId] = useState<string>("default");

    // Derived state
    const currentEpisode = episodes.find(e => e.id === currentEpisodeId) || episodes[0];

    // ---- Chat Hook ----
    // We use a unique key for useChat to force re-initialization when switching episodes
    const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages, reload } = useChat({
        id: currentEpisodeId, // Important for separating sessions if using Vercel AI SDK persistence, but here mainly for key
        initialMessages: currentEpisode.messages,
        body: {
            // Context for the API to know we are in episode mode
            mode: 'episode',
            episodeId: currentEpisodeId
        },
        onFinish: (message) => {
            // Update the current episode's message history when a turn finishes
            updateEpisodeMessages(currentEpisodeId, [...messages, message]);
        }
    });

    // Sync messages state back to episode store as they update (for real-time persistence simulation)
    // Note: 'messages' from useChat updates frequently. We need to be careful not to cause infinite loops.
    useEffect(() => {
        if (messages.length > 0 && messages !== currentEpisode.messages) {
            updateEpisodeMessages(currentEpisodeId, messages);
        }
    }, [messages, currentEpisodeId]);

    // ---- Handlers ----
    const updateEpisodeMessages = (id: string, newMessages: Message[]) => {
        setEpisodes(prev => prev.map(ep =>
            ep.id === id ? { ...ep, messages: newMessages, updatedAt: new Date() } : ep
        ));
    };

    const updateEpisodeCard = (id: string, updates: Partial<EpisodeCardData>) => {
        setEpisodes(prev => prev.map(ep =>
            ep.id === id ? {
                ...ep,
                cardData: { ...ep.cardData, ...updates },
                title: updates.title || ep.cardData.title || ep.title, // Sync title
                updatedAt: new Date()
            } : ep
        ));
    };

    const createNewEpisode = () => {
        const newId = generateId();
        const newEpisode: Episode = {
            id: newId,
            title: "新しいエピソード",
            updatedAt: new Date(),
            messages: [{
                id: "welcome-" + newId,
                role: "assistant",
                content: "新しいエピソードですね。このエピソードではどんなことについて話しますか？"
            }],
            cardData: { ...initialEpisodeCardData, title: "新しいエピソード" }
        };
        setEpisodes(prev => [newEpisode, ...prev]);
        setCurrentEpisodeId(newId);
    };

    const processedMessageIds = useRef<Set<string>>(new Set());

    // Watch for tool calls to update the card AND close the loop with the AI
    useEffect(() => {
        const lastMessage = messages[messages.length - 1];
        if (!lastMessage || lastMessage.role !== "assistant") return;

        // Prevent processing the same message multiple times
        if (processedMessageIds.current.has(lastMessage.id)) return;

        const processToolArgs = (args: Partial<EpisodeCardData>) => {
            console.log("Updating episode card:", args);
            updateEpisodeCard(currentEpisodeId, args);
        };

        let processed = false;

        // 1. Native Tool Call
        // Only process when loading is finished to ensure full arguments
        if (!isLoading && lastMessage.toolInvocations && lastMessage.toolInvocations.length > 0) {
            // Check if we already responded to this tool call to prevent infinite loops
            // (The effect depends on `messages`. If we append a 'tool' message, the last message becomes 'tool', so this block won't run again for the same call.)

            const toolResults: Message[] = [];

            lastMessage.toolInvocations.forEach((toolInvocation) => {
                if (toolInvocation.toolName === 'updateEpisodeCard') {
                    const args = toolInvocation.args as Partial<EpisodeCardData>;
                    processToolArgs(args);

                    // Create success response
                    toolResults.push({
                        id: generateId(),
                        role: 'tool',
                        content: JSON.stringify({ success: true, message: "Episode card updated." }),
                        toolInvocations: [], // Type safety
                        tool_call_id: toolInvocation.toolCallId,
                        name: toolInvocation.toolName
                    } as any); // Cast as any because 'tool_call_id' might be strictly typed or missing in some versions
                }
            });

            if (toolResults.length > 0) {
                processed = true;
                // Append tool results and trigger AI response
                setMessages(prev => [...prev, ...toolResults]);
                // We use setTimeout to allow state update to settle, though reload() usually fetches fresh state.
                setTimeout(() => {
                    reload();
                }, 100);
            }
        }

        // 2. Fallback for hallucinated JSON
        // Only run this when generation is complete to avoid parsing incomplete JSON
        else if (!isLoading && lastMessage.content && lastMessage.content.trim().startsWith('{') && lastMessage.content.includes('tool_calls')) {
            try {
                const parsed = JSON.parse(lastMessage.content);
                if (parsed.tool_calls) {
                    parsed.tool_calls.forEach((tc: any) => {
                        if (tc.function && tc.function.name === 'updateEpisodeCard') {
                            let args = tc.function.arguments;
                            if (typeof args === 'string') {
                                try { args = JSON.parse(args); } catch (e) { }
                            }
                            console.log("Updating episode card (fallback):", args);
                            processToolArgs(args); // Use the helper
                            processed = true;
                        }
                    });
                }
            } catch (e) {
                // Determine if we should log based on whether it looks like it *should* be JSON
                // If it's just normal text that happens to start with {, ignore
                console.warn("Fallback parsing failed (safe to ignore if text):", e);
            }
        }

        if (processed) {
            processedMessageIds.current.add(lastMessage.id);
        }

    }, [messages, currentEpisodeId, reload, setMessages, isLoading]);

    // ---- Render ----
    return (
        <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-slate-50">
            {/* 1. Sidebar (Episode List) */}
            <div className="w-64 flex-shrink-0 bg-white border-r border-secondary flex flex-col">
                <div className="p-4 border-b border-secondary">
                    <button
                        onClick={createNewEpisode}
                        className="w-full flex items-center justify-center gap-2 bg-primary text-white p-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-sm active:scale-95"
                    >
                        <Plus className="w-5 h-5" />
                        New Episode
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {episodes.map(ep => (
                        <button
                            key={ep.id}
                            onClick={() => setCurrentEpisodeId(ep.id)}
                            className={`w-full text-left p-3 rounded-lg transition-colors group ${currentEpisodeId === ep.id
                                ? "bg-slate-100 text-slate-900"
                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                                }`}
                        >
                            <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-sm truncate">{ep.cardData.title || ep.title}</span>
                                {currentEpisodeId === ep.id && <div className="w-2 h-2 rounded-full bg-primary" />}
                            </div>
                            <div className="text-xs text-slate-400 truncate flex items-center gap-1">
                                <MessageSquare className="w-3 h-3" />
                                {ep.messages.length} messages
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* 2. Main Chat Area */}
            <div className="flex-1 flex flex-col min-w-0 border-r border-secondary bg-white">
                <ChatPane
                    // Key is crucial here! changing key forces a full remount of ChatPane and useChat
                    key={currentEpisodeId}
                    messages={messages}
                    input={input}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                    title={currentEpisode.cardData.title || currentEpisode.title}
                    description="AIコーチと対話してエピソードを深掘りしましょう。"
                />
            </div>

            {/* 3. Right Board (Episode Card) */}
            <div className="w-96 flex-shrink-0 bg-slate-50/50 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-4">
                    <EpisodeCard data={currentEpisode.cardData} />
                </div>
            </div>
        </div>
    );
}
