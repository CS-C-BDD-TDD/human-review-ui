<template>
    <div class="window-width row justify-center items-start">
        <q-card class="bg-white">
          <q-card-media>
            <img alt="Quasar logo" src="../assets/DHS-logo.jpg">
          </q-card-media>

          <!--q-card-separator/-->

          <q-card-title></q-card-title>
          <q-card-main>
            <form>
              <q-field>
                <q-input v-model="username" type="text" float-label="User ID" required />
              </q-field>
              <q-field>
                <q-input v-model="password" type="password" float-label="Password" required />
              </q-field>
            </form>
          </q-card-main>

          <q-card-actions>
            <!-- <a href="">Sign In</a>  -->
            <q-btn class="full-width" color="primary" label="Sign In" @click="login" />
          </q-card-actions>
        </q-card>
        <q-alert color="red" v-if="failedLogin">
          Login failed
        </q-alert>
    </div>
</template>

<style>
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
    login() {
      // Access the `$axios` client via the `this` object and send the request. We will then
      // recieve a `Promise` which contains the `response` object from the Axios client.
      this.$axios.put('/api/v1/user', { username: this.username, password: this.password })
        .then((response) => {
          if (response.status === 200) {
            // Success
            // Tell the Vue Router to redirect to the humanreview page and
            // pass the authentication token as a parameter
            this.token = response.data;
            this.$router.push({ name: 'humanreview', params: { token: this.token } });
          } else {
            // Failure - Handle error
            this.failedLogin = true;
          }
        });
    }
  }
};
</script>

