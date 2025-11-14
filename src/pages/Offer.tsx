import { } from 'react';
import CircleImage from "../components/CircleImage";
import puzzle from '../assets/puzzle.png'
import goals from "../assets/goal.png"
import thinkingHead from "../assets/logic.png"

const Workplace = () => {
  return (
    <section id='offer' className="snap-start flex flex-col items-center h-[calc(100vh-72px)] justify-center p-16 gap-8">
      <h1 className='text-blue text-3xl capitalize'>OFERUJĘ</h1>

      <div className='flex flex-row justify-center gap-4 max-w-6xl'>

        <div className='items-center gap-4 flex flex-col justify-evenly'>
          <CircleImage src={thinkingHead} alt="thinking head icon" />
          <h1 className='text-blue text-3xl capitalize text-center'>KONSULTACJA PSYCHOLOGICZNA</h1>
          <p className="hyphens-no" lang="pl">Spotkanie, którego celem jest rozpoznanie problemu klienta. Może być pierwszym krokiem do głębszej pracy terapeutycznej lub jednorazowym kontaktem pomagającym spojrzeć na trudność z  nowej perspektywy.</p>
        </div>
        
        <div className="w-2 h-80 bg-blue/70 rounded" aria-hidden />
        
        <div className='items-center gap-4 flex flex-col justify-evenly'>
          <CircleImage src={puzzle} alt="Puzzle icon" />
          <h1 className='text-blue text-3xl capitalize text-center'>TERAPIA INDYWIDUALNA</h1>
          <p className="hyphens-no" lang="pl">Regularne sesje terapeutyczne, których celem jest odnalezienie źródeł trwających trudności wraz ze zmianą schematów i sposobów reagowania na te bardziej wspierające i adaptacyjne.</p>
        </div>

        <div className="w-2 h-80 bg-blue/70 rounded" aria-hidden />

        <div className='items-center gap-4 flex flex-col justify-evenly'>
          <CircleImage src={goals} alt="goals icon" />
          <h1 className='text-blue text-3xl capitalize text-center'>WSPARCIE W KRYZYSIE</h1>
          <p className="hyphens-no" lang="pl">Krótkoterminowe, intensywne wsparcie interwencji kryzysowej w sytuacjach nagłych, które pomaga, zrozumieć to co się dzieje, odzyskać poczucie bezpieczeństwa i powrócić  do równowagi psychofizycznej. </p>
        </div>

      </div>
    </section>
  )
};

export default Workplace;