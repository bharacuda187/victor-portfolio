'use client';

import { useEffect, useState } from 'react';
import HudOverlay from './HudOverlay';
import BootHeader from './BootHeader';
import BootConsole from './BootConsole';
import BootStatus from './BootStatus';
import InterfaceTransition from './InterfaceTransition';
import HorizontalScroll from '../layout/HorizontalScroll';
import HeroSection from '../hero/HeroSection';
import AeroFlipTransition from '../layout/AeroFlipTransition';
import ProfilePage from '../profile/ProfilePage';
import StacksPage from '../stacks/StacksPage';
import DynamicNavbar from '../hero/DynamicNavbar';
import ProjectsPage from '../projects/ProjectsPage';
import ITSystemsPage from '../content/ITSystemsPage';
import DigitalWorkspacePage from '../content/DigitalWorkspacePage';
import ContactPage from '../content/ContactPage';
import LikhaPage from '../content/LikhaPage';

type ActivePage =
  | 'home'
  | 'profile'
  | 'stacks'
  | 'projects'
  | 'likha'
  | 'it-systems'
  | 'digital-workspace'
  | 'contact';

export default function BootSequence() {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [bootComplete, setBootComplete] = useState(false);
  const [interfaceEntered, setInterfaceEntered] = useState(false);

  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [coreActive, setCoreActive] = useState(false);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((current) => {
        if (current < 20) {
          return current + 1;
        }

        return current;
      });
    }, 180);

    return () => clearInterval(progressTimer);
  }, []);

  const animateProgressTo = (target: number) => {
    setProgress((current) => {
      const interval = setInterval(() => {
        setProgress((value) => {
          if (value >= target) {
            clearInterval(interval);
            return target;
          }

          return value + 1;
        });
      }, 180);

      return current;
    });
  };

  const handleStageComplete = () => {
    setStage((current) => {
      const next = current + 1;

      if (next === 1) {
        animateProgressTo(35);
      }

      if (next === 2) {
        animateProgressTo(55);
      }

      if (next === 3) {
        animateProgressTo(85);
      }

      if (next === 4) {
        animateProgressTo(100);

        setTimeout(() => {
          setBootComplete(true);
        }, 1200);
      }

      return next;
    });
  };

  const goHome = () => {
    setActivePage('home');
  };

  const goProfile = () => {
    setActivePage('profile');
  };

  const goStacks = () => {
    setActivePage('stacks');
  };

  const goProjects = () => {
    setActivePage('projects');
  };

  const goLikha = () => {
    setActivePage('likha');
  };

  const goITSystems = () => {
    setActivePage('it-systems');
  };

  const goDigitalWorkspace = () => {
    setActivePage('digital-workspace');
  };

  const goContact = () => {
    setActivePage('contact');
  };

  const isBackPage = activePage !== 'home';

  return (
    <>
      {!interfaceEntered && (
        <main className="flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
          <HudOverlay />

          <div className="w-full max-w-4xl px-8">
            {!bootComplete && (
              <>
                <BootHeader />

                <BootConsole stage={stage} onComplete={handleStageComplete} />

                <BootStatus progress={progress} bootComplete={bootComplete} />
              </>
            )}
          </div>
        </main>
      )}

      <InterfaceTransition
        active={bootComplete && !interfaceEntered}
        onEnter={() => setInterfaceEntered(true)}
      />

      {interfaceEntered && (
        <div className="relative h-screen w-screen overflow-hidden">
          {/* MAIN DESKTOP */}
          <HorizontalScroll>
            <AeroFlipTransition
              flipped={isBackPage}
              front={
                <HeroSection
                  onProfileClick={goProfile}
                  coreActive={coreActive}
                  profileActive={false}
                />
              }
              back={
                <>
                  {activePage === 'profile' && <ProfilePage onHomeClick={goHome} />}
                  {activePage === 'stacks' && <StacksPage />}
                  {activePage === 'projects' && (
                    <ProjectsPage
                      onITSystemsClick={goITSystems}
                      onDigitalWorkspaceClick={goDigitalWorkspace}
                      onLikhaClick={goLikha}
                    />
                  )}
                  {activePage === 'likha' && <LikhaPage />}
                  {activePage === 'it-systems' && <ITSystemsPage />}
                  {activePage === 'digital-workspace' && <DigitalWorkspacePage />}
                  {activePage === 'contact' && <ContactPage />}
                </>
              }
            />
          </HorizontalScroll>

          {/* ONE PERSISTENT NAVBAR */}
          <DynamicNavbar
            coreActive={coreActive}
            setCoreActive={setCoreActive}
            onHomeClick={goHome}
            onProfileClick={goProfile}
            onStackClick={goStacks}
            onProjectsClick={goProjects}
            onContactClick={goContact}
          />
        </div>
      )}
    </>
  );
}
