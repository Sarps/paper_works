export default class Keyboard {
  static KEYUP = "keyup";
  static KEYDOWN = "keydown";

  static KEY = {
    SHIFT: "Shift",
    CONTROL: "Control",
    ALT: "Alt",
    META: "Meta"
  };

  /**
   * 
   * @param {HTMLDivElement} screen 
   */
  constructor(screen) {
    this.__shiftKey = false;
    this.__ctrlKey = false;
    this.__metaKey = false;
    this.__altKey = false;

    this.onUp = null;

    screen.addEventListener(Keyboard.KEYUP, this.onKeyUp.bind(this), false);
    screen.addEventListener(
      Keyboard.KEYDOWN,
      this.onKeyDown.bind(this),
      false
    );
  }

  /**
   * Event handler for KEYBOARD.KEYDOWN event
   *
   * @param {KeyboardEvent} event
   */
  onKeyDown(event) {
    event.preventDefault && event.preventDefault();
    switch (event.key) {
      case Keyboard.KEY.SHIFT:
        this.__shiftKey = true;
        break;

      case Keyboard.KEY.CONTROL:
        this.__ctrlKey = true;
        break;

      case Keyboard.KEY.ALT:
        this.__altKey = true;
        break;

      case Keyboard.KEY.META:
        this.__metaKey = true;
        break;

      default:
        break;
    }
  }

  /**
   * Event handler for KEYBOARD.KEYUP event
   *
   * @param {KeyboardEvent} event
   */
  onKeyUp(event) {
    event.preventDefault && event.preventDefault();
    switch (event.key) {
      case Keyboard.KEY.SHIFT:
        this.__shiftKey = false;
        break;

      case Keyboard.KEY.CONTROL:
        this.__ctrlKey = false;
        break;

      case Keyboard.KEY.ALT:
        this.__altKey = false;
        break;

      case Keyboard.KEY.META:
        this.__metaKey = false;
        break;

      default:
        this.extractMeta(event);
        this.onUp && this.onUp(event);
        break;
    }
  }

  /**
   * Extract meta information from a keyup event
   *
   * @param {KeyboardEvent} event
   */
  extractMeta(event) {
    this.__shiftKey = event.shiftKey;
    this.__ctrlKey = event.ctrlKey;
    this.__metaKey = event.metaKey;
    this.__altKey = event.altKey;
  }

  /**
   * Remove all event listeners
   */
  destroy() {
    document.removeEventListener(
      Keyboard.KEYUP,
      this.onKeyboardEvent.bind(this),
      false
    );
    document.removeEventListener(
      Keyboard.KEYDOWN,
      this.onKeyboardEvent.bind(this),
      false
    );
  }
}
