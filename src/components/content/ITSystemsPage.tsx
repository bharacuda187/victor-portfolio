'use client';

import { motion } from 'motion/react';

export default function ITSystemsPage() {
  return (
    <section className="relative h-full w-full overflow-hidden bg-black text-white">
      {/* Background Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(249,115,22,0.25) 1px, transparent 1px),
              linear-gradient(90deg, rgba(96,165,250,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Ambient Glow */}
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
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-orange-500">
              <span className="h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.9)]" />
              SYSTEM ARCHIVE // 001
            </div>

            <h1 className="mt-5 max-w-4xl text-4xl font-extrabold tracking-tight uppercase md:text-6xl">
              IT SYSTEMS
              <br />
              <span className="text-orange-500">& INFRASTRUCTURE</span>
            </h1>

            <p className="mt-6 max-w-2xl font-mono text-sm leading-7 text-gray-400">
              Systems administration, network infrastructure, hardware deployment, troubleshooting,
              and technical operations developed through hands-on business environments.
            </p>
          </motion.div>

          {/* SYSTEM STATUS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-10 grid gap-3 font-mono text-xs md:grid-cols-3"
          >
            <StatusCard label="ROLE" value="SYSTEM ADMINISTRATOR" />
            <StatusCard label="ENVIRONMENT" value="BUSINESS INFRASTRUCTURE" />
            <StatusCard label="STATUS" value="OPERATIONAL" active />
          </motion.div>

          {/* DIVIDER */}
          <div className="my-12 h-px bg-gradient-to-r from-orange-500/40 via-white/10 to-transparent" />

          {/* INFRASTRUCTURE */}
          <SectionHeader
            index="01"
            title="NETWORK INFRASTRUCTURE"
            subtitle="CONNECTIVITY // COMMUNICATION // AVAILABILITY"
          />

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <InfoPanel
              title="NETWORK OPERATIONS"
              items={[
                'LAN / WAN administration',
                'Router and switch configuration',
                'IP addressing and connectivity',
                'Network troubleshooting',
                'Wi-Fi infrastructure',
                'Internet connectivity diagnostics',
              ]}
            />

            <InfoPanel
              title="INFRASTRUCTURE SUPPORT"
              items={[
                'Network equipment deployment',
                'Workstation connectivity',
                'Shared resource access',
                'Network fault isolation',
                'Connectivity monitoring',
                'On-site technical intervention',
              ]}
            />
          </div>

          {/* SYSTEM ADMINISTRATION */}
          <div className="mt-16">
            <SectionHeader
              index="02"
              title="SYSTEM ADMINISTRATION"
              subtitle="SERVERS // WORKSTATIONS // USERS"
            />

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <InfoPanel
                title="SERVERS"
                items={[
                  'Server maintenance',
                  'System monitoring',
                  'Resource management',
                  'Backup procedures',
                ]}
              />

              <InfoPanel
                title="WORKSTATIONS"
                items={[
                  'PC deployment',
                  'Operating system installation',
                  'Software configuration',
                  'Hardware troubleshooting',
                ]}
              />

              <InfoPanel
                title="USERS"
                items={[
                  'Account administration',
                  'Access troubleshooting',
                  'Technical assistance',
                  'User support',
                ]}
              />
            </div>
          </div>

          {/* FIELD OPERATIONS */}
          <div className="mt-16">
            <SectionHeader
              index="03"
              title="FIELD OPERATIONS"
              subtitle="HARDWARE // DEPLOYMENT // MAINTENANCE"
            />

            <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
              <div className="grid md:grid-cols-2">
                <div className="border-b border-white/10 p-6 md:border-r md:border-b-0">
                  <div className="font-mono text-[10px] tracking-[0.25em] text-orange-500">
                    HARDWARE
                  </div>

                  <h3 className="mt-3 text-xl font-bold uppercase">Physical Infrastructure</h3>

                  <p className="mt-4 text-sm leading-7 text-gray-400">
                    Hands-on experience deploying, maintaining, diagnosing, and repairing computer
                    hardware and network equipment in real business environments.
                  </p>
                </div>

                <div className="p-6">
                  <div className="font-mono text-[10px] tracking-[0.25em] text-blue-400">
                    OPERATIONS
                  </div>

                  <h3 className="mt-3 text-xl font-bold uppercase">On-Site Support</h3>

                  <p className="mt-4 text-sm leading-7 text-gray-400">
                    Resolving technical issues directly at the workstation, network, and
                    infrastructure level while minimizing disruption to business operations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CASE STUDY */}
          <div className="mt-16">
            <SectionHeader
              index="04"
              title="FIELD CASE STUDY"
              subtitle="PROBLEM // ACTION // RESULT"
            />

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <CaseCard
                label="01 // PROBLEM"
                title="CONNECTIVITY"
                description="Users experiencing unreliable network connectivity and difficulty accessing shared resources."
              />

              <CaseCard
                label="02 // ACTION"
                title="DIAGNOSIS"
                description="Investigated physical connections, network equipment, workstation configuration, and connectivity paths."
              />

              <CaseCard
                label="03 // RESULT"
                title="RESTORATION"
                description="Identified the source of the issue, restored connectivity, and returned affected systems to normal operation."
              />
            </div>
          </div>

          {/* SKILLS MATRIX */}
          <div className="mt-16">
            <SectionHeader
              index="05"
              title="SYSTEM CAPABILITIES"
              subtitle="TECHNICAL EXPERIENCE MATRIX"
            />

            <div className="mt-8 space-y-5 rounded-xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <SkillBar label="NETWORKING" value="95%" />
              <SkillBar label="HARDWARE & ENDPOINTS" value="95%" />
              <SkillBar label="TROUBLESHOOTING" value="95%" />
              <SkillBar label="SYSTEM ADMINISTRATION" value="90%" />
              <SkillBar label="TECHNICAL SUPPORT" value="95%" />
              <SkillBar label="INFRASTRUCTURE OPERATIONS" value="90%" />
            </div>
          </div>

          {/* CLOSING */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-20 border-t border-white/10 pt-10 text-center"
          >
            <div className="font-mono text-[10px] tracking-[0.35em] text-gray-600">
              SYSTEM ARCHIVE // 001
            </div>

            <div className="mt-3 font-mono text-xs tracking-[0.25em] text-green-400">
              ● SYSTEM STATUS: OPERATIONAL
            </div>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-500">
              A foundation built through hands-on systems administration, infrastructure support,
              hardware operations, and real-world technical problem solving.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------
   COMPONENTS
------------------------------------------------------------- */

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
      <div className="text-[9px] tracking-[0.25em] text-gray-600">{label}</div>

      <div className={`mt-2 ${active ? 'text-green-400' : 'text-gray-300'}`}>
        {active && '● '}
        {value}
      </div>
    </div>
  );
}

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
      <div className="font-mono text-[10px] tracking-[0.3em] text-orange-500">{index}</div>

      <h2 className="mt-2 text-2xl font-bold tracking-tight uppercase md:text-3xl">{title}</h2>

      <div className="mt-2 font-mono text-[9px] tracking-[0.25em] text-gray-600">{subtitle}</div>
    </div>
  );
}

function InfoPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-orange-500/30">
      <div className="font-mono text-[10px] tracking-[0.25em] text-blue-400">MODULE</div>

      <h3 className="mt-2 text-lg font-bold uppercase">{title}</h3>

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

function CaseCard({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-xl border border-white/10 bg-white/[0.02] p-6"
    >
      <div className="font-mono text-[9px] tracking-[0.25em] text-orange-500">{label}</div>

      <h3 className="mt-3 text-lg font-bold uppercase">{title}</h3>

      <p className="mt-4 text-sm leading-7 text-gray-500">{description}</p>
    </motion.div>
  );
}

function SkillBar({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between font-mono text-[10px] tracking-[0.2em]">
        <span className="text-gray-400">{label}</span>
        <span className="text-orange-500">{value}</span>
      </div>

      <div className="h-1 overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: value }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            ease: 'easeOut',
          }}
          className="h-full bg-gradient-to-r from-orange-500 to-blue-400"
        />
      </div>
    </div>
  );
}
