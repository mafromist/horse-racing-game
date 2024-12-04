const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/styles/utils/variables.scss"; @import "@/styles/utils/mixins.scss";`
      }
    }
  }
});
