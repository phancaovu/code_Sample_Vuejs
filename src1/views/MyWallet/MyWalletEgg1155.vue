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
                <p class="text-center mb-1 text-warning">Amount</p>
                <div class="input-group mb-3">
                  <input class="form-control" type="text" v-model.number="sell_egg.amount">
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
                  <div class="position-absolute top-50 start-50 translate-middle">#1</div>
                </div>
              </div>
            </div>
            <div class="row mx-0 my-3">
              <div class="col-6 offset-3">
                <div class="position-relative"><img class="w-100" :src="eggImage('UNICORN', 1)"></div>
                <div class="text-radiant text-uppercase text-center">UNICORN Egg</div>
              </div>
            </div>
            <div class="row mx-0 my-3">
              <div class="col-8 offset-2">
                <p class="text-center mb-1 text-warning">Amount deposit</p>
                <div class="input-group mb-3">
                  <input class="form-control" type="number" aria-describedby="basic-addon3" v-model="deposit_detail.amount">
                </div>
                <div class="d-grid">
                  <button class="btn btn-submit mx-auto" type="submit" @click="depositFromWallet()" :disabled="deposit_detail.disabled">
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
                  <div class="position-absolute top-50 start-50 translate-middle">#{{ detail_transfer.id }}</div>
                </div>
              </div>
            </div>
            <div class="row mx-0 my-3">
              <div class="col-6 offset-3">
                <div class="position-relative"><img class="w-100" :src="eggImage(detail_transfer.snake_type, detail_transfer.id)"></div>
                <div class="text-radiant text-uppercase text-center">{{ detail_transfer.snake_type }} Egg</div>
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
              <img class="w-50" :src="eggImage('UNICORN', 1)">
            </div>
            <div class="content-box-top-name">
              <div class="d-flex justify-content-center align-items-center">
                <div class="text-radiant text-uppercase text-center">{{ egg.snake_type }}</div>
                <div class="position-relative ms-2 snake-id">
                  <img class="w-100" src="../../assets/images/id-egg.png">
                  <div class="position-absolute top-50 start-50 translate-middle">{{ egg.qty | money('',false,0) }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="content-box-bottom px-3 mt-auto">
            <div class="row mx-0 my-2">
              <div class="col-6 mx-auto px-1">
                <div class="d-grid hvr-bounce-in">
                  <button class="btn btn-sell" type="button" @click="sellEgg('UNICORN', 1, egg.token_id)">
                    <div class="text-radiant text-uppercase">SELL</div>
                  </button>
                </div>
              </div>
              <div class="col-6 mx-auto px-1">
                <div class="d-grid hvr-bounce-in">
                  <button class="btn btn-sell" type="button" @click="deposit(egg.token_id, egg.type)">
                    <div class="text-radiant text-uppercase">+ GAME</div>
                  </button>
                </div>
              </div>
            </div>
            <div class="row mx-0 my-2">
              <div class="col-8 mx-auto px-1">
                <div class="d-grid hvr-bounce-in">
                  <button class="btn btn-sell" type="button" @click="openModalTransfer(1,'UNICORN')">
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
import {mapState} from "vuex";
import {SC_NFTEggCBS_1155, SC_MARKET_EGG_1155, SC_COWS_GAME_1155, SC_TOKEN} from "@/utils/config";
import ModalStep from "@/components/ModalStep";
import {ethers} from "ethers"

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
        snake_type: 'UNICORN',
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
        amount: 0,
      },
      step_detail: {
        step: 1,
        message: ''
      },
      deposit_detail: {
        token_id: null,
        amount: 1,
        disabled: false,
      },
      detail_transfer: {
        to: null,
        snake_type: 'UNICORN',
        id: 1,
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
    eggImage(snake_type, skin_id) {
      return require(`../../assets/images/eggs/${snake_type}_${skin_id}.png`);
    },
    async loadNFTWallet() {
      let vm = this;
      if (vm.account.detail.wallet_address) {
        let contractUnicornEgg = await vm.$store.dispatch('contract/getContract', {
          contract_name: 'SC_NFTEggCBS_1155',
          signer: vm.account.wallet.signer,
        })
        let balanceOf = await contractUnicornEgg.balanceOf(vm.account.detail.wallet_address, '1');
        if (vm.$options.filters.toNumber(balanceOf) > 0) {
          vm.data_egg.docs.push({
            type: 'MyWallet',
            snake_type: 'UNICORN',
            token_id: 1,
            qty: vm.$options.filters.toNumber(balanceOf)
          })

          vm.data_egg.chunk = _.chunk(vm.data_egg.docs, 4);
        }
      }
    },
    async checkBalance(amount = 0) {
      let vm = this;
      if (amount <= 0) {
        return false;
      }
      try {
        let contractUnicornEgg = await vm.$store.dispatch('contract/getContract', {
          contract_name: 'SC_NFTEggCBS_1155',
          signer: vm.account.wallet.signer,
        })
        let balanceOf = await contractUnicornEgg.balanceOf(vm.account.detail.wallet_address, '1');
        return vm.$options.filters.toNumber(balanceOf) >= amount;
      } catch (e) {
        if (_.isNumber(e.code) && e.data) {
          vm.error(e.data.message)
        } else {
          vm.error(e.message)
        }
      }
    },
    filter() {
      let vm = this;
      let data = _.filter(vm.data_egg.docs, doc => {
        return doc.snake_type === vm.egg_filters.snake_type;
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
        snake_type,
        skin_id,
        amount: 1
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
        let contractUnicornEgg = await vm.$store.dispatch('contract/getContract', {
          contract_name: 'SC_NFTEggCBS_1155',
          signer: vm.account.wallet.signer,
        })
        let isApproveAll = await contractUnicornEgg.isApprovedForAll(vm.account.detail.wallet_address, SC_MARKET_EGG_1155);
        if (!isApproveAll) {
          let approve = await contractUnicornEgg.setApprovalForAll(SC_MARKET_EGG_1155, true);
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
        return false;
      }
    },
    async doSell() {
      let vm = this;
      let checkBalance = await vm.checkBalance(Number(vm.sell_egg.amount));
      if (!checkBalance) {
        vm.error('Balance not enough');
        return null;
      }

      const contractMarket = await vm.$store.dispatch('contract/getContract', {
        contract_name: 'SC_MARKET_EGG_1155',
        signer: vm.account.wallet.signer,
      })

      let minPrice = vm.formatEther(await contractMarket.minPrice());
      if (vm.sell_egg.price < minPrice) {
        vm.error('Price greater than ' + minPrice);
        return;
      }

      let modal = $('#modalStep');
      try {
        modal.modal('show');
        await vm.approveContractMarket1155NFT();

        // get signature
        let signature_data = await vm.$store.dispatch('market/getSignEgg', {
          token_id: vm.sell_egg.nft_id,
          snake_type: vm.sell_egg.snake_type,
          skin_id: vm.sell_egg.skin_id,
          amount: vm.sell_egg.amount,
        })

        vm.step_detail = {
          step: 2,
          message: 'Confirm Sell Egg'
        }

        let sell = await contractMarket.setTokenSale(
            SC_NFTEggCBS_1155, // nft
            vm.sell_egg.nft_id.toString(), // tokenId
            SC_TOKEN, //paymentToken
            ethers.utils.parseUnits(vm.sell_egg.price.toString()), // price
            vm.sell_egg.amount.toString(),
            signature_data.data.message,
            signature_data.data.time_expired,
            signature_data.data.signature,
        );

        vm.step_detail = {
          step: 2,
          message: 'Confirm Sell Egg success, please wait...'
        }
        await sell.wait();

        // reset data
        modal.modal('hide');

        vm.data_egg.docs = [];
        await vm.loadNFTWallet();
        $('#sell-modal').modal('hide');
        vm.sell_egg = {
          nft_id: null,
          snake_type: null,
          image: null,
          price: null,
          amount: 0,
        }
      } catch (e) {
        $('#sell-modal').modal('hide');
        modal.modal('hide');
        if (_.isNumber(e.code) && e.data) {
          vm.error(e.data.message)
        } else {
          vm.error(e.message)
        }
      }
    },
    async depositFromWallet() {
      let vm = this;
      let checkBalance = await vm.checkBalance(Number(vm.deposit_detail.amount));
      if (!checkBalance) {
        vm.error('Balance not enough to sell');
        return null;
      }
      let modal = $('#modalStep');

      try {
        modal.modal('show')
        // approve contract game 1155 manipulate deposit
        let contractUnicornEgg = await vm.$store.dispatch('contract/getContract', {
          contract_name: 'SC_NFTEggCBS_1155',
          signer: vm.account.wallet.signer,
        })
        let isApproveAll = await contractUnicornEgg.isApprovedForAll(vm.account.detail.wallet_address, SC_COWS_GAME_1155);
        if (!isApproveAll) {
          vm.step_detail = {
            step: 1,
            message: 'Approve contract 1155 to deposit egg.'
          }
          let approve = await contractUnicornEgg.setApprovalForAll(SC_COWS_GAME_1155, true);
          vm.step_detail = {
            step: 1,
            message: 'Approve contract 1155 to deposit egg success, please wait...'
          }
          await approve.wait();
        }

        let contractGame = await vm.$store.dispatch('contract/getContract', {
          contract_name: 'SC_COWS_GAME_1155',
          signer: vm.account.wallet.signer,
        })
        vm.step_detail = {
          step: 2,
          message: 'Approve deposit NFT to Game'
        }

        vm.deposit_detail.disabled = true;
        vm.$forceUpdate();

        let deposit = await contractGame.depositNFTsToGame(SC_NFTEggCBS_1155, vm.deposit_detail.token_id.toString(), vm.deposit_detail.amount.toString())

        vm.step_detail = {
          step: 2,
          message: 'Approve deposit NFT to Game success, please wait...'
        }

        await deposit.wait();

        // done

        vm.success('Deposit success, please wait 3-5 minutes to update in game');
        _.forEach(vm.data_egg.docs, (doc, index) => {
          if (doc.token_id === vm.deposit_detail.token_id) {
            vm.data_egg.docs[index]['qty'] -= vm.deposit_detail.amount;
            vm.deposit_detail.disabled = false;
            vm.$forceUpdate()
          }
        })
        vm.data_egg.chunk = _.chunk(vm.data_egg.docs, 4);
        modal.modal('hide');
        $('#depositInWalletModal').modal('hide');
        vm.deposit_detail.disabled = false;
        vm.$forceUpdate()

      } catch (e) {
        console.error(e);
        modal.modal('hide')
        vm.deposit_detail.disabled = false;

        if (_.isNumber(e.code) && e.data) {
          vm.error(e.data.message)
        } else {
          vm.error(e.message)
        }
        return false;
      }
    },
    async deposit(token_id, type) {
      let vm = this;
      let checkToken = vm.$store.dispatch('account/checkTokenAlive');
      if (!checkToken) {
        vm.error('Please logout and login again to deposit Egg')
        return;
      }

      let modal = $('#modalStep');
      vm.deposit_detail.token_id = token_id;
      try {
        switch (type) {
          case 'MyWallet': {
            $('#depositInWalletModal').modal('show');
            break;
          }
        }
      } catch (e) {
        modal.modal('hide')
        vm.error(e.message);
      }
    },
    openModalTransfer(token_id, snake_type) {
      let vm = this;
      vm.detail_transfer.id = token_id;
      vm.detail_transfer.snake_type = snake_type;
      vm.detail_transfer.to = null;
      vm.detail_transfer.amount = 1;
      $('#transferModal').modal('show');
    },
    async transferToken1155() {
      let vm = this;
      let checkBalance = await vm.checkBalance(Number(vm.detail_transfer.amount));
      if (!checkBalance) {
        vm.error('Balance not enough to sell');
        return null;
      }

      let modal = $('#modalStep');
      try {
        let contractUnicornEgg = await vm.$store.dispatch('contract/getContract', {
          contract_name: 'SC_NFTEggCBS_1155',
          signer: vm.account.wallet.signer,
        })
        vm.step_detail = {
          step: 1,
          message: 'Please confirm your transaction transfer to address ' + vm.detail_transfer.to
        }
        modal.modal('show');

        let transfer = await contractUnicornEgg.safeTransferFrom(
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
        for (let i = 0; i < vm.data_egg.docs.length; i++) {
          if (vm.data_egg.docs[i].token_id == vm.detail_transfer.id) {
            vm.data_egg.docs[i].qty -= vm.detail_transfer.amount;
          }
        }
        vm.data_egg.chunk = _.chunk(vm.data_egg.docs, 4);
        vm.$forceUpdate();
        modal.modal('hide');
        $('#transferModal').modal('hide');
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
    'egg_filters.snake_type'() {
      let vm = this;
      vm.filter();
    }
  }
}
</script>
