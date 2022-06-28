<template>
  <div class="mywallet-content">
    <ModalStep :step_detail="step_detail"></ModalStep>

    <div class="rate-filter">
      <div class="row mx-0">
        <div class="col-md-9">
          <ul class="nav">
            <li class="nav-item" @click="snake_filters.snake_type = 'ALL'">
              <a :class="`nav-link ${snake_filters.snake_type === 'ALL' ? 'active' : ''}`" aria-current="page" href="javascript:void(0)">
                <div class="btn box-text me-1">ALL</div>
                <div class="box-check">
                  <img class="icon-check" src="../../assets/images/icon-check.png">
                </div>
              </a>
            </li>
            <li class="nav-item" @click="snake_filters.snake_type = 'NAGA'">
              <a :class="`nav-link ${snake_filters.snake_type === 'NAGA' ? 'active' : ''}`" aria-current="page" href="javascript:void(0)">
                <div class="btn box-text me-1">N</div>
                <div class="box-check">
                  <img class="icon-check" src="../../assets/images/icon-check.png">
                </div>
              </a>
            </li>
            <li class="nav-item" @click="snake_filters.snake_type = 'HYDRA'">
              <a :class="`nav-link ${snake_filters.snake_type === 'HYDRA' ? 'active' : ''}`" aria-current="page" href="javascript:void(0)">
                <div class="btn box-text me-1">R</div>
                <div class="box-check">
                  <img class="icon-check" src="../../assets/images/icon-check.png">
                </div>
              </a>
            </li>
            <li class="nav-item" @click="snake_filters.snake_type = 'LORD'">
              <a :class="`nav-link ${snake_filters.snake_type === 'LORD' ? 'active' : ''}`" aria-current="page" href="javascript:void(0)">
                <div class="btn box-text me-1">sr</div>
                <div class="box-check">
                  <img class="icon-check" src="../../assets/images/icon-check.png">
                </div>
              </a>
            </li>
            <li class="nav-item" @click="snake_filters.snake_type = 'SHENRON'">
              <a :class="`nav-link ${snake_filters.snake_type === 'SHENRON' ? 'active' : ''}`" aria-current="page" href="javascript:void(0)">
                <div class="btn box-text me-1">ssr</div>
                <div class="box-check">
                  <img class="icon-check" src="../../assets/images/icon-check.png">
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div class="col-md-3 d-lg-flex align-items-center justify-content-end">
          <div class="d-lg-grid">
            <select class="form-select select-point" v-model="snake_filters.sort">
              <option value="RECENT">Recently list</option>
              <option value="ASC">Lowest price</option>
              <option value="DESC">Highest price</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="row mx-0" v-for="snakes in data_snake.chunk">
      <div class="col-md-6 col-lg-3 mb-3" v-for="snake in snakes">
        <div class="walltet-content-box py-4 d-flex align-items-start flex-column">
          <div class="content-box-top">
            <img class="w-100" :src="frameSnakeType(parseSnakeType(snake.transaction_id.result.message))">
            <div class="content-box-top-snake text-center">
              <img class="snake-img" :src="parseSnakeTypeImage(snake.transaction_id.result.message)">
            </div>
            <div class="content-box-top-name">
              <div class="d-flex justify-content-center align-items-center">
                <div class="text-radiant text-uppercase text-center">{{ parseSnakeType(snake.transaction_id.result.message) }}</div>
                <div class="position-relative ms-2 snake-id"><img class="w-100" src="../../assets/images/id-egg.png">
                  <div class="position-absolute top-50 start-50 translate-middle">#{{ snake.transaction_id.result.tokenId }}</div>
                </div>
              </div>
              <div class="d-flex justify-content-center align-items-center mt-1"><img class="snake-icon me-2" src="../../assets/images/cowscoin.png">
                <div class="text-radiant text-uppercase text-center snake-price">{{ snake.price | money('COWS') }}</div>
              </div>
            </div>
          </div>
          <div class="content-box-bottom px-3 mt-auto">
            <div class="row mx-0 my-2">
              <div class="col-3 text-center"><img class="img-info mb-2" src="../../assets/images/vision.png">
                <p class="mb-2">{{ getConfig(snake.transaction_id.result.message, 'viewport') }}</p>
              </div>
              <div class="col-3 text-center"><img class="img-info mb-2" src="../../assets/images/length.png">
                <p class="mb-2">{{ getConfig(snake.transaction_id.result.message, 'length') }}</p>
              </div>
              <div class="col-3 text-center"><img class="img-info mb-2" src="../../assets/images/speed.png">
                <p class="mb-2">{{ getConfig(snake.transaction_id.result.message, 'speedMultiplier') }}</p>
              </div>
              <div class="col-3 text-center"><img class="img-info px-1 mb-2" src="../../assets/images/crook.png">
                <p class="mb-2">{{ getConfig(snake.transaction_id.result.message, 'twist') }}</p>
              </div>
            </div>
            <div class="row mx-0 my-2">
              <div class="col-8 px-1 mx-auto">
                <div class="d-grid hvr-bounce-in">
                  <a class="btn btn-transfer" v-if="snake.owner !== account.detail.wallet_address" href="javascript:void(0)" @click="buy(snake.transaction_id.result.tokenId, snake.saleId, snake.paymentToken, snake.price)">
                    <div class="text-radiant text-uppercase">buy now</div>
                  </a>
                  <!--                  <a class="btn btn-transfer" v-if="snake.owner === account.detail.wallet_address" href="javascript:void(0)" @click="cancel(snake.saleId)">-->
                  <!--                    <div class="text-radiant text-uppercase">cancel</div>-->
                  <!--                  </a>-->
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
import {mapState} from "vuex";
import {SC_MARKET_SNAKE_721, SC_NFTSnakeCBS} from "@/utils/config";
import {ethers} from "ethers";
import ModalStep from "@/components/ModalStep";

export default {
  name: 'MarketplaceSnake',
  components: {
    ModalStep
  },
  computed: {
    ...mapState(['account', 'wallet_connect', 'contract', 'metamask', 'market']),
  },
  data() {
    return {
      snake_filters: {
        snake_type: 'ALL',
        page: 1,
        paginate: 12,
        sort: 'RECENT',
      },
      data_snake: {
        docs: [],
        chunk: [],
      },
      step_detail: {
        step: 1,
        message: ''
      },
      disable_load_more_snake: true,
      snake_configs: [],
    }
  },
  created() {
    let vm = this;
    vm.getSnakeConfig();
  },
  mounted() {
    let vm = this;
  },
  methods: {
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
    getConfig(message, property) {
      let snake_type, skin_id = null;
      let data = message.split('#');
      snake_type = data[1];
      skin_id = data[2];
      let vm = this;
      if (vm.snake_configs.length === 0) {
        return 0
      }
      return _.find(vm.snake_configs, config => {
        return config.snake_type === snake_type && config.skin_id === Number(skin_id);
      })[property];
    },
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
      try {
        return require(`../../assets/images/snakes/${snake_type}_${skin_id}.png`);
      } catch (e) {
        return null
      }
    },
    scrollLoad() {
      let vm = this;

      let sortPayload = '';
      if (vm.snake_filters.sort === 'RECENT') {
        sortPayload = {
          _id: 'DESC'
        }
      } else {
        sortPayload = {
          price: vm.snake_filters.sort
        }
      }

      vm.$store.dispatch('market/listDataMarket', {
        page: vm.snake_filters.page++,
        nft: SC_NFTSnakeCBS,
        sort: sortPayload,
      }).then(response => {
        let {success, data} = response;
        if (success) {
          vm.disable_load_more_snake = !data.hasNextPage;
          vm.data_snake.docs = vm.data_snake.docs.concat(data.docs);
          for (let i = 0; i < vm.data_snake.docs.length; i++) {
            _.remove(vm.data_snake.docs, doc => {
              if (vm.snake_filters.snake_type === 'ALL') {
                return false;
              }
              return vm.parseSnakeType(doc.transaction_id.result.message) !== vm.snake_filters.snake_type;
            })
          }
          vm.data_snake.chunk = _.chunk(vm.data_snake.docs, 4);
          vm.$forceUpdate();
        }
      })
    },
    async approveContractMarketUseToken(paymentTokenAddress, amount, price) {
      let vm = this;
      let modal = $('#modalStep');
      try {
        vm.step_detail = {
          step: 2,
          message: 'Approve contract market use token to buy Snake.'
        }

        let contract = await vm.$store.dispatch('contract/getOtherContract', {
          address: paymentTokenAddress,
          signer: vm.account.wallet.signer
        });

        let getAllowance = vm.formatEther(await contract.allowance(vm.account.detail.wallet_address, SC_MARKET_SNAKE_721));

        if (amount * price > getAllowance) {
          let approve = await contract.approve(SC_MARKET_SNAKE_721, vm.toEther(String(amount * price)));
          vm.step_detail = {
            step: 2,
            message: 'Approve contract market use token to buy Snake success, please wait...'
          }
          await approve.wait()
        }
        return true;
      } catch (e) {
        modal.modal('hide');
        if (_.isNumber(e.code) && e.data) {
          vm.error(e.data.message)
        } else {
          vm.error(e.message)
        }
        return false;
      }
    },
    async buy(token_id, saleId, paymentToken, price) {
      let vm = this;
      let modal = $('#modalStep');
      modal.modal('show')

      await vm.approveContractMarketUseToken(paymentToken, 1, price)

      // get signature
      let signature_data = await vm.$store.dispatch('market/getSignSnake', {
        token_id
      })

      let contractMarket = await vm.$store.dispatch('contract/getContract', {
        contract_name: 'SC_MARKET_SNAKE_721',
        signer: vm.account.wallet.signer,
      })

      vm.step_detail = {
        step: 2,
        message: 'Confirm Buy Snake'
      }

      try {
        let buy = await contractMarket.buyNFT(
            saleId.toString(), // nft
            signature_data.data.message,
            signature_data.data.time_expired,
            signature_data.data.signature,
        );

        await buy.wait();

        _.remove(vm.data_snake.docs, doc => {
          return doc.saleId == saleId;
        })
        vm.data_snake.chunk = _.chunk(vm.data_snake.docs, 4);

        vm.success('Buy successfully');
        modal.modal('hide')

      } catch (e) {
        if (_.isNumber(e.code) && e.data) {
          vm.error(e.data.message)
        } else {
          vm.error(e.message)
        }
        modal.modal('hide')
      }
    },
    parseSnakeTypeImage(message) {
      let data = message.split('#');
      return this.snakeImage(data[1], data[2]);
    },
    parseSnakeType(message) {
      let data = message.split('#');
      return data[1];
    },
    isShow(message) {
      let vm = this;
      if (vm.snake_filters.snake_type === 'ALL') {
        return true;
      }
      let snake_type = vm.parseSnakeType(message);
      return vm.snake_filters.snake_type === snake_type;
    },
    toNumber(hex) {
      if (!hex) {
        return '0';
      }
      return Number(ethers.BigNumber.from(hex));
    },
    toEther(value) {
      return ethers.utils.parseUnits(value);
    },
    formatEther(value) {
      if (value !== undefined && value !== null) {
        return Number(ethers.utils.formatEther(ethers.BigNumber.from(value).toString()));
      }
      return 0;
    },
  },
  watch: {
    'snake_filters.snake_type'() {
      this.snake_filters.page = 1;
      this.data_snake = {
        docs: [],
        chunk: [],
      }
      this.scrollLoad();
    },
    'snake_filters.sort'() {
      let vm = this;
      this.snake_filters.page = 1;
      this.data_snake = {
        docs: [],
        chunk: [],
      }
      vm.$forceUpdate();
      vm.scrollLoad();
    }
  }
}
</script>
