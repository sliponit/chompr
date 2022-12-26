<template>
  <div id="app" class="d-flex flex-column h-100">
    <nav-bar />
    <div class="container flex-grow-1">
      <error />
      <div class="mt-5">
        <router-view />
      </div>
    </div>
    <footer class="bg-light text-center p-3">
      <!--div class="logo"></div-->
      <p>
        Social 
        <a class="mr-3" href="https://twitter.com/chompr_" target="_blank">
          <img class="app-logo" src="/twitter-logo.svg" alt="twitter logo" width="30" />
        </a>
        Source code
        <a href="https://github.com/sliponit/chompr" target="_blank">
          <img class="app-logo" src="/github-mark.svg" alt="github logo" width="30" />
        </a>
      </p>
    </footer>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Error from "./components/Error.vue";

export default {
  components: {
    NavBar,
    Error
  }
};
</script>

<!--style>
footer {
  min-height: 30px;
}
</style-->