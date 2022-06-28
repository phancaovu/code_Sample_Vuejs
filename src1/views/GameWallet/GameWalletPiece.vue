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
                <div class="position-relative snake-id">
                  <img class="w-100" src="../../assets/images/id-egg.png">
                  <div class="position-absolute top-50 start-50 translate-middle">
                    #{{ symbolSnake(withdraw_detail.snake_type, withdraw_detail.skin_id) }}
                  </div>
                </div>
              </div>
            </div>
            <div class="row mx-0 my-3">
              <div class="col-6 offset-3">
                <div class="position-relative">
                  <img class="w-100" :src="pieceImage(withdraw_detail.snake_type, withdraw_detail.skin_id)">
                </div>
              </div>
            </div>
            <div class="row mx-0 my-3">
              <div class="col-8 offset-2">
                <p class="text-center mb-1 text-warning">Input amount withdraw</p>
                <div class="input-group mb-3">
                  <input class="form-control" type="text" v-model.number="withdraw_detail.amount">
                </div>
                <div class="d-grid">
                  <button class="btn btn-submit mx-auto" type="button" @click="withdraw" :disabled="withdraw_detail.disable_withdraw_btn">
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
            <li class="nav-item" @click="piece_filters.snake_type = 'ALL'">
              <a :class="`nav-link ${piece_filters.snake_type === 'ALL' ? 'active' : ''}`" aria-current="page" href="javascript:void(0)">
                <div class="btn box-text me-1">ALL</div>
                <div class="box-check">
                  <img class="icon-check" src="../../assets/images/icon-check.png">
                </div>
              </a>
            </li>
            <!--            <li class="nav-item" @click="piece_filters.snake_type = 'NAGA'">-->
            <!--              <a :class="`nav-link ${piece_filters.snake_type == 'NAGA' ? 'active' : ''}`" aria-current="page" href="javascript:void(0)">-->
            <!--                <div class="btn box-text me-1">N</div>-->
            <!--                <div class="box-check">-->
            <!--                  <img class="icon-check" src="../../assets/images/icon-check.png">-->
            <!--                </div>-->
            <!--              </a>-->
            <!--            </li>-->
            <!--            <li class="nav-item" @click="piece_filters.snake_type = 'HYDRA'">-->
            <!--              <a :class="`nav-link ${piece_filters.snake_type == 'HYDRA' ? 'active' : ''}`" aria-current="page" href="javascript:void(0)">-->
            <!--                <div class="btn box-text me-1">R</div>-->
            <!--                <div class="box-check">-->
            <!--                  <img class="icon-check" src="../../assets/images/icon-check.png">-->
            <!--                </div>-->
            <!--              </a>-->
            <!--            </li>-->
            <!--            <li class="nav-item" @click="piece_filters.snake_type = 'LORD'">-->
            <!--              <a :class="`nav-link ${piece_filters.snake_type == 'LORD' ? 'active' : ''}`" aria-current="page" href="javascript:void(0)">-->
            <!--                <div class="btn box-text me-1">sr</div>-->
            <!--                <div class="box-check">-->
            <!--                  <img class="icon-check" src="../../assets/images/icon-check.png">-->
            <!--                </div>-->
            <!--              </a>-->
            <!--            </li>-->
            <!--            <li class="nav-item" @click="piece_filters.snake_type = 'SHENRON'">-->
            <!--              <a :class="`nav-link ${piece_filters.snake_type == 'SHENRON' ? 'active' : ''}`" aria-current="page" href="javascript:void(0)">-->
            <!--                <div class="btn box-text me-1">ssr</div>-->
            <!--                <div class="box-check">-->
            <!--                  <img class="icon-check" src="../../assets/images/icon-check.png">-->
            <!--                </div>-->
            <!--              </a>-->
            <!--            </li>-->
            <!--            <li class="nav-item" @click="piece_filters.snake_type = 'UNICORN'">-->
            <!--              <a :class="`nav-link ${piece_filters.snake_type == 'UNICORN' ? 'active' : ''}`" aria-current="page" href="javascript:void(0)">-->
            <!--                <div class="btn box-text me-1">uni</div>-->
            <!--                <div class="box-check">-->
            <!--                  <img class="icon-check" src="../../assets/images/icon-check.png">-->
            <!--                </div>-->
            <!--              </a>-->
            <!--            </li>-->
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

    <div class="row mx-0" v-for="pieces in data_piece.chunk">
      <div class="col-md-6 col-lg-3 mb-3" v-for="piece in pieces">
        <div class="walltet-content-box py-4 d-flex align-items-start flex-column px-1">
          <div class="content-box-top"><img class="w-100" src="../../assets/images/eggs-box.png">
            <div class="content-box-top-eggs top-50 translate-middle-y text-center">
              <img class="w-50" :src="pieceImage(piece.snake_type, piece.skin_id)">
            </div>
            <div class="content-box-top-name">
              <div class="d-flex justify-content-center align-items-center">
                <div class="text-radiant text-uppercase text-center">{{ symbolSnake(piece.snake_type, piece.skin_id) }}</div>
                <div class="position-relative ms-2 snake-id">
                  <img class="w-100" src="../../assets/images/id-egg.png">
                  <div class="position-absolute top-50 start-50 translate-middle">{{ piece.count }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="content-box-bottom px-3 mt-auto">
            <div class="row mx-0 my-2">
              <div class="col-8 mx-auto px-1">
                <div class="d-grid hvr-bounce-in">
                  <!--                  <button class="btn btn-sell" type="button" disabled>-->
                  <!--                    <div class="text-radiant text-uppercase">Withdraw</div>-->
                  <!--                  </button>-->
                  <button class="btn btn-sell" type="button" @click="withdrawDetail(piece.snake_type,piece.skin_id)">
                    <div class="text-radiant text-uppercase">Withdraw</div>
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
import * as config from "@/utils/config";
import ModalStep from "@/components/ModalStep";
import {mapState} from "vuex";

export default {
  name: 'WarehousePiece',
  components: {
    ModalStep
  },
  computed: {
    ...mapState(['account', 'wallet_connect', 'contract', 'metamask', 'warehouse', 'server']),
  },
  data() {
    return {
      piece_filters: {
        snake_type: 'ALL',
      },
      data_piece: {
        docs: [],
        chunk: [],
        total: 0,
      },
      disable_load_more_piece: false,
      step_detail: {
        step: 1,
        message: null
      },
      withdraw_detail: {
        skin_id: null,
        snake_type: null,
        amount: 0,
        disable_withdraw_btn: false,
      }
    }
  },
  created() {
    let vm = this;
    vm.scrollLoad();
  },
  methods: {
    pieceImage(snake_type, skin_id) {
      if (snake_type !== null && skin_id !== null) {
        return require(`../../assets/images/pieces/${snake_type}_${skin_id}.png`);
      }
      return null;
    },
    scrollLoad() {
      let vm = this;
      vm.$store.dispatch('warehouse/filterPiece', {
        snake_type: vm.piece_filters.snake_type,
      }).then(response => {
        let {success, data} = response;
        if (success) {
          vm.data_piece.docs = data;
          vm.data_piece.chunk = _.chunk(vm.data_piece.docs, 4);
          vm.piece_filters.page++;
          vm.$forceUpdate();
        }
      })
    },
    withdrawDetail(snake_type, skin_id) {
      let vm = this;
      vm.withdraw_detail = {
        snake_type,
        skin_id,
        amount: 1,
      }
      $('#withdrawModal').modal('show');
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
        return snake.snake_type === vm.withdraw_detail.snake_type && snake.skin_id === vm.withdraw_detail.skin_id;
      });
      if (!obj) {
        vm.error('Not found contract piece');
        return;
      }

      vm.step_detail = {
        step: 1,
        message: 'Withdraw Piece is processing',
      }
      $("#modalStep").modal('show');

      vm.$store.dispatch('warehouse/signWithdrawPiece', vm.withdraw_detail).then(async response => {
        let {data, success, message} = response;
        if (success) {
          let contract = await vm.$store.dispatch('contract/getContract', {
            contract_name: 'SC_COWS_GAME_1155',
            signer: vm.account.wallet.signer,
          })

          vm.step_detail = {
            step: 2,
            message: 'Confirm withdraw Piece',
          }
          try {

            let withdrawNFT = await contract.claimNFTRewards(
                config['SC_NEP_' + obj.id],
                obj.id.toString(),
                vm.withdraw_detail.amount.toString(),
                data.message,
                data.time_expired,
                data.signature
            );

            vm.step_detail = {
              step: 2,
              message: 'Confirm withdraw Piece success, please wait...',
            }
            await withdrawNFT.wait();
            $("#modalStep").modal('hide');
            $("#withdrawModal").modal('hide');

            vm.piece_filters.page = 1;
            vm.data_piece.docs = [];
            vm.data_piece.chunk = _.chunk(vm.data_piece.docs, 4);
            await vm.scrollLoad();

            vm.success('Withdraw success');
          } catch (e) {
            if (_.isNumber(e.code) && e.data) {
              vm.error(e.data.message)
            } else {
              vm.error(e.message)
            }
            $("#modalStep").modal('hide');
          }
        } else {
          vm.error(message);
        }
      }).catch(e => {
        vm.error(e.message);
      })
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
        return snake.snake_type === snake_type && snake.skin_id === Number(skin_id)
      });
      if (obj) {
        return type + prefix + obj.id;
      }
      return type;
    },
  },
  watch: {
    'piece_filters.snake_type'() {
      this.piece_filters.page = 0;
      this.data_piece = {
        docs: [],
        chunk: [],
        total: 0,
      }
      this.scrollLoad();
    }
  }
}
</script>
