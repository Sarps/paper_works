import MouseInput from "./Mouse";
import KeyboardInput from "./Keyboard";
import StateManager from "../StateManager";

export default class Manager {
    static EVENT_TYPE = {
        MOUSE_CLICK: 0,
        MOUSE_WHEEL: 1,
        MOUSE_MOVE: 2,
        MOUSE_DBLCLICK: 3,

        KEY_PRESS: 4
    };

    static BUTTON = {
        LEFT: 0,
        MIDDLE: 1,
        RIGHT: 2
    };

    constructor(screen, stateManager) {
        this.stateManager = stateManager || new StateManager()
        this.mouse = new MouseInput(screen)
        this.keyboard = new KeyboardInput(screen)

        this.listeners = {}

        this.lockKeyboardEvents()
        this.lockMouseEvents()
    }

    /**
     *
     * @param {Number} type
     * @param {Object} options
     */
    capture(type, options) {
        if (!this.listeners[type]) {
            this.listeners[type] = [options]
        } else {
            this.listeners[type].push(options)
        }
    }

    /**
     *
     * @param {int} type
     * @param {(Object|Array)} event
     */
    processEvent(type, event) {
        let listeners = this.listeners[type],
            processor;

        if (!listeners) return;

        switch (type) {
            case Manager.EVENT_TYPE.MOUSE_CLICK:
                processor = this.processMouseButton;
                break;

            case Manager.EVENT_TYPE.MOUSE_WHEEL:
            case Manager.EVENT_TYPE.MOUSE_MOVE:
                processor = this.processMouseMove;
                break;

            case Manager.EVENT_TYPE.KEY_PRESS:
                processor = this.processKeypress;
                break;

            case Manager.EVENT_TYPE.MOUSE_DBLCLICK:
                processor = this.processDblClick;
                break;

            default:
                processor = () => false;
                break;
        }

        for (const listener of listeners) {
            if (
                processor.call(this, listener, event) &&
                listener.fn(this.keyboard, this.mouse, event)
            ) {
                // TODO: certify state
                break;
            }
        }
    }

    processMouseButton(listener, event) {
        return (
            event.button === listener.button &&
            !this.keyboard.__shiftKey === !listener.shift &&
            !this.keyboard.__ctrlKey === !listener.ctrl &&
            !this.keyboard.__metaKey === !listener.meta &&
            !this.keyboard.__altKey === !listener.alt
        );
    }

    processMouseMove(listener) {
        return (
            (undefined === listener.button ||
                this.mouse.__button === listener.button) &&
            !this.keyboard.__shiftKey === !listener.shift &&
            !this.keyboard.__ctrlKey === !listener.ctrl &&
            !this.keyboard.__metaKey === !listener.meta &&
            !this.keyboard.__altKey === !listener.alt
        );
    }

    processDblClick(listener) {
        return (
            !this.keyboard.__shiftKey === !listener.shift &&
            !this.keyboard.__ctrlKey === !listener.ctrl &&
            !this.keyboard.__metaKey === !listener.meta &&
            !this.keyboard.__altKey === !listener.alt
        );
    }

    processKeypress(listener, event) {
        return (
            (event.key === listener.key ||
                event.code === listener.code ||
                event.keyCode === listener.keyCode) &&
            !this.keyboard.__shiftKey === !listener.shift &&
            !this.keyboard.__ctrlKey === !listener.ctrl &&
            !this.keyboard.__metaKey === !listener.meta &&
            !this.keyboard.__altKey === !listener.alt
        );
    }

    lockMouseEvents() {
        this.mouse.onMove = this.onMouseMove.bind(this);
        this.mouse.onUp = this.onMouseUp.bind(this);
        this.mouse.onWheel = this.onMouseWheel.bind(this);

        this.mouse.onDblClick = this.onMouseDblClick.bind(this);
    }

    lockKeyboardEvents() {
        this.keyboard.onUp = this.onKeyUp.bind(this);
    }

    /**
     * Keyboard Events
     */

    onKeyUp(event) {
        this.processEvent(Manager.EVENT_TYPE.KEY_PRESS, event);
    }

    /**
     * Mouse Events
     */

    onMouseUp(event) {
        this.processEvent(Manager.EVENT_TYPE.MOUSE_CLICK, event);
    }

    onMouseMove(event) {
        this.processEvent(Manager.EVENT_TYPE.MOUSE_MOVE, event);
    }

    onMouseDblClick(event) {
        this.processEvent(Manager.EVENT_TYPE.MOUSE_DBLCLICK, event);
    }

    onMouseWheel(event) {
        this.processEvent(Manager.EVENT_TYPE.MOUSE_WHEEL, event);
    }

}
