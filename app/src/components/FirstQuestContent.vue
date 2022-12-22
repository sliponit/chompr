<template>
  <div>
    <div class="mb-5">
      <h1>First Quest</h1>
      <p>{{ `You have ${apiMessage?.public_metrics?.tweet_count} tweets` }}</p>
      <p>Go clean some, see eg <a href="https://www.jeffbullas.com/twitter-tools-to-delete-tweets/" target="_blank">this blog post</a> for a list of automated tools</p>
      <p>Click done</p>
      <button class="btn btn-primary mt-5" @click="callApi">Done</button>
    </div>

    <div class="result-block-container">
      <div :class="['result-block', apiMessage ? 'show' : '']">
        <h6 class="muted">Result</h6>
        <highlightjs language="json" :code="JSON.stringify(apiMessage, null, 2) || ''" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: "first-quest-view",
  props: {
    name: String,
  },
  setup(props) {
    const apiMessage = ref();
    return {
      apiMessage,
      async callApi() {
        try {
          const endpointURL = `${import.meta.env.VITE_API_URL}?name=${props.name}`
          const response = await fetch(endpointURL);
          const data = await response.json();
          apiMessage.value = data?.data;
        } catch (e) {
          apiMessage.value = `Error: the server responded with '${e.response.status}: ${e.response.statusText}'`;
        }
      },
    };
  },
};
</script>
