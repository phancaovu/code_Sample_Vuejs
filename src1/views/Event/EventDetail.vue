<template>
  <div class="right-tab mywallet-content">
    <div class="row mx-0 mt-3">
      <div class="col-lg-5 ps-lg-0">
        <div class="event-box py-5">
          <!--.row.mx-0-->
          <!--    .col-6.offset-3-->
          <!--        img.w-100(src='client/images/eggs.png')-->
          <!--.row.mx-0.px-4-->
          <!--    .col-3-->
          <!--        img.w-100(src='client/images/naga.png')-->
          <!--    .col-3-->
          <!--        img.w-100(src='client/images/hydra.png')-->
          <!--    .col-3-->
          <!--        img.w-100(src='client/images/lord.png')-->
          <!--    .col-3-->
          <!--        img.w-100(src='client/images/sheron.png')--><img class="w-100 px-4" src="../../assets/images/egg-event.png">
        </div>
      </div>
      <div class="col-lg-7 px-lg-0">
        <div class="event-info">
          <div class="row mx-0">
            <div class="col-xxl-10 offset-xxl-1">
              <div class="d-md-flex align-items-center justify-content-center justify-content-lg-start">
                <h3 class="text-radiant text-uppercase text-center">{{ detail.title }}</h3>
                <div class="eg-id px-3 py-2 position-relative text-center"><img src="../../assets/images/id-egg.png">
                  <div class="position-absolute top-50 start-50 translate-middle">#{{ detail.id }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="line-divide my-2"></div>
          <!--          <div class="row mx-0">-->
          <!--            <div class="col-xxl-10 offset-xxl-1">-->
          <!--              <div class="text-gold"><span>Available</span><span class="float-end">{{ event.detail.limit | money('', false, 0) }}</span></div>-->
          <!--            </div>-->
          <!--          </div>-->
          <!--          <div class="line-divide my-2"></div>-->
          <div class="row mx-0">
            <div class="col-xxl-10 offset-xxl-1">
              <p class="text-warning mb-2">PRICE</p>
              <div class="d-flex align-items-center mb-2"><img class="icon-img mx-2" src="../../assets/images/cowscoin.png">
                <div class="eg-id">{{ detail.price | money('COWS') }}</div>
              </div>
            </div>
          </div>
          <!--          <div class="row mx-0">-->
          <!--            <div class="col-xxl-10 offset-xxl-1">-->
          <!--              <p class="text-warning mb-2">AMOUNT</p>-->
          <!--              <div class="row mx-0">-->
          <!--                <div class="col-md-8 px-0">-->
          <!--                  <div class="input-amount">-->
          <!--                    <div class="input-group mb-2">-->
          <!--                      <div class="input-group-text">-->
          <!--                        <button class="btn btn-amount" @click="buy.amount&#45;&#45;">-</button>-->
          <!--                      </div>-->
          <!--                      <input class="form-control" type="text" value="1" v-model="buy.amount" aria-label="Amount (to the nearest dollar)">-->
          <!--                      <div class="input-group-text">-->
          <!--                        <button class="btn btn-amount" @click="buy.amount++">+</button>-->
          <!--                      </div>-->
          <!--                      <div class="input-group-text mx-3">-->
          <!--                        <button class="btn btn-amount">MAX</button>-->
          <!--                      </div>-->
          <!--                      <div class="input-group-text">Available：{{ event.detail.limit | money('', false, 0) }}</div>-->
          <!--                    </div>-->
          <!--                  </div>-->
          <!--                </div>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->
          <div class="line-divide my-2"></div>
          <div class="row mx-0">
            <div class="col-xxl-10 offset-xxl-1">
              <!--              <p class="text-uppercase">Total price<span class="text-warning ms-4">{{ event.detail.price * buy.amount | money('COWS') }}</span></p>-->
              <div class="row mx-0 mb-2">
                <div class="col-5">
                  <div class="d-grid">
                    <button class="btn btn-wallet py-3" type="button" @click="buyChest" :disabled="pending_step !== 0">
                      <div class="text-radiant fs-5 fw-bold">BUY</div>
                    </button>
                  </div>
                </div>
                <div class="col-7">
<!--                  <p class="mb-0 fs-5 text-gold">Start: {{ detail.startAt | convertMicrosecond }}</p>-->
<!--                  <p class="mb-0 fs-5 text-gold">End: {{ detail.endAt | convertMicrosecond }}</p>-->
                  <p class="mb-0 fs-5 text-gold">Remains: {{ detail.remains === -1 ? 'Unlimit' : detail.remains }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="modalStep" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalStep" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content mywallet-modal">
          <div class="modal-body pt-0">
            <div class="row mx-0 my-3">
              <div class="col-8 offset-2 text-center">
                <h4>Step {{ step_detail.step }}</h4>
                <h5>{{ step_detail.message }}</h5>
                <div id="loading-register" class="loading d-flex justify-content-center align-items-center pt-4">
                  <div class="spinner-border text-warning" role="status"><span class="visually-hidden"></span></div>
                </div>
              </div>
            </div>
          </div>
          <!-- loading-mark -->
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {mapState} from "vuex";
import {ethers} from "ethers";
import * as SELL_EGG_UNICORN from "@/utils/abi/sell_egg_unicorn";
import {SC_COWS_GAME, SC_NFTEggCBS, SC_SELL_EGG_UNICORN, SC_TOKEN} from "@/utils/config";
import * as config from "@/utils/config";

import * as ABI_SC_SELL_EGG_UNICORN from '@/utils/abi/sell_egg_unicorn';

export default {
  name: 'EventDetail',
  components: {},
  computed: {
    ...mapState(['event', 'contract', 'account', 'server'])
  },
  data() {
    return {
      buy: {
        amount: 1,
      },
      detail: {},
      step_detail: {
        step: 1,
        message: 'Approve contract to use COWS buy Egg'
      },
      pending_step: 0,
    }
  },
  created() {
    let vm = this;
    vm.getItem(vm.$route.params.id);
  },
  methods: {
    getItem(id) {
      let vm = this;
      vm.$store.dispatch('event/getEvent', {id}).then(response => {
        let {success, data} = response;
        if (success) {
          vm.detail = data;
        }
      }).catch(e => {
        this.error(e.message);
      })
    },
    async buyChest() {
      let vm = this;
      let modal = $('#modalStep');
      try {
        if (vm.account.wallet.signer === null) {
          vm.error('Please login wallet.')
        } else {
          let checkToken = vm.$store.dispatch('account/checkTokenAlive');
          if (!checkToken) {
            vm.error('Please logout and login again to buy egg')
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

          modal.modal('show');
          let contractBuyEgg = new ethers.Contract(vm.detail.contract, SELL_EGG_UNICORN, vm.account.wallet.signer);
          let rate = await contractBuyEgg.tokenRate();

          let contract_cows = await vm.$store.dispatch('contract/getContract', {
            signer: vm.account.wallet.signer,
            contract_name: 'SC_TOKEN'
          })
          vm.pending_step = 1;

          // approve to access wallet get cows to buy egg
          let approveCows = await contract_cows.approve(SC_SELL_EGG_UNICORN, rate.toString());
          vm.step_detail = {
            step: 1,
            message: 'Approve contract to use COWS buy Egg, please wait...'
          }
          await approveCows.wait();

          vm.step_detail = {
            step: 2,
            message: 'Buy Egg'
          }

          let transaction = await contractBuyEgg.buyEGG();

          vm.step_detail = {
            step: 2,
            message: 'Buy Egg, waiting...'
          }

          let transactionReceipt = await transaction.wait();

          const iface = new ethers.utils.Interface(ABI_SC_SELL_EGG_UNICORN)
          for (let l = 0; l < transactionReceipt.logs.length; l++) {
            let log = transactionReceipt.logs[l];
            try {
              let logInfo = iface.parseLog(log);
              if (logInfo.name === "ClaimNFT") {
                vm.step_detail = {
                  step: 3,
                  message: 'NFT identification in progress, please wait...'
                }

                // let tokenid = logInfo.args['tokenid'].toString()

                // let contract_egg = await vm.$store.dispatch('contract/getContract', {
                //   signer: vm.account.wallet.signer,
                //   contract_name: 'SC_NFTEggCBS'
                // });
                //
                // let contract_cows_game = await vm.$store.dispatch('contract/getContract', {
                //   signer: vm.account.wallet.signer,
                //   contract_name: 'SC_COWS_GAME'
                // });
                //
                // // call nft_egg approve contract cows_game
                // let approveContract = await contract_egg.approve(SC_COWS_GAME, tokenid);
                // vm.step_detail = {
                //   step: 3,
                //   message: 'Approve contract to deposit Unicorn Egg to Game, please wait...'
                // }
                // await approveContract.wait()
                //
                // vm.step_detail = {
                //   step: 4,
                //   message: `Approve contract success, please Confirm deposit Token ${tokenid} to Game`
                // }
                //
                // let depositUnicornEgg = await contract_cows_game.depositNFTsToGame(SC_NFTEggCBS, tokenid);
                //
                // vm.step_detail = {
                //   step: 4,
                //   message: `Approve contract success, please Confirm deposit Token ${tokenid} to Game, please wait...`
                // }
                //
                // await depositUnicornEgg.wait();

                // done
                vm.$store.dispatch('event/buyChest', {
                  transaction_hash: transaction.hash,
                  event_id: vm.detail.id,
                }).then(response => {
                  let {success, message} = response;
                  if (success) {
                    vm.success(message);
                  } else {
                    vm.error(message);
                  }
                  modal.modal('hide');
                  vm.pending_step = 0;
                  setTimeout(() => {
                    vm.step_detail = {
                      step: 1,
                      message: 'Approve contract to use COWS buy Egg'
                    }
                  }, 1200)
                })
                break;
              }
            } catch (e) {
            }
          }
        }
      } catch (e) {
        if (e.code === -32603) {
          vm.error("Balance not enough");
        } else {
          vm.error(e.message);
        }
        vm.pending_step = 0;
        modal.modal('hide');
      }
    }
  },
  watch: {
    'buy.amount'(new_value) {
      let vm = this;
      if (new_value > vm.event.detail.limit) {
        vm.buy.amount = vm.event.detail.limit;
      } else if (new_value === 0) {
        vm.buy.amount = 1;
      }
    }
  }
}
</script>
