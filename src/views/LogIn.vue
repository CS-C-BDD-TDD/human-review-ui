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
import HumanReview from 'human_review';

export default {
  name: 'Login',

  data: () => {
    return {
      username: '',
      password: '',
      token: '',
      failedLogin: false
    };
  },

  methods: {
    login: function() {
      let credentials = new HumanReview.AuthCredentials();
      credentials.username = this.username;
      credentials.password = this.password;
 
      // Access the `$api` client via the `this` object and send the request with a callback.
      // The callback needs to be an ES6 arrow function (closure) so that `this` is captured in the scope.
      this.$api.userPut(credentials, (error, returnedToken, response) => {
        if (error === null) {
          // Success
          // Tell the Vue Router to redirect to the humanreview page and pass the authentication token
          // as a parameter
          this.$router.push({ name: 'humanreview', params: { token: returnedToken } });
          this.token = returnedToken;
        } else {
          // Failure - Handle error
          this.failedLogin = true;
        }
      });
    }
  }
};
</script>

