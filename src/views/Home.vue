<template>
  <div class="flex-container">
    <div class="contacts">
      <contacts @select-contact="switchContact"/>
    </div>
    <div class="chat">
      <chat :contactEmail="activeContact"/>
    </div>
  </div>
</template>

<script>
import Contacts from "../components/Contacts";
import Chat from "../components/Chat";
import {updatePicture} from '../api/contacts-api'

export default {
  name: "home",
  components: {
    Contacts,
    Chat
  },
  data: function() {
    return  {
      activeContact: null
    }
  },
  methods: {
    switchContact: function(contact) {
      this.activeContact = contact
    }
  },
  created: async function() {
    await updatePicture()
  }
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
