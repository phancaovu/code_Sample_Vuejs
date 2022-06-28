<template>
  <section>
    <div class="row mx-0">
      <LeftTab/>
      <div class="col-lg-9">
        <div class="right-tab mt-3">
          <div class="my-wallet">
            <div class="mywallet-content">
              <!--modal-->
              <div class="modal fade" id="reset-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content mywallet-modal">
                    <div class="modal-header border-0 pb-0">
                      <button class="btn invisible" type="button" data-bs-dismiss="modal" aria-label="Close"><i class="fas fa-times fa-2x text-light"></i></button>
                      <h3 class="modal-title mb-3 text-center">Reset Password</h3>
                      <button class="btn" type="button" data-bs-dismiss="modal" aria-label="Close"><i class="fas fa-times fa-2x text-light"></i></button>
                    </div>
                    <div class="modal-body pt-0">
                      <div class="row mx-0 my-3">
                        <div class="col-8 offset-2">
                          <form>
                            <div class="form-floating mb-3">
                              <input class="form-control" id="password" type="password" placeholder="Password" v-model="change_password.password">
                              <label for="Password">Password</label>
                            </div>
                            <div class="form-floating mb-3">
                              <input class="form-control" id="password-confirm" type="password" placeholder="Password" v-model="change_password.password_confirmation">
                              <label for="password-confirm">Password Confirm</label>
                            </div>
                            <div class="d-grid">
                              <button class="btn btn-submit mx-auto" type="button" @click="changePassword">
                                <div class="text-radiant">Submit</div>
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mx-0">
                <div class="col-lg-12">
                  <div class="token">
                    <div class="token-content p-3 my-3">
                      <div class="profile-box">
                        <div class="row mx-0 text-center text-md-start">
                          <div class="pb-3 mb-3 border-bottom">
                            <h3 class="text-gold">Profile</h3>
                          </div>
                          <div class="col-md-3"><img class="w-100 mb-3" src="../assets/images/logo.png"></div>
                          <div class="col-md-9 text-gold">
                            <div class="row mx-0">
                              <div class="col-md-6 col-lg-4 px-md-0">
                                <div class="input-group mb-3">
                                  <input id="inputRef" v-model="ref_link" class="form-control" type="text" value="0x36e6D8471485f8EaA4C6c9E65cF0cCe2154919A2">
                                  <div class="input-group-text">
                                    <button @click.prevent="copyRef" class="bg-transparent text-gold"><i class="far fa-copy"></i></button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <p>Username : {{ account.detail.username }}</p>
                            <p>Email : {{ account.detail.email }}</p>
                            <p>Password :
                              <button class="btn btn-transfer py-2" type="button" data-bs-toggle="modal" data-bs-target="#reset-modal"><span class="text-radiant text-uppercase">Reset</span></button>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LeftTab from "@/components/LeftTab";
import {mapState} from "vuex";
import {ethers} from "ethers";
import {DOMAIN, WEB_URL} from "@/utils/config";

export default {
  name: "Profile",
  components: {LeftTab},
  computed: {
    ...mapState(['account', 'wallet_connect', 'contract', 'metamask']),
    currentRouteName() {
      return this.$route.name;
    },
  },
  data() {
    return {
      ref_link: '',
      change_password: {
        password: null,
        password_confirmation: null,
      }
    }
  },
  mounted() {
    let vm = this;
    vm.getRef_link();
  },
  methods: {
    getRef_link() {
      let vm = this;
      if (this.account.detail.wallet_address) {
        vm.ref_link = WEB_URL + `?ref_id=${this.account.detail.wallet_address}`
      }
    },
    copyRef() {
      let copyText = document.getElementById("inputRef");
      copyText.select();
      document.execCommand("copy");
      this.success('Send referral link to Friends get bonus')
    },
    changePassword() {
      let vm = this;
      vm.$store.dispatch('account/changePassword', vm.change_password).then(response => {
        let {success, message} = response;
        if (success) {
          $('#reset-modal').modal('hide');
          vm.success(message)
        } else {
          vm.error(message)
        }
      })
    }
  },
  watch: {
    'account.detail.wallet_address'() {
      let vm = this;
      vm.getRef_link()
    }
  }
}
</script>

<style scoped>

</style>