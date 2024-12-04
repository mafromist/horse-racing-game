<template>
  <nav v-show="!isHomePage" class="app--nav">
    <router-link to="/" class="app--nav-link">Home</router-link>
    <router-link to="/horse-race" class="app--nav-link">Horse Race</router-link>
  </nav>
  <router-view />
</template>

<script>
export default {
  computed: {
    isHomePage() {
      return this.$route.path === '/';
    }
  }
};
</script>