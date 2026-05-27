import React, { useRef } from 'react';
import Header from './components/Header';
import { Hero, About, Offer, Office, SupportAreas, Testimonials, Contact, Workspace } from './pages'
import { useEnhancedProgressiveSnap } from './hooks/useSimpleSnap';

const App: React.FC = () => {
  const mainRef = useRef<HTMLElement | null>(null);

  useEnhancedProgressiveSnap(mainRef, {
    enabled: true,
    mobileOnly: true,
    snapDelay: 120,
  });
  
  return (
    <div className="h-screen flex flex-col ">
      <Header/>

      <main 
        ref={mainRef} 
        className="flex-1 overflow-y-auto scroll-container lg:snap-y lg:snap-mandatory"
      >
        <Hero />
        <About />
        <Offer />
        <Workspace />
        <SupportAreas />
        <Testimonials />
        <Office />
        <Contact />
      </main>
    </div>
  );
};

export default App;
