<template>
  <div class="mywallet-content">
    <!-- withdraw-modal -->
    <div class="modal fade" id="withdrawModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                  <div class="position-absolute top-50 start-50 translate-middle">#{{ claim_detail.token_id }}</div>
                </div>
              </div>
            </div>
            <div class="row mx-0 my-3">
              <div class="col-6 offset-3">
                <div class="position-relative"><img class="w-100" :src="eggImage(claim_detail.snake_type,claim_detail.skin_id)"></div>
                <div class="text-radiant text-uppercase text-center">{{ claim_detail.snake_type }}</div>
              </div>
            </div>
            <div class="row mx-0 my-3">
              <div class="col-8 offset-2">
                <p class="text-center mb-1 text-warning">Input amount withdraw</p>
                <div class="input-group mb-3">
                  <input class="form-control" type="text" v-model.number="claim_detail.amount">
                </div>
                <div class="d-grid">
                  <button class="btn btn-submit mx-auto" type="button" @click="withdraw" :disabled="claim_detail.disable_withdraw_btn">
                    <div class="text-radiant">Submit</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- step-modal -->
    <ModalStep :step_detail="step_detail"></ModalStep>

    <!--    <div class="rate-filter">-->
    <!--      <div class="row mx-0">-->
    <!--        <div class="col-md-9">-->
    <!--          <ul class="nav">-->
    <!--            <li class="nav-item" @click="egg_filters.snake_type = 'UNICORN'">-->
    <!--              <a :class="`nav-link ${egg_filters.snake_type == 'UNICORN' ? 'active' : ''}`" aria-current="page" href="javascript:void(0)">-->
    <!--                <div class="btn box-text me-1">uni</div>-->
    <!--                <div class="box-check">-->
    <!--                  <img class="icon-check" src="../../assets/images/icon-check.png">-->
    <!--                </div>-->
    <!--              </a>-->
    <!--            </li>-->
    <!--          </ul>-->
    <!--        </div>-->
    <!--        <div class="col-md-3 d-lg-flex align-items-center justify-content-end">-->
    <!--          &lt;!&ndash;                    <div class="d-lg-grid">&ndash;&gt;-->
    <!--          &lt;!&ndash;                      <select class="form-select select-point" aria-label="Default select example">&ndash;&gt;-->
    <!--          &lt;!&ndash;                        <option selected="">Lowest price</option>&ndash;&gt;-->
    <!--          &lt;!&ndash;                        <option value="1">One</option>&ndash;&gt;-->
    <!--          &lt;!&ndash;                        <option value="2">Two</option>&ndash;&gt;-->
    <!--          &lt;!&ndash;                        <option value="3">Three</option>&ndash;&gt;-->
    <!--          &lt;!&ndash;                      </select>&ndash;&gt;-->
    <!--          &lt;!&ndash;                    </div>&ndash;&gt;-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="row mx-0 my-2" v-for="eggs in data_egg.chunk">
      <div class="col-md-6 col-lg-3 mb-3" v-for="egg in eggs">
        <div class="walltet-content-box py-4 d-flex align-items-start flex-column px-1">
          <div class="content-box-top">
            <img class="w-100" src="../../assets/images/eggs-box.png">
            <div class="content-box-top-eggs top-50 translate-middle-y text-center">
              <img class="w-50" :src="eggImage(egg.snake_type,egg.skin_id)">
            </div>
            <div class="content-box-top-name">
              <div class="d-flex justify-content-center align-items-center">
                <div class="text-radiant text-uppercase text-center">{{ egg.snake_type[0] }}-{{ egg.skin_id }}</div>
                <div class="position-relative ms-2 snake-id">
                  <img class="w-100" src="../../assets/images/id-egg.png">
                  <div class="position-absolute top-50 start-50 translate-middle">{{ egg.count }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="content-box-bottom px-3 mt-auto">
            <div class="row mx-0 my-2">
              <div class="col-8 mx-auto px-1">
                <div class="d-grid hvr-bounce-in">
                  <button class="btn btn-sell" type="button" @click="updateDetailClaim(egg)">
                    <div class="text-radiant text-uppercase">Withdraw</div>
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
import {SC_NFTEggCBS_1155} from "@/utils/config";

export default {
  name: 'WarehouseEgg1155',
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
        page: 1,
        paginate: 12,
      },
      data_egg: {
        docs: [],
        chunk: [],
        total: 0,
      },
      claim_detail: {
        snake_type: 'UNICORN',
        skin_id: 1,
        amount: 1,
        token_id: 0,
        disable_withdraw_btn: false,
      },
      step_detail: {
        step: 1,
        message: '',
      }
    }
  },
  mounted() {
    let vm = this;
    vm.scrollLoad();
  },
  methods: {
    eggImage(snake_type, skin_id) {
      return require(`../../assets/images/eggs/${snake_type}_${skin_id}.png`);
    },
    scrollLoad() {
      let vm = this;
      if (vm.account.detail.wallet_address) {
        vm.$store.dispatch('warehouse/filterEgg', {
          page: vm.egg_filters.page++,
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
      }
    },
    updateDetailClaim(item) {
      let vm = this
      if (item.NFTDetail.token_id == null) {
        vm.error('Can not withdraw');
        return null;
      }
      vm.claim_detail.snake_type = item.snake_type;
      vm.claim_detail.skin_id = item.skin_id;
      vm.claim_detail.token_id = item.NFTDetail.token_id;
      vm.claim_detail.amount = 1;
      $('#withdrawModal').modal('show');
      vm.$forceUpdate()
    },
    async withdraw() {
      let vm = this;
      $.confirm({
        title: 'Confirm withdraw',
        content: '<p>Please make sure you make a withdrawal.</p>' +
            '<p>If you choose to cancel your NFT withdrawal while the acceptance message is displayed on the blockchain, your NFT will be withheld until you submit a request to help unblock the NFT.</p>',
        buttons: {
          confirm: {
            text: 'Confirm (Enter)',
            btnClass: 'btn-success',
            keys: ['enter'],
            action: async function () {
              await vm.doWithdraw();
            }
          },
          cancel: {
            text: 'Cancel',
            btnClass: 'btn-dark',
            keys: ['esc']
          },
        }
      });
    },
    async doWithdraw() {
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
        amount: vm.claim_detail.amount,
        token_id: vm.claim_detail.token_id
      }).then(async response => {
        vm.claim_detail.disable_withdraw_btn = true;
        let {data, message, success} = response;
        if (success) {
          let contract = await vm.$store.dispatch('contract/getContract', {
            contract_name: 'SC_COWS_GAME_1155',
            signer: vm.account.wallet.signer,
          })
          vm.step_detail = {
            step: 2,
            message: 'Confirm withdraw Egg',
          }
          try {

            let withdrawNFT = await contract.claimNFTRewards(
                SC_NFTEggCBS_1155,
                vm.claim_detail.token_id.toString(),
                vm.claim_detail.amount.toString(),
                data.message,
                data.time_expired,
                data.signature
            );

            vm.step_detail = {
              step: 2,
              message: 'Confirm withdraw Egg success, please wait...',
            }
            await withdrawNFT.wait();

            vm.step_detail = {
              step: 3,
              message: 'Update detail Egg, please wait...',
            }
            _.forEach(vm.data_egg.docs, (doc, index) => {
              if (doc.NFTDetail.token_id === vm.claim_detail.token_id) {
                vm.data_egg.docs[index]['count'] -= vm.claim_detail.amount;
                vm.claim_detail.disable_withdraw_btn = false;
                $("#modalStep").modal('hide');
                $('#withdrawModal').modal('hide');
                vm.$forceUpdate()
              }
            });
            vm.data_egg.chunk = _.chunk(vm.data_egg.docs, 4);
            vm.success('Withdraw success');
          } catch (e) {
            vm.claim_detail.disable_withdraw_btn = false;
            if (_.isNumber(e.code) && e.data) {
              vm.error(e.data.message)
            } else {
              vm.error(e.message)
            }
            $("#modalStep").modal('hide');
          }
        } else {
          vm.claim_detail.disable_withdraw_btn = false;

          setTimeout(() => {
            vm.error(message);
            $("#modalStep").modal('hide');
          }, 500)
        }
      })
    }
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
