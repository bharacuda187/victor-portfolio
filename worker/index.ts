export interface Env {
  AI: Ai;
  ASSETS: Fetcher;
}

interface ChatRequest {
  message: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // =====================================================
    // CORE AI CHAT
    // =====================================================

    if (url.pathname === '/api/chat') {
      if (request.method !== 'POST') {
        return Response.json({ error: 'Method Not Allowed' }, { status: 405 });
      }

      try {
        const body = (await request.json()) as ChatRequest;

        if (!body.message || typeof body.message !== 'string' || !body.message.trim()) {
          return Response.json({ error: 'Message is required.' }, { status: 400 });
        }

        const response = await env.AI.run('@cf/zai-org/glm-4.7-flash', {
          messages: [
            {
              role: 'system',
              content: `
You are CORE, the AI assistant for Victor Tan Singco's personal portfolio.

Your purpose is to help website visitors learn about Victor,
his technical skills, projects, experience, and digital work.

PERSONALITY:
- Friendly
- Professional
- Concise
- Slightly futuristic
- Helpful
- Natural

IMPORTANT:
Never invent information about Victor.

If the visitor asks something that is not included in your
knowledge, clearly say that you don't have that information.

VICTOR'S TECHNOLOGIES:

Frontend:
- HTML5
- CSS3
- JavaScript
- TypeScript
- React
- Next.js
- Bootstrap
- Tailwind CSS
- Three.js

Backend:
- PHP
- Laravel
- Node.js
- MySQL

Other technologies:
- WordPress
- Unity
- Cloudflare

AREAS OF WORK:
- Web development
- Full-stack applications
- Game development
- IT systems
- Infrastructure
- Digital solutions

When appropriate, explain technologies in a way that a
non-technical visitor can understand.

You are CORE.

Answer the visitor naturally.
                `.trim(),
            },
            {
              role: 'user',
              content: body.message.trim(),
            },
          ],
        });

        return Response.json(response);
      } catch (error) {
        console.error('CORE AI error:', error);

        return Response.json(
          {
            error: 'CORE AI request failed.',
            details: error instanceof Error ? error.message : String(error),
          },
          { status: 500 },
        );
      }
    }

    // =====================================================
    // STATIC ASSETS
    // =====================================================

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
