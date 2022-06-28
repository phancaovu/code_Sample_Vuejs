<template>
  <section>
    <div class="admin-page">
      <AdminMenu></AdminMenu>
      <LoginPassword v-if="!auth.IS_ADMIN"></LoginPassword>
      <!--      <div class="row mx-0 mt-5" v-if="!auth.IS_ADMIN">-->
      <!--        <div class="col-md-4 offset-md-4">-->
      <!--          <div class="form-group mt-1 text-center">-->
      <!--            <p class="text-center mb-1 text-warning text-capitalize">Password</p>-->
      <!--            <div class="input-group mb-3">-->
      <!--              <input class="form-control text-center" type="password" v-model="login_password" autocomplete="off">-->
      <!--            </div>-->
      <!--          </div>-->
      <!--          <div class="form-group text-center">-->
      <!--            <button class="btn btn-submit mx-auto btn-block" @click.prevent="cpanelLogin">Login</button>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <div class="row mx-0 mt-5" v-else>
        <div class="col-md-8 offset-md-2">
          <div class="row mb-3">
            <div class="col-auto">
              <select v-model="checkEgg.type" class="form-control">
                <!--                <option >Choose type . . .</option>-->
                <option value="0">Check deposit token</option>
                <option value="BUY_EGG_UNICORN_EVENT">Check deposit Egg</option>
                <option value="DEPOSIT_UNICORN_1155">Check deposit Egg-1155</option>
              </select>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-auto">
              <label for="" class="visually-hidden">TX HASH</label>
              <input v-model="checkEgg.transaction_hash" type="text" class="form-control" id="" placeholder="input tx hash...">
            </div>
            <div class="col-auto">
              <button type="submit" @click.prevent="checkTransaction" class="btn btn-primary">Submit</button>
            </div>

          </div>
          <div class="row mb-3 invisible">
            <div class="table-responsive-sm">
              <table class="table table-md table-warning align-middle">
                <thead>
                <tr class="table-danger">
                  <th scope="col">#</th>
                  <th scope="col">TX HASH</th>
                  <th scope="col">TYPE</th>
                  <th scope="col">STATUS</th>
                  <th scope="col">TRY</th>
                  <th scope="col">ERROR MESSAGE</th>
                  <th scope="col">ACTION</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>0x95f040624015c8093a65ad84f00116b70ce818e317fffc43935c0fc94603f2c8</td>
                  <td>{}</td>
                  <td>ACTIVE</td>
                  <td>{}</td>
                  <td>NULL</td>
                  <td>
                    <div class="d-flex justify-content-between">
                      <button class="btn btn-success">
                        <img src="../../assets/images/check2-square.svg">
                      </button>
                      <button class="btn btn-danger">
                        <img src="../../assets/images/trash.svg">
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>0x95f040624015c8093a65ad84f00116b70ce818e317fffc43935c0fc94603f2c8</td>
                  <td>{}</td>
                  <td>ACTIVE</td>
                  <td>{}</td>
                  <td>NULL</td>
                  <td>
                    <div class="d-flex justify-content-between">
                      <button class="btn btn-success">
                        <img src="../../assets/images/check2-square.svg">
                      </button>
                      <button class="btn btn-danger">
                        <img src="../../assets/images/trash.svg">
                      </button>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </div>
  </section>
</template>

<script>
import AdminMenu from "@/components/AdminMenu";
import LoginPassword from "@/components/LoginPassword";
import {mapState} from "vuex";

export default {
  name: "Blockchain",
  components: {
    AdminMenu,
    LoginPassword
  },
  computed: {
    ...mapState(['auth'])
  },
  data() {
    return {
      checkEgg: {
        transaction_hash: '',
        type: 'BUY_EGG_UNICORN_EVENT',
        event_id: 1
      }
    }
  },
  methods: {
    async checkTransaction() {
      let vm = this
      vm.checkEgg.password = vm.auth.PASSWORD;
      vm.$store.dispatch('admin/checkTransaction', vm.checkEgg).then(response => {
        let {message, data, success} = response
        if (success) {
          vm.success(message)
        } else {
          vm.error(message)
        }
      }).catch(e => {
        vm.error(e.message)
      })
    }
  }
}
</script>

<style scoped>

</style>
