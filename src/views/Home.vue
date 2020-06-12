<template>
  <div class="flex-container">
    <div class="contacts">
      <contacts/>
    </div>
    <div class="chat">
      <chat/>
    </div>
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
    width: 100%;
    flex: 1 0 0 !important;
  }

  .contacts {
    flex: 0 0 25%;
  }

  .chat {
    flex: 0 0 75%;
  }
</style>
