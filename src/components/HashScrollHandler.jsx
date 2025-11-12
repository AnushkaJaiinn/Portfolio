'use client';

import { useEffect } from 'react';

export default function HashScrollHandler() {
  useEffect(() => {
    // Prevent browser's default scroll restoration and auto-scroll behavior
    if (history.scrollRestoration) {
      history.scrollRestoration = 'manual';
    }

    // Immediately scroll to top to prevent browser's default hash scroll
    window.scrollTo(0, 0);

    // Function to wait for layout stabilization before scrolling
    const waitForStableLayout = (targetElement, callback) => {
      let lastTop = null;
      let lastHeight = null;
      let stableCount = 0;
      let checkCount = 0;
      const maxChecks = 100; // Maximum 5 seconds (100 * 50ms)
      
      const checkStability = () => {
        checkCount++;
        
        // Get current position and document height
        const rect = targetElement.getBoundingClientRect();
        const currentTop = rect.top;
        const currentHeight = document.documentElement.scrollHeight;
        
        // Check if position and page height are stable
        if (lastTop !== null && lastHeight !== null) {
          // If position hasn't changed for 2 consecutive checks, consider it stable
          if (Math.abs(currentTop - lastTop) < 1 && Math.abs(currentHeight - lastHeight) < 10) {
            stableCount++;
            
            if (stableCount >= 2) {
              console.log('HashScrollHandler: layout stabilized, scrolling now');
              callback();
              return; // Exit the polling
            }
          } else {
            // Position changed, reset stable count
            stableCount = 0;
          }
        }
        
        // Update last known values
        lastTop = currentTop;
        lastHeight = currentHeight;
        
        // Continue checking if not stable and haven't exceeded max checks
        if (checkCount < maxChecks) {
          requestAnimationFrame(checkStability);
        } else {
          // Timeout reached, scroll anyway
          console.log('HashScrollHandler: max checks reached, scrolling now');
          callback();
        }
      };
      
      // Start checking
      requestAnimationFrame(checkStability);
    };

    // Function to handle hash navigation - executes ONLY ONCE on mount
    const handleInitialHashNavigation = () => {
      const hash = window.location.hash;
      
      if (hash) {
        // Small initial delay to let React start rendering
        setTimeout(() => {
          const element = document.querySelector(hash);
          
          if (element) {
            // Wait for layout to stabilize before scrolling
            waitForStableLayout(element, () => {
              element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            });
          } else {
            // Element not found, try again after a longer delay
            setTimeout(() => {
              const retryElement = document.querySelector(hash);
              if (retryElement) {
                console.log('HashScrollHandler: element found on retry, scrolling now');
                retryElement.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }
            }, 1000);
          }
        }, 100);
      }
    };

    // Execute initial scroll only once on mount
    handleInitialHashNavigation();

    // Handle hash changes when clicking nav links (after page is already loaded)
    const handleHashChange = (e) => {
      // Prevent default anchor jump
      e.preventDefault();
      
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          // For click navigation, page is already rendered, so scroll immediately
          // But still check if element is in viewport or needs time to render
          const rect = element.getBoundingClientRect();
          
          // If element is far down the page, give a brief moment for any lazy components
          if (rect.top > window.innerHeight * 2) {
            setTimeout(() => {
              element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }, 50);
          } else {
            // Element is close, scroll immediately
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      // Restore scroll restoration to default
      if (history.scrollRestoration) {
        history.scrollRestoration = 'auto';
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return null; // This component doesn't render anything
}
