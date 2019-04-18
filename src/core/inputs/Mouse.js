const THREE = require("three");

export default class Mouse {
  static BUTTON = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2
  };

  /**
   * 
   * @param {HTMLDivElement} screen
   */
  constructor(screen) {
    this.screen = screen;
    this.target = new THREE.Vector2();

    this.onMove = null;
    this.onUp = null;
    this.onWheel = null;
    this.onDblClick = null;

    this.__inViewport = false;
    this.__button = null;

    screen.addEventListener("mousedown", this.onMouseDown.bind(this));
    screen.addEventListener("mousemove", this.onMouseMove.bind(this));
    screen.addEventListener("mouseup", this.onMouseUp.bind(this));
    screen.addEventListener("contextmenu", this.onMouseContextMenu.bind(this));
    screen.addEventListener("dblclick", this.onMouseDblClick.bind(this));

    screen.addEventListener("mouseenter", this.onMouseEnter.bind(this));
    screen.addEventListener("mouseleave", this.onMouseLeave.bind(this));
    screen.addEventListener("mousewheel", this.onMouseWheel.bind(this));
  }

  onMouseMove(event) {
    event.preventDefault && event.preventDefault();
    this.target.set(
      (event.offsetX / screen.offsetWidth) * 2 - 1,
      -(event.offsetY / screen.offsetHeight) * 2 + 1
    );
    this.onMove && this.onMove(event);
  }

  onMouseDown(event) {
    event.preventDefault && event.preventDefault();
    this.__button = event.button;
  }

  onMouseUp(event) {
    event.preventDefault && event.preventDefault();
    this.__button = null;
    this.onUp && this.onUp({ button: event.button });
  }

  onMouseContextMenu(event) {
    event.preventDefault && event.preventDefault();
  }

  onMouseDblClick(event) {
    event.preventDefault && event.preventDefault();
    this.onDblClick && this.onDblClick(event);
  }

  onMouseEnter(event) {
    event.preventDefault && event.preventDefault();
    this.screen.focus()
    this.__inViewport = true;
  }

  onMouseLeave(event) {
    event.preventDefault && event.preventDefault();
    this.screen.blur()
    this.__inViewport = false;
  }

  onMouseWheel(event) {
    event.preventDefault && event.preventDefault();
    this.onWheel && this.onWheel(event);
  }
}
