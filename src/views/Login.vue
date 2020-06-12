<template>
  <div>
    <div class="container">
      <h1 class="header">Welcome to CloudChat</h1>
      <h5>Sign in with your Gmail and start chatting with your friends</h5>
    </div>
  </div>
</template>

<script>

export default {
  name: "home",
};
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .header {
    margin-bottom: 2rem !important;
  }

</style>
