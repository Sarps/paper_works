const { TABBAR, PREVIEWER } = require("../core/config").dom;

export default {
  TABBAR,
  PREVIEWER,

  MODELTREE: [
    {
      name: "Carburator <main>",
      children: [
        {
          name: "X Plane"
        },
        {
          name: "Y Plane"
        },
        {
          name: "Z Plane"
        },
        {
          name: "Extruded Boss",
          children: [
            {
              name: "Sketch",
              children: [
                {
                  name: "Rectangle",
                }
              ]
            },
            {
              name: "favicon.ico",
              file: "png"
            },
            {
              name: "index.html",
              file: "html"
            }
          ]
        },
        {
          name: "Sketch 3",
        },
        {
          name: "Mirror 1",
          children: [
            {
              name: "Sketch",
              children: [
                {
                  name: "Rectangle",
                }
              ]
            }
          ]
        },
        {
          name: "Extruded Cut 1",
          children: [
            {
              name: "Sketch 5",
            }
          ]
        },
        {
          name: "Swept Boss 2",
          children: [
            {
              name: "Sketch 7",
            }
          ]
        },
        {
          name: "Sketch 5",
        }
      ]
    }
  ]
};
