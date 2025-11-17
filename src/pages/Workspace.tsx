import { } from 'react';

const Workspace = () => {
  return (
    <section id='workspace' style={{ background: "linear-gradient(to bottom, white 0% 90%, #002233 70% 100%)" }} className="lg:snap-start flex flex-col items-center min-h-[calc(100vh-60px)] p-16 gap-8 ">
      <div className='flex flex-col max-w-6xl items-start justify-evenly'>
        <h1 className='text-blue text-3xl'>Kilka słów, o tym jak pracuję</h1>
        
        <div className='items-start flex flex-col mt-6 gap-8'>
          <p className="hyphens-off" lang="pl">Bazą jest relacja terapeutyczna - bezpieczna, oparta na zaufaniu i autentyczności. </p>
          <p className="hyphens-no" lang="pl">Pomagam osobom w terapii odzyskiwać kontakt ze sobą, z własnymi emocjami i potrzebami, które kiedyś musiały zostać odsunięte, by przetrwać. W trakcie spotkań skupimy się na tym, co dzieje się w Twoim życiu tu i teraz - zarówno w umyśle, jak i w ciele. Dzięki temu masz szansę przyjrzeć się swoim emocjom, przekonaniom i relacjom w nowym świetle, rozpoznać, co Cię wspiera a co ogranicza. Nie analizujemy wyłącznie przeszłości, lecz badamy, jak wpływa ona na Twoje obecne wybory i sposób przeżywania rzeczywistości. Będąc w terapii uczysz się dokonywać wyborów zgodnych z Twoimi potrzebami, co daje poczucie wolności i odpowiedzialności za swoje życie, co z kolei wspiera równowagę psychiczną.  </p>
          <p className="hyphens-off" lang="pl">Jestem pełna ciekawości, jak przeszłe doświadczenia wpłynęły na sposób, w jaki dziś funkcjonujesz i jak możemy wspólnie nadać im kierunek, by stały się źródłem wzrostu oraz siły. Wspólnie pracujemy na tym co dla Ciebie trudne, jak również wzmacniamy wewnętrzne zasoby i możliwości. Podczas sesji terapeutycznych koncentruję się na emocjach, doświadczaniu, czuciu ciała, bazując na  solidnej wiedzy z dziedziny psychologii i neurobiologii.</p>
          <p className="hyphens-no" lang="pl">Pracuję w oparciu o relację w nurtach humanistyczno-doświadczeniowych. Wykorzystuję techniki z terapii Akceptacji i Zaangażowania (ACT), Racjonalnej Terapii Zachowania (RTZ), Terapii Gestalt, uważności, integrując doświadczenie klienta w drodze do odzyskania harmonii psychofizycznej. </p>
          <p className="hyphens-off" lang="pl">Swoją pracę poddaję stałej superwizji. Kieruję się Kodeksem Etyczno-Zawodowym Psychologa.</p>
        </div>

      </div>
    </section>
  )
};

export default Workspace;