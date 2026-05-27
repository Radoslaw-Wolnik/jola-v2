import { useCallback, useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

type Options = {
  enabled?: boolean;
  mobileOnly?: boolean;
  mobileBreakpoint?: number;
  snapDelay?: number;
  debug?: boolean;
  mobileSnapThreshold?: number;
  desktopSnapThreshold?: number;
};

type SectionBounds = {
  top: number;
  bottom: number;
  element: HTMLElement;
};

type ScrollDirection = "up" | "down";

const MIN_SNAP_THRESHOLD = 24;

const clamp = (value: number, min: number, max: number) => (
  Math.min(Math.max(value, min), max)
);

export function useEnhancedProgressiveSnap(
  containerRef: RefObject<HTMLElement | null>,
  opts: Partial<Options> = {},
) {
  const {
    enabled = true,
    mobileOnly = true,
    mobileBreakpoint = 1024,
    snapDelay = 120,
    debug = false,
    mobileSnapThreshold = 0.39,
    desktopSnapThreshold = 0.25,
  } = opts;

  const [isMobile, setIsMobile] = useState(false);
  const sectionsRef = useRef<SectionBounds[]>([]);
  const scrollTimeoutRef = useRef<number | null>(null);
  const releaseProgrammaticScrollRef = useRef<number | null>(null);
  const lastScrollTopRef = useRef(0);
  const scrollDirectionRef = useRef<ScrollDirection>("down");
  const isProgrammaticScrollRef = useRef(false);

  const clearScrollTimeout = useCallback(() => {
    if (scrollTimeoutRef.current !== null) {
      window.clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = null;
    }
  }, []);

  const clearProgrammaticScroll = useCallback(() => {
    if (releaseProgrammaticScrollRef.current !== null) {
      window.clearTimeout(releaseProgrammaticScrollRef.current);
      releaseProgrammaticScrollRef.current = null;
    }
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, [mobileBreakpoint]);

  const updateSections = useCallback((container: HTMLElement) => {
    const containerTop = container.getBoundingClientRect().top;

    sectionsRef.current = Array
      .from(container.querySelectorAll<HTMLElement>("section"))
      .map((element) => {
        const top = element.getBoundingClientRect().top - containerTop + container.scrollTop;

        return {
          top,
          bottom: top + element.offsetHeight,
          element,
        };
      });

    if (debug) {
      console.table(sectionsRef.current.map(({ top, bottom, element }) => ({
        id: element.id || "(no id)",
        top,
        bottom,
        height: bottom - top,
      })));
    }
  }, [debug]);

  const getSnapThreshold = useCallback(() => {
    const ratio = isMobile ? mobileSnapThreshold : desktopSnapThreshold;

    return Math.max(MIN_SNAP_THRESHOLD, window.innerHeight * ratio);
  }, [desktopSnapThreshold, isMobile, mobileSnapThreshold]);

  const findCurrentSectionIndex = useCallback((
    scrollTop: number,
    containerHeight: number,
  ) => {
    const sections = sectionsRef.current;
    const viewportCenter = scrollTop + (containerHeight / 2);

    const centeredIndex = sections.findIndex(({ top, bottom }) => (
      viewportCenter >= top && viewportCenter <= bottom
    ));

    if (centeredIndex !== -1) {
      return centeredIndex;
    }

    return sections.reduce((bestIndex, section, index) => {
      const currentOverlap = Math.min(scrollTop + containerHeight, section.bottom)
        - Math.max(scrollTop, section.top);
      const bestSection = sections[bestIndex];
      const bestOverlap = Math.min(scrollTop + containerHeight, bestSection.bottom)
        - Math.max(scrollTop, bestSection.top);

      return currentOverlap > bestOverlap ? index : bestIndex;
    }, 0);
  }, []);

  const scrollToPosition = useCallback((container: HTMLElement, targetTop: number) => {
    const maxScrollTop = Math.max(0, container.scrollHeight - container.clientHeight);
    const top = clamp(Math.round(targetTop), 0, maxScrollTop);

    if (Math.abs(container.scrollTop - top) < 2) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    isProgrammaticScrollRef.current = true;
    clearProgrammaticScroll();

    container.scrollTo({
      top,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });

    releaseProgrammaticScrollRef.current = window.setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, Math.max(240, snapDelay * 3));
  }, [clearProgrammaticScroll, snapDelay]);

  const maybeSnap = useCallback((container: HTMLElement) => {
    const sections = sectionsRef.current;

    if (sections.length < 2) {
      return;
    }

    const scrollTop = container.scrollTop;
    const containerHeight = container.clientHeight;
    const viewportCenter = scrollTop + (containerHeight / 2);
    const currentSectionIndex = findCurrentSectionIndex(scrollTop, containerHeight);
    const threshold = getSnapThreshold();

    if (scrollDirectionRef.current === "down") {
      for (let i = currentSectionIndex + 1; i < sections.length; i += 1) {
        const section = sections[i];

        if (Math.abs(viewportCenter - section.top) <= threshold) {
          scrollToPosition(container, section.top);
          return;
        }

        if (section.top > viewportCenter + threshold) {
          return;
        }
      }

      return;
    }

    for (let i = currentSectionIndex - 1; i >= 0; i -= 1) {
      const section = sections[i];

      if (Math.abs(viewportCenter - section.bottom) <= threshold) {
        scrollToPosition(container, section.bottom - containerHeight);
        return;
      }

      if (section.bottom < viewportCenter - threshold) {
        return;
      }
    }
  }, [findCurrentSectionIndex, getSnapThreshold, scrollToPosition]);

  useEffect(() => {
    if (!enabled || (mobileOnly && !isMobile)) {
      return;
    }

    const container = containerRef.current;

    if (!container) {
      return;
    }

    const refreshSections = () => updateSections(container);
    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const delta = scrollTop - lastScrollTopRef.current;

      if (Math.abs(delta) > 1) {
        scrollDirectionRef.current = delta > 0 ? "down" : "up";
      }

      lastScrollTopRef.current = scrollTop;

      if (isProgrammaticScrollRef.current) {
        return;
      }

      clearScrollTimeout();
      scrollTimeoutRef.current = window.setTimeout(() => {
        maybeSnap(container);
      }, snapDelay);
    };

    refreshSections();
    lastScrollTopRef.current = container.scrollTop;

    const resizeObserver = new ResizeObserver(refreshSections);
    resizeObserver.observe(container);
    sectionsRef.current.forEach(({ element }) => resizeObserver.observe(element));

    window.addEventListener("resize", refreshSections);
    window.addEventListener("load", refreshSections);
    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearScrollTimeout();
      clearProgrammaticScroll();
      resizeObserver.disconnect();
      window.removeEventListener("resize", refreshSections);
      window.removeEventListener("load", refreshSections);
      container.removeEventListener("scroll", handleScroll);
      isProgrammaticScrollRef.current = false;
    };
  }, [
    clearProgrammaticScroll,
    clearScrollTimeout,
    containerRef,
    enabled,
    isMobile,
    maybeSnap,
    mobileOnly,
    snapDelay,
    updateSections,
  ]);
}
