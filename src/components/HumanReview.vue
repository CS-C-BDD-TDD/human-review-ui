<template>
  <div id="message">
    <h4 class="authenticated" v-if="isAuthenticated()">
      Welcome to Human Review Pending Page {{this.$store.state.token}}
    </h4>
    <h4 v-else class="error">Login failed !!! {{this.$store.state.token}}</h4>
  </div>
</template>

<script>
export default {
  methods: {
    isAuthenticated() {
      if (this.$store.state.token !== 'invalid credential' &&
        this.$store.state.token.toString().indexOf('Random-') >= 0) {
        return true;
      } 
      return false;
    },
  },
};
</script>

<style>
.authenticated {
  color: green;
}
.error {
  color: red;
}
</style>
