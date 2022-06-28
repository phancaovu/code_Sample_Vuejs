<template>
  <div class="mywallet-content">
    <ModalStep :step_detail="step_detail"></ModalStep>
    <div class="row mx-0" v-for="chests in data_chest.chunk">
      <div class="col-md-6 col-lg-3 mb-3" v-for="chest in chests">
        <div class="walltet-content-box py-4 d-flex align-items-start flex-column px-1">
          <div class="content-box-top">
            <img class="w-100" src="../../assets/images/eggs-box.png">
            <div class="content-box-top-eggs top-50 translate-middle-y text-center">
              <img class="w-50" src="../../assets/images/items/CHEST_NORMAL.png"></div>
            <div class="content-box-top-name"></div>
          </div>
          <div class="content-box-bottom px-1 mt-auto">
            <div class="row mx-0 py-2">
              <div class="col-7 px-lg-0">
                <div class="text-radiant text-uppercase text-center fs-6">MYSTERY
                  BOX
                </div>
              </div>
              <div class="col-5 px-lg-0">
                <div class="position-relative snake-id">
                  <img class="w-100" src="../../assets/images/id-egg.png">
                  <div class="position-absolute top-50 start-50 translate-middle">
                    #{{ chest.token_id }}
                  </div>
                </div>
              </div>
            </div>
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
                  <button class="btn btn-sell" type="button" @click="deposit(chest.token_id)">
                    <div class="text-radiant text-uppercase">+ Game</div>
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
import ModalStep from "@/components/ModalStep";
import {SC_COWS_GAME, SC_NFTCBOX} from "@/utils/config";

export default {
  name: "MyWalletChest",

  computed: {
    ...mapState(['account', 'wallet_connect', 'contract', 'metamask', 'warehouse', 'server']),
  },
  components: {
    ModalStep
  },
  data() {
    return {
      data_chest: {
        docs: [],
        chunk: [],
        total: 0,
      },
      sell_chest: {
        nft_id: null,
        image: null,
        price: null,
      },
      step_detail: {
        step: 1,
        message: 'Approve contract to deposit Chest to Game'
      }
    }
  },
  created() {
    let vm = this;
    vm.loadNFTWallet();
  },
  methods: {
    async loadNFTWallet() {
      let vm = this;
      if (!vm.account.detail.wallet_address) {
        return;
      }

      let contractGame = await vm.$store.dispatch('contract/getContract', {
        contract_name: 'SC_COWS_GAME',
        signer: vm.account.wallet.signer,
      })

      let totalNFTChestInWallet = await contractGame.getBalanceMyNFTWallet(vm.account.detail.wallet_address, SC_NFTCBOX);
      totalNFTChestInWallet = totalNFTChestInWallet.toNumber()

      // get list token id in wallet
      let token_ids = []
      for (let i = 0; i < totalNFTChestInWallet; i++) {
        let response = await contractGame.getTokenidMyNFTWalletByIndex(vm.account.detail.wallet_address, SC_NFTCBOX, i)
        token_ids.push(response[1].toNumber());
      }

      vm.$store.dispatch('mywallet/filterChestEvent', {
        token_ids: token_ids
      }).then(response => {
        let {success, data} = response;
        if (success) {
          vm.data_chest = {
            docs: data,
            chunk: [],
            total: 0,
          }
          vm.data_chest.chunk = _.chunk(data, 4);
          vm.$forceUpdate();
        }
      })
    },
    async deposit(token_id) {
      let vm = this;
      let checkToken = vm.$store.dispatch('account/checkTokenAlive');
      if (!checkToken) {
        vm.error('Please logout and login again to deposit Chest')
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
          contract_name: 'SC_NFTCBOX'
        });

        let contract_cows_game = await vm.$store.dispatch('contract/getContract', {
          signer: vm.account.wallet.signer,
          contract_name: 'SC_COWS_GAME'
        });

        let approveContract = await contract_egg.approve(SC_COWS_GAME, token_id);
        vm.step_detail = {
          step: 1,
          message: 'Approve contract to deposit Chest to Game, please wait...'
        }
        await approveContract.wait()

        vm.step_detail = {
          step: 2,
          message: `Approve contract success, please Confirm deposit Token ${token_id} to Game`
        }

        let depositChest = await contract_cows_game.depositNFTsToGame(SC_NFTCBOX, token_id);

        vm.step_detail = {
          step: 2,
          message: `Deposit Token ${token_id} to Game, please wait...`
        }

        await depositChest.wait();

        vm.step_detail = {
          step: 3,
          message: `NFT identification ${token_id} in progress, please wait...`
        }

        // done
        vm.$store.dispatch('mywallet/depositChestEvent', {
          transaction_hash: depositChest.hash,
        }).then(response => {
          let {success, message} = response;
          if (success) {
            vm.success(message);
            _.remove(vm.data_chest.docs, doc => {
              return doc.token_id === token_id;
            })
            vm.data_chest.chunk = _.chunk(vm.data_chest.docs, 4);
            vm.$forceUpdate();
            modal.modal('hide');
          } else {
            vm.error(message);
          }

          setTimeout(() => {
            vm.step_detail = {
              step: 1,
              message: 'Approve contract to deposit Chest to Game'
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
  }
}
</script>

<style scoped>

</style>
