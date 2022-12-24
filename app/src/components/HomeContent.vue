<template>
  <div class="text-center">
    <h2 class="my-5">What can I do next?</h2>
    <p class="lead">{{ isAuthenticated ? 'Do ' : 'Login and do ' }} first quest. You will be learn how to clean some of your old tweets. </p>
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
