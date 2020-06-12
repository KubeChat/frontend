<template>
  <div id="app" class="d-flex flex-column h-100">
    <nav-bar />
    <error />
    <router-view />
    <footer class="bg-light text-center p-3"/>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import Error from "./components/Error";

export default {
  components: {
    NavBar,
    Error
  }
};
</script>
