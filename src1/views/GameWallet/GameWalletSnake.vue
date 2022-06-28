<template>
  <div class="mywallet-content">
    <ModalStep :step_detail="step_detail"></ModalStep>

    <div class="rate-filter">
      <div class="row mx-0">
        <div class="col-md-9">
          <ul class="nav">
            <li class="nav-item" @click="snake_filters.snake_type = 'ALL'">
              <a :class="`nav-link ${snake_filters.snake_type == 'ALL' ? 'active' : ''}`" aria-current="page" href="javascript:void(0)">
                <div class="btn box-text me-1">ALL</div>
                <div class="box-check"><img class="icon-check" src="../../assets/images/icon-check.png"></div>
              </a>
            </li>
            <li class="nav-item" @click="snake_filters.snake_type = 'NAGA'">
              <a :class="`nav-link ${snake_filters.snake_type == 'NAGA' ? 'active' : ''}`" aria-current="page" href="javascript:void(0)">
                <div class="btn box-text me-1">N</div>
                <div class="box-check"><img class="icon-check" src="../../assets/images/icon-check.png"></div>
              </a>
            </li>
            <li class="nav-item" @click="snake_filters.snake_type = 'HYDRA'">
              <a :class="`nav-link ${snake_filters.snake_type == 'HYDRA' ? 'active' : ''}`" aria-current="page" href="javascript:void(0)">
                <div class="btn box-text me-1">R</div>
                <div class="box-check"><img class="icon-check" src="../../assets/images/icon-check.png"></div>
              </a>
            </li>
            <li class="nav-item" @click="snake_filters.snake_type = 'LORD'">
              <a :class="`nav-link ${snake_filters.snake_type == 'LORD' ? 'active' : ''}`" aria-current="page" href="javascript:void(0)">
                <div class="btn box-text me-1">sr</div>
                <div class="box-check"><img class="icon-check" src="../../assets/images/icon-check.png"></div>
              </a>
            </li>
            <li class="nav-item" @click="snake_filters.snake_type = 'SHENRON'">
              <a :class="`nav-link ${snake_filters.snake_type == 'SHENRON' ? 'active' : ''}`" aria-current="page" href="javascript:void(0)">
                <div class="btn box-text me-1">ssr</div>
                <div class="box-check"><img class="icon-check" src="../../assets/images/icon-check.png"></div>
              </a>
            </li>
          </ul>
        </div>
        <div class="col-md-3 d-lg-flex align-items-center justify-content-end"></div>
      </div>
    </div>
    <div class="row mx-0" v-for="list in data_snake.chunk">
      <div class="col-md-6 col-lg-3 mb-3" v-for="item in list">
        <div class="walltet-content-box py-4 d-flex align-items-start flex-column">
          <div class="content-box-top"><img class="w-100" :src="frameSnakeType(item.snake_type)">
            <div class="content-box-top-snake text-center">
              <img class="snake-img" :class="`${item.snake_type === 'SHENRON' ? 'snake-ssr' : ''}`" :src="snakeImage(item.snake_type, item.skin_id)">
            </div>
            <div class="content-box-top-name">
              <div class="d-flex justify-content-center align-items-center">
                <div class="text-radiant text-uppercase text-center">{{ item.snake_type }}</div>
                <div class="position-relative ms-2 snake-id"><img class="w-100" src="../../assets/images/id-egg.png">
                  <div class="position-absolute top-50 start-50 translate-middle">#{{ item.id }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="content-box-bottom px-3 mt-auto">
            <div class="row mx-0 my-2">
              <div class="col-lg-3 text-center px-0 col-3"><img src="../../assets/images/heart.png">
                <p class="health-color mb-2">HEALTH</p>
              </div>
              <div class="col-lg-8 col-7">
                <div class="progress health mt-1">
                  <HealthProgressbar :key="item.nft_id" :timestamp="item.eat_time" :health="getHealthHours(item.snake_type, item.skin_id)"></HealthProgressbar>
                </div>
                <p class="health-color text-center my-2">
                  <Countdown :timestamp="item.eat_time"></Countdown>
                </p>
              </div>
              <div class="col-lg-1 px-0 col-2">
                <button class="btn p-0" type="button"><img src="../../assets/images/plus.png"></button>
              </div>
            </div>
            <div class="row mx-0 my-2">
              <div class="col-3 text-center"><img class="img-info mb-2" src="../../assets/images/vision.png">
                <p class="mb-2">{{ item.viewport }}</p>
              </div>
              <div class="col-3 text-center"><img class="img-info mb-2" src="../../assets/images/length.png">
                <p class="mb-2">{{ item.length }}</p>
              </div>
              <div class="col-3 text-center"><img class="img-info mb-2" src="../../assets/images/speed.png">
                <p class="mb-2">{{ item.speedMultiplier }}</p>
              </div>
              <div class="col-3 text-center"><img class="img-info px-1 mb-2" src="../../assets/images/crook.png">
                <p class="mb-2">{{ item.twist }}</p>
              </div>
            </div>
            <div class="row mx-0 my-2">
              <div class="col-8 mx-auto px-1">
                <div class="d-grid hvr-bounce-in">
                  <button class="btn btn-sell" type="button" @click="withdraw(item.id)" :disabled="item.status === 'PENDING-WITHDRAW'">
                    <div class="text-radiant text-uppercase">Withdraw <span v-if="item.status === 'PENDING-WITHDRAW'">(process)</span></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <scroll-loader :loader-method="scrollLoad" :loader-disable="disable_load_more_snake"></scroll-loader>
  </div>
</template>

<script>
import ModalStep from "@/components/ModalStep";
import {mapState} from "vuex";
import Countdown from "@/components/Countdown";
import HealthProgressbar from "@/components/HealthProgressbar";
import {SC_NFTSnakeCBS} from "@/utils/config";

export default {
  name: 'WarehouseSnake',
  components: {
    ModalStep,
    Countdown,
    HealthProgressbar,
  },
  computed: {
    ...mapState(['account', 'wallet_connect', 'contract', 'metamask', 'warehouse', 'server']),
  },
  data() {
    return {
      snake_filters: {
        snake_type: 'ALL',
        page: 0,
        paginate: 12,
      },
      data_snake: {
        docs: [],
        chunk: [],
        total: 0,
      },
      sell_snake: {
        nft_id: null,
        snake_type: null,
        image: null,
        price: null,
      },
      snake_configs: [],
      disable_load_more_snake: true,
      step_detail: {
        step: 1,
        message: '',
      }
    }
  },
  mounted() {
    let vm = this;
    vm.getSnakeConfig();
  },
  methods: {
    frameSnakeType(snake_type) {
      switch (snake_type) {
        default:
          return require('../../assets/images/box-n.png');
        case 'HYDRA':
          return require('../../assets/images/box-r.png');
        case 'LORD':
          return require('../../assets/images/box-sr.png');
        case 'SHENRON':
          return require('../../assets/images/box-ssr.png');
      }
    },
    snakeImage(snake_type, skin_id) {
      return require(`../../assets/images/snakes/${snake_type}_${skin_id}.png`);
    },
    scrollLoad() {
      let vm = this;
      vm.$store.dispatch('warehouse/filterSnake', {
        page: ++vm.snake_filters.page,
        paginate: vm.snake_filters.paginate,
        snake_type: vm.snake_filters.snake_type,
      }).then(response => {
        let {success, data} = response;
        if (success) {
          vm.disable_load_more_snake = data.pages === 0 || data.pages === vm.snake_filters.page;
          vm.data_snake.docs = vm.data_snake.docs.concat(data.docs);
          vm.data_snake.chunk = _.chunk(vm.data_snake.docs, 4);
          vm.$forceUpdate();
        }
      })
    },
    getSnakeConfig() {
      let vm = this;
      vm.$store.dispatch('warehouse/snakeConfig').then(response => {
        let {success, data} = response;
        if (success) {
          vm.snake_configs = data;
          vm.scrollLoad();
        }
      })
    },
    getHealthHours(snake_type, skin_id) {
      let snake = _.find(this.snake_configs, snake => {
        return snake.skin_id === skin_id && snake.snake_type === snake_type;
      });
      if (snake) {
        return snake.health;
      }
      return 0;
    },
    sellSnake(snake_type, skin_id, nft_id) {
      let vm = this;
      vm.sell_snake = {
        nft_id,
        snake_type,
        image: require(`../../assets/images/snakes/${snake_type}_${skin_id}.png`),
        price: null,
      }
      $('#sell-modal').modal('show');
    },
    async withdraw(id) {
      let vm = this;
      // ping server
      if (vm.server.ping) {
        let {data, success} = await vm.$store.dispatch('server/ping');
        if (!success) {
          vm.error('Server is maintenance');
          return;
        } else if (!data) {
          vm.error('Server is maintenance');
          return;
        }
      } else {
        vm.error('Server is maintenance');
        return;
      }

      vm.step_detail = {
        step: 1,
        message: 'Withdraw Snake is processing',
      }
      $("#modalStep").modal('show');

      vm.$store.dispatch('warehouse/signWithdrawSnake', {id}).then(async response => {
        let {data, message, success} = response;
        let token_id = data.token_id;
        if (success) {
          let contract = await vm.$store.dispatch('contract/getContract', {
            contract_name: 'SC_COWS_GAME',
            signer: vm.account.wallet.signer,
          })
          vm.step_detail = {
            step: 2,
            message: 'Confirm withdraw Snake',
          }
          let withdrawNFT = null;
          try {
            if (token_id === null) {
              withdrawNFT = await contract.claimNFTRewards(SC_NFTSnakeCBS, 1, data.message, data.time_expired, data.signature);
            } else {
              withdrawNFT = await contract.withdrawNFTs(SC_NFTSnakeCBS, token_id, data.message, data.time_expired, data.signature);
            }
          } catch (e) {
            if (_.isNumber(e.code) && e.data) {
              vm.error(e.data.message)
            } else {
              vm.error(e.message)
            }
            $("#modalStep").modal('hide');
            return null;
          }
          if (withdrawNFT === null) {
            vm.error('Withdraw contract is fail');
            $("#modalStep").modal('hide');
            return null;
          }
          vm.step_detail = {
            step: 2,
            message: 'Confirm withdraw Snake success, please wait...',
          }
          await withdrawNFT.wait();
          vm.success('Withdraw success');
          $("#modalStep").modal('hide');

          setTimeout(async () => {
            vm.snake_filters.page = 0;
            vm.data_snake = {
              docs: [],
              chunk: [],
              total: 0,
            }
            await this.scrollLoad();
          }, 1200)
        } else {
          setTimeout(() => {
            vm.error(message);
            $("#modalStep").modal('hide');
          }, 500)
        }
      })
    },
  },
  watch: {
    'snake_filters.snake_type'() {
      this.snake_filters.page = 0;
      this.data_snake = {
        docs: [],
        chunk: [],
        total: 0,
      }
      this.scrollLoad();
    }
  }
}
</script>
