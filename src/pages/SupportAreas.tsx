import FancyCard from '../components/FancyCard';

const SupportAreas = () => {
  return (
    <section className="lg:snap-start flex flex-col justify-center items-center min-h-[calc(100vh-60px)] p-16 gap-8 bg-whitish">
      <h1 className='text-blue text-4xl capitalize'>OBSZARY POMOCY</h1>
      <div className='grid grid-cols-1 min-[610px]:grid-cols-2 lg:grid-cols-3 gap-4'>
        <FancyCard title="Stres i napięcie" text="Przewlekły stres, napięcie emocjonalne, objawy psychosomatyczne, presja dnia codziennego, ból napięciowy, zmęczenie, wpływ choroby autoimmunologicznej, choroba przewlekła." />
        <FancyCard title="Zdrowie psychiczne" text=" Depresja, lęk, wypalenie zawodowe, ataki paniki, bezsenność, zaburzenia odżywiania, problemy z kontrolą impulsów, doświadczenie traumatyczne, trauma relacyjna, zaburzenia tożsamości. " />
        <FancyCard title="Kryzys życiowy" text="Trudne momenty życia - rozstanie, rozwód, żałoba, doświadczenie przemocy, utrata zmiana pracy, choroba własna i członka rodziny, trudności okołoporodowe, kryzys tożsamości i egzystencji. " />
        
        <FancyCard title="Związki i relacje" text="Zrozumienie wzorców relacji, style przywiązania, relacje w systemie rodzinnym, konflikty i częste kłótnie w związku, utrata zaufania, uwikłanie w relacji, milczenie, agresja, lęk przed odrzuceniem, trudności w utrzymywaniu relacji." />
        <FancyCard title="Relacja ze sobą" text="Trudności z odczuwaniem własnych emocji, niska samoocena, brak wiary w siebie, samokrytycyzm, brak kontaktu z własnymi potrzebami, perfekcjonizm, prokrastynacja, wstyd, poczucie winy, kryzys roli życiowej." />
        <FancyCard title="Rozówj osobisty" text="Dla tych, którzy chcą lepiej poznać siebie, odkrywać swój potencjał, budować wewnętrzną spójność, zmienić nawyki, poznać wartości, rozwinąć asertywność wewnętrzną i poczucia samostanowienia." />
      </div>
    </section>
  )
};

export default SupportAreas;
