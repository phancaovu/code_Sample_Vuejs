<template>
  <div class="mywallet-content">
    <div class="row mx-0 mt-3">
      <div class="col-lg-10 offset-lg-1">
        <div class="token">
          <div class="token-content py-4">
            <div class="text-center mb-3 bg-tittle">
              <div class="position-relative d-inline-block text-uppercase">
                <div class="position-absolute top-50 start-0 translate-middle"><img class="tittle-icon"
                                                                                    src="../../assets/images/cowcoin.png">
                </div>
                <h2 class="text-gradient-yellow ps-5 mb-2"> Top Snaker</h2>
              </div>
            </div>
            <div class="row mx-0">
              <div class="col-lg-3 offset-lg-9 col-md-4 offset-md-8">
                <div class="input-group mb-2">
                  <input v-model="filters.username" class="form-control" type="text" placeholder="Search"
                         aria-label="Search">
                </div>
              </div>
            </div>
            <div class="px-4">
              <table class="table top-list text-center">
                <thead>
                <tr>
                  <th scope="col">Top</th>
                  <th scope="col">Username</th>
                  <th scope="col">GRIM</th>
                  <th scope="col">Time Play</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item) in data.chunk[filters.page-1]">
                  <th scope="row">{{ item.stt }}</th>
                  <td v-text="item.username"></td>
                  <td v-text="item.scrim"></td>
                  <td>{{ convertToTimeEnd(item.time, item.timeplay) | convertTimeStamp('DD/MM/YYYY HH:mm:ss') }}</td>
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
                <button class="btn btn-submit" type="button" v-if="filters.page < data.totalPages"
                        @click="filters.page++">
                  <div class="text-radiant">{{ filters.page + 1 }}</div>
                </button>
                <button class="btn btn-submit" type="button" v-if="filters.page < data.totalPages"
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
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "WarehouseTopSnake",
  computed: {
    ...mapState(['account', 'wallet_connect']),
  },
  data() {
    return {
      filters: {
        username: '',
        page: 1,
      },
      data: {
        list: [],
        chunk: [],
        totalPages: 1,
      },
      listFromAPI: [],
      list: [],
      totalPages: 0,
      rank: 0
    }
  },
  async created() {
    let vm = this;
    await vm.getListFromAPI()
  },
  methods: {
    async getListFromAPI() {
      let vm = this
      vm.$store.dispatch('warehouse/topSnake', {type: 'kill'}).then(async response => {
        let {data, message, success} = response
        if (success) {
          vm.data.list = data.data;
          _.remove(vm.data.list, item => {
            return [
                'lam', 'boss'
              , 'sbn01' , 'sbn02' , 'sbn03' , 'sbn04' , 'sbn05' , 'sbn06' , 'sbn07' , 'sbn08' , 'sbn09' , 'sbn10'
              , 'sbn11' , 'sbn12' , 'sbn13' , 'sbn14' , 'sbn15' , 'sbn16' , 'sbn17' , 'sbn18' , 'sbn19' , 'sbn20'
            ].indexOf(item.username) >= 0;
          })
          vm.data.list = _.reverse(_.sortBy(vm.data.list, ['scrim']));
          _.forEach(vm.data.list, (item, index) => {
            item.stt = index + 1
          })
          await vm.getListTopSnake()
        }
        vm.$forceUpdate()
      }).catch(e => {
        vm.error(e.message)
      })
    },
    async getListTopSnake() {
      let vm = this
      let checkUsername = new RegExp(`${vm.filters.username}.*`)
      let newList = [];

      if (vm.filters.username.length > 0) {
        vm.filters.page = 1;
        _.forEach(vm.data.list, (item) => {
          if (item.username.match(checkUsername) !== null) {
            newList.push(item)
          }
        })
        newList = _.chunk(newList, 10);
      } else {
        newList = _.chunk(_.cloneDeep(vm.data.list), 10);
      }

      vm.data.chunk = newList;
      vm.data.totalPages = newList.length;

      vm.$forceUpdate();
    },
    convertToTimeEnd(start_time, time_play) {
      return start_time + time_play
    }
  },
  watch: {
    'filters.username'() {
      this.getListTopSnake()
    },
    'filters.page'() {
      this.getListTopSnake()
    }
  }
}
</script>

<style scoped>

</style>
