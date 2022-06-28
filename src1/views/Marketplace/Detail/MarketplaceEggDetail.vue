<template>
  <div class="row mx-0">
    <div class="col-lg-4 offset-lg-1">
      <div class="my-wallet">
        <div class="mywallet-content">

          <ModalStep :step_detail="step_detail"></ModalStep>
          <div class="walltet-content-box p-4 d-flex align-items-start flex-column">
            <div class="content-box-top"><img class="w-100" src="../../../assets/images/eggs-box.png">
              <div class="content-box-top-eggs top-50 translate-middle-y text-center"><img class="w-50" src="../../../assets/images/eggs/UNICORN_1.png"></div>
            </div>
            <div class="content-box-top w-100">
              <div class="content-box-top-name position-relative">
                <div class="d-flex justify-content-center align-items-center">
                  <div class="text-radiant text-uppercase text-center">UNICORN</div>
                  <div class="position-relative ms-2 snake-id"><img class="w-100" src="../../../assets/images/id-egg.png">
                    <div class="position-absolute top-50 start-50 translate-middle">#1</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-6 px-lg-0">
      <div class="event-info">
        <div class="row mx-0">
          <div class="col-xxl-11 offset-xxl-1">
            <div class="d-md-flex align-items-center justify-content-center justify-content-lg-start">
              <h3 class="text-radiant text-uppercase text-center">UNICORN</h3>
              <div class="eg-id px-3 py-2 position-relative text-center"><img src="../../../assets/images/id-egg.png">
                <div class="position-absolute top-50 start-50 translate-middle">#1</div>
              </div>
            </div>
          </div>
        </div>
        <div class="line-divide my-2"></div>
        <div class="row mx-0">
          <div class="col-xxl-11 offset-xxl-1">
            <p class="text-warning mb-2">PRICE</p>
            <div class="d-flex align-items-center mb-2">
              <img class="icon-img mx-2" :src="getIconPaymentToken(item.paymentToken).image">
              <div class="eg-id">{{ item.price | formatEther | money }} {{ getIconPaymentToken(item.paymentToken).symbol }}</div>
            </div>
          </div>
        </div>
        <div class="row mx-0">
          <div class="col-xxl-11 offset-xxl-1">
            <p class="text-warning mb-2">AMOUNT</p>
            <div class="row mx-0">
              <div class="col-md-8 px-0">
                <div class="input-amount">
                  <div class="input-group mb-2">
                    <div class="input-group-text">
                      <button class="btn btn-amount" type="button" @click="buyDetail.qty--">-</button>
                    </div>
                    <input class="form-control" type="text" value="0" aria-label="Amount (to the nearest dollar)" v-model.number="buyDetail.qty">
                    <div class="input-group-text">
                      <button class="btn btn-amount" @click="buyDetail.qty++">+</button>
                    </div>
                    <div class="input-group-text mx-3">
                      <button class="btn btn-amount" type="button" @click="buyDetail.qty = item.amount">MAX</button>
                    </div>
                    <div class="input-group-text">Available：{{ item.amount | money('',false,0) }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="line-divide my-2"></div>
        <div class="row mx-0">
          <div class="col-xxl-11 offset-xxl-1">
            <p class="text-uppercase">Total price<span class="text-warning ms-4">{{ formatEther(item.price) * buyDetail.qty | money }} {{ getIconPaymentToken(item.paymentToken).symbol }}</span></p>
            <p class="text-uppercase">USDT price<span class="text-warning ms-4">{{ (formatEther(item.price) * buyDetail.qty) * cows | money('$',true,3) }}</span></p>
            <div class="row mx-0 mb-3">
              <div class="col-md-5 px-lg-0">
                <div class="d-grid">
                  <button class="btn btn-wallet py-3" type="button" @click="buyItem" :disabled="disable_buy">
                    <div class="text-radiant fs-5 fw-bold">{{ !item.isActive ? 'Sold out' : 'Buy' }}</div>
                  </button>
                </div>
              </div>
            </div>
            <div class="row mx-0 mb-3">
              <div class="dropdown px-0 detail-box">
                <button class="btn dropdown-toggle w-100 text-start text-warning btn-detail" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-bars me-2"></i>Details</button>
                <ul class="dropdown-menu w-100">
                  <li><a class="dropdown-item" href="javascript:void(0)">
                    <div class="row mx-0">
                      <div class="col-5 px-lg-0">Contract Address</div>
                      <div class="col-7 px-lg-0">
                        <div class="detail-input text-truncate px-2 py-1 text-end">{{ item.nft }}</div>
                      </div>
                    </div>
                  </a></li>
                  <li><a class="dropdown-item" href="javascript:void(0)">
                    <div class="row mx-0">
                      <div class="col-5 px-lg-0">Token ID</div>
                      <div class="col-7 px-lg-0">
                        <div class="detail-input px-2 py-1 text-end">{{ toNumber(item.tokenId) }}</div>
                      </div>
                    </div>
                  </a></li>
                  <li><a class="dropdown-item" href="javascript:void(0)">
                    <div class="row mx-0">
                      <div class="col-5 px-lg-0">Network</div>
                      <div class="col-7 px-lg-0">
                        <div class="detail-input px-2 py-1 text-end">Binance Smart Chain</div>
                      </div>
                    </div>
                  </a></li>
                </ul>
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
import {ethers} from "ethers";
import {SC_MARKET_EGG_1155, SC_NFTEggCBS_1155} from "@/utils/config";
import * as config from "@/utils/config";
import ModalStep from "@/components/ModalStep";

export default {
  name: "MarketplaceEggDetail",
  components: {
    ModalStep
  },
  computed: {
    ...mapState(['account', 'wallet_connect', 'contract', 'metamask', 'market']),
  },
  data() {
    return {
      item: {},
      buyDetail: {
        qty: 1,
      },
      step_detail: {
        step: 1,
        message: 'Check approve contract to buy Egg.'
      },
      disable_buy: true,
      cows: 0
    }
  },
  async created() {
    this.getSaleInfo();
    this.convertUsdtPrice();
  },
  methods: {
    getIconPaymentToken(token_address) {
      let icon = {
        image: require('../../../assets/images/cowscoin.png'),
        symbol: 'COWS'
      };
      if (!token_address) {
        return icon;
      }
      switch (token_address.toUpperCase()) {
        case '0XB084B320DA2A9AC57E06E143109CD69D495275E8': // cows
          icon = {
            image: require('../../../assets/images/cowscoin.png'),
            symbol: 'COWS'
          };
          break;
        case '0X55D398326F99059FF775485246999027B3197955': // usdt
          icon = {
            image: require('../../../assets/images/usdt.webp'),
            symbol: 'USDT'
          };
          break;
        case '0XE9E7CEA3DEDCA5984780BAFC599BD69ADD087D56': // busd
          icon = {
            image: require('../../../assets/images/busd.webp'),
            symbol: 'BUSD'
          };
          break;
      }
      return icon
    },
    getSaleInfo() {
      let vm = this;
      vm.$store.dispatch('contract/getContract', {
        contract_name: 'SC_MARKET_EGG_1155',
        signer: vm.account.wallet.signer
      }).then(async contract => {
        vm.item = await contract.getSaleInfo(vm.$route.params.id);

        if (!vm.item.isActive) {
          vm.disable_buy = true;
        } else {
          vm.disable_buy = false;
        }
      }).catch(e => {
        console.error(e);
        vm.error(e.message);
      })
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
    async buyItem() {
      let vm = this;
      if (vm.item.isSold) {
        vm.error('Order is sold out')
        return;
      }
      let modal = $('#modalStep');
      modal.modal('show')
      // approve step
      // approve nft
      await vm.approveContractNFT1155();

      // approve payment
      await vm.approveContractMarketUseToken(vm.item.paymentToken, vm.buyDetail.qty, vm.formatEther(vm.item.price))

      // signature
      let signature_data = await vm.$store.dispatch('market/getSignBuyNFT', {
        amount: vm.buyDetail.qty.toString(),
        saleId: vm.item.saleId.toString(),
      })

      // buy
      vm.$store.dispatch('contract/getContract', {
        contract_name: 'SC_MARKET_EGG_1155',
        signer: vm.account.wallet.signer
      }).then(async contract => {
        try {
          vm.step_detail = {
            step: 3,
            message: 'Buy NFT, please confirm transaction'
          }
          let buy = await contract.buyNFT(
              vm.$route.params.id,
              vm.buyDetail.qty.toString(),
              signature_data.data.message,
              signature_data.data.time_expired,
              signature_data.data.signature
          );

          vm.step_detail = {
            step: 3,
            message: 'Buy NFT, confirm transaction success please wait'
          }
          await buy.wait();

          modal.modal('hide');
          vm.getSaleInfo();
        } catch (e) {
          if (_.isNumber(e.code) && e.data) {
            vm.error(e.data.message)
          } else {
            vm.error(e.message)
          }
          modal.modal('hide');
        }
      }).catch(e => {
        if (_.isNumber(e.code) && e.data) {
          vm.error(e.data.message)
        } else {
          vm.error(e.message)
        }
        modal.modal('hide');
        vm.error(e.message)
      })
    },
    async approveContractMarketUseToken(paymentTokenAddress, amount, price) {
      let vm = this;
      let modal = $('#modalStep');
      try {
        vm.step_detail = {
          step: 2,
          message: 'Approve contract market use token to buy Egg.'
        }

        let contract = await vm.$store.dispatch('contract/getOtherContract', {
          address: paymentTokenAddress,
          signer: vm.account.wallet.signer
        });

        let getAllowance = vm.formatEther(await contract.allowance(vm.account.detail.wallet_address, SC_MARKET_EGG_1155));

        if (amount * price > getAllowance) {
          let approve = await contract.approve(SC_MARKET_EGG_1155, vm.toEther(String(amount * price)));
          vm.step_detail = {
            step: 2,
            message: 'Approve contract market use token to buy Egg success, please wait...'
          }
          await approve.wait()
        }
        return true;
      } catch (e) {
        if (_.isNumber(e.code) && e.data) {
          vm.error(e.data.message)
        } else {
          vm.error(e.message)
        }
        modal.modal('hide');
        vm.error(e.message);
        return false;
      }
    },
    async approveContractNFT1155() {
      let vm = this;
      let modal = $('#modalStep');
      try {
        let contract = await vm.$store.dispatch('contract/getContract', {
          contract_name: 'SC_NFTEggCBS_1155',
          signer: vm.account.wallet.signer
        });
        let isApproveAll = await contract.isApprovedForAll(vm.account.detail.wallet_address, SC_MARKET_EGG_1155);
        if (!isApproveAll) {
          vm.step_detail = {
            step: 1,
            message: 'Approve contract to buy Egg.'
          }
          let approve = await contract.setApprovalForAll(SC_MARKET_EGG_1155, true);
          vm.step_detail = {
            step: 1,
            message: 'Approve contract to buy Egg success, please wait...'
          }
          await approve.wait()
        }
        return true;
      } catch (e) {
        if (_.isNumber(e.code) && e.data) {
          vm.error(e.data.message)
        } else {
          vm.error(e.message)
        }
        modal.modal('hide')
        return false;
      }
    },
    convertUsdtPrice() {
      let vm = this;
      vm.$store.dispatch('token_price/getPriceCows').then(response => {
        vm.cows = Number(response.data.price);
      })
    },
    async isEgg() {
      let vm = this;
    }
  },
  watch: {
    'buyDetail.qty'(new_value, old_value) {
      let vm = this;
      let total = vm.toNumber(vm.item.amount);
      if (new_value > total) {
        vm.buyDetail.qty = old_value;
      } else if (new_value < 1) {
        vm.buyDetail.qty = old_value;
      }
    },
    'item': {
      deep: true,
      async handler() {
        let vm = this;
        try {
          if (config['SC_NFTEggCBS_1155'] != vm.item.nft) {
            await vm.$router.push({name: 'MarketplaceEgg'})
          }
        } catch (e) {
          await vm.$router.push({name: 'MarketplaceEgg'})
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
