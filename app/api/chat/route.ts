import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const { messages, body } = await req.json(); // Extract body if needed for context
    const episodeId = body?.episodeId;

    const systemMessage = {
        role: 'system',
        content: `あなたはプロのキャリアコーチAIです。
ユーザーが話す「エピソード（過去の経験）」について、深掘り質問を行い、その内容をSTARモデル（状況、課題、行動、結果）および分析（強み、価値観、感情、学び）に整理してください。

## 指示
- ユーザーは1つのエピソードについて話しています。話題が逸れないように注意してください。
- 自然な会話を心がけてください。質問攻めにしないでください。
- ユーザーから重要な情報を聞き出せたら、**こまめに** \`updateEpisodeCard\` ツールを呼び出して、現在の理解度を記録してください。
- ツール呼び出しは裏側で行われるメモ書きです。ユーザーには「なるほど、〜なんですね」と普通に返してください。
- 具体的な行動（Action）と、その時の感情（Emotion）を特に深掘りしてください。`
    };

    const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        stream: true,
        messages: [systemMessage, ...messages],
        tools: [
            {
                type: 'function',
                function: {
                    name: 'updateEpisodeCard',
                    description: 'Update the episode card with extracted information. Call this whenever the user reveals new details about the situation, task, action, result, or their inner thoughts.',
                    parameters: {
                        type: 'object',
                        properties: {
                            title: { type: 'string', description: 'A short, summarization title for this episode' },
                            period: { type: 'string', description: 'When did this happen?' },
                            situation: { type: 'string', description: 'STAR: Situation - The background or context' },
                            task: { type: 'string', description: 'STAR: Task - The challenge or goal' },
                            action: { type: 'string', description: 'STAR: Action - What the user specifically did' },
                            result: { type: 'string', description: 'STAR: Result - The outcome or achievement' },
                            strengths: { type: 'string', description: 'Strengths exhibited in this episode' },
                            values: { type: 'string', description: 'Values or motivations discovered' },
                            emotions: { type: 'string', description: 'Emotions felt during the experience' },
                            learnings: { type: 'string', description: 'What the user learned from this' },
                        },
                    },
                },
            },
        ],
        tool_choice: 'auto',
    });

    const stream = OpenAIStream(response as any);
    return new StreamingTextResponse(stream);
}
