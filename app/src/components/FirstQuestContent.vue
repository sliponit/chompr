<template>
  <div class="text-center my-5">
    <h2 class="mb-3">What can I do next? Clean some old tweets!</h2>
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
      <p>
        <span v-html="`You have <strong>${profile?.public_metrics?.tweet_count}</strong> tweets for your <strong>${handle}</strong> account. This is approximately <strong>${profile?.public_metrics?.tweet_count * .026}g</strong> of CO2e. `" />
        <a href="https://envirotecmagazine.com/2022/12/08/tracking-the-ecological-cost-of-a-tweet/" target="_blank">Source</a>
      </p>
      <p>Go clean some! We tested and liked the free plan of <a href="https://www.tweeteraser.com/" target="_blank">TweeterEraser</a>. Othewise other automated tools do exist #DYOR. You can also delete tweets / RT it by hand. Do not forget to hit 'Done' after!</p>.
      <button class="btn btn-pink mt-5" @click="postAndClicked">Done</button>
    </div>

    <div v-if="clicked.second" class="mt-5">
      <h6 class="muted" v-html="`Congrats! You have cleaned <strong>${diff}</strong> tweets or <strong>${diff * .026}g</strong> of CO2e. You still have <strong>${profile?.public_metrics?.tweet_count}</strong> tweets left!`"/>
      <div class="text-left">
        <p>Now you are probably wondering</p>
        <ol>
          <li>How can I reduce further my digital impact? Do this weekly! Some tools do it but often for a fee. We are thinking on automating this for you for free!</li>
          <li>What do we mean by random rewards? Probably selecting one winner each week using a draw following the continuous uniform distribution and give them a prize.</li>
          <li>What? I did not understand what you just said! No problem! Not sure we do neither. But for now it is easy, we just had one user last week!</li>
          <li>Did you store some data about me? We did. But we will not share it without your consent and it should be <a href="https://www.cloudflare.com/products/workers-kv/" target="_blank">secure</a>.</li>
        </ol>
        <p>Anyway we are figuring out these questions! If you have suggestions / feedback, please mention us or drop us a DM on Twitter 🙂</p>
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
