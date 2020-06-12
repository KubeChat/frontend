<template>
  <div class="flex-container">
    <contacts/>
    <chat/>
  </div>
</template>

<script>
import Contacts from "../components/Contacts";
import Chat from "../components/Chat";

export default {
  name: "home",
  components: {
    Contacts,
    Chat
  },
};
</script>

<style lang="scss" scoped>
  .flex-container {
    display: flex;
  }
</style>
