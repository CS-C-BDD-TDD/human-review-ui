<template>
  <q-page class="flex flex-center bg-primary" >

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
                <q-input v-model="username" type="text" float-label="User ID" required></q-input>
              </q-field>
              <q-field>
                <q-input v-model="password" type="password" float-label="Password"
                required
                :after="[
                  {
                    icon: 'warning',
                    error: true,
                    handler () {
                      // do something...
                    }
                  }
                ]"
                >
                </q-input>
              </q-field>
            </form>
          </q-card-main>

          <q-card-actions>
            <q-btn class="full-width" type="submit"
              color="primary" label="Sign In" />
          </q-card-actions>
        </q-card>
    </div>

  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'LogIn',
  data() {
    return {
    };
  },
};
</script>
