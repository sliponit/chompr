<template>
  <div class="nav-container mb-3">
    <nav class="navbar navbar-expand-md navbar-light bg-light">
      <div class="container">
        <div class="navbar-brand app-logo" >
          <img src="/chompr_pfp.png" alt="CHOMPR pfp" width="80"/>
        </div>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <!--li class="nav-item">
              <router-link to="/first-quest" class="nav-link">First Quest</router-link>
            </li-->
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style>
#mobileAuthNavBar {
  min-height: 125px;
  justify-content: space-between;
}

.navbar .router-link-exact-active {
  border-bottom: 3px solid #ff80c9;
}

@media (max-width: 767px) {
  .nav-item .nav-link.router-link-exact-active {
    border-left: 3px solid #ff80c9;
  }
}
</style>
