// src/hooks/useEnhancedProgressiveSnap.ts
import { useEffect, useRef, useState } from "react";

type Options = {
  enabled?: boolean;
  mobileOnly?: boolean;
  mobileBreakpoint?: number;
  snapDelay?: number;
  headerHeight?: number;
  debug?: boolean;
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
  } = opts;

  const isScrolling = useRef(false);
  const scrollTimeout = useRef<number | null>(null);
  const lastScrollTop = useRef(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionsRef = useRef<{top: number, bottom: number, element: HTMLElement}[]>([]);
  const debugElementsRef = useRef<HTMLElement[]>([]);
  const hasInitialized = useRef(false);

  const SNAP_THRESHOLD = {
    MIN: 20,    // minimum 20px
    VH: 0.20     // or 10% of viewport height, whichever is larger
  };

  function getSnapThreshold() {
    return Math.max(SNAP_THRESHOLD.MIN, window.innerHeight * SNAP_THRESHOLD.VH);
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

  const createDebugLines = (container: HTMLElement) => {
    // Clear existing debug elements
    debugElementsRef.current.forEach(el => el.remove());
    debugElementsRef.current = [];

    const sections = sectionsRef.current;
    // const containerHeight = container.clientHeight;
    
    sections.forEach((section, index) => {
      // Create snap zones (areas between thresholds)
    

    // Up scroll snap zone (for previous section)
    const upSnapZoneTop = section.top - getSnapThreshold();
    const upSnapZoneBottom = section.top + getSnapThreshold();
    
    const upSnapZone = document.createElement('div');
    upSnapZone.style.position = 'absolute';
    upSnapZone.style.left = '0';
    upSnapZone.style.right = '0';
    upSnapZone.style.top = `${upSnapZoneTop}px`;
    upSnapZone.style.height = `${upSnapZoneBottom - upSnapZoneTop}px`;
    upSnapZone.style.backgroundColor = 'rgba(128, 128, 128, 0.7)';
    upSnapZone.style.zIndex = '9998';
    upSnapZone.style.pointerEvents = 'none';
    upSnapZone.style.borderTop = '1px dashed silver';
    upSnapZone.style.borderBottom = '1px dashed silver';
    upSnapZone.title = `Section ${index} - snap zone`;
    container.appendChild(upSnapZone);
    debugElementsRef.current.push(upSnapZone);

      // Create top threshold line (30% for up scroll)
      const topThreshold = section.top + getSnapThreshold();
      const topLine = document.createElement('div');
      topLine.style.position = 'absolute';
      topLine.style.left = '0';
      topLine.style.right = '0';
      topLine.style.top = `${topThreshold}px`;
      topLine.style.height = '2px';
      topLine.style.backgroundColor = 'red';
      topLine.style.zIndex = '10000';
      topLine.style.pointerEvents = 'none';
      topLine.title = `Section ${index} - Up threshold (30%)`;
      container.appendChild(topLine);
      debugElementsRef.current.push(topLine);

      // Create bottom threshold line (70% for down scroll)
      const bottomThreshold = section.top + (section.bottom - section.top) - getSnapThreshold();
      const bottomLine = document.createElement('div');
      bottomLine.style.position = 'absolute';
      bottomLine.style.left = '0';
      bottomLine.style.right = '0';
      bottomLine.style.top = `${bottomThreshold}px`;
      bottomLine.style.height = '2px';
      bottomLine.style.backgroundColor = 'blue';
      bottomLine.style.zIndex = '10000';
      bottomLine.style.pointerEvents = 'none';
      bottomLine.title = `Section ${index} - Down threshold (70%)`;
      container.appendChild(bottomLine);
      debugElementsRef.current.push(bottomLine);

      // Create section boundary lines
      const topBoundary = document.createElement('div');
      topBoundary.style.position = 'absolute';
      topBoundary.style.left = '0';
      topBoundary.style.right = '0';
      topBoundary.style.top = `${section.top}px`;
      topBoundary.style.height = '1px';
      topBoundary.style.backgroundColor = 'green';
      topBoundary.style.zIndex = '10000';
      topBoundary.style.pointerEvents = 'none';
      topBoundary.title = `Section ${index} - Top boundary`;
      container.appendChild(topBoundary);
      debugElementsRef.current.push(topBoundary);

      const bottomBoundary = document.createElement('div');
      bottomBoundary.style.position = 'absolute';
      bottomBoundary.style.left = '0';
      bottomBoundary.style.right = '0';
      bottomBoundary.style.top = `${section.bottom}px`;
      bottomBoundary.style.height = '1px';
      bottomBoundary.style.backgroundColor = 'green';
      bottomBoundary.style.zIndex = '10000';
      bottomBoundary.style.pointerEvents = 'none';
      bottomBoundary.title = `Section ${index} - Bottom boundary`;
      container.appendChild(bottomBoundary);
      debugElementsRef.current.push(bottomBoundary);

      // Create label for section
      const label = document.createElement('div');
      label.style.position = 'absolute';
      label.style.left = '10px';
      label.style.top = `${section.top + 10}px`;
      label.style.color = 'green';
      label.style.backgroundColor = 'rgba(0,0,0,0.7)';
      label.style.padding = '2px 5px';
      label.style.borderRadius = '3px';
      label.style.fontSize = '12px';
      label.style.fontFamily = 'monospace';
      label.style.zIndex = '10000';
      label.style.pointerEvents = 'none';
      label.textContent = `Section ${index}`;
      container.appendChild(label);
      debugElementsRef.current.push(label);
    });

    // Create legend
    const legend = document.createElement('div');
    legend.style.position = 'fixed';
    legend.style.top = '10px';
    legend.style.right = '10px';
    legend.style.backgroundColor = 'rgba(0,0,0,0.8)';
    legend.style.color = 'white';
    legend.style.padding = '10px';
    legend.style.borderRadius = '5px';
    legend.style.zIndex = '10001';
    legend.style.fontSize = '12px';
    legend.style.fontFamily = 'monospace';
    legend.innerHTML = `
      <div style="margin-bottom: 5px;"><strong>Debug Lines:</strong></div>
      <div style="display: flex; align-items: center; margin-bottom: 3px;">
        <div style="width: 20px; height: 2px; background: red; margin-right: 5px;"></div>
        <span>Up scroll threshold (30%)</span>
      </div>
      <div style="display: flex; align-items: center; margin-bottom: 3px;">
        <div style="width: 20px; height: 2px; background: blue; margin-right: 5px;"></div>
        <span>Down scroll threshold (70%)</span>
      </div>
      <div style="display: flex; align-items: center;">
        <div style="width: 20px; height: 1px; background: green; margin-right: 5px;"></div>
        <span>Section boundaries</span>
      </div>
      <div style="margin-bottom: 5px;"><strong>Debug Zones:</strong></div>
    <div style="display: flex; align-items: center; margin-bottom: 3px;">
      <div style="width: 20px; height: 10px; background: rgba(255,0,0,0.2); border: 1px dashed red; margin-right: 5px;"></div>
      <span>snap zone</span>
    </div>
    `;
    document.body.appendChild(legend);
    debugElementsRef.current.push(legend);
  };

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

    // Update debug lines if debug is enabled
    if (debug) {
      createDebugLines(container);
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
      
      // Clean up debug elements
      debugElementsRef.current.forEach(el => el.remove());
      debugElementsRef.current = [];
      
      // Reset container position style
      if (debug) {
        container.style.position = '';
      }
      
      if (scrollTimeout.current) {
        window.clearTimeout(scrollTimeout.current);
      }
    };
  }, [containerRef, enabled, mobileOnly, isMobile, snapDelay, headerHeight, debug]);
}