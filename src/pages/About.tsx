import { } from 'react';
import jola from '../assets/jola_portret.jpg';

const About = () => {
  return (
    <section id="about" style={{ background: "linear-gradient(to right, white 0% 70%, #002233 70% 100%)" }} className="snap-start h-[calc(100vh-72px)] flex justify-center items-center p-16">
      <div className='flex flex-col md:grid md:grid-cols-2 justify-center gap-8 max-w-6xl w-full h-full'>
        <div className='items-start gap-6 flex flex-col'>
          <h1 className='text-blue text-3xl uppercase'>O mnie</h1>
          <div>
            <div className='flex flex-row gap-1 items-baseline'>
              <p className='text-blue font-bold'>Nazywam się</p><p className='text-blue font-bold text-lg'>Jolanta Dominiak-Konderak</p>
            </div>
            
            <p className='text-blue font-bold'>Prowadzę gabinet pomocy psychologicznej</p>
          </div>
          
          <p className="hyphens-no leading-loose" lang="pl">Wykształcenie kierunkowe psychologiczne o specjalności człowieka dorosłego zdobyłam na Uniwersytecie Opolskim. W toku studiów oraz dalszej edukacji, zdobyłam wymagane kompetencje do pracy w obszarze pomocy oraz diagnozy psychologicznej.</p>
          <p className="hyphens-no leading-loose" lang="pl">Doświadczenie zawodowe zdobywałam m.in. w Centrum Zdrowia Psychicznego w Knurowie. Ukończyłam także kurs Racjonalnej Terapii Zachowania oraz Interwencji Kryzysowej, co pozwala mi prowadzić interwencje dla osób w trudnych momentach życiowych. Towarzyszyłam również pacjentom z doświadczeniem choroby onkologicznej, wspierając ich w momencie kryzysu choroby.</p>
        </div>
        {/* image column: allow it to shrink with min-h-0 and stretch to parent's height */}
        <div className="p-8 flex items-stretch h-full min-h-0">
          {/* constrained wrapper: use h-full so the image can be height-limited */}
          <div className="w-full h-full overflow-hidden md:rounded-tl-[8vw] min-h-0">
            <img
              src={jola}
              alt="Portret Jolii w fotelu trzymającej kawę"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  )
};

export default About;