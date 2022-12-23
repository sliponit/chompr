<template>
  <div>
    <Suspense>
      <first-quest-content :sub="user?.sub" :name="user?.name" />
    </Suspense>
  </div>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';
import FirstQuestContent from '../components/FirstQuestContent.vue';

export default {
  components: { FirstQuestContent },
  name: "first-quest-view",
  setup() {
    const auth0 = useAuth0();
    return {
      user: auth0.user,
    };
  },
};
</script>
