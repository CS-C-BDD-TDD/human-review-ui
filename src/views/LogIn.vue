<template>
    <div class="window-width row justify-center items-start">
        <q-card class="bg-white">
          <q-card-media>
            <img alt="Quasar logo" src="../assets/DHS-logo.jpg">
          </q-card-media>

          <!--q-card-separator/-->

          <q-card-title></q-card-title>
          <q-card-main>
            <q-field>
              <q-input v-model="username" type="text" float-label="User ID" :error="failedLogin" required />
            </q-field>
            <q-field>
              <q-input v-model="password" type="password" float-label="Password" :error="failedLogin" required />
            </q-field>
            <q-alert color="red" v-if="failedLogin">
              Login failed. Please try again.
            </q-alert>
          </q-card-main>

          <q-card-actions>
            <!-- <a href="">Sign In</a>  -->
            <q-btn class="full-width" color="primary" label="Sign In" @click="login" />
          </q-card-actions>
        </q-card>
    </div>
</template>

<style>
.errorColor {
  background-color: 
}
</style>

<script>
export default {
  name: 'Login',

  data: () => ({
    username: '',
    password: '',
    token: '',
    failedLogin: false
  }),

  methods: {
    login: function () {
      // Access the '$axios' client via the 'this' object and send the request. We will then
      // recieve a 'Promise' which contains the 'response' object from the Axios client.
      this.$axios.put('/api/v1/user', { username: this.username, password: this.password })
        .then((response) => {
          if (response.status === 200) {
            this.token = response.data;
            this.$router.push({ name: 'humanreview', params: { token: this.token }});
          } else {
            this.failedLogin = true;
          }
        }).catch((error) => {
          console.log(error);
          this.failedLogin = true;
        });
    }
  },
};
</script>