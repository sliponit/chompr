<template>
  <div>
    <h1>First Quest: clean some old tweets</h1>
    <div v-if="profile?.public_metrics?.tweet_count == undefined" class="row align-items-center">
      <div class="col-md-12">Enter your twitter name to continue</div>
      <div class="col-md-4">
        <input
          v-model="handle"
          placeholder="twitter name" />
      </div>
      <div class="col-md">
        <button class="btn btn-primary" @click="fetchAndUpdateRef">Validate</button>
      </div>
    </div>
    <div v-else-if="!clicked.second">
      <p>{{ `You have ${profile?.public_metrics?.tweet_count} tweets for your ${handle} account` }}</p>
      <p>Go clean some. Do it by hand or in bulk, see eg <a href="https://www.jeffbullas.com/twitter-tools-to-delete-tweets/" target="_blank">this blog post</a> for a list of automated tools</p>
      <p>(Optional) If you know about NFTs and want to receive a free one, enter your ETH public address below. We will be in touch!
        <br>
        <input
          v-model="ethAddress"
          placeholder="eth address" />
      </p>
      <button class="btn btn-primary mt-5" @click="postAndClicked">Done</button>
    </div>

    <div class="result-block-container">
      <div :class="['result-block', clicked.second ? 'show' : '']">
        <h6 class="muted">{{ `Congrats! You now have ${profile?.public_metrics?.tweet_count} tweets` }}</h6>
        <!--highlightjs language="json" :code="JSON.stringify(profile, null, 2) || ''" /-->
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

function fetchApi (name) {
  const endpointURL = `${import.meta.env.VITE_API_URL}?name=${name}`
  return fetch(endpointURL)
    .then(response => response.json())
    .then(json => json?.data);
}

function postApi (body) {
  const endpointURL = `${import.meta.env.VITE_API_URL}`
  const options = {
    method: 'post',
    body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json'}
  }

  return fetch(endpointURL, options)
    .then(response => response.json())
    .then(json => json?.data);
}

export default {
  name: "first-quest-view",
  props: {
    sub: String,
    name: String
  },
  async setup(props) {
    const isTwitterLogin = props.sub.startsWith('twitter|')
    const clicked = ref({ second: false })
    const ethAddress = ref('')
    const handle = ref(isTwitterLogin ? props.name : '')
    const profile = ref()
    if (isTwitterLogin) {
      profile.value = await fetchApi(props.name)
    }

    return {
      clicked,
      ethAddress,
      handle,
      profile,
      async fetchAndUpdateRef() {
        profile.value = await fetchApi(handle.value, props.name);
      },
      async postAndClicked() {
        const body = {
          twitter_name: handle.value,
          user_name: props.name,
          count: profile.value?.public_metrics?.tweet_count || 0,
          eth_address: ethAddress.value
        }
        profile.value = await postApi(body);
        clicked.value.second = true
      }
    };
  },
};
</script>
