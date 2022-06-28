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
                <div class="position-relative snake-id"><img class="w-100" src="../../assets/images/id-egg.png">
                  <div class="position-absolute top-50 start-50 translate-middle">#{{ sell_egg.nft_id }}</div>
                </div>
              </div>
            </div>
            <div class="row mx-0 my-3">
              <div class="col-6 offset-3">
                <div class="position-relative"><img class="w-100" :src="sell_egg.image"></div>
                <div class="text-radiant text-uppercase text-center">{{ sell_egg.snake_type }}</div>
              </div>
            </div>
            <div class="row mx-0 my-3">
              <div class="col-8 offset-2">
                <p class="text-center mb-1 text-warning">Input Price</p>
                <div class="input-group mb-3">
                  <input class="form-control" type="text" v-model.number="sell_egg.price">
                </div>
                <div class="d-grid">
                  <button class="btn btn-submit mx-auto" type="submit" @click="doSell">
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
            <li class="nav-item" @click="egg_filters.snake_type = 'NAGA'">
              <a :class="`nav-link ${egg_filters.snake_type == 'NAGA' ? 'active' : ''}`" aria-current="page" href="javascript:void(0)">
                <div class="btn box-text me-1">N</div>
                <div class="box-check">
                  <img class="icon-check" src="../../assets/images/icon-check.png">
                </div>
              </a>
            </li>
            <li class="nav-item" @click="egg_filters.snake_type = 'HYDRA'">
              <a :class="`nav-link ${egg_filters.snake_type == 'HYDRA' ? 'active' : ''}`" aria-current="page" href="javascript:void(0)">
                <div class="btn box-text me-1">R</div>
                <div class="box-check">
                  <img class="icon-check" src="../../assets/images/icon-check.png">
                </div>
              </a>
            </li>
            <li class="nav-item" @click="egg_filters.snake_type = 'LORD'">
              <a :class="`nav-link ${egg_filters.snake_type == 'LORD' ? 'active' : ''}`" aria-current="page" href="javascript:void(0)">
                <div class="btn box-text me-1">sr</div>
                <div class="box-check">
                  <img class="icon-check" src="../../assets/images/icon-check.png">
                </div>
              </a>
            </li>
            <li class="nav-item" @click="egg_filters.snake_type = 'SHENRON'">
              <a :class="`nav-link ${egg_filters.snake_type == 'SHENRON' ? 'active' : ''}`" aria-current="page" href="javascript:void(0)">
                <div class="btn box-text me-1">ssr</div>
                <div class="box-check">
                  <img class="icon-check" src="../../assets/images/icon-check.png">
                </div>
              </a>
            </li>
            <li class="nav-item" @click="egg_filters.snake_type = 'UNICORN'">
              <a :class="`nav-link ${egg_filters.snake_type == 'UNICORN' ? 'active' : ''}`" aria-current="page" href="javascript:void(0)">
                <div class="btn box-text me-1">uni</div>
                <div class="box-check">
                  <img class="icon-check" src="../../assets/images/icon-check.png">
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div class="col-md-3 d-lg-flex align-items-center justify-content-end">
          <!--                    <div class="d-lg-grid">-->
          <!--                      <select class="form-select select-point" aria-label="Default select example">-->
          <!--                        <option selected="">Lowest price</option>-->
          <!--                        <option value="1">One</option>-->
          <!--                        <option value="2">Two</option>-->
          <!--                        <option value="3">Three</option>-->
          <!--                      </select>-->
          <!--                    </div>-->
        </div>
      </div>
    </div>

    <div class="row mx-0" v-for="eggs in data_egg.chunk">
      <div class="col-md-6 col-lg-3 mb-3" v-for="egg in eggs">
        <div class="walltet-content-box py-4 d-flex align-items-start flex-column px-1">
          <div class="content-box-top">
            <img class="w-100" src="../../assets/images/eggs-box.png">
            <div class="content-box-top-eggs top-50 translate-middle-y text-center">
              <img class="w-50" :src="eggImage(egg.UserEgg.snake_type,egg.UserEgg.skin_id)">
            </div>
            <div class="content-box-top-name">
              <div class="d-flex justify-content-center align-items-center">
                <div class="text-radiant text-uppercase text-center">{{ egg.UserEgg.snake_type }}</div>
                <div class="position-relative ms-2 snake-id">
                  <img class="w-100" src="../../assets/images/id-egg.png">
                  <div class="position-absolute top-50 start-50 translate-middle">#{{ egg.token_id }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="content-box-bottom px-3 mt-auto">
            <div class="row mx-0 my-2">
              <div class="col-6 mx-auto px-1">
                <div class="d-grid hvr-bounce-in">
                  <button class="btn btn-sell" type="button" disabled>
                    <div class="text-radiant text-uppercase">SELL</div>
                  </button>
                </div>
              </div>
              <div class="col-6 mx-auto px-1">
                <div class="d-grid hvr-bounce-in">
                  <button class="btn btn-sell" type="button" @click="deposit(egg.token_id)">
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
import {SC_NFTEggCBS, SC_COWS_GAME} from "@/utils/config";
import ModalStep from "@/components/ModalStep";

export default {
  name: 'MyWalletEgg',
  computed: {
    ...mapState(['account', 'wallet_connect', 'contract', 'metamask', 'warehouse', 'server']),
  },
  components: {
    ModalStep
  },
  data() {
    return {
      egg_filters: {
        snake_type: 'NAGA',
        page: 0,
        paginate: 12,
      },
      data_egg: {
        docs: [],
        chunk: [],
        total: 0,
      },
      sell_egg: {
        nft_id: null,
        snake_type: null,
        image: null,
        price: null,
      },
      step_detail: {
        step: 1,
        message: 'Approve contract to deposit Egg to Game'
      }
    }
  },
  created() {
    let vm = this;
    vm.loadNFTWallet();
  },
  methods: {
    eggImage(snake_type, skin_id) {
      return require(`../../assets/images/eggs/${snake_type}_${skin_id}.png`);
    },
    async loadNFTWallet() {
      let vm = this;
      if (!vm.account.detail.wallet_address) {
        return;
      }

      let contractGame = await vm.$store.dispatch('contract/getContract', {
        contract_name: 'SC_COWS_GAME',
        signer: vm.account.wallet.signer,
      })

      let totalNFTEggInWallet = await contractGame.getBalanceMyNFTWallet(vm.account.detail.wallet_address, SC_NFTEggCBS);
      totalNFTEggInWallet = totalNFTEggInWallet.toNumber()

      // get list token id in wallet
      let token_ids = []
      for (let i = 0; i < totalNFTEggInWallet; i++) {
        let response = await contractGame.getTokenidMyNFTWalletByIndex(vm.account.detail.wallet_address, SC_NFTEggCBS, i)
        token_ids.push(response[1].toNumber());
      }

      vm.$store.dispatch('mywallet/filterEgg', {
        token_ids: token_ids
      }).then(response => {
        let {success, data} = response;
        if (success) {
          vm.data_egg = {
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
      let data = _.filter(vm.data_egg.docs, doc => {
        return doc.UserEgg.snake_type === vm.egg_filters.snake_type;
      })
      vm.data_egg.chunk = _.chunk(data, 4);
      vm.$forceUpdate()
    },
    sellEgg(snake_type, skin_id, nft_id) {
      let vm = this;
      vm.sell_egg = {
        nft_id,
        image: require(`../../assets/images/eggs/${snake_type}_${skin_id}.png`),
        price: null,
        snake_type: snake_type,
      }
      $('#sell-modal').modal('show');
    },
    doSell() {
      let vm = this;
      vm.$store.dispatch('market/sellProduct', {
        type: 'EGG',
        nft_id: vm.sell_egg.nft_id,
        price: vm.sell_egg.price
      }).then(response => {
        let {data, success, message} = response;
        if (success) {
          vm.success(message)
          $('#sell-modal').modal('hide');
          _.forEach(vm.data_egg.docs, item => {
            if (item.nft_id === vm.sell_egg.nft_id) {
              item.Orders.push(data);
              vm.data_egg.chunk = _.chunk(vm.data_egg.docs, 4);
            }
          })
        } else {
          vm.error(message);
        }
        vm.$forceUpdate();
      })
    },
    async deposit(token_id) {
      let vm = this;
      let checkToken = vm.$store.dispatch('account/checkTokenAlive');
      if (!checkToken) {
        vm.error('Please logout and login again to deposit Egg')
        return;
      }

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

      let modal = $('#modalStep');
      try {
        modal.modal('show')
        let contract_egg = await vm.$store.dispatch('contract/getContract', {
          signer: vm.account.wallet.signer,
          contract_name: 'SC_NFTEggCBS'
        });

        let contract_cows_game = await vm.$store.dispatch('contract/getContract', {
          signer: vm.account.wallet.signer,
          contract_name: 'SC_COWS_GAME'
        });

        let approveContract = await contract_egg.approve(SC_COWS_GAME, token_id);
        vm.step_detail = {
          step: 1,
          message: 'Approve contract to deposit Egg to Game, please wait...'
        }
        await approveContract.wait()

        vm.step_detail = {
          step: 2,
          message: `Approve contract success, please Confirm deposit Token ${token_id} to Game`
        }

        let depositUnicornEgg = await contract_cows_game.depositNFTsToGame(SC_NFTEggCBS, token_id);

        vm.step_detail = {
          step: 2,
          message: `Deposit Token ${token_id} to Game, please wait...`
        }

        await depositUnicornEgg.wait();

        vm.step_detail = {
          step: 3,
          message: `NFT identification ${token_id} in progress, please wait...`
        }

        // done
        vm.$store.dispatch('mywallet/depositEgg', {
          transaction_hash: depositUnicornEgg.hash,
        }).then(response => {
          let {success, message} = response;
          if (success) {
            vm.success(message);
            _.remove(vm.data_egg.docs, doc => {
              return doc.token_id === token_id;
            })
            vm.data_egg.chunk = _.chunk(vm.data_egg.docs, 4);
            vm.$forceUpdate();
            modal.modal('hide');
          } else {
            vm.error(message);
          }

          setTimeout(() => {
            vm.step_detail = {
              step: 1,
              message: 'Approve contract to deposit Egg to Game'
            }
          }, 1200)
        })
      } catch (e) {
        modal.modal('hide')
        vm.error(e.message);
      }
    },
  },
  watch: {
    'account.detail.wallet_address'() {
      let vm = this;
      vm.loadNFTWallet();
    },
    'egg_filters.snake_type'() {
      let vm = this;
      vm.filter();
    }
  }
}
</script>
