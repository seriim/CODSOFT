<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar,
  },
};
</script>

<style>
#app {
  font-family: 'Arial', sans-serif;
  background-color: white;
  color: #333;
  padding: 0;
  margin: 0;
}
</style>
