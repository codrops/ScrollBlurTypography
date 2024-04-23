// Import debounce utility function.
import { debounce } from './common.js';

// Defines a class to split text into lines, words and characters for animation.
export class TextSplitter {
  // Constructor for TextScrollEffect which sets up the text animation.
  // Parameters:
  //   textElement: HTMLElement - The DOM element that contains the text to be animated.
  //   options: Object (optional) - Configuration options for the text splitting and callbacks.
  //     options.resizeCallback: Function - A function to call on window resize events.
  //     options.splitTypeTypes: String - Specifies the types of splits to perform on the text. 
  //         Possible values are based on SplitType's configuration, such as 'lines', 'words', 'chars'.
  //         See SplitType documentation for more details: https://github.com/lukePeavey/SplitType
  // This constructor initializes the text splitting with specified options, sets up resize handling,
  // and prepares the text element for animation effects.
  constructor(textElement, options = {}) {
    // Ensure the textElement is a valid HTMLElement.
    if (!textElement || !(textElement instanceof HTMLElement)) {
      throw new Error('Invalid text element provided.');
    }

    const { resizeCallback, splitTypeTypes } = options;
    
    this.textElement = textElement;
    // Assign the resize callback if provided and is a function, otherwise null.
    this.onResize = typeof resizeCallback === 'function' ? resizeCallback : null;
    
    // Set options for SplitType based on provided splitTypeTypes or default to SplitType's default behavior.
    // The 'types' option allows customization of how text is split (e.g., into lines, words, characters).
    // Refer to SplitType documentation for possible values and updates: https://github.com/lukePeavey/SplitType
    const splitOptions = splitTypeTypes ? { types: splitTypeTypes } : {};
    this.splitText = new SplitType(this.textElement, splitOptions);

    // Initialize ResizeObserver to re-split text on resize events, if a resize callback is provided.
    if (this.onResize) {
      this.initResizeObserver(); // Set up observer to detect resize events.
    }
  }

  // Sets up ResizeObserver to re-split text on element resize.
  initResizeObserver() {
    this.previousContainerWidth = null; // Track element width to detect resize.

    let resizeObserver = new ResizeObserver(
      debounce((entries) => this.handleResize(entries), 100)
    );
    resizeObserver.observe(this.textElement); // Start observing the text element.
  }

  // Handles element resize, re-splitting text if width changes.
  handleResize(entries) {
    const [{ contentRect }] = entries;
    const width = Math.floor(contentRect.width);
    // If element width changed, re-split text and call resize callback.
    if ( this.previousContainerWidth && this.previousContainerWidth !== width ) {
      this.splitText.split(); // Re-split text for new width.
      this.onResize(); // Execute the callback function.
    }
    this.previousContainerWidth = width; // Update stored width.
  }

  // Returns the lines created by splitting the text element.
  getLines() {
    return this.splitText.lines;
  }

  // Returns the words created by splitting the text element.
  getWords() {
    return this.splitText.words;
  }

  // Returns the chars created by splitting the text element.
  getChars() {
    return this.splitText.chars;
  }
}
