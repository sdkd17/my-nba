<template>
  <div id="app">
    <NavBar 
      v-bind:tabs="tabs" 
      v-bind:currentTab="currentTab"
      v-on:changeTab="currentTab = $event"/>
    <keep-alive>
      <component v-bind:is="currentTab"></component>
    </keep-alive>
  </div>
</template>

<script>
 // Each time you switch to a new tab, Vue creates a new instance of the currentTabComponent. With keep alive component instances are cached
import NavBar from './components/NavBar.vue';
import Games from './components/Games.vue';
import Season from './components/Season.vue';
import Players from './components/Players.vue';
// import Teams from './components/Teams.vue';
// import Stats from './components/Stats.vue';
// import SeasonAverages from './components/SeasonAverages';

export default {
  name: 'App',
  components: {
    NavBar,
    Games,
    Season,
    Players,
  },
  data() {
    return {
      tabs: ['Games','Season', 'Players'],
      currentTab: 'Games',    
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
