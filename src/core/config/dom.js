export default {
  TABBAR: [
    {
      name: "Feature",
      content: [
        {
          type: "card",
          icon: "far fa-home",
          text: "Extruded Boss / Base"
        },
        {
          type: "card",
          icon: "far fa-home",
          text: "Swept Boss / Base"
        },
        {
          type: "group",
          items: [
            { icon: "far fa-home", text: "Extruded Boss / Base" },
            { icon: "far fa-home", text: "Extruded Boss / Base" },
            { icon: "far fa-home", text: "Extruded Boss / Base" }
          ]
        },
        {
          type: "divider"
        }
      ]
    },
    {
      name: "Shapes",
      content: [
        {
          type: "card",
          icon: "far fa-home",
          text: "Box"
        },
        {
          type: "group",
          items: [
            { icon: "far fa-home", text: "Sphere" },
            { icon: "far fa-home", text: "Plane" },
            { icon: "far fa-home", text: "Frustrum" }
          ]
        },
        {
          type: "group",
          items: [
            { icon: "far fa-home", text: "Cone" },
            { icon: "far fa-home", text: "Cylinder" }
          ]
        },
        {
          type: "divider"
        }
      ]
    }
  ],

  PREVIEWER: [
    { icon: "far fa-camera-retro", key: "screenshot" },
    { icon: "far fa-plus", key: "add" },
    { icon: "far fa-search", key: "zoom" },
    { icon: "far fa-file-import", key: "import" },
    { icon: "far fa-file-export", key: "export" },
    { icon: "far fa-code-branch", key: "git" }
  ]
};
