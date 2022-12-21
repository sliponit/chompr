<template>
  <div>
    <hero />
    <hr />
    <Suspense>
      <home-content v-show="user" />
    </Suspense>
  </div>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';
import Hero from "../components/Hero.vue";
import HomeContent from "../components/HomeContent.vue";

export default {
  name: "home-view",
  components: {
    Hero,
    HomeContent,
  },
  setup() {
    const { user } = useAuth0()
    return { user }
  }
};
</script>

<style lang="css" scoped>
.next-steps .fa-link {
    margin-right: 5px;
}
</style>
