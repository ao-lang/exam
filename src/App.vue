<template>
  <div id="app">
   <Nav />
   <div class="container mt-3">
     <router-view />
   </div>
  </div>
</template>

<script>
import Nav from './components/Nav.vue'
export default {
  name:'App',
  components:{
    Nav
  }
}
</script>


