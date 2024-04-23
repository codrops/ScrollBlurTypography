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
      splitTypeTypes: 'words, chars'
    });
    
    // Trigger the initial scroll effect.
    this.scroll();
  }

  // Animates text based on the scroll position.
  scroll() {
    const chars = this.splitter.getChars();
    gsap.fromTo(chars, {
      scaleY: 0.1,
      scaleX: 1.8,
      filter: 'blur(10px) brightness(50%)',
      willChange: 'filter, transform'
    }, {
        ease: 'none', 
        scaleY: 1,
        scaleX: 1,
        filter: 'blur(0px) brightness(100%)',
        stagger: 0.05, 
        scrollTrigger: {
          trigger: this.textElement,
          start: 'top bottom-=15%', 
          end: 'bottom center+=15%',
          scrub: true, 
        },
    });
  }
}
