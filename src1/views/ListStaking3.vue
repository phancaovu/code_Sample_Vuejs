<template>
  <section>
    <div class="row mx-0">
      <LeftTab></LeftTab>
      <div class="col-lg-9">
        <div class="right-tab mt-3">
          <div class="my-wallet">
            <div class="mywallet-content">
              <div class="row mx-0">
                <div class="col-lg-10 offset-lg-1">
                  <div class="token">
                    <div class="token-content py-4">
                      <div class="text-center mb-3 bg-tittle">
                        <div class="position-relative d-inline-block text-uppercase">
                          <div class="position-absolute top-50 start-0 translate-middle"><img class="tittle-icon"
                                                                                              src="../assets/images/cowcoin.png">
                          </div>
                          <h2 class="text-gradient-yellow ps-5 mb-2"> List Staking 2500 COWS</h2>
                        </div>
                      </div>
                      <div class="row mx-0">
                        <div class="col-lg-3 offset-lg-9 col-md-4 offset-md-8">
                          <div class="input-group mb-2">
                            <input v-model="filters.username" class="form-control" type="text" placeholder="Search" aria-label="Search">
                          </div>
                        </div>
                      </div>
                      <div class="px-4">
                        <table class="table top-list text-center">
                          <thead>
                          <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Username</th>
                            <th scope="col"><span class="d-none d-md-block">Wallet Address</span><span
                                class="d-block d-md-none">Address</span></th>
                            <th scope="col">Date</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr v-for="(item,index) in list.docs">
                            <th scope="row">{{ rank = index + 1 }}</th>
                            <td v-text="item.User.username"></td>
                            <td v-text="splitAddress(item.User.wallet_address)"
                                class="text-truncate wallet-address"></td>
                            <td v-text="item.createdAt"></td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="d-grid">
                        <div class="mx-auto">
                          <button class="btn btn-submit" type="button" v-if="filters.page > 1" @click="filters.page--">
                            <div class="text-radiant"> <</div>
                          </button>
                          <button class="btn btn-submit" type="button" v-if="filters.page > 1" @click="filters.page--">
                            <div class="text-radiant">{{ filters.page - 1 }}</div>
                          </button>
                          <button class="btn btn-submit" type="button">
                            <div class="text-radiant">{{ filters.page }}</div>
                          </button>
                          <button class="btn btn-submit" type="button" v-if="filters.page < list.pages"
                                  @click="filters.page++">
                            <div class="text-radiant">{{ filters.page + 1 }}</div>
                          </button>
                          <button class="btn btn-submit" type="button" v-if="filters.page < list.pages"
                                  @click="filters.page++">
                            <div class="text-radiant">></div>
                          </button>
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
import {ethers} from "ethers";
import {mapState} from "vuex";

export default {
  name: "ListStaking3",
  components: {LeftTab},
  computed: {
    ...mapState(['account', 'contract']),
  },
  data() {
    return {
      filters: {
        page: 1,
        type: 'STAKING_3',
        username: ''
      },
      list: {
        docs: [],
        total: 0
      },
      rank: 0
    }
  },
  async mounted() {
    let vm = this
    await vm.getListStaking()
  },
  methods: {
    splitAddress(address) {
      if (address === null || address.length === 0) {
        return 'CONNECT';
      }
      let strTemp = '';
      return strTemp.concat(address.slice(0, 4), '...', address.slice(-5));
    },
    async getListStaking() {
      let vm = this
      if (vm.account.detail.wallet_address) {
        await vm.$store.dispatch('staking/listStaking3', {filters: vm.filters}).then((response) => {
          let {data, success} = response
          if (success) {
            vm.list = data;
          }
          vm.$forceUpdate()
        }).catch(e => {
          vm.error(e.message)
        })
      }
    },
  },
  watch: {
    async 'account.detail.wallet_address'() {
      let vm = this;
      await vm.getListStaking()
    },
    'filters.page'() {
      this.getListStaking()
    },
    'filters.username'() {
      this.getListStaking()
    },
  }
}
</script>

<style scoped>
.btn-play {
  color: #936423;
  text-transform: uppercase;
  border-radius: 10px;
  background: url(../assets/images/btnmenu.png) no-repeat center center;
  background-size: 100% 100%;
}
</style>
