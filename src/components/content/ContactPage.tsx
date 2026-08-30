'use client';

import { motion } from 'motion/react';

import DirectTransmission from '@/components/contact/DirectTransmission';

export default function ContactPage() {
  return (
    <section className="relative h-full w-full overflow-hidden bg-black text-white">
      {/* Background Grid */}{' '}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `               linear-gradient(rgba(249,115,22,0.25) 1px, transparent 1px),
              linear-gradient(90deg, rgba(96,165,250,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />{' '}
      </div>
      {/* Ambient Glows */}
      <div className="pointer-events-none absolute top-1/4 -left-40 h-96 w-96 rounded-full bg-orange-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />
      {/* Main Content */}
      <div
        data-vertical-scroll
        className="relative z-10 h-full overflow-y-auto overscroll-contain px-6 pt-28 pb-24 md:px-12"
      >
        <div className="mx-auto max-w-6xl">
          {/* HEADER */}
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
              filter: 'blur(8px)',
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
            }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-orange-500">
              <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.9)]" />
              SYSTEM CHANNEL // 004
            </div>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight uppercase md:text-6xl">
              ESTABLISH
              <br />
              <span className="text-orange-500">CONNECTION</span>
            </h1>

            <p className="mt-6 max-w-2xl font-mono text-sm leading-7 text-gray-400">
              Looking for a developer, technical specialist, or someone who can turn an idea into a
              working digital system? Establish a connection through one of the channels below.
            </p>
          </motion.div>

          {/* CONNECTION STATUS */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.15,
            }}
            className="mt-10 grid gap-3 font-mono text-xs md:grid-cols-3"
          >
            <StatusCard label="AVAILABILITY" value="OPEN FOR OPPORTUNITIES" active />

            <StatusCard label="WORK MODE" value="REMOTE / FREELANCE" />

            <StatusCard label="RESPONSE CHANNEL" value="DIRECT COMMUNICATION" />
          </motion.div>

          {/* DIVIDER */}
          <div className="my-12 h-px bg-gradient-to-r from-orange-500/40 via-white/10 to-transparent" />

          {/* CONTACT CHANNELS */}
          <SectionHeader
            index="01"
            title="CONTACT CHANNELS"
            subtitle="COMMUNICATION // NETWORK // CONNECTION"
          />

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <ContactCard
              index="01"
              label="EMAIL"
              value="victor.tansingco@victortansingco.com"
              description="Primary communication channel for professional inquiries, freelance work, and collaboration."
              href="mailto:victor.tansingco@victortansingco.com"
              accent="orange"
            />

            <ContactCard
              index="02"
              label="LINKEDIN"
              value="linkedin.com/in/victor-atilano-tan-singco/"
              description="Professional profile, experience, background, and career information."
              href="https://www.linkedin.com/in/victor-atilano-tan-singco/"
              accent="blue"
            />

            <ContactCard
              index="03"
              label="GITHUB"
              value="github.com/bharacuda187"
              description="Code repositories, experiments, web projects, and development work."
              href="https://github.com/bharacuda187"
              accent="orange"
            />

            <ContactCard
              index="04"
              label="RESUME / CV"
              value="VIEW PROFESSIONAL PROFILE"
              description="Professional experience, technical skills, work history, and qualifications."
              href="https://www.linkedin.com/in/victor-atilano-tan-singco/"
              accent="blue"
            />
          </div>

          {/* CAPABILITIES */}
          <div className="mt-16">
            <SectionHeader
              index="02"
              title="AVAILABLE FOR"
              subtitle="SERVICES // CAPABILITIES // COLLABORATION"
            />

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <CapabilityCard
                title="WEB DEVELOPMENT"
                items={[
                  'Business websites',
                  'Responsive interfaces',
                  'Frontend development',
                  'Interactive experiences',
                ]}
              />

              <CapabilityCard
                title="IT SYSTEMS"
                items={[
                  'Systems administration',
                  'Network infrastructure',
                  'Hardware troubleshooting',
                  'Technical support',
                ]}
              />

              <CapabilityCard
                title="DIGITAL SOLUTIONS"
                items={[
                  'Website modernization',
                  'UI implementation',
                  'Technical problem solving',
                  'Custom digital systems',
                ]}
              />
            </div>
          </div>

          {/* FINAL TRANSMISSION */}
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
            className="mt-20 overflow-hidden rounded-xl border border-orange-500/20 bg-orange-500/[0.03]"
          >
            <div className="relative p-8 text-center md:p-12">
              {/* Decorative Signal */}
              <div className="pointer-events-none absolute top-0 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-500/20" />

              <div className="relative z-10">
                <div className="font-mono text-[10px] tracking-[0.35em] text-orange-500">
                  FINAL TRANSMISSION
                </div>

                <h2 className="mt-4 text-2xl font-bold uppercase md:text-4xl">READY TO CONNECT?</h2>

                <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-500">
                  Whether you need a website, technical support, infrastructure assistance, or a
                  digital system built from the ground up, let's start the conversation.
                </p>

                <DirectTransmission />
              </div>
            </div>
          </motion.div>

          {/* FOOTER */}
          <motion.div
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
            className="mt-16 border-t border-white/10 pt-8 text-center"
          >
            <div className="font-mono text-[10px] tracking-[0.35em] text-gray-600">
              SYSTEM CHANNEL // 004
            </div>

            <div className="mt-3 font-mono text-xs tracking-[0.25em] text-green-400">
              ● COMMUNICATION SYSTEM: ONLINE
            </div>

            <p className="mx-auto mt-5 max-w-xl font-mono text-[10px] leading-6 text-gray-600">
              DIGITAL WORKSPACE // PROJECT ARCHIVE // IT SYSTEMS // CONTACT
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
STATUS CARD
============================================================= */

function StatusCard({
  label,
  value,
  active = false,
}: {
  label: string;
  value: string;
  active?: boolean;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.02] px-4 py-4">
      {' '}
      <div className="font-mono text-[9px] tracking-[0.25em] text-gray-600">{label} </div>
      <div className={`mt-2 ${active ? 'text-green-400' : 'text-gray-300'}`}>
        {active && '● '}
        {value}
      </div>
    </div>
  );
}

/* =============================================================
SECTION HEADER
============================================================= */

function SectionHeader({
  index,
  title,
  subtitle,
}: {
  index: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      {' '}
      <div className="font-mono text-[10px] tracking-[0.3em] text-orange-500">{index} </div>
      <h2 className="mt-2 text-2xl font-bold tracking-tight uppercase md:text-3xl">{title}</h2>
      <div className="mt-2 font-mono text-[9px] tracking-[0.25em] text-gray-600">{subtitle}</div>
    </div>
  );
}

/* =============================================================
CONTACT CARD
============================================================= */

function ContactCard({
  index,
  label,
  value,
  description,
  href,
  accent,
}: {
  index: string;
  label: string;
  value: string;
  description: string;
  href: string;
  accent: 'orange' | 'blue';
}) {
  const isOrange = accent === 'orange';

  return (
    <motion.a
      href={href}
      target={href.startsWith('mailto:') ? undefined : '_blank'}
      rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
      whileHover={{
        y: -4,
      }}
      className={`group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-colors ${
        isOrange ? 'hover:border-orange-500/30' : 'hover:border-blue-400/30'
      }`}
    >
      <div
        className={`absolute top-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full ${
          isOrange ? 'bg-orange-500' : 'bg-blue-400'
        }`}
      />

      <div className="flex items-center justify-between">
        <div
          className={`font-mono text-[9px] tracking-[0.25em] ${
            isOrange ? 'text-orange-500' : 'text-blue-400'
          }`}
        >
          CHANNEL // {index}
        </div>

        <span
          className={`font-mono text-[8px] tracking-widest ${
            isOrange ? 'text-orange-500' : 'text-blue-400'
          }`}
        >
          ● ONLINE
        </span>
      </div>

      <h3 className="mt-4 text-xl font-bold uppercase">{label}</h3>

      <div className="mt-2 font-mono text-xs break-all text-gray-400">{value}</div>

      <p className="mt-4 text-sm leading-6 text-gray-600">{description}</p>

      <div
        className={`mt-5 font-mono text-[9px] tracking-[0.2em] transition ${
          isOrange ? 'text-orange-500' : 'text-blue-400'
        }`}
      >
        OPEN CHANNEL →
      </div>
    </motion.a>
  );
}

/* =============================================================
CAPABILITY CARD
============================================================= */

function CapabilityCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
      {' '}
      <div className="font-mono text-[10px] tracking-[0.25em] text-blue-400">MODULE </div>
      <h3 className="mt-3 text-lg font-bold uppercase">{title}</h3>
      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-3 font-mono text-xs text-gray-400">
            <span className="h-1 w-1 shrink-0 rounded-full bg-orange-500" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
