<template>
  <div>
    <h1>First Quest</h1>
    <div v-if="!clicked.first">
      <input
        v-model="handle"
        placeholder="edit me" />
      <button class="btn btn-primary mt-5" @click="fetchAndClicked">Validate</button>
    </div>
    <div v-else-if="!clicked.second">
      <p>{{ `You have ${profile?.public_metrics?.tweet_count} tweets for your ${handle} account` }}</p>
      <p>Go clean some, see eg <a href="https://www.jeffbullas.com/twitter-tools-to-delete-tweets/" target="_blank">this blog post</a> for a list of automated tools</p>
      <button class="btn btn-primary mt-5" @click="() => fetchAndClicked(false)">Done</button>
    </div>

    <div class="result-block-container">
      <div :class="['result-block', clicked.second ? 'show' : '']">
        <h6 class="muted">{{ `Congrats! You now have ${profile?.public_metrics?.tweet_count} tweets` }}</h6>
        <highlightjs language="json" :code="JSON.stringify(profile, null, 2) || ''" />
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

export default {
  name: "first-quest-view",
  setup() {
    const clicked = ref({ first: false, second: false })
    const handle = ref('')
    const profile = ref()
    return {
      clicked,
      handle,
      profile,
      async fetchAndClicked(isFirst = true) {
        profile.value = await fetchApi(handle.value);
        if (isFirst) clicked.value.first = true
        else clicked.value.second = true
      }
    };
  },
};
</script>
