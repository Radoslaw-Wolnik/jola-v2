import React, { useEffect, useRef, useState } from 'react';
import { FaStar } from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";


interface Testimonial {
  id: number;
  quote: string;
  name: string;
  rating?: number; // 1..5
}

const TESTIMONIALS: Testimonial[] = [
  { id: 1, quote: "Świetne efekty terapii, duże zaangażowanie i empatia ze strony Pani Jolanty, każda wizyta była bardzo wartościowa i skłaniała do pracy nad sobą także poza gabinetem", name: 'Justyna', rating: 5 },
  { id: 2, quote: "Pani Jolanta jest bardzo ciepła i wspierającą, w gabinecie czułam się dobrze zaopiekowania oraz atmosfera pozwalała na otworzenie się przed Panią Jolanta. Jako osoba, której ciężko było przekonać się do psychologów polecam Panią Jolantę całym sercem. Odpowiednia osoba w odpowiednim miejscu, współpracę będę wspominać bardzo dobrze.", name: 'Milena', rating: 5 },
  { id: 3, quote: "Jestem bardzo wdzięczna za pomoc i współpracę z Panią Jolantą. Profesjonalnie i w przyjazny sposób objaśnia mi mechanizmy, które zachodzą w podejmowanych przeze mnie tematach. Dzięki świeżemu spojrzeniu na neutralnym gruncie łatwiej mi jest poukładać myśli, a Pani Jolanta zawsze zostawia mnie z konkluzją na kolejny krok do działania i pole do ewaluacji na następnych spotkaniach.", name: 'Michalina', rating: 5 },
  { id: 4, quote: "Przez całą rozmowę czułem się bardzo komfortowo i przede wszystkim naprawdę słyszany przez panią psycholog. Jej zrozumienie moich problemów zdecydowanie ułatwiło mi otwarcie się bez lęku.", name: 'Mateusz', rating: 5 },
  { id: 5, quote: "Polecam… Fachowo, rzeczowo, punktualnie. Wiem, że mogę się otworzyć i zaufać", name: 'Agnieszka', rating: 5 },
  { id: 6, quote: "Czułem, że dostałem pytania szukające faktycznych przyczyn moich myśli, czułem się słuchany", name: 'Szymon', rating: 5 },
  { id: 7, quote: "Spotkania z Panią Jolantą odbywały się w ciepłej atmosferze, dzięki czemu czułem się wysłuchany i nieoceniany. Zdecydowanie polecam wizytę u Pani Jolanty każdemu, kto szuka wsparcia i zrozumienia. Było to dla mnie niezwykle pozytywne i inspirujące doświadczenie", name: 'Robert', rating: 5 },
  { id: 8, quote: "Pani Jolanta jest świetnym specjalistą. Jej otwartość, dobroć, spokój i profesjonalizm bardzo mi pomogły. Serdecznie polecam.", name: 'Dagmara', rating: 5 },
  { id: 9, quote: "Sesje odbywają się w przemiłej atmosferze. Rozmowa z Panią psycholog zawsze kończyła się podsumowaniem. Czułam się wysłuchana i zrozumiana. Jeszcze raz dziękuję. Polecam.", name: 'Monika', rating: 5 },
];

const AUTOPLAY_MS = 8000;

export default function TestimonialsCarousel() {
  const testimonials = TESTIMONIALS;
  const count = testimonials.length;

  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const slideWidthRef = useRef<number>(0);
  const autoPlayRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  // measure width (run on mount and window resize)
  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      // clientWidth is the inner width in px
      slideWidthRef.current = containerRef.current.clientWidth;
      // force a re-render so the inline styles pick up the correct width
      setIndex((i) => i); // noop set to trigger update if needed
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('orientationchange', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('orientationchange', measure);
    };
  }, []);

  // autoplay
  const stopAutoPlay = () => {
    if (autoPlayRef.current !== null) {
      window.clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };
  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
  };
  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  // nav
  const prev = () => setIndex((i) => (i - 1 + count) % count);
  const next = () => setIndex((i) => (i + 1) % count);
  const goTo = (i: number) => setIndex((i + count) % count);

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []); // stable handlers above

  // touch
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    stopAutoPlay();
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const startX = touchStartX.current;
    if (startX == null) return;
    const diff = e.changedTouches[0].clientX - startX;
    const threshold = 40;
    if (diff > threshold) prev();
    else if (diff < -threshold) next();
    touchStartX.current = null;
    startAutoPlay();
  };

  // compute transform in px using measured width
  const translateX = -index * (slideWidthRef.current || 0);

  return (
    <div className="flex flex-col items-center gap-6 max-w-6xl w-full">
      <div className="relative w-full">
        <button
          onClick={() => { prev(); startAutoPlay(); }}
          aria-label="Poprzednie"
          className="absolute left-20 top-1/3 -translate-y-1/2 z-20 rounded-full p-2  bg-none"
        ><IoIosArrowBack size={60} color='#d8ae5e' /></button>

        <button
          onClick={() => { next(); startAutoPlay(); }}
          aria-label="Następne"
          className="absolute right-20 top-1/3 -translate-y-1/2 z-20 rounded-full p-2 bg-none"
        ><IoIosArrowForward size={60} color='#d8ae5e' /></button>

        <div
          ref={containerRef}
          className="overflow-hidden w-full"
          onMouseEnter={stopAutoPlay}
          onMouseLeave={startAutoPlay}
          onFocus={stopAutoPlay}
          onBlur={startAutoPlay}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          tabIndex={0}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            // use px translation for exactness
            style={{
              transform: `translateX(${translateX}px)`,
              // optional: set minHeight so container doesn't jump while width is measured
            }}
          >
            {testimonials.map((t) => (
              <article
                key={t.id}
                // force each slide to be exactly container width
                style={{ width: slideWidthRef.current || '100%' }}
                className="shrink-0 flex flex-col items-center justify-center p-8"
              >
                <p className="text-center text-lg max-w-3xl leading-relaxed text-whitish">“{t.quote}”</p>
                <div className="mt-4 text-center">
                  <p className="font-semibold text-whitish">{t.name}</p>
                  <p className="mt-2" aria-hidden>
                    {Array.from({ length: t.rating ?? 5 }).map((_, i) => (
                      <span key={i} className="inline-block"><FaStar size={10} color='#d8ae5e'/></span>
                    ))}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* dots */}
        <div className="mt-6 flex gap-2 justify-center">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { goTo(i); startAutoPlay(); }}
              aria-label={`Pokaż opinie ${i + 1}`}
              className={`w-3 h-3 rounded-full focus:outline-none focus:ring ${i === index ? 'scale-125' : 'opacity-50'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
