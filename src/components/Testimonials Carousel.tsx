import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  const count = testimonials.length || 1;

  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const autoPlayRef = useRef<number | null>(null);
  
  // Touch/pointer tracking refs
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
  const isDragging = useRef(false);
  const lastMoveX = useRef<number | null>(null);

  // autoplay
  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current !== null) {
      window.clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    autoPlayRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
  }, [count, stopAutoPlay]);

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [startAutoPlay, stopAutoPlay]);

  // nav
  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + count) % count);
  }, [count]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % count);
  }, [count]);

  const goTo = useCallback((i: number) => {
    setIndex((i + count) % count);
  }, [count]);

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  // --- Touch / Pointer handlers (robust swipe) ---
  const threshold = 40; // px required to consider a swipe

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    lastMoveX.current = startX.current;
    isDragging.current = false;
    stopAutoPlay();
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (startX.current == null || startY.current == null) return;

    const x = e.touches[0].clientX;
    const y = e.touches[0].clientY;
    const dx = x - startX.current;
    const dy = y - startY.current;

    // if the gesture is primarily horizontal, prevent vertical page scroll and mark dragging
    if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
      // prevent the browser from stealing the horizontal swipe (only when horizontal)
      e.preventDefault();
      isDragging.current = true;
      lastMoveX.current = x;
    }
    // otherwise do nothing (allow vertical scrolling)
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    if (!isDragging.current) {
      // small tap / no meaningful horizontal swipe
      startAutoPlay();
      startX.current = null;
      startY.current = null;
      return;
    }

    const endX = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientX : lastMoveX.current;
    const diff = (endX ?? 0) - (startX.current ?? 0);

    if (diff > threshold) {
      prev();
    } else if (diff < -threshold) {
      next();
    }
    // reset
    startX.current = null;
    startY.current = null;
    lastMoveX.current = null;
    isDragging.current = false;
    startAutoPlay();
  };

  // Optional pointer event fallback (works if the device uses pointer events)
  const onPointerDown = (e: React.PointerEvent) => {
    // only left button or touch
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    startX.current = e.clientX;
    startY.current = e.clientY;
    lastMoveX.current = startX.current;
    isDragging.current = false;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    stopAutoPlay();
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (startX.current == null || startY.current == null) return;
    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;
    if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
      e.preventDefault?.();
      isDragging.current = true;
      lastMoveX.current = e.clientX;
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (startX.current == null) return;
    if (!isDragging.current) {
      startAutoPlay();
      startX.current = null;
      startY.current = null;
      return;
    }
    const diff = (e.clientX ?? 0) - (startX.current ?? 0);
    if (diff > threshold) prev();
    else if (diff < -threshold) next();
    startX.current = null;
    startY.current = null;
    lastMoveX.current = null;
    isDragging.current = false;
    startAutoPlay();
  };

  // translate percent per slide of the track: each slide is (100 / count)% of the track
  const perSlidePercent = 100 / count;
  const translatePercent = -index * perSlidePercent;

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-row w-full justify-center max-w-4xl">
        <button
          onClick={() => { prev(); startAutoPlay(); }}
          aria-label="Poprzednie"
          className="hidden md:flex items-center z-20 rounded-full p-2  bg-none"
        ><IoIosArrowBack size={60} color='#d8ae5e' /></button>

        
        <div
          ref={containerRef}
          className="overflow-hidden"
          style={{ touchAction: 'pan-y' }}
          onMouseEnter={stopAutoPlay}
          onMouseLeave={startAutoPlay}
          onFocus={stopAutoPlay}
          onBlur={startAutoPlay}
          // touch scroll
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          // pointer fallback
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          tabIndex={0}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            // use px translation for exactness
            style={{
              width: `${count * 100}%`,
              transform: `translateX(${translatePercent}%)`,
            }}
          >
            {testimonials.map((t) => (
              <article
                key={t.id}
                style={{ width: `${100 / count}%` }}
                className="shrink-0 w-full flex flex-col items-center justify-center p-4 md:p-8 "
              >
                <p className="text-center text-lg leading-relaxed text-whitish">“{t.quote}”</p>
                <div className="md:mt-4 text-center">
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

        <button
          onClick={() => { next(); startAutoPlay(); }}
          aria-label="Następne"
          className="hidden md:flex items-center z-20 rounded-full p-2 bg-none"
        ><IoIosArrowForward size={60} color='#d8ae5e' /></button>

      </div>
      {/* dots */}
        <div className="md:mt-6 flex gap-2 justify-center">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { goTo(i); startAutoPlay(); }}
              aria-label={`Pokaż opinie ${i + 1}`}
              className={`w-3 h-3 rounded-full outline-1 text-gray-200 bg-gray-600 ring ${i === index ? 'scale-125 opacity-70 text-gray-400' : 'opacity-40'}`}
            />
          ))}
        </div>
    </div>
  );
}
