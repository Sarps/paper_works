export default {
  IS_BROWSER: typeof window !== "undefined",
  NAMESPACE: "cropper",

  // Actions
  ACTION_MOVE: "move",
  ACTION_ZOOM: "zoom",
  ACTION_EAST: "e",
  ACTION_WEST: "w",
  ACTION_SOUTH: "s",
  ACTION_NORTH: "n",
  ACTION_NORTH_EAST: "ne",
  ACTION_NORTH_WEST: "nw",
  ACTION_SOUTH_EAST: "se",
  ACTION_SOUTH_WEST: "sw",

  // Classes
  CLASS_CONTAINER: `.container`,

  // Attribute
  ATTRIBUTE_ACTION: "data-cropper-action",

  // Attribute
  STYLE_DIMENSION_UNIT: "%",

  // Drag modes
  DRAG_MODE_CROP: "crop",
  DRAG_MODE_MOVE: "move",
  DRAG_MODE_NONE: "none",

  // Events
  EVENT_DBLCLICK: "dblclick",
  EVENT_MOUSE_DOWN: "mousedown",
  EVENT_MOUSE_MOVE: "mousemove",
  EVENT_MOUSE_UP: "mouseup",
  EVENT_READY: "ready",
  EVENT_RESIZE: "resize",
  EVENT_WHEEL: "wheel",
  EVENT_ZOOM: "zoom",
  EVENT_KEYDOWN: "keydown",
  EVENT_KEYUP: "keyup",
  EVENT_KEYPRESS: "keypress",

  // Project
  PROJECT_FILE_EXTENSION: "rpout",
  PROJECT_FILE_TYPE: "Rino Printout"
};
