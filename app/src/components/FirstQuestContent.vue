<template>
  <div>
    <div class="mb-5">
      <h1>External API</h1>

      <button class="btn btn-primary mt-5" @click="callApi">Call API</button>
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
    console.log('TODO??', props.name)
    return {
      apiMessage,
      async callApi() {
        try {
          const endpointURL = `https://api.twitter.com/2/users/by/username/${props.name}?user.fields=public_metrics`
          const response = await fetch(endpointURL);
          
          const data = await response.json();
          apiMessage.value = data;
        } catch (e) {
          apiMessage.value = `Error: the server responded with '${e.response.status}: ${e.response.statusText}'`;
        }
      },
    };
  },
};
</script>
