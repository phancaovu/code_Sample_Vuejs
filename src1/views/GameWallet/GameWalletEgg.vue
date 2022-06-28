<template>
  <div class="mywallet-content">
    <!-- step-modal -->
    <ModalStep :step_detail="step_detail"></ModalStep>

    <div class="rate-filter">
      <div class="row mx-0">
        <div class="col-md-9">
          <ul class="nav">
            <!--            <li class="nav-item" @click="egg_filters.snake_type = 'NAGA'">-->
            <!--              <a :class="`nav-link ${egg_filters.snake_type == 'NAGA' ? 'active' : ''}`" aria-current="page" href="javascript:void(0)">-->
            <!--                <div class="btn box-text me-1">N</div>-->
            <!--                <div class="box-check">-->
            <!--                  <img class="icon-check" src="../../assets/images/icon-check.png">-->
            <!--                </div>-->
            <!--              </a>-->
            <!--            </li>-->
            <!--            <li class="nav-item" @click="egg_filters.snake_type = 'HYDRA'">-->
            <!--              <a :class="`nav-link ${egg_filters.snake_type == 'HYDRA' ? 'active' : ''}`" aria-current="page" href="javascript:void(0)">-->
            <!--                <div class="btn box-text me-1">R</div>-->
            <!--                <div class="box-check">-->
            <!--                  <img class="icon-check" src="../../assets/images/icon-check.png">-->
            <!--                </div>-->
            <!--              </a>-->
            <!--            </li>-->
            <!--            <li class="nav-item" @click="egg_filters.snake_type = 'LORD'">-->
            <!--              <a :class="`nav-link ${egg_filters.snake_type == 'LORD' ? 'active' : ''}`" aria-current="page" href="javascript:void(0)">-->
            <!--                <div class="btn box-text me-1">sr</div>-->
            <!--                <div class="box-check">-->
            <!--                  <img class="icon-check" src="../../assets/images/icon-check.png">-->
            <!--                </div>-->
            <!--              </a>-->
            <!--            </li>-->
            <!--            <li class="nav-item" @click="egg_filters.snake_type = 'SHENRON'">-->
            <!--              <a :class="`nav-link ${egg_filters.snake_type == 'SHENRON' ? 'active' : ''}`" aria-current="page" href="javascript:void(0)">-->
            <!--                <div class="btn box-text me-1">ssr</div>-->
            <!--                <div class="box-check">-->
            <!--                  <img class="icon-check" src="../../assets/images/icon-check.png">-->
            <!--                </div>-->
            <!--              </a>-->
            <!--            </li>-->
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
              <img class="w-50" :src="eggImage(egg.snake_type,egg.skin_id)">
            </div>
            <div class="content-box-top-name">
              <div class="d-flex justify-content-center align-items-center">
                <div class="text-radiant text-uppercase text-center">{{ egg.snake_type }}</div>
                <div class="position-relative ms-2 snake-id">
                  <img class="w-100" src="../../assets/images/id-egg.png">
                  <div class="position-absolute top-50 start-50 translate-middle">Qty: {{ egg.count }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="content-box-bottom px-3 mt-auto">
            <div class="row mx-0 my-2">
              <div class="col-8 mx-auto px-1">
                <div class="d-grid hvr-bounce-in">
                  <button class="btn btn-sell" type="button" disabled>
                    <div class="text-radiant text-uppercase">Withdraw <span v-if="egg.status === 'PENDING-WITHDRAW'">(process)</span></div>
                  </button>
                  <!--                  <button class="btn btn-sell" type="button" @click="withdraw(egg.nft_id, egg.NFTDetail.token_id != null ? egg.NFTDetail.token_id : null)" :disabled="egg.status === 'PENDING-WITHDRAW'">-->
                  <!--                    <div class="text-radiant text-uppercase">Withdraw <span v-if="egg.status === 'PENDING-WITHDRAW'">(process)</span></div>-->
                  <!--                  </button>-->
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
import ModalStep from "@/components/ModalStep";
import {mapState} from "vuex";
import {SC_NFTEggCBS} from "@/utils/config";

export default {
  name: 'WarehouseEgg',
  computed: {
    ...mapState(['account', 'wallet_connect', 'contract', 'metamask', 'warehouse', 'server']),
  },
  components: {
    ModalStep
  },
  data() {
    return {
      egg_filters: {
        snake_type: 'UNICORN',
        page: 0,
        paginate: 12,
      },
      data_egg: {
        docs: [],
        chunk: [],
        total: 0,
      },
      disable_load_more_egg: false,
      step_detail: {
        step: 1,
        message: '',
      }
    }
  },
  methods: {
    eggImage(snake_type, skin_id) {
      return require(`../../assets/images/eggs/${snake_type}_${skin_id}.png`);
    },
    scrollLoad() {
      let vm = this;
      vm.$store.dispatch('warehouse/filterEgg', {
        page: ++vm.egg_filters.page,
        paginate: vm.egg_filters.paginate,
        snake_type: vm.egg_filters.snake_type,
      }).then(response => {
        let {success, data} = response;
        if (success) {
          vm.data_egg.docs = vm.data_egg.docs.concat(data);
          vm.data_egg.chunk = _.chunk(vm.data_egg.docs, 4);
          vm.$forceUpdate();
        }
      })
    },
    async withdraw(nft_id, token_id) {
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
        message: 'Withdraw Egg is processing',
      }
      $("#modalStep").modal('show');

      vm.$store.dispatch('warehouse/signWithdrawEgg', {
        nft_id,
        token_id
      }).then(async response => {
        let {data, message, success} = response
        if (success) {
          let contract = await vm.$store.dispatch('contract/getContract', {
            contract_name: 'SC_COWS_GAME',
            signer: vm.account.wallet.signer,
          })
          if (token_id !== null && token_id !== undefined && token_id > 0) {
            /**
             * If have token_id withdrawNFTs
             */
            try {
              vm.step_detail = {
                step: 2,
                message: 'Confirm withdraw Egg',
              }

              let withdrawNFT = await contract.withdrawNFTs(SC_NFTEggCBS, token_id, `Withdraw#NFTTokenId#${token_id}#${vm.account.detail.wallet_address}`, data.time_expired, data.signature);

              vm.step_detail = {
                step: 2,
                message: 'Confirm withdraw Egg success, please wait...',
              }
              await withdrawNFT.wait();
              vm.step_detail = {
                step: 3,
                message: 'Update detail Egg, please wait...',
              }

              vm.$store.dispatch('warehouse/checkWithdrawEgg', {
                transaction_hash: withdrawNFT.hash,
                nft_id
              }).then(response => {
                let {success, message, data} = response
                if (success) {
                  _.remove(vm.data_egg.docs, doc => {
                    return doc.nft_id === nft_id;
                  })
                  vm.data_egg.chunk = _.chunk(vm.data_egg.docs, 4);
                  vm.$forceUpdate()
                  vm.success(message)
                } else {
                  vm.error(message);
                }
                $("#modalStep").modal('hide');
              }).catch(e => {
                vm.error(e.message);
                $("#modalStep").modal('hide');
              })
            } catch (e) {
              if (_.isNumber(e.code) && e.data) {
                vm.error(e.data.message)
              } else {
                vm.error(e.message)
              }
              $("#modalStep").modal('hide');
            }
          } else {
            /**
             * else claimNFTRewards
             */
            try {
              vm.step_detail = {
                step: 2,
                message: 'Confirm withdraw Egg',
              }

              let withdrawNFT = await contract.claimNFTRewards(SC_NFTEggCBS, 1, `Withdraw#NFTId#${nft_id}#${vm.account.detail.wallet_address}`, data.time_expired, data.signature);

              vm.step_detail = {
                step: 2,
                message: 'Confirm withdraw Egg success, please wait...',
              }
              await withdrawNFT.wait();
              vm.step_detail = {
                step: 3,
                message: 'Update detail Egg, please wait...',
              }

              vm.$store.dispatch('warehouse/checkWithdrawEgg', {
                transaction_hash: withdrawNFT.hash,
                nft_id
              }).then(response => {
                let {success, message, data} = response
                if (success) {
                  _.remove(vm.data_egg.docs, doc => {
                    return doc.nft_id === nft_id;
                  })
                  vm.data_egg.chunk = _.chunk(vm.data_egg.docs, 4);
                  vm.$forceUpdate()
                  vm.success(message)
                } else {
                  vm.error(message);
                }
                $("#modalStep").modal('hide');
              }).catch(e => {
                vm.error(e.message);
                $("#modalStep").modal('hide');
              })
            } catch (e) {
              if (_.isNumber(e.code) && e.data) {
                vm.error(e.data.message)
              } else {
                vm.error(e.message)
              }
              $("#modalStep").modal('hide');
            }
          }
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
    'egg_filters.snake_type'() {
      this.egg_filters.page = 0;
      this.data_egg = {
        docs: [],
        chunk: [],
        total: 0,
      }
      this.scrollLoad();
    },
    'account.detail.wallet_address'() {
      this.scrollLoad();
    }
  }
}
</script>
