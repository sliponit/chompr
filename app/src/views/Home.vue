<template>
  <div>
    <hero />
    <hr />
    <Suspense>
      <first-quest-content />
    </Suspense>
  </div>
</template>

<script>
import Hero from "../components/Hero.vue";
import FirstQuestContent from "../components/FirstQuestContent.vue";

export default {
  name: "home-view",
  components: {
    Hero,
    FirstQuestContent,
  }
};
</script>

<style lang="css" scoped>
.next-steps .fa-link {
    margin-right: 5px;
}
</style>
