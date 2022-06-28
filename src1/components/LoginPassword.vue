<template>
  <div class="row mx-0 mt-5">
    <div class="col-md-4 offset-md-4">
      <div class="form-group mt-1 text-center">
        <p class="text-center mb-1 text-warning text-capitalize">Password</p>
        <div class="input-group mb-3">
          <input class="form-control text-center" type="password" v-model="login_password" autocomplete="off">
        </div>
      </div>
      <div class="form-group text-center">
        <button class="btn btn-submit mx-auto btn-block" @click.prevent="cpanelLogin">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "LoginPassword",
  computed: {
    ...mapState(['auth']),
    currentRouteName() {
      return this.$route.name
    }
  },
  data() {
    return {
      login_password: '',
    }
  },
  methods: {
    async cpanelLogin() {
      let vm = this;
      vm.$store.dispatch('auth/cpanelLogin', {
        type: 'SCREEN_PASSWORD_' + this.currentRouteName,
        password: vm.login_password
      }).then(response => {
        let {success, message} = response
        if (success) {
          vm.$store.dispatch('auth/setPassword', vm.login_password)
          vm.success(message);
        } else {
          vm.error(message)
        }
      }).catch(e => {
        vm.error(e.message);
      })
      // vm.$store.dispatch('admin/checkPagePassword', {
      //     route_name: this.currentRouteName
      // }).then(response => {
      //     let {success, message} = response
      //     vm.$forceUpdate();
      //     vm.$store.dispatch('auth/cpanelLogin', {
      //         type: 'SCREEN_PASSWORD_' + this.currentRouteName,
      //         password: vm.login_password
      //     }).then(response => {
      //         let {success, message} = response
      //         if (success) {
      //             vm.$store.dispatch('auth/setPassword', vm.login_password)
      //             vm.success(message);
      //         } else {
      //             vm.error(message)
      //         }
      //     }).catch(e => {
      //         vm.error(e.message);
      //     })
      // }).catch(e => {
      //     vm.error(e.message);
      // })
    }
  }
}
</script>

<style scoped>

</style>
