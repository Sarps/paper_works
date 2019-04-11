<template>
  <v-navigation-drawer stateless value="true" dark class="primary darken-1">
    <template>
      <v-treeview
        v-model="tree"
        :open="open"
        :items="items"
        activatable
        open-on-click
        expand-icon="fas fa-1x fa-arrow-circle-down"
        hoverable
        item-key="name"
      >
        <template v-slot:prepend="{ item, open }">
          <v-icon v-if="!item.file">{{ open ? 'fal fa-folder-open' : 'fal fa-folder' }}</v-icon>
          <v-icon v-else>{{ files[item.file] }}</v-icon>
        </template>
      </v-treeview>
    </template>
  </v-navigation-drawer>
</template>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    admins: [["Management", "people_outline"], ["Settings", "settings"]],
    cruds: [
      ["Create", "arrows-alt"],
      ["Read", "abacus"],
      ["Update", "anchor"],
      ["Delete", "delete"]
    ],
    open: ["public"],
    files: {
      html: "mdi-language-html5",
      js: "mdi-nodejs",
      json: "mdi-json",
      md: "mdi-markdown",
      pdf: "mdi-file-pdf",
      png: "mdi-file-image",
      txt: "mdi-file-document-outline",
      xls: "mdi-file-excel"
    },
    tree: [],
    items: [
      {
        name: ".git"
      },
      {
        name: "node_modules"
      },
      {
        name: "public",
        children: [
          {
            name: "static",
            children: [
              {
                name: "logo.png",
                file: "png"
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
        name: ".gitignore",
        file: "txt"
      },
      {
        name: "babel.config.js",
        file: "js"
      },
      {
        name: "package.json",
        file: "json"
      },
      {
        name: "README.md",
        file: "md"
      },
      {
        name: "vue.config.js",
        file: "js"
      },
      {
        name: "yarn.lock",
        file: "txt"
      }
    ]
  })
};
</script>