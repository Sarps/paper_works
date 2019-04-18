const THREE = require("three");

export default class Touch {
  static TOUCH_START = "touchstart";
  static TOUCH_MOVE = "touchmove";
  static TOUCH_END = "touchend";

  constructor(screen) {
    this.screen = screen;
    this.target = new THREE.Vector2();

    screen.addEventListener(Touch.TOUCH_START, this.onTouchStart.bind(this));
    screen.addEventListener(Touch.TOUCH_MOVE, this.onTouchMove.bind(this));
    screen.addEventListener(Touch.TOUCH_END, this.onTouchEnd.bind(this));
  }

  onTouchStart(event) {
    event.preventDefault && event.preventDefault();
    this.target.set(
      (event.offsetX / screen.offsetWidth) * 2 - 1,
      -(event.offsetY / screen.offsetHeight) * 2 + 1
    );

    this.onStart && this.onStart();
  }

  onTouchEnd(event) {
    event.preventDefault && event.preventDefault();

    this.onEnd && this.onEnd();
  }

  onTouchMove(event) {
    event.preventDefault && event.preventDefault();
    this.target.set(
      (event.offsetX / screen.offsetWidth) * 2 - 1,
      -(event.offsetY / screen.offsetHeight) * 2 + 1
    );

    this.onMove && this.onMove();
  }

  destroy() {
    this.screen.removeEventListener(
      Touch.TOUCH_START,
      this.onTouchStart.bind(this)
    );
    this.screen.removeEventListener(
      Touch.TOUCH_MOVE,
      this.onTouchMove.bind(this)
    );
    this.screen.removeEventListener(
      Touch.TOUCH_END,
      this.onTouchEnd.bind(this)
    );
  }
}
