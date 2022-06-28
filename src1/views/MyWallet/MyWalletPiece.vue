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
                  <div class="position-absolute top-50 start-50 translate-middle">{{ symbolSnake(sell_piece.snake_type, sell_piece.skin_id) }}</div>
                </div>
              </div>
            </div>
            <div class="row mx-0 my-3">
              <div class="col-6 offset-3">
                <div class="position-relative"><img class="w-100" :src="sell_piece.image"></div>
              </div>
            </div>
            <div class="row mx-0 my-3">
              <div class="col-8 offset-2">
                <p class="text-center mb-1 text-warning">Input Price</p>
                <div class="input-group mb-3">
                  <input class="form-control" type="text" v-model.number="sell_piece.price">
                </div>
                <p class="text-center mb-1 text-warning">Amount</p>
                <div class="input-group mb-3">
                  <input class="form-control" type="text" v-model.number="sell_piece.amount">
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
    <div class="modal fade" id="depositInWalletModal" tabindex="-1" aria-labelledby="depositInWalletModalLabel" aria-hidden="true">
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
                  <div class="position-absolute top-50 start-50 translate-middle">{{ symbolSnake(deposit_detail.snake_type, deposit_detail.skin_id) }}</div>
                </div>
              </div>
            </div>
            <div class="row mx-0 my-3">
              <div class="col-6 offset-3">
                <div class="position-relative"><img class="w-100" :src="pieceImage(deposit_detail.snake_type, deposit_detail.skin_id)"></div>
              </div>
            </div>
            <div class="row mx-0 my-3">
              <div class="col-8 offset-2">
                <p class="text-center mb-1 text-warning">Amount deposit</p>
                <div class="input-group mb-3">
                  <input class="form-control" type="number" aria-describedby="basic-addon3" v-model="deposit_detail.amount">
                </div>
                <div class="d-grid">
                  <button class="btn btn-submit mx-auto" type="submit" @click="doDeposit()" :disabled="deposit_detail.disabled">
                    <div class="text-radiant">Submit</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="transferModal" tabindex="-1" aria-labelledby="transferModalLabel" aria-hidden="true">
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
                  <div class="position-absolute top-50 start-50 translate-middle">{{ detail_transfer.quantity }}</div>
                </div>
              </div>
            </div>
            <div class="row mx-0 my-3">
              <div class="col-6 offset-3">
                <div class="position-relative"><img class="w-100" :src="pieceImage(detail_transfer.snake_type, detail_transfer.skin_id)"></div>
                <div class="text-radiant text-uppercase text-center">{{ symbolSnake(detail_transfer.snake_type, detail_transfer.skin_id) }}</div>
              </div>
            </div>
            <div class="row mx-0 my-3">
              <div class="col-8 offset-2">
                <p class="text-center mb-1 text-warning">To address</p>
                <div class="input-group mb-3">
                  <input class="form-control" type="text" v-model="detail_transfer.to">
                </div>
                <p class="text-center mb-1 text-warning">Amount transfer</p>
                <div class="input-group mb-3">
                  <input class="form-control" type="number" v-model="detail_transfer.amount">
                </div>
                <div class="d-grid">
                  <button class="btn btn-submit mx-auto" type="button" @click="transferToken1155()">
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
              <div class="col-6 mx-auto px-1">
                <div class="d-grid hvr-bounce-in">
                  <button class="btn btn-sell" type="button" @click="sellPiece(piece.snake_type, piece.skin_id)">
                    <div class="text-radiant text-uppercase">SELL</div>
                  </button>
                </div>
              </div>
              <div class="col-6 mx-auto px-1">
                <div class="d-grid hvr-bounce-in">
                  <button class="btn btn-sell" type="button" @click="deposit(piece)">
                    <div class="text-radiant text-uppercase">+ GAME</div>
                  </button>
                </div>
              </div>
            </div>
            <div class="row mx-0 my-2">
              <div class="col-8 mx-auto px-1">
                <div class="d-grid hvr-bounce-in">
                  <button class="btn btn-sell" type="button" @click="openModalTransfer(piece.id,piece.snake_type,piece.count)">
                    <div class="text-radiant text-uppercase">Transfer</div>
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
import ModalStep from "@/components/ModalStep";
import {SC_COWS_GAME_1155, SC_MARKET_EGG_1155, SC_NFTEggCBS_1155, SC_TOKEN} from "@/utils/config";
import {mapState} from "vuex";
import {ethers} from "ethers";
import * as config from "@/utils/config";

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
        page: 0,
        paginate: 12,
      },
      data_piece: {
        docs: [],
        chunk: [],
        total: 0,
      },
      deposit_detail: {
        snake_type: null,
        skin_id: null,
        amount: 1,
        disabled: false,
      },
      sell_piece: {
        id: null,
        snake_type: null,
        image: null,
        price: null,
        amount: 0,
      },
      step_detail: {
        step: 1,
        message: 'Approve contract to deposit Piece to Game',
      },
      detail_transfer: {
        to: null,
        skin_id: null,
        snake_type: null,
        id: null,
        quantity: 0,
        amount: 1,
        data: "0x0000000000000000000000000000000000000000",
      }
    }
  },
  created() {
    let vm = this;
    vm.loadNFTWallet();
  },
  methods: {
    pieceImage(snake_type, skin_id) {
      if (snake_type !== null && skin_id !== null)
        return require(`../../assets/images/pieces/${snake_type}_${skin_id}.png`);
      return null;
    },
    listSnake() {
      return [
        {name: 'NEP1', snake_type: 'NAGA', skin_id: 1, id: 1},
        {name: 'NEP2', snake_type: 'NAGA', skin_id: 8, id: 2},
        {name: 'NEP3', snake_type: 'NAGA', skin_id: 9, id: 3},
        {name: 'NEP4', snake_type: 'NAGA', skin_id: 10, id: 4},
        {name: 'NEP5', snake_type: 'HYDRA', skin_id: 1, id: 5},
        {name: 'NEP6', snake_type: 'HYDRA', skin_id: 2, id: 6},
        {name: 'NEP7', snake_type: 'HYDRA', skin_id: 3, id: 7},
        {name: 'NEP8', snake_type: 'HYDRA', skin_id: 4, id: 8},
        {name: 'NEP9', snake_type: 'LORD', skin_id: 4, id: 9},
        {name: 'NEP10', snake_type: 'LORD', skin_id: 5, id: 10},
        {name: 'NEP11', snake_type: 'LORD', skin_id: 6, id: 11},
        {name: 'NEP12', snake_type: 'LORD', skin_id: 7, id: 12},
        {name: 'NEP13', snake_type: 'SHENRON', skin_id: 1, id: 13},
        {name: 'NEP14', snake_type: 'SHENRON', skin_id: 2, id: 14},
        {name: 'NEP15', snake_type: 'SHENRON', skin_id: 3, id: 15},
        {name: 'NEP16', snake_type: 'SHENRON', skin_id: 4, id: 16},
        {name: 'NEP17', snake_type: 'UNICORN', skin_id: 1, id: 17},
      ]
    },
    async loadNFTWallet() {
      let vm = this;
      if (!vm.account.detail.wallet_address) {
        return;
      }
      vm.data_piece.docs = [];
      for (let i = 1; i <= 17; i++) {
        let contractPiece = await vm.$store.dispatch('contract/getContractPiece', {
          contract_name: 'SC_NEP_' + i,
          signer: vm.account.wallet.signer,
        });
        let balanceOf = await contractPiece.balanceOf(vm.account.detail.wallet_address, i);
        let nep = _.find(vm.listSnake(), snake => {
          return snake.name === 'NEP' + i;
        });
        let count = ethers.BigNumber.from(balanceOf).toNumber();
        if (count > 0) {
          vm.data_piece.docs.push({
            id: i,
            snake_type: nep.snake_type,
            skin_id: nep.skin_id,
            count,
          });
        }
      }

      vm.data_piece.chunk = _.chunk(vm.data_piece.docs, 4);
      vm.$forceUpdate();
    },
    filter() {
      let vm = this;
      let data = _.filter(vm.data_piece.docs, doc => {
        if (vm.piece_filters.snake_type === 'ALL') {
          return true;
        }
        return doc.UserEggPiece.snake_type === vm.piece_filters.snake_type;
      })
      vm.data_piece.chunk = _.chunk(data, 4);
      vm.$forceUpdate()
    },
    sellPiece(snake_type, skin_id) {
      let vm = this;
      let snake = _.find(vm.listSnake(), snake => {
        return snake.snake_type === snake_type && snake.skin_id === skin_id;
      });
      vm.sell_piece = {
        id: snake.id,
        image: require(`../../assets/images/pieces/${snake_type}_${skin_id}.png`),
        price: 0,
        amount: 0,
        snake_type,
        skin_id,
      }
      $('#sell-modal').modal('show');
    },
    async approveContractMarket1155NFT() {
      let vm = this;
      try {
        vm.step_detail = {
          step: 1,
          message: 'Approve contract 1155 to sell Egg.'
        }

        let contractNEP = await vm.$store.dispatch('contract/getContractPiece', {
          contract_name: `SC_NEP_${vm.sell_piece.id}`,
          signer: vm.account.wallet.signer,
        })

        let isApproveAll = await contractNEP.isApprovedForAll(vm.account.detail.wallet_address, SC_MARKET_EGG_1155);
        if (!isApproveAll) {
          let approve = await contractNEP.setApprovalForAll(SC_MARKET_EGG_1155, true);
          vm.step_detail = {
            step: 1,
            message: 'Approve contract 1155 to sell Egg success, please wait...'
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
        $('#modalStep').modal('hide');
        $('#sell-modal').modal('hide');
        return false;
      }
    },
    async doSell() {
      let vm = this;
      let contract = await vm.$store.dispatch('contract/getContractPiece', {
        contract_name: 'SC_NEP_' + vm.sell_piece.id,
        signer: vm.account.wallet.signer,
      });
      let balanceOf = await contract.balanceOf(vm.account.detail.wallet_address, vm.sell_piece.id);

      if (!vm.$options.filters.toNumber(balanceOf) >= vm.sell_piece.amount) {
        vm.error('Balance not enough to sell');
        return null;
      }

      let modal = $('#modalStep');
      modal.modal('show');
      await vm.approveContractMarket1155NFT();

      const contractMarket = await vm.$store.dispatch('contract/getContract', {
        contract_name: 'SC_MARKET_EGG_1155',
        signer: vm.account.wallet.signer,
      })
      let minPrice = vm.formatEther(await contractMarket.minPrice());
      if (vm.sell_piece.price < minPrice) {
        vm.error('Price greater than ' + minPrice);
        return;
      }

      try {
        // get signature
        let signature_data = await vm.$store.dispatch('market/getSignPiece', {
          token_id: vm.sell_piece.id,
          snake_type: vm.sell_piece.snake_type,
          skin_id: vm.sell_piece.skin_id,
          amount: vm.sell_piece.amount,
        })

        vm.step_detail = {
          step: 2,
          message: 'Confirm Sell Piece'
        }

        let sell = await contractMarket.setTokenSale(
            config[`SC_NEP_${vm.sell_piece.id}`], // nft
            vm.sell_piece.id.toString(), // tokenId
            SC_TOKEN, //paymentToken
            ethers.utils.parseUnits(vm.sell_piece.price.toString()), // price
            vm.sell_piece.amount.toString(),
            signature_data.data.message,
            signature_data.data.time_expired,
            signature_data.data.signature,
        );

        vm.step_detail = {
          step: 2,
          message: 'Confirm Sell Piece success, please wait...'
        }
        await sell.wait();
        await vm.loadNFTWallet();
        modal.modal('hide');
        $('#sell-modal').modal('hide');
      } catch (e) {
        if (_.isNumber(e.code) && e.data) {
          vm.error(e.data.message)
        } else {
          vm.error(e.message)
        }
        modal.modal('hide');
        $('#sell-modal').modal('hide');
      }
    },
    async deposit(piece) {
      let vm = this;
      vm.deposit_detail = {
        snake_type: piece.snake_type,
        skin_id: piece.skin_id,
        amount: 1,
      }

      let modal = $('#depositInWalletModal');
      modal.modal('show')
    },
    async approveContractGame() {
      let vm = this;
      $('#modalStep').modal('show');
      vm.step_detail = {
        step: 1,
        message: 'Approve contract to deposit Piece to Game'
      }
      let obj = _.find(vm.listSnake(), snake => {
        return snake.snake_type === vm.deposit_detail.snake_type && snake.skin_id === vm.deposit_detail.skin_id;
      });
      let contractPiece = await vm.$store.dispatch('contract/getContractPiece', {
        signer: vm.account.wallet.signer,
        contract_name: `SC_NEP_${obj.id}`
      });

      try {
        let approve = await contractPiece.setApprovalForAll(SC_COWS_GAME_1155, true);
        await approve.wait();
      } catch (e) {
        if (_.isNumber(e.code) && e.data) {
          vm.error(e.data.message)
        } else {
          vm.error(e.message)
        }
        $("#modalStep").modal('hide');
      }

      vm.step_detail = {
        step: 1,
        message: 'Approve contract to deposit Piece to Game success, please wait...'
      }
    },
    async doDeposit() {
      let vm = this;

      let obj = _.find(vm.listSnake(), snake => {
        return snake.snake_type === vm.deposit_detail.snake_type && snake.skin_id === vm.deposit_detail.skin_id;
      });

      let contract = await vm.$store.dispatch('contract/getContractPiece', {
        contract_name: 'SC_NEP_' + obj.id,
        signer: vm.account.wallet.signer,
      });

      let balanceOf = await contract.balanceOf(vm.account.detail.wallet_address, obj.id);

      if (!vm.$options.filters.toNumber(balanceOf) >= vm.deposit_detail.amount) {
        vm.error('Balance not enough to deposit');
        return null;
      }

      await vm.approveContractGame();

      let contractGame = await vm.$store.dispatch('contract/getContract', {
        signer: vm.account.wallet.signer,
        contract_name: 'SC_COWS_GAME_1155'
      });
      vm.step_detail = {
        step: 2,
        message: 'Confirm deposit Piece to Game'
      }

      try {
        let deposit = await contractGame.depositNFTsToGame(config[`SC_NEP_${obj.id}`], obj.id, vm.deposit_detail.amount.toString());

        vm.step_detail = {
          step: 2,
          message: 'Confirm deposit Piece to Game success, please wait'
        }
        await deposit.wait();
        await vm.loadNFTWallet();
        $("#modalStep").modal('hide');
        $('#depositInWalletModal').modal('hide');
      } catch (e) {
        if (_.isNumber(e.code) && e.data) {
          vm.error(e.data.message)
        } else {
          vm.error(e.message)
        }
        $("#modalStep").modal('hide');
        $('#depositInWalletModal').modal('hide');
      }
    },
    symbolSnake(snake_type, skin_id, prefix = '-') {
      let vm = this;
      let type = 'NEP';
      let obj = _.find(vm.listSnake(), snake => {
        return snake.snake_type === snake_type && snake.skin_id === skin_id;
      });
      if (obj) {
        return type + prefix + obj.id;
      }
      return type;
    },
    formatEther(value) {
      if (value !== undefined && value !== null) {
        return Number(ethers.utils.formatEther(ethers.BigNumber.from(value).toString()));
      }
      return 0;
    },
    openModalTransfer(token_id, snake_type, quantity) {
      let vm = this;

      let obj = _.find(vm.listSnake(), snake => {
        return snake.snake_type === snake_type && snake.id === token_id;
      });

      vm.detail_transfer = {
        id: token_id,
        skin_id: obj.skin_id,
        quantity,
        snake_type,
        to: null,
        amount: 1,
        data: '0x0000000000000000000000000000000000000000'
      }
      $('#transferModal').modal('show');
    },
    async checkBalance(amount = 0) {
      let vm = this;
      if (amount <= 0) {
        return false;
      }
      let contract = await vm.$store.dispatch('contract/getContractPiece', {
        contract_name: 'SC_NEP_' + vm.detail_transfer.id,
        signer: vm.account.wallet.signer,
      });
      let balanceOf = await contract.balanceOf(vm.account.detail.wallet_address, vm.detail_transfer.id);
      return vm.$options.filters.toNumber(balanceOf) >= amount;
    },
    async transferToken1155() {
      let vm = this;
      let modal = $('#modalStep');
      try {
        let checkBalance = await vm.checkBalance(Number(vm.detail_transfer.amount));
        if (!checkBalance) {
          vm.error('Balance not enough to transfer');
          return null;
        }
        let contractPiece = await vm.$store.dispatch('contract/getContractPiece', {
          contract_name: 'SC_NEP_' + vm.detail_transfer.id,
          signer: vm.account.wallet.signer,
        });
        vm.step_detail = {
          step: 1,
          message: 'Please confirm your transaction transfer to address ' + vm.detail_transfer.to
        }
        modal.modal('show');

        let transfer = await contractPiece.safeTransferFrom(
            vm.account.detail.wallet_address,
            vm.detail_transfer.to,
            vm.detail_transfer.id.toString(),
            vm.detail_transfer.amount.toString(),
            vm.detail_transfer.data,
        );
        vm.step_detail = {
          step: 1,
          message: 'Confirm transaction transfer to address ' + vm.detail_transfer.to + ' success, please wait...'
        }

        await transfer.wait();
        modal.modal('hide');
        $('#transferModal').modal('hide');
        await vm.loadNFTWallet();
        vm.success('Transfer success');
      } catch (e) {
        modal.modal('hide');
        $('#transferModal').modal('hide');
        if (_.isNumber(e.code) && e.data) {
          vm.error(e.data.message)
        } else {
          vm.error(e.message)
        }
      }

    },
  },
  watch: {
    'account.detail.wallet_address'() {
      let vm = this;
      vm.loadNFTWallet();
    },
    'piece_filters.snake_type'() {
      let vm = this;
      vm.filter();
    }
  }
}
</script>
