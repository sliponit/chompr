<template>
  <div class="next-steps">
    <h2 class="my-5 text-center">What can I do next?</h2>
     <div class="row">
      
      <p class="lead">{{ isAuthenticated ? 'Do First Quest' : 'Login' }}</p>
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
