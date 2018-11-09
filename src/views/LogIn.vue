<template>
    <div class="window-width row justify-center items-start">
        <q-card class="bg-white">
          <q-card-media>
            <img alt="Quasar logo" src="../assets/DHS-logo.jpg">
          </q-card-media>

          <q-card-title></q-card-title>
          <q-card-main>
            <form>
              <q-field :error="failedLogin">
                <q-input v-model="username" type="text" @input="resetValue"
                  float-label="User ID" required clearable/>
              </q-field>
              <q-field :error="failedLogin">
                <q-input v-model="password" type="password" @input="resetValue"
                  float-label="Password" required clearable/>
              </q-field>
              <q-alert color="red" v-if="failedLogin">
                Login failed. Please try again.
              </q-alert>
            </form>
          </q-card-main>

          <q-card-actions>
            <!-- <a href="">Sign In</a>  -->
            <q-btn class="full-width" color="primary" label="Sign In" @click="login" />
          </q-card-actions>
        </q-card>
    </div>
</template>

<style>
</style>

<script>
export default {
  name: 'Login',

  data: () => {
    return {
      username: '',
      password: '',
      token: '',
      errmsg: '',
      failedLogin: false,
    };
  },

  methods: {
    resetValue() {
      this.failedLogin = false;
    },

    login() {
      const url = '/api/v1/user';
      const requestBody = {
        username: this.username,
        password: this.password,
      };
      // Access the '$axios' client via the 'this' object and send the request. We will then
      // recieve a 'Promise' which contains the 'response' object from the Axios client.
      this.$axios.put(url, requestBody)
        .then((response) => {
          if (response.status === 200) {
            this.token = response.data;
            console.log(JSON.stringify(response.data));
            this.$router.push({ name: 'pending', params: { token: this.token } });
          } else {
            this.errmsg = response.data;
            this.failedLogin = true;
            console.log(JSON.stringify(response.data));
          }
        }).catch((error) => {
          this.failedLogin = true;
          console.log(error);
        });
    },
  },
};
</script>
