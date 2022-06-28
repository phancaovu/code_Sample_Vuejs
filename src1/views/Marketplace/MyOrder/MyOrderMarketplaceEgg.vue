<template>
  <div class="mywallet-content">
    <ModalStep :step_detail="step_detail"></ModalStep>

    <div class="rate-filter">
      <div class="row mx-0">
        <div class="col-md-9">
          <ul class="nav">
            <li class="nav-item" v-for="nft in nfts" @click="filters.nft = nft.nft; filters.type = nft.type">
              <a :class="`nav-link ${filters.nft === nft.nft ? 'active' : ''}`" aria-current="page" href="javascript:void(0)">
                <div class="btn box-text me-1">{{ nft.name }}</div>
                <div class="box-check">
                  <img class="icon-check" src="../../../assets/images/icon-check.png">
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div class="col-md-3 d-lg-flex align-items-center justify-content-end">
          <div class="d-lg-grid">
            <select class="form-select select-point" v-model="filters.sort">
              <option value="ASC">Lowest price</option>
              <option value="DESC">Highest price</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="row mx-0 my-2" v-if="filters.type === 'EGG'" v-for="eggs in data.chunk">
      <div class="col-md-6 col-lg-3 mb-3" v-for="egg in eggs">
        <div class="walltet-content-box py-4 d-flex align-items-start flex-column">
          <div class="content-box-top"><img class="w-100" src="../../../assets/images/eggs-box.png">
            <div class="content-box-top-eggs top-50 translate-middle-y text-center"><img class="w-50" :src="require('../../../assets/images/eggs/UNICORN_1.png')"></div>
            <div class="content-box-top-name">
              <div class="d-flex justify-content-center align-items-center">
                <div class="text-radiant text-uppercase text-center">UNICORN</div>
                <div class="position-relative ms-2 snake-id"><img class="w-100" src="../../../assets/images/id-egg.png">
                  <div class="position-absolute top-50 start-50 translate-middle">{{ egg['amount'] }}</div>
                </div>
              </div>
              <div class="d-flex justify-content-center align-items-center mt-1"><img class="snake-icon me-2" src="../../../assets/images/cowscoin.png">
                <div class="text-radiant text-uppercase text-center snake-price">{{ egg['price'] | money }}</div>
              </div>
            </div>
          </div>
          <div class="content-box-bottom px-3 mt-auto">
            <div class="row mx-0 my-2" v-if="egg['owner'] === account.detail.wallet_address">
              <div class="col-8 px-1 mx-auto">
                <div class="d-grid hvr-bounce-in">
                  <button class="btn btn-transfer" @click="cancelEgg(egg['saleId'])">
                    <div class="text-radiant text-uppercase">Cancel</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mx-0" v-if="filters.type === 'SNAKE'" v-for="snakes in data.chunk">
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
                <div class="position-relative ms-2 snake-id"><img class="w-100" src="../../../assets/images/id-egg.png">
                  <div class="position-absolute top-50 start-50 translate-middle">#{{ snake.transaction_id.result.tokenId }}</div>
                </div>
              </div>
              <div class="d-flex justify-content-center align-items-center mt-1"><img class="snake-icon me-2" src="../../../assets/images/cowscoin.png">
                <div class="text-radiant text-uppercase text-center snake-price">{{ snake.price | money('COWS') }}</div>
              </div>
            </div>
          </div>
          <div class="content-box-bottom px-3 mt-auto">
            <div class="row mx-0 my-2">
              <div class="col-3 text-center"><img class="img-info mb-2" src="../../../assets/images/vision.png">
                <p class="mb-2">{{ getConfig(snake.transaction_id.result.message, 'viewport') }}</p>
              </div>
              <div class="col-3 text-center"><img class="img-info mb-2" src="../../../assets/images/length.png">
                <p class="mb-2">{{ getConfig(snake.transaction_id.result.message, 'length') }}</p>
              </div>
              <div class="col-3 text-center"><img class="img-info mb-2" src="../../../assets/images/speed.png">
                <p class="mb-2">{{ getConfig(snake.transaction_id.result.message, 'speedMultiplier') }}</p>
              </div>
              <div class="col-3 text-center"><img class="img-info px-1 mb-2" src="../../../assets/images/crook.png">
                <p class="mb-2">{{ getConfig(snake.transaction_id.result.message, 'twist') }}</p>
              </div>
            </div>
            <div class="row mx-0 my-2">
              <div class="col-8 px-1 mx-auto">
                <div class="d-grid hvr-bounce-in">
                  <a class="btn btn-transfer" href="javascript:void(0)" @click="cancelSnake(snake.saleId)">
                    <div class="text-radiant text-uppercase">cancel</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mx-0" v-if="filters.type === 'PIECE'" v-for="pieces in data.chunk">
      <div class="col-md-6 col-lg-3 mb-3" v-for="piece in pieces">
        <div class="walltet-content-box py-4 d-flex align-items-start flex-column px-1">
          <div class="content-box-top"><img class="w-100" src="../../../assets/images/eggs-box.png">
            <div class="content-box-top-eggs top-50 translate-middle-y text-center">
              <img class="w-50" :src="parsePieceTypeImage(piece.transaction_id.result.message)">
            </div>
            <div class="content-box-top-name">
              <div class="d-flex justify-content-center align-items-center">
                <div class="text-radiant text-uppercase text-center">
                  {{ symbolSnake(parsePieceType(piece.transaction_id.result.message), parsePieceSkin(piece.transaction_id.result.message)) }}
                </div>
                <div class="position-relative ms-2 snake-id">
                  <img class="w-100" src="../../../assets/images/id-egg.png">
                  <div class="position-absolute top-50 start-50 translate-middle">{{ piece.amount }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="content-box-bottom px-3 mt-auto">
            <div class="row mx-0 my-2">
              <div class="col-8 mx-auto px-1">
                <div class="d-grid hvr-bounce-in">
                  <a class="btn btn-transfer" href="javascript:void(0)" @click="cancelPiece(piece.saleId)">
                    <div class="text-radiant text-uppercase">cancel</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <scroll-loader :loader-method="scrollLoad" :loader-disable="disable_load_more_egg"></scroll-loader>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {ethers} from 'ethers';
import ModalStep from "@/components/ModalStep";
import {SC_NFTEggCBS_1155, SC_NFTSnakeCBS} from "@/utils/config";
import * as config from "@/utils/config";

export default {
  name: 'MyOrderMarketplaceEgg',
  components: {
    ModalStep
  },
  computed: {
    ...mapState(['account', 'wallet_connect', 'contract', 'metamask', 'market']),
  },
  data() {
    return {
      filters: {
        nft: SC_NFTEggCBS_1155,
        type: 'EGG',
        page: 1,
        paginate: 12,
        sort: 'ASC',
      },
      data: {
        docs: [],
        chunk: [],
      },
      disable_load_more_egg: true,
      step_detail: {
        step: 1,
        message: 'Confirm cancel order'
      },
      snake_configs: [],
      nfts: [
        {name: 'Egg', type: 'EGG', nft: SC_NFTEggCBS_1155},
        {name: 'Snake', type: 'SNAKE', nft: SC_NFTSnakeCBS},
        {name: 'Piece', type: 'PIECE', nft: []}
      ]
    }
  },
  created() {
    let vm = this;
    vm.getSnakeConfig();
    setTimeout(() => {
      vm.scrollLoad();
    }, 1000)
  },
  methods: {
    pieceImage(snake_type, skin_id) {
      if (snake_type !== null && skin_id !== null)
        return require(`../../../assets/images/pieces/${snake_type}_${skin_id}.png`);
      return null
    },
    scrollLoad() {
      let vm = this;
      if (vm.account.detail.wallet_address) {
        let listNFT = [];
        let filters = null;
        if (vm.filters.type === 'PIECE') {
          for (let i = 1; i <= 17; i++) {
            listNFT.push(config[`SC_NEP_${i}`]);
          }
          filters = listNFT;
        } else {
          filters = vm.filters.nft
        }
        vm.$store.dispatch('market/listDataMarket', {
          nft: filters,
          owner: vm.account.detail.wallet_address,
          page: vm.filters.page++,
          sort: {
            price: vm.filters.sort
          }
        }).then(response => {
          let {success, data} = response;
          if (success) {
            vm.data.docs = vm.data.docs.concat(data.docs);
            vm.data.chunk = _.chunk(vm.data.docs, 4)
            vm.disable_load_more_egg = !data.hasNextPage;
          }
        }).catch(error => {
          vm.error(error.message);
        })
      }
    },
    toNumber(hex) {
      return ethers.BigNumber.from(hex).toString();
    },
    async cancelEgg(saleId) {
      let vm = this;
      let modal = $('#modalStep');
      vm.$store.dispatch('contract/getContract', {
        contract_name: 'SC_MARKET_EGG_1155',
        signer: vm.account.wallet.signer,
      }).then(async contract => {
        modal.modal('show');
        vm.step_detail = {
          step: 1,
          message: 'Confirm cancel order'
        }
        let cancel = await contract.cancelTokenSale(saleId.toString());

        vm.step_detail = {
          step: 1,
          message: 'Confirm cancel order success, please wait...'
        }
        await cancel.wait();

        vm.data = {
          docs: [],
          chunk: [],
        }
        await vm.scrollLoad();
        modal.modal('hide');

        vm.success('Cancel success');
      }).catch(e => {
        if (e.data) {
          vm.error(e.data.message);
        } else {
          vm.error(e.message);
        }
        modal.modal('hide');
        console.error(e);
      })
    },
    async cancelPiece(saleId) {
      let vm = this;
      let modal = $('#modalStep');
      vm.$store.dispatch('contract/getContract', {
        contract_name: 'SC_MARKET_EGG_1155',
        signer: vm.account.wallet.signer,
      }).then(async contract => {
        modal.modal('show');
        vm.step_detail = {
          step: 1,
          message: 'Confirm cancel order'
        }
        let cancel = await contract.cancelTokenSale(saleId.toString());

        vm.step_detail = {
          step: 1,
          message: 'Confirm cancel order success, please wait...'
        }
        await cancel.wait();

        vm.data = {
          docs: [],
          chunk: [],
        }
        await vm.scrollLoad();
        modal.modal('hide');

        vm.success('Cancel success');
      }).catch(e => {
        if (e.data) {
          vm.error(e.data.message);
        } else {
          vm.error(e.message);
        }
        modal.modal('hide');
        console.error(e);
      })
    },
    async cancelSnake(saleId) {
      let vm = this;

      let modal = $('#modalStep');
      modal.modal('show')
      vm.step_detail = {
        step: 1,
        message: 'Confirm cancel order'
      };
      let contractMarket = await vm.$store.dispatch('contract/getContract', {
        contract_name: 'SC_MARKET_SNAKE_721',
        signer: vm.account.wallet.signer,
      })

      try {
        let cancel = await contractMarket.cancelTokenSale(saleId.toString());

        vm.step_detail = {
          step: 1,
          message: 'Confirm cancel order success, please wait...'
        };
        await cancel.wait();

        _.remove(vm.data.docs, doc => {
          return doc.saleId == saleId;
        })
        vm.data.chunk = _.chunk(vm.data.docs, 4);

        vm.success('Cancel successfully');
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
          return require('../../../assets/images/box-n.png');
        case 'HYDRA':
          return require('../../../assets/images/box-r.png');
        case 'LORD':
          return require('../../../assets/images/box-sr.png');
        case 'SHENRON':
          return require('../../../assets/images/box-ssr.png');
      }
    },
    snakeImage(snake_type, skin_id) {
      return require(`../../../assets/images/snakes/${snake_type}_${skin_id}.png`);
    },
    parsePieceType(message) {
      let data = message.split('#');
      return data[1];
    },
    parsePieceSkin(message) {
      let data = message.split('#');
      return data[2];
    },
    parsePieceTypeImage(message) {
      let data = message.split('#');
      return this.pieceImage(data[1], data[2]);
    },
    parseSnakeTypeImage(message) {
      let data = message.split('#');
      return this.snakeImage(data[1], data[2]);
    },
    parseSnakeType(message) {
      let data = message.split('#');
      return data[1];
    },
    symbolSnake(snake_type, skin_id, prefix = '-') {
      let type = 'NEP';
      let snakes = [
        {snake_type: 'NAGA', skin_id: 1, id: 1},
        {snake_type: 'NAGA', skin_id: 8, id: 2},
        {snake_type: 'NAGA', skin_id: 9, id: 3},
        {snake_type: 'NAGA', skin_id: 10, id: 4},
        {snake_type: 'HYDRA', skin_id: 1, id: 5},
        {snake_type: 'HYDRA', skin_id: 2, id: 6},
        {snake_type: 'HYDRA', skin_id: 3, id: 7},
        {snake_type: 'HYDRA', skin_id: 4, id: 8},
        {snake_type: 'LORD', skin_id: 4, id: 9},
        {snake_type: 'LORD', skin_id: 5, id: 10},
        {snake_type: 'LORD', skin_id: 6, id: 11},
        {snake_type: 'LORD', skin_id: 7, id: 12},
        {snake_type: 'SHENRON', skin_id: 1, id: 13},
        {snake_type: 'SHENRON', skin_id: 2, id: 14},
        {snake_type: 'SHENRON', skin_id: 3, id: 15},
        {snake_type: 'SHENRON', skin_id: 4, id: 16},
        {snake_type: 'UNICORN', skin_id: 1, id: 17},
      ];
      let obj = _.find(snakes, snake => {
        return snake.snake_type === snake_type && snake.skin_id == skin_id;
      });

      if (obj) {
        return type + prefix + obj.id;
      }
      return type;
    },
  },
  watch: {
    'filters.nft'() {
      this.filters.page = 1;
      this.data = {
        docs: [],
        chunk: [],
      }
      this.$forceUpdate();
      this.scrollLoad();
    },
    'filters.sort'() {
      let vm = this;
      this.filters.page = 1;
      this.data = {
        docs: [],
        chunk: [],
      }
      vm.$forceUpdate();
      vm.scrollLoad();
    }
  }
}
</script>
