import React from 'react';
import Header from './components/Header';
import { Hero, About, Offer, Office, SupportAreas, Testimonials, Contact, Workspace } from './pages'

const App: React.FC = () => {
  return (
    // set page height to viewport and use column layout
    <div className="h-screen flex flex-col">
      {/* give header a fixed height (match the calc used below) */}
      <Header/>

      {/* main becomes the single scroll container */}
      <main className="flex-1 overflow-y-auto snap-y snap-mandatory scroll-smooth">
        {/* each section should equal viewport minus header height 
        <section className="snap-start h-[calc(100vh-72px)]">
          
        </section>

        */}

        <Hero />
        <About />
        <Offer />
        <Workspace />
        <SupportAreas />
        <Testimonials />
        <Office />
        <Contact />
      </main>
      {/* 
      <footer className="py-4 text-center text-muted text-sm lg:text-md bg-neutral-300">
        <p className="px-20">© {new Date().getFullYear()} Jolanta Dominiak-Konderak | Wszelkie prawa zastrzeżone</p>
      </footer>
      */}

      {/*
      credits: 
      https://www.flaticon.com/free-icon/puzzle-piece_4205637?term=puzzle&page=1&position=2&origin=search&related_id=4205637
      https://www.flaticon.com/free-icon/logic_9654177?term=thinking+head&page=1&position=4&origin=search&related_id=9654177
      <a href="https://www.flaticon.com/free-icons/goal" title="goal icons">Goal icons created by IconBaandar - Flaticon</a>
      https://www.flaticon.com/free-icon/goal_3891260?term=goals&page=1&position=12&origin=search&related_id=3891260

      https://media.flaticon.com/license/license.pdf
      */}

      {/* originals
      https://www.istockphoto.com/pl/wektor/umiej%C4%99tno%C5%9Bci-pracy-zespo%C5%82owej-ci%C4%85g%C5%82a-linia-edytowalna-linia-obrysu-gm1408059546-459043446

       */}
    </div>
  );
};

export default App;