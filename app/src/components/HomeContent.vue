<template>
  <div class="text-center mb-5">
    <h2>What can I do next?</h2>
    <p class="lead">{{ isAuthenticated ? 'Do ' : 'Login and do ' }} first quest. You will learn how to clean some of your old tweets. </p>
    <div v-if="isAuthenticated">
      <router-link to="/first-quest">
        <button id="myButton" class="btn btn-pink">LFG!</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  name: "HomeContent",
  setup() {
    const auth0 = useAuth0();
    return {
      isAuthenticated: auth0.isAuthenticated,
    }
  }
};
</script>
