export interface Env {
  AI: Ai;
  ASSETS: Fetcher;
  TURNSTILE_SECRET_KEY: string;
  WEB3FORMS_ACCESS_KEY: string;
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
    // DIRECT TRANSMISSION / CONTACT FORM
    // =====================================================

    if (url.pathname === '/api/contact') {
      if (request.method !== 'POST') {
        return Response.json({ error: 'Method Not Allowed' }, { status: 405 });
      }

      try {
        const body = (await request.json()) as {
          name?: string;
          email?: string;
          message?: string;
          turnstileToken?: string;
        };

        const name = body.name?.trim();
        const email = body.email?.trim();
        const message = body.message?.trim();
        const turnstileToken = body.turnstileToken?.trim();

        if (!name || !email || !message) {
          return Response.json(
            {
              success: false,
              message: 'Name, email, and message are required.',
            },
            { status: 400 },
          );
        }

        if (!turnstileToken) {
          return Response.json(
            {
              success: false,
              message: 'Security verification required.',
            },
            { status: 400 },
          );
        }

        // ===================================================
        // VERIFY CLOUDFLARE TURNSTILE
        // ===================================================

        const turnstileResponse = await fetch(
          'https://challenges.cloudflare.com/turnstile/v0/siteverify',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              secret: env.TURNSTILE_SECRET_KEY,
              response: turnstileToken,
            }),
          },
        );

        const turnstileResult = (await turnstileResponse.json()) as {
          success?: boolean;
          'error-codes'?: string[];
        };

        if (!turnstileResult.success) {
          console.warn('Turnstile verification failed:', turnstileResult['error-codes']);

          return Response.json(
            {
              success: false,
              message: 'Security verification failed. Please try again.',
            },
            { status: 403 },
          );
        }

        // ===================================================
        // SEND TO WEB3FORMS
        // ===================================================

        const web3FormsResponse = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: env.WEB3FORMS_ACCESS_KEY,
            name,
            email,
            message,
            subject: 'Portfolio Direct Transmission',
            from_name: 'Victor Atilano Tan Singco — Portfolio',
          }),
        });

        const web3FormsResult = (await web3FormsResponse.json()) as {
          success?: boolean;
          message?: string;
        };

        if (!web3FormsResult.success) {
          console.error('Web3Forms error:', web3FormsResult);

          return Response.json(
            {
              success: false,
              message: 'Transmission failed. Please try again.',
            },
            { status: 502 },
          );
        }

        return Response.json({
          success: true,
          message: 'Transmission received.',
        });
      } catch (error) {
        console.error('Contact transmission error:', error);

        return Response.json(
          {
            success: false,
            message: 'Transmission error. Please try again.',
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
