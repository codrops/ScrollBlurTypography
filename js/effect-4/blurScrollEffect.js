// Import the TextSplitter class for handling text splitting.
import { TextSplitter } from '../textSplitter.js';

// Defines a class to create scroll-triggered animation effects on text.
export class BlurScrollEffect {
  constructor(textElement) {
    // Check if the provided element is valid.
    if (!textElement || !(textElement instanceof HTMLElement)) {
      throw new Error('Invalid text element provided.');
    }

    this.textElement = textElement;

    // Set up the effect for the provided text element.
    this.initializeEffect();
  }

  // Sets up the initial text effect on the provided element.
  initializeEffect() {
    // Callback to re-trigger animations on resize.
    const textResizeCallback = () => this.scroll();

    // Split text for animation and store the reference.
    this.splitter = new TextSplitter(this.textElement, {
      resizeCallback: textResizeCallback,
      splitTypeTypes: 'words'
    });
    
    // Trigger the initial scroll effect.
    this.scroll();
  }

  // Animates text based on the scroll position.
  scroll() {
    // Query all individual words for animation.
    const words = this.splitter.getWords();
    gsap.fromTo(words, {
      opacity: 0,
      skewX: -20,
      willChange: 'filter, transform',
      filter: 'blur(8px)'
    }, {
      ease: 'sine', // Animation easing.
      opacity: 1,
      skewX: 0,
      filter: 'blur(0px)',
      stagger: 0.04, // Delay between starting animations for each word.
      scrollTrigger: {
        trigger: this.textElement, // Element that triggers the animation.
        start: 'top bottom-=15%', // Animation starts when element hits bottom of viewport.
        end: 'bottom center+=15%', // Animation ends in the center of the viewport.
        scrub: true, // Animation progress tied to scroll position.
      },
    });
  }
}
