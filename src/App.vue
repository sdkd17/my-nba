<template>
  <div id="app">
    <b-nav tabs align="center" class="mt-4">
      <b-nav-item to="/games" exact exact-active-class="active"> Games </b-nav-item>
      <b-nav-item to="/season" exact exact-active-class="active"> Season </b-nav-item> 
      <b-nav-item to="/players" exact exact-active-class="active"> Players </b-nav-item> 
    </b-nav>
    <router-view> </router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      
    }
  }
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
