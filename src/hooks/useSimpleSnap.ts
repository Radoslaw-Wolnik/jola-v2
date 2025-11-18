// src/hooks/useEnhancedProgressiveSnap.ts
import { useEffect, useRef, useState } from "react";

type Options = {
  enabled?: boolean;
  mobileOnly?: boolean;
  mobileBreakpoint?: number;
  snapDelay?: number;
  headerHeight?: number;
  debug?: boolean
  mobileSnapThreshold?: number; // New: threshold for mobile devices (0.4 = 40%)
  desktopSnapThreshold?: number; // New: threshold for desktop devices (0.25 = 25%)
};

export function useEnhancedProgressiveSnap(
  containerRef: React.RefObject<HTMLElement | null>,
  opts: Partial<Options> = {}
) {
  const {
    enabled = true,
    mobileOnly = true,
    mobileBreakpoint = 1024,
    snapDelay = 100,
    headerHeight = 60,
    debug = false,
    mobileSnapThreshold = 0.39, // Default: 40% for mobile
    desktopSnapThreshold = 0.25, // Default: 25% for desktop
  } = opts;

  const isScrolling = useRef(false);
  const scrollTimeout = useRef<number | null>(null);
  const lastScrollTop = useRef(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionsRef = useRef<{top: number, bottom: number, element: HTMLElement}[]>([]);
  const hasInitialized = useRef(false);

  const SNAP_THRESHOLD = {
    MIN: 20,    // minimum 20px
  };

  function getSnapThreshold() {
    const vhRatio = isMobile ? mobileSnapThreshold : desktopSnapThreshold;
    return Math.max(SNAP_THRESHOLD.MIN, window.innerHeight * vhRatio);
  }


  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [mobileBreakpoint]);

  const updateSections = (container: HTMLElement, force = false) => {
    // Only update once unless forced
    if (hasInitialized.current && !force) {
      return;
    }

    const sectionElements = Array.from(container.querySelectorAll('section'));
    
    // CORRECTED: Use the section's offsetTop directly (it's already relative to the container)
    sectionsRef.current = sectionElements.map(section => {
      const top = section.offsetTop; // This is already relative to the scrolling container
      const bottom = top + section.offsetHeight;
      
      return {
        top,
        bottom,
        element: section
      };
    });

    hasInitialized.current = true;

    // Log all calculated sections for debugging
    if (debug) {
      console.log('=== SECTION CALCULATIONS ===');
      console.log('Container info:', {
        scrollTop: container.scrollTop,
        clientHeight: container.clientHeight,
        scrollHeight: container.scrollHeight,
        offsetTop: container.offsetTop,
        offsetHeight: container.offsetHeight
      });
      
      sectionsRef.current.forEach((section, index) => {
        const sectionElement = sectionElements[index];
        
        console.log(`Section ${index}:`, {
          element: sectionElement,
          calculatedTop: section.top,
          calculatedBottom: section.bottom,
          height: section.bottom - section.top,
          offsetTop: sectionElement.offsetTop,
          offsetHeight: sectionElement.offsetHeight,
          sectionTopInContainer: sectionElement.offsetTop,
        });
      });
      console.log('=== END SECTION CALCULATIONS ===');
    }

  };

  const findCurrentSectionIndex = (scrollTop: number, containerHeight: number): number => {
    const sections = sectionsRef.current;
    
    // Find which section is currently centered in the viewport
    const viewportCenter = scrollTop + (containerHeight / 2);
    
    for (let i = 0; i < sections.length; i++) {
      if (viewportCenter >= sections[i].top && viewportCenter <= sections[i].bottom) {
        return i;
      }
    }
    
    // Fallback: find section with most overlap
    let maxOverlap = 0;
    let bestIndex = 0;
    
    for (let i = 0; i < sections.length; i++) {
      const overlap = Math.min(scrollTop + containerHeight, sections[i].bottom) - Math.max(scrollTop, sections[i].top);
      if (overlap > maxOverlap) {
        maxOverlap = overlap;
        bestIndex = i;
      }
    }
    
    return bestIndex;
  };

  const snapToSection = (container: HTMLElement, sectionIndex: number, direction: 'up' | 'down') => {
    if (sectionIndex < 0 || sectionIndex >= sectionsRef.current.length) return;
    
    if (isScrolling.current) return;
    isScrolling.current = true;

    const sections = sectionsRef.current;
    const section = sections[sectionIndex];
    
    let targetScrollTop;
    
    if (direction === 'down') {
      // Align section top with container top (normal behavior)
      targetScrollTop = section.top - headerHeight;
    } else {
      // Align section bottom with container bottom (for reverse scrolling)
      targetScrollTop = section.bottom - container.clientHeight - headerHeight;
    }
    
    if (debug) {
      console.log(`Snapping ${direction} to section ${sectionIndex}`, {
        targetScrollTop,
        sectionTop: section.top,
        sectionBottom: section.bottom,
        containerHeight: container.clientHeight
      });
    }
    
    container.scrollTo({
      top: targetScrollTop,
      behavior: 'smooth'
    });

    // Reset scrolling flag after animation
    setTimeout(() => {
      isScrolling.current = false;
    }, snapDelay);
  };

  useEffect(() => {
    if (!enabled) return;
    if (mobileOnly && !isMobile) return;

    const container = containerRef?.current;
    if (!container) return;

    // Make sure container has relative positioning for debug lines
    if (debug) {
      container.style.position = 'relative';
    }

    // Initialize sections only once
    updateSections(container);

  const handleScroll = () => {
    if (isScrolling.current) return;

    if (scrollTimeout.current) {
      window.clearTimeout(scrollTimeout.current);
    }

    scrollTimeout.current = window.setTimeout(() => {
      const scrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const scrollDirection = scrollTop > lastScrollTop.current ? 'down' : 'up';
      lastScrollTop.current = scrollTop;

      const sections = sectionsRef.current;
      if (sections.length === 0) return;

      const currentSectionIndex = findCurrentSectionIndex(scrollTop, containerHeight);
      
      // Calculate viewport center and boundaries
      const viewportCenter = scrollTop + (containerHeight / 2);
      const viewportTop = scrollTop;
      const viewportBottom = scrollTop + containerHeight;
      
      if (debug) {
        console.log('Scroll check:', {
          scrollTop,
          containerHeight,
          viewportCenter,
          viewportTop,
          viewportBottom,
          scrollDirection,
          currentSectionIndex,
          sectionsCount: sections.length
        });
      }
      
      // For down scroll: check if we're in the snap zone of any next section
      if (scrollDirection === 'down') {
        for (let i = currentSectionIndex + 1; i < sections.length; i++) {
          const nextSection = sections[i];
          const snapZoneTop = nextSection.top - getSnapThreshold();
          const snapZoneBottom = nextSection.top + getSnapThreshold();
          
          if (debug && i === currentSectionIndex + 1) {
            console.log('Down scroll snap zone check:', {
              nextSectionIndex: i,
              snapZoneTop,
              snapZoneBottom,
              viewportCenter,
              inSnapZone: viewportCenter >= snapZoneTop && viewportCenter <= snapZoneBottom
            });
          }
          
          // If viewport center is within the snap zone of this section
          if (viewportCenter >= snapZoneTop && viewportCenter <= snapZoneBottom) {
            snapToSection(container, i, 'down');
            break; // Snap to the first matching section
          }
          
          // If we've scrolled past this section's snap zone, continue to next
        }
      }
      
      // For up scroll: check if we're in the snap zone of any previous section
      else if (scrollDirection === 'up') {
        for (let i = currentSectionIndex - 1; i >= 0; i--) {
          const prevSection = sections[i];
          const snapZoneTop = prevSection.bottom - getSnapThreshold(); // this should be chnged to top + section height or section.bottom but bottom doesnt work somehow
          const snapZoneBottom = prevSection.bottom + getSnapThreshold();
          
          if (debug && i === currentSectionIndex - 1) {
            console.log('Up scroll snap zone check:', {
              prevSectionIndex: i,
              snapZoneTop,
              snapZoneBottom,
              viewportCenter,
              inSnapZone: viewportCenter >= snapZoneTop && viewportCenter <= snapZoneBottom
            });
          }
          
          // If viewport center is within the snap zone of this section
          if (viewportCenter >= snapZoneTop && viewportCenter <= snapZoneBottom) { // my if viewpointCenter - 10vh or sth like that  ---------------------------------------------------
            snapToSection(container, i, 'up');
            break; // Snap to the first matching section
          }
        }
      }

    }, snapDelay);
  };

    container.addEventListener('scroll', handleScroll, { passive: true });
    lastScrollTop.current = container.scrollTop;

    // Update sections on resize, but only if dimensions change significantly
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newHeight = entry.contentRect.height;
        // Only update if height changes significantly (more than 50px)
        if (Math.abs(newHeight - container.clientHeight) > 50) {
          updateSections(container, true);
        }
      }
    });
    
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
      
      if (scrollTimeout.current) {
        window.clearTimeout(scrollTimeout.current);
      }
    };
  }, [containerRef, enabled, mobileOnly, isMobile, snapDelay, headerHeight, debug]);
}