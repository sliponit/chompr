<template>
  <div class="next-steps">
    <h2 class="my-5 text-center">What can I do next?</h2>
     <div class="row">
      <highlightjs language="json" :code="JSON.stringify(user, null, 2)" />
    </div>
  </div>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  name: "HomeContent",
  async setup() {
    const { user } = useAuth0();
    const twitterToken = import.meta.env.VITE_TWITTER_BEARER_TOKEN
    const endpointURL = `https://api.twitter.com/2/users/by/username/${user.name}?user.fields=public_metrics`
    const res = await fetch(endpointURL, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${twitterToken}`
      },
    })

    const profile = await res.json()    
    return {
      user,
      profile
    }
  }
};
</script>
