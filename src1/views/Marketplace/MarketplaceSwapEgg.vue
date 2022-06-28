<template>
  <div class="mywallet-content">
    <ModalStep :step_detail="step_detail"></ModalStep>

    <div class="rate-filter">
      <div class="row mx-0">
        <div class="col-md-9">
          <ul class="nav">
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
<!--        <div class="col-md-3 d-lg-flex align-items-center justify-content-end">-->
<!--          <div class="d-lg-grid">-->
<!--            <select class="form-select select-point" v-model="egg_filters.sort">-->
<!--              <option value="RECENT">Recently list</option>-->
<!--              <option value="ASC">Lowest price</option>-->
<!--              <option value="DESC">Highest price</option>-->
<!--            </select>-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </div>

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
              <div class="col-8 mx-auto px-1">
                <div class="d-grid hvr-bounce-in">
                  <button class="btn btn-sell" type="button" @click="swapEgg()">
                    <div class="text-radiant text-uppercase">Swap Egg</div>
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
import {ethers} from 'ethers';
import ModalStep from "@/components/ModalStep";
import {
  SC_COWS_GAME_1155,
  SC_MARKET_EGG_1155,
  SC_NFTEggCBS_1155,
  SC_NFTEggCBS_OLD,
  SC_SWAP_EGG,
  SC_TOKEN
} from "@/utils/config";

export default {
  name: 'MarketplaceSwapEgg',
  components: {
    ModalStep
  },
  computed: {
    ...mapState(['account', 'wallet_connect', 'contract', 'metamask', 'warehouse', 'server']),
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
      step_detail: {
        step: 1,
        message: ''
      },
      swap_detail: {
        address: null,
        token_id: 1,
        amount: 0,
      },
    }
  },
  created() {
    let vm = this;
    vm.loadNFTInWallet();
  },
  methods: {
    eggImage(snake_type, skin_id) {
      return require(`../../assets/images/eggs/${snake_type}_${skin_id}.png`);
    },
    async loadNFTInWallet() {
      let vm = this;
      if (vm.account.detail.wallet_address) {
        let contractUnicornEgg = await vm.$store.dispatch('contract/getContract', {
          contract_name: 'SC_NFTEggCBS_OLD',
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
          vm.swap_detail.amount = vm.$options.filters.toNumber(balanceOf)
          vm.data_egg.chunk = _.chunk(vm.data_egg.docs, 4);
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

    async approveContractSwap() {
      let vm = this;
      try {
        vm.step_detail = {
          step: 1,
          message: 'Approve contract swap egg'
        }
        let contractUnicornEggOld = await vm.$store.dispatch('contract/getContract', {
          contract_name: 'SC_NFTEggCBS_OLD',
          signer: vm.account.wallet.signer,
        })
        let isApproveAll = await contractUnicornEggOld.isApprovedForAll(vm.account.detail.wallet_address, SC_SWAP_EGG);
        if (!isApproveAll) {
          let approve = await contractUnicornEggOld.setApprovalForAll(SC_SWAP_EGG, true);
          vm.step_detail = {
            step: 1,
            message: 'Approve contract swap Egg success, please wait...'
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

    async swapEgg() {
      let vm = this;
      let modal = $('#modalStep');
      try {
        modal.modal('show');

        await vm.approveContractSwap()
        let contractSwapEgg = await vm.$store.dispatch('contract/getContract', {
          contract_name: 'SC_SWAP_EGG',
          signer: vm.account.wallet.signer,
        })
        vm.step_detail = {
          step: 2,
          message: 'Please confirm your transaction swap'
        }

        // get signature
        let signature_data = await vm.$store.dispatch('market/getSignEgg', {
          token_id: vm.swap_detail.token_id,
          snake_type: "UNICORN",
          skin_id: vm.swap_detail.token_id,
          amount: vm.swap_detail.amount,
        })
        console.log(signature_data)
        let swap = await contractSwapEgg.swapNFT(
            SC_NFTEggCBS_OLD,
            vm.swap_detail.token_id.toString(),
            vm.swap_detail.amount.toString(),
            signature_data.data.message,
            signature_data.data.time_expired,
            signature_data.data.signature,
        );
        vm.step_detail = {
          step: 2,
          message: 'Confirm transaction swap success, please wait...'
        }

        await swap.wait();
        modal.modal('hide');

        await vm.loadNFTInWallet();
        vm.success('Swap success');
      } catch (e) {
        modal.modal('hide');
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
      vm.loadNFTInWallet();
      // vm.loadNFTInContractGame1155();
    },
    'egg_filters.snake_type'() {
      let vm = this;
      vm.filter();
    }
  }
}
</script>
