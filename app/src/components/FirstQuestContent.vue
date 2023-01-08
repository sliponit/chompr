<template>
  <div class="text-center my-5">
    <h2 class="mb-3">What can I do next? First Quest - clean some old tweets!</h2>
    <div v-if="profile?.public_metrics?.tweet_count == undefined">
      <p>Enter your Twitter name to continue</p>
      <div class="mb-3">
        <input
          v-model="handle"
          placeholder="Twitter name"
          v-on:keyup.enter="fetchAndUpdateRef" />
      </div>
      <div>
        <button class="btn btn-pink" @click="fetchAndUpdateRef">Validate</button>
      </div>
    </div>
    <div v-else-if="!clicked.second">
      <p v-html="`You have <strong>${profile?.public_metrics?.tweet_count}</strong> tweets for your <strong>${handle}</strong> account`" />
      <p>Go clean some! We tested and liked the free plan of <a href="https://www.tweeteraser.com/" target="_blank">TweeterEraser</a>. Othewise other automated tools do exist or you can delete tweets / RT it by hand. Do not forget to hit 'Done' after!</p>.
      <!--p>(Optional) If you know about NFTs and want to receive a free one, enter your ETH public address below. We will be in touch!
        <br>
        <input
          v-model="ethAddress"
          placeholder="eth address" />
      </p-->
      <button class="btn btn-pink mt-5" @click="postAndClicked">Done</button>
    </div>

    <div v-if="clicked.second" class="mt-5">
      <h6 class="muted" v-html="`Congrats! You have cleaned <strong>${diff}</strong> tweets and now have <strong>${profile?.public_metrics?.tweet_count}</strong> tweets left!`"/>
      <div class="text-left">
        <p>Now you are probably wondering about three things:</p>
        <ol>
          <li>Where are other quests?</li>
          <li>What is my reward?</li>
          <li>What was the environmental impact of my cleaning?</li>
        </ol>
        <p>We are figuring out these questions! If you have suggestions / feedback, please mention us or drop us a DM on Twitter 🙂</p>
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
    const isTwitterLogin = props.sub?.startsWith('twitter|')
    const clicked = ref({ second: false })
    const diff = ref(0)
    const handle = ref(isTwitterLogin ? props.name : '')
    const profile = ref()
    if (isTwitterLogin) {
      profile.value = await fetchApi(props.name)
    }

    return {
      clicked,
      diff,
      handle,
      profile,
      async fetchAndUpdateRef() {
        profile.value = await fetchApi(handle.value);
      },
      async postAndClicked() {
        const count = profile.value?.public_metrics?.tweet_count || 0
        const body = {
          twitter_name: handle.value,
          // user_name: props.name,
          count,
          // eth_address: ethAddress.value
        }
        
        profile.value = await postApi(body);
        diff.value = count - profile.value?.public_metrics?.tweet_count
        clicked.value.second = true
      }
    };
  },
};
</script>
