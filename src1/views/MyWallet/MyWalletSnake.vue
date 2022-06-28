<template>
  <div class="mywallet-content">
    <!-- sell-modal-->
    <div class="modal fade" id="sell-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content mywallet-modal">
          <div class="modal-header border-0">
            <h5 class="modal-title"></h5>
            <button class="btn" type="button" data-bs-dismiss="modal" aria-label="Close"><i class="fas fa-times fa-2x text-light"></i></button>
          </div>
          <div class="modal-body">
            <div class="row mx-0">
              <div class="col-6 offset-3 col-md-4 offset-md-4">
                <div class="position-relative snake-id">
                  <img class="w-100" src="../../assets/images/id-egg.png">
                  <div class="position-absolute top-50 start-50 translate-middle">#{{ sell_snake.nft_id }}</div>
                </div>
              </div>
            </div>
            <div class="row mx-0 my-3 text-center">
              <div class="col-6 offset-3"><img class="w-100" :src="sell_snake.image">
                <div class="text-radiant text-uppercase text-center">{{ sell_snake.snake_type }}</div>
              </div>
            </div>
            <div class="row mx-0 my-3">
              <div class="col-8 offset-2">
                <p class="text-center mb-1 text-warning">Input Price</p>
                <div class="input-group mb-3">
                  <input class="form-control text-center" type="number" v-model.number="sell_snake.price">
                </div>
                <div class="d-grid">
                  <button class="btn btn-submit mx-auto" type="button" @click="doSell">
                    <div class="text-radiant">Submit</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalStep :step_detail="step_detail"></ModalStep>

    <div class="rate-filter">
      <div class="row mx-0">
        <div class="col-md-9">
          <ul class="nav">
            <li class="nav-item" @click="snake_filters.snake_type = 'ALL'">
              <a :class="`nav-link ${snake_filters.snake_type === 'ALL' ? 'active' : ''}`" aria-current="page" href="javascript:void(0)">
                <div class="btn box-text me-1">ALL</div>
                <div class="box-check"><img class="icon-check" src="../../assets/images/icon-check.png"></div>
              </a>
            </li>
            <li class="nav-item" @click="snake_filters.snake_type = 'NAGA'">
              <a :class="`nav-link ${snake_filters.snake_type === 'NAGA' ? 'active' : ''}`" aria-current="page" href="javascript:void(0)">
                <div class="btn box-text me-1">N</div>
                <div class="box-check"><img class="icon-check" src="../../assets/images/icon-check.png"></div>
              </a>
            </li>
            <li class="nav-item" @click="snake_filters.snake_type = 'HYDRA'">
              <a :class="`nav-link ${snake_filters.snake_type === 'HYDRA' ? 'active' : ''}`" aria-current="page" href="javascript:void(0)">
                <div class="btn box-text me-1">R</div>
                <div class="box-check"><img class="icon-check" src="../../assets/images/icon-check.png"></div>
              </a>
            </li>
            <li class="nav-item" @click="snake_filters.snake_type = 'LORD'">
              <a :class="`nav-link ${snake_filters.snake_type === 'LORD' ? 'active' : ''}`" aria-current="page" href="javascript:void(0)">
                <div class="btn box-text me-1">sr</div>
                <div class="box-check"><img class="icon-check" src="../../assets/images/icon-check.png"></div>
              </a>
            </li>
            <li class="nav-item" @click="snake_filters.snake_type = 'SHENRON'">
              <a :class="`nav-link ${snake_filters.snake_type === 'SHENRON' ? 'active' : ''}`" aria-current="page" href="javascript:void(0)">
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
          <div class="content-box-top"><img class="w-100" :src="frameSnakeType(item.UserSnake.snake_type)">
            <div class="content-box-top-snake text-center"><img class="snake-img" :src="snakeImage(item.UserSnake.snake_type, item.UserSnake.skin_id)"></div>
            <div class="content-box-top-name">
              <div class="d-flex justify-content-center align-items-center">
                <div class="text-radiant text-uppercase text-center">{{ item.UserSnake.snake_type }}</div>
                <div class="position-relative ms-2 snake-id"><img class="w-100" src="../../assets/images/id-egg.png">
                  <div class="position-absolute top-50 start-50 translate-middle">#{{ item.token_id }}</div>
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
                  <HealthProgressbar :key="item.nft_id" :timestamp="item.UserSnake.eat_time" :health="getHealthHours(item.UserSnake.snake_type, item.UserSnake.skin_id)"></HealthProgressbar>
                </div>
                <p class="health-color text-center my-2">
                  <Countdown :timestamp="item.UserSnake.eat_time"></Countdown>
                </p>
              </div>
              <div class="col-lg-1 px-0 col-2">
                <button class="btn p-0" type="button"><img src="../../assets/images/plus.png"></button>
              </div>
            </div>
            <div class="row mx-0 my-2">
              <div class="col-3 text-center"><img class="img-info mb-2" src="../../assets/images/vision.png">
                <p class="mb-2">{{ item.UserSnake.viewport }}</p>
              </div>
              <div class="col-3 text-center"><img class="img-info mb-2" src="../../assets/images/length.png">
                <p class="mb-2">{{ item.UserSnake.length }}</p>
              </div>
              <div class="col-3 text-center"><img class="img-info mb-2" src="../../assets/images/speed.png">
                <p class="mb-2">{{ item.UserSnake.speedMultiplier }}</p>
              </div>
              <div class="col-3 text-center"><img class="img-info px-1 mb-2" src="../../assets/images/crook.png">
                <p class="mb-2">{{ item.UserSnake.twist }}</p>
              </div>
            </div>
            <div class="row mx-0 my-2">
              <div class="col-6 mx-auto px-1">
                <div class="d-grid hvr-bounce-in">
                  <button class="btn btn-sell" type="button" @click="sellSnake(item)">
                    <div class="text-radiant text-uppercase">SELL</div>
                  </button>
                </div>
              </div>
              <div class="col-6 mx-auto px-1">
                <div class="d-grid hvr-bounce-in">
                  <button class="btn btn-sell" type="button" @click="deposit(item.token_id)">
                    <div class="text-radiant text-uppercase">+ GAME</div>
                  </button>
                </div>
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
import Countdown from "@/components/Countdown";
import HealthProgressbar from "@/components/HealthProgressbar";
import {SC_COWS_GAME, SC_MARKET_SNAKE_721, SC_NFTSnakeCBS, SC_TOKEN} from "@/utils/config";
import ModalStep from "@/components/ModalStep";
import {ethers} from "ethers";

export default {
  name: 'MyWalletSnake',
  components: {
    Countdown,
    HealthProgressbar,
    ModalStep
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
        sort: 'RECENT',
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
        message: ''
      },
    }
  },
  created() {
    let vm = this;
    vm.loadNFTWallet();
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
    async loadNFTWallet() {
      let vm = this;
      if (!vm.account.detail.wallet_address) {
        return;
      }
      vm.getSnakeConfig();

      let contractGame = await vm.$store.dispatch('contract/getContract', {
        contract_name: 'SC_COWS_GAME',
        signer: vm.account.wallet.signer,
      })

      let totalNFTSnakeInWallet = await contractGame.getBalanceMyNFTWallet(vm.account.detail.wallet_address, SC_NFTSnakeCBS);
      totalNFTSnakeInWallet = totalNFTSnakeInWallet.toNumber()

      // get list token id in wallet
      let token_ids = []
      for (let i = 0; i < totalNFTSnakeInWallet; i++) {
        let response = await contractGame.getTokenidMyNFTWalletByIndex(vm.account.detail.wallet_address, SC_NFTSnakeCBS, i)
        token_ids.push(response[1].toNumber());
      }

      vm.$store.dispatch('mywallet/filterSnake', {
        token_ids: token_ids
      }).then(response => {
        let {success, data} = response;
        if (success) {
          vm.data_snake = {
            docs: data,
            chunk: [],
            total: 0,
          }
          vm.filter();
          vm.$forceUpdate();
        }
      })
    },
    filter() {
      let vm = this;
      let data = _.filter(vm.data_snake.docs, doc => {
        if (vm.snake_filters.snake_type === 'ALL') {
          return true;
        }
        return doc.UserSnake.snake_type === vm.snake_filters.snake_type;
      })
      vm.data_snake.chunk = _.chunk(data, 4);
      vm.$forceUpdate()
    },
    getSnakeConfig() {
      let vm = this;
      vm.$store.dispatch('warehouse/snakeConfig').then(response => {
        let {success, data} = response;
        if (success) {
          vm.snake_configs = data;
        }
      })
    },
    getHealthHours(snake_type, skin_id) {
      let snake = _.find(this.snake_configs, snake => {
        return snake.skin_id === skin_id && snake.snake_type === snake.snake_type;
      });
      if (snake) {
        return snake.health;
      }
      return 0;
    },
    sellSnake(detail) {
      let vm = this;
      vm.sell_snake = {
        nft_id: detail.token_id,
        snake_type: detail.UserSnake.snake_type,
        image: vm.snakeImage(detail.UserSnake.snake_type, detail.UserSnake.skin_id),
        price: 0,
      }
      vm.$forceUpdate();
      $('#sell-modal').modal('show');
    },
    async approveContractMarket721NFT() {
      let vm = this;
      vm.step_detail = {
        step: 1,
        message: 'Approve contract 721 to sell Snake.'
      }
      try {
        let contract = await vm.$store.dispatch('contract/getContract', {
          contract_name: 'SC_NFTSnakeCBS',
          signer: vm.account.wallet.signer,
        })
        let isApproveAll = await contract.isApprovedForAll(vm.account.detail.wallet_address, SC_MARKET_SNAKE_721);
        if (!isApproveAll) {
          let approve = await contract.setApprovalForAll(SC_MARKET_SNAKE_721, true);
          vm.step_detail = {
            step: 1,
            message: 'Approve contract 721 to sell Snake success, please wait...'
          }
          await approve.wait();
        }
        return true;
      } catch (e) {

        if (_.isNumber(e.code) && e.data) {
          vm.error(e.data.message)
        } else {
          vm.error(e.message)
        }
        return false;
      }
    },
    async doSell() {
      let vm = this;
      let contractMarket = await vm.$store.dispatch('contract/getContract', {
        contract_name: 'SC_MARKET_SNAKE_721',
        signer: vm.account.wallet.signer,
      })
      let minPrice = vm.formatEther(await contractMarket.minPrice());
      if (vm.sell_snake.price < minPrice) {
        vm.error('Price greater than ' + minPrice);
        return;
      }
      let modal = $('#modalStep');
      modal.modal('show');

      try {
        await vm.approveContractMarket721NFT();

        // get signature
        let signature_data = await vm.$store.dispatch('market/getSignSnake', {
          token_id: vm.sell_snake.nft_id
        })

        vm.step_detail = {
          step: 2,
          message: 'Confirm Sell Snake'
        }
        let sell = await contractMarket.setTokenSale(
            SC_NFTSnakeCBS, // nft
            vm.sell_snake.nft_id.toString(), // tokenId
            SC_TOKEN, //paymentToken
            ethers.utils.parseUnits(vm.sell_snake.price.toString()), // price
            signature_data.data.message,
            signature_data.data.time_expired,
            signature_data.data.signature,
        );

        await sell.wait();

        // reset data
        modal.modal('hide');
        vm.data_snake.docs = [];
        await vm.loadNFTWallet();
        $('#sell-modal').modal('hide');

        vm.sell_snake = {
          nft_id: null,
          snake_type: null,
          image: null,
          price: null,
        }
      } catch (e) {
        modal.modal('hide');
        if (_.isNumber(e.code) && e.data) {
          vm.error(e.data.message)
        } else {
          vm.error(e.message)
        }
      }
    },
    async approve() {
      let vm = this;
      // check approveAll
      let contract_snake = await vm.$store.dispatch('contract/getContract', {
        signer: vm.account.wallet.signer,
        contract_name: 'SC_NFTSnakeCBS'
      });

      let result = await contract_snake.isApprovedForAll(vm.account.detail.wallet_address, SC_COWS_GAME);
      if (!result) {
        vm.step_detail = {
          step: 1,
          message: 'Approve contract to deposit Snake to Game, please wait...'
        }
        let approveContract = await contract_snake.setApprovalForAll(SC_COWS_GAME, true);
        await approveContract.wait();
      }
      return true;
    },
    async deposit(token_id) {
      let vm = this;
      let modal = $('#modalStep');
      modal.modal('show');
      try {
        let contract_cows_game = await vm.$store.dispatch('contract/getContract', {
          signer: vm.account.wallet.signer,
          contract_name: 'SC_COWS_GAME'
        });

        await vm.approve();

        vm.step_detail = {
          step: 2,
          message: `Confirm deposit Token ${token_id} to Game`
        }

        let depositSnake = await contract_cows_game.depositNFTsToGame(SC_NFTSnakeCBS, token_id);

        vm.step_detail = {
          step: 2,
          message: `Deposit Token ${token_id} to Game, please wait...`
        }

        await depositSnake.wait();

        vm.step_detail = {
          step: 3,
          message: `NFT identification ${token_id} in progress, please wait...`
        }

        // done
        vm.success('Deposit success, please wait 3-5 minutes to update in game');
        _.remove(vm.data_snake.docs, doc => {
          return doc.token_id === token_id;
        })
        vm.data_snake.chunk = _.chunk(vm.data_snake.docs, 4);
        vm.$forceUpdate();
        modal.modal('hide');

        setTimeout(() => {
          vm.step_detail = {
            step: 1,
            message: 'Approve contract to deposit Snake to Game'
          }
        }, 1200)
      } catch (e) {
        modal.modal('hide')
        vm.error(e.message);
      }
    },
    formatEther(value) {
      if (value !== undefined && value !== null) {
        return Number(ethers.utils.formatEther(ethers.BigNumber.from(value).toString()));
      }
      return 0;
    }
  },
  watch: {
    'account.detail.wallet_address'() {
      let vm = this;
      vm.loadNFTWallet();
    },
    'snake_filters.snake_type'() {
      let vm = this;
      vm.filter();
    }
  }
}
</script>
