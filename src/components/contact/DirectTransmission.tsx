'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          theme?: 'auto' | 'light' | 'dark';
          appearance?: 'always' | 'execute' | 'interaction-only';
          callback?: (token: string) => void;
          'error-callback'?: () => void;
          'expired-callback'?: () => void;
        },
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

export default function DirectTransmission() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);

  const [turnstileToken, setTurnstileToken] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    const renderTurnstile = () => {
      if (!window.turnstile || !turnstileRef.current || turnstileWidgetId.current) {
        return;
      }

      turnstileWidgetId.current = window.turnstile.render(turnstileRef.current, {
        sitekey: '0x4AAAAAAEiMZJuMl9LoyE7B',
        theme: 'dark',
        appearance: 'interaction-only',

        callback: (token) => {
          setTurnstileToken(token);
        },

        'error-callback': () => {
          setTurnstileToken('');
        },

        'expired-callback': () => {
          setTurnstileToken('');
        },
      });
    };

    if (window.turnstile) {
      renderTurnstile();
      return;
    }

    const existingScript = document.querySelector(
      'script[src^="https://challenges.cloudflare.com/turnstile/"]',
    );

    if (existingScript) {
      existingScript.addEventListener('load', renderTurnstile);
      return () => {
        existingScript.removeEventListener('load', renderTurnstile);
      };
    }

    const script = document.createElement('script');

    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

    script.async = true;
    script.defer = true;

    script.addEventListener('load', renderTurnstile);

    document.head.appendChild(script);

    return () => {
      script.removeEventListener('load', renderTurnstile);
    };
  }, [isOpen]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSending) return;

    setIsSending(true);
    setStatus('idle');
    setErrorMessage('');

    const form = event.currentTarget;

    const formData = new FormData(form);

    const payload = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      message: String(formData.get('message') || '').trim(),
      turnstileToken: String(formData.get('cf-turnstile-response') || '').trim(),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (data.success) {
        form.reset();
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'TRANSMISSION FAILED. PLEASE TRY AGAIN.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('TRANSMISSION ERROR. PLEASE CHECK YOUR CONNECTION.');
    } finally {
      setIsSending(false);
    }
  };

  const resetTransmission = () => {
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <div className="mt-8">
      {/* Trigger */}
      {!isOpen && (
        <motion.button
          type="button"
          onClick={() => {
            setIsOpen(true);
            resetTransmission();
          }}
          whileHover={{
            y: -2,
          }}
          whileTap={{
            scale: 0.98,
          }}
          className="inline-flex items-center gap-3 border border-orange-500/40 px-6 py-3 font-mono text-[10px] tracking-[0.25em] text-orange-500 transition-all duration-300 hover:bg-orange-500/10 hover:shadow-[0_0_30px_rgba(249,115,22,0.12)]"
        >
          INITIATE TRANSMISSION
          <span>→</span>
        </motion.button>
      )}

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              height: 'auto',
              y: 0,
            }}
            exit={{
              opacity: 0,
              height: 0,
              y: -10,
            }}
            transition={{
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="overflow-hidden text-left"
          >
            <div className="mx-auto max-w-2xl rounded-xl border border-orange-500/20 bg-black/40 p-5 shadow-[0_0_40px_rgba(249,115,22,0.06)] md:p-6">
              {/* Form Header */}
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]" />

                <span className="font-mono text-xs tracking-[0.2em] text-orange-400">
                  DIRECT TRANSMISSION
                </span>

                <span className="h-px flex-1 bg-white/10" />

                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    resetTransmission();
                  }}
                  className="font-mono text-[9px] tracking-widest text-gray-600 transition hover:text-orange-400"
                >
                  CLOSE ×
                </button>
              </div>

              {/* Success */}
              {status === 'success' ? (
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  className="py-10 text-center"
                >
                  <div className="font-mono text-sm tracking-[0.25em] text-green-400">
                    ✓ TRANSMISSION RECEIVED
                  </div>

                  <p className="mt-3 font-mono text-[9px] tracking-[0.2em] text-gray-600">
                    CHANNEL CLOSED.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setStatus('idle');
                    }}
                    className="mt-6 border border-white/10 px-5 py-2 font-mono text-[9px] tracking-[0.2em] text-gray-500 transition hover:border-orange-500/30 hover:text-orange-400"
                  >
                    SEND ANOTHER
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="YOUR NAME"
                    required
                    disabled={isSending}
                    className="w-full rounded-lg border border-white/10 bg-white/[0.025] px-4 py-3 font-mono text-xs text-gray-300 transition outline-none placeholder:text-gray-700 focus:border-orange-500/40 disabled:cursor-not-allowed disabled:opacity-50"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="YOUR EMAIL"
                    required
                    disabled={isSending}
                    className="w-full rounded-lg border border-white/10 bg-white/[0.025] px-4 py-3 font-mono text-xs text-gray-300 transition outline-none placeholder:text-gray-700 focus:border-orange-500/40 disabled:cursor-not-allowed disabled:opacity-50"
                  />

                  <textarea
                    name="message"
                    rows={5}
                    placeholder="TRANSMISSION MESSAGE..."
                    required
                    disabled={isSending}
                    className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.025] px-4 py-3 font-mono text-xs text-gray-300 transition outline-none placeholder:text-gray-700 focus:border-orange-500/40 disabled:cursor-not-allowed disabled:opacity-50"
                  />

                  {/* Honeypot spam protection */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                  {/* Cloudflare Turnstile */}
                  <div ref={turnstileRef} className="flex justify-center overflow-hidden" />

                  {/* Error */}
                  {status === 'error' && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -5,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="rounded border border-red-500/20 bg-red-500/[0.04] px-3 py-2 font-mono text-[9px] text-red-400"
                    >
                      ⚠ {errorMessage}
                    </motion.div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full rounded-lg border border-orange-500/30 bg-orange-500/10 py-3 font-mono text-[10px] tracking-[0.2em] text-orange-400 transition hover:border-orange-500/60 hover:bg-orange-500/15 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSending ? 'TRANSMITTING...' : 'TRANSMIT MESSAGE →'}
                  </button>

                  <div className="flex items-center justify-between pt-1">
                    <span className="font-mono text-[8px] tracking-widest text-gray-700">
                      ENCRYPTED CHANNEL
                    </span>

                    <span className="font-mono text-[8px] tracking-widest text-gray-700">
                      WEB3FORMS // ONLINE
                    </span>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
