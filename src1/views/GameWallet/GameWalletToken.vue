<template>
  <div class="mywallet-content">
    <div class="row mx-0">
      <div class="col-lg-10 offset-lg-1">
        <div class="token">
          <div class="row mx-0 py-5 my-5">
            <div class="col-md-5">
              <div class="row mx-0">
                <div class="col-8 offset-2">
                  <div class="token-logo p-2">
                    <div class="row mx-0">
                      <div class="col-5 text-center"><img class="w-100" src="../../assets/images/rim.png"></div>
                      <div class="col-7 d-flex align-items-center">
                        <div class="text-radiant">G-RIM</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="token-content p-3">
                <div class="form-label p-2 mb-2">Balance: {{ account.game_assets.grim | money }}</div>
                <div class="input-group mb-3 bg-transparent">
                  <input class="form-control p-2" type="text" value="0" v-model.number="convert_amount_grim" placeholder="Amount">
                </div>
                <div class="row mx-0 mt-5 mb-1">
                  <div class="col-6 px-1 mx-auto">
                    <div class="d-grid hvr-bounce-in">
                      <button class="btn btn-transfer py-2" type="button" @click="convertGrim">
                        <div class="text-radiant text-uppercase">Convert</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-2 d-flex align-items-center justify-content-center py-3">
              <img class="w-100 d-none d-md-block" src="../../assets/images/convert.png">
              <img class="w-25 d-block d-md-none" src="../../assets/images/convert-down.png">
            </div>
            <div class="col-md-5">
              <div class="row mx-0">
                <div class="col-8 offset-2">
                  <div class="token-logo p-2">
                    <div class="row mx-0">
                      <div class="col-5 text-center">
                        <img class="w-100" src="../../assets/images/rimcoin.png"></div>
                      <div class="col-7 d-flex align-items-center">
                        <div class="text-radiant">RIM</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="token-content p-3">
                <div class="form-label p-2 mb-2">Balance: {{ account.game_assets.rim | money }}</div>
                <div class="input-group mb-3 bg-transparent">
                  <input class="form-control p-2" type="text" v-model.number="amount_rim" placeholder="Amount">
                </div>
                <div class="row mx-0 mt-5 mb-1">
                  <div class="col-6 px-1">
                    <div class="d-grid hvr-bounce-in">
                      <!--                      <button class="btn btn-sell py-2" type="button" disabled>-->
                      <button class="btn btn-sell py-2" type="button" @click="depositRim()">
                        <div class="text-radiant text-uppercase">Deposit</div>
                      </button>
                    </div>
                  </div>
                  <div class="col-6 px-1">
                    <div class="d-grid hvr-bounce-in">
                      <!--                      <button class="btn btn-transfer py-2" type="button" disabled>-->
                      <button class="btn btn-transfer py-2" type="button" @click="withdrawRim" :disabled="disable_withdraw_btn">
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
    </div>
    <ModalStep :step_detail="step_deposit_rim"></ModalStep>

    <div class="modal fade" id="modalDepositRim" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content mywallet-modal">
          <div class="modal-header border-0 pb-0 d-flex justify-content-center">
            <h3 class="modal-title mb-3 text-center">Deposit Rim</h3>
          </div>
          <div class="modal-body pt-0">
            <div class="row mx-0 my-3">
              <div class="col-8 offset-2 text-center">
                <h4>Step {{ step_deposit_rim.step }}</h4>
                <h5>{{ step_deposit_rim.message }}</h5>
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
    <div class="modal fade" id="modalWithdrawRim" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content mywallet-modal">
          <div class="modal-header border-0 pb-0 d-flex justify-content-center">
            <h3 class="modal-title mb-3 text-center">Withdraw Rim</h3>
          </div>
          <div class="modal-body pt-0">
            <div class="row mx-0 my-3">
              <div class="col-8 offset-2 text-center">
                <h4>{{ amount_rim | money }} Rim</h4>
                <div class="loading d-flex justify-content-center align-items-center pt-4">
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
import GameMenu from "@/components/MarketMenu";
import {mapState} from "vuex";
import {SC_GAME_RIM} from "@/utils/config";
import {ethers} from "ethers";

import ModalStep from "@/components/ModalStep";

export default {
  name: "WarehouseToken",
  components: {
    GameMenu,
    ModalStep
  },
  computed: {
    ...mapState(['account', 'wallet_connect', 'contract', 'metamask', 'token_price', 'server']),
  },
  data() {
    return {
      convert_amount_grim: null,
      amount_rim: null,
      step_deposit_rim: {
        step: 1,
        message: 'Approve contract deposit'
      },
      disable_withdraw_btn: false,
    }
  },
  async created() {
    let vm = this;
    await vm.$store.dispatch('account/getAssets');
  },
  methods: {
    convertGrim() {
      let vm = this;
      vm.$store.dispatch('token_price/convertTokenGrimToRim', {
        amount: vm.convert_amount_grim
      }).then(async response => {
        let {success, message, data} = response;
        if (success) {
          vm.success(message);
          vm.$store.commit('account/UPDATE_ASSET', data);
          await vm.$store.dispatch('account/getAssets');
        } else {
          vm.error(message);
        }
      })
    },
    async depositRim() {
      let vm = this;
      if (vm.amount_rim <= 0) {
        vm.error('Amount deposit must be greater than 0')
      } else {
        $('#modalDepositRim').modal('show')
        let contract_rim = await vm.$store.dispatch('contract/getContract', {
          contract_name: 'SC_TOKEN_RIM',
          signer: vm.account.wallet.signer,
        })

        let contract_game = await vm.$store.dispatch('contract/getContract', {
          contract_name: 'SC_GAME_RIM',
          signer: vm.account.wallet.signer,
        })
        // check allowance
        let getAllowance = vm.formatEther(await contract_rim.allowance(vm.account.detail.wallet_address, SC_GAME_RIM));
        let approve_success = false;
        if (getAllowance < vm.amount_rim) {
          // approve contract game to rim token
          try {
            let approve = await contract_rim.approve(SC_GAME_RIM, ethers.utils.parseEther(vm.amount_rim.toString()));
            vm.step_deposit_rim = {
              step: 1,
              message: 'Approve contract deposit, please wait...',
            }
            await approve.wait();
            $('#modalDepositRim').modal('hide')
            approve_success = true;
          } catch (e) {
            vm.error(e.message);
            vm.step_deposit_rim = {
              step: 1,
              message: 'Approve contract deposit'
            }
          }
        } else {
          approve_success = true;
          vm.step_deposit_rim = {
            step: 1,
            message: 'Approve contract deposit'
          }
        }

        if (approve_success) {
          try {
            vm.step_deposit_rim = {
              step: 2,
              message: `Deposit ${Number(vm.amount_rim)} RIM to system`
            }
            let depositRimTransaction = await contract_game.depositRIMToGame(ethers.utils.parseEther(vm.amount_rim.toString()))

            vm.step_deposit_rim.message = `Deposit ${Number(vm.amount_rim)} RIM to system, please wait...`
            await depositRimTransaction.wait();

            vm.step_deposit_rim.message = `Deposit success. Now system update your asset, please wait...`

            vm.success('Deposit success, please wait 3-5 minutes to update in game');
            $('#modalDepositRim').modal('hide');
            vm.step_deposit_rim = {
              step: 1,
              message: 'Approve contract deposit'
            }

            await vm.$store.dispatch('account/getAssets');
          } catch (e) {
            if (_.isNumber(e.code) && e.data) {
              vm.error(e.data.message)
            } else {
              vm.error(e.message)
            }
            $('#modalDepositRim').modal('hide')
            vm.step_deposit_rim = {
              step: 1,
              message: 'Approve contract deposit'
            }
          }
        }

      }
    },
    async withdrawRim() {
      let vm = this;
      $.confirm({
        title: 'Withdraw ' + vm.amount_rim + ' RIM Token',
        content: 'If you confirm your withdrawal, your account will be temporarily blocked for the next withdrawal until the withdrawal status is successful.',
        buttons: {
          confirm: {
            text: 'Confirm (Enter)',
            btnClass: 'btn-success',
            keys: ['enter'],
            action: async function () {
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

              vm.$store.dispatch('warehouse/withdrawRIMSystem', {
                amount: vm.amount_rim
              }).then(async response => {
                let {success, message, data} = response
                if (success) {
                  $('#modalWithdrawRim').modal('show');
                  vm.account.game_assets.rim -= Number(vm.amount_rim)
                  let signature = data.signature;
                  let time_expired = data.time_expired;
                  vm.disable_withdraw_btn = true;

                  try {
                    let contract_game = await vm.$store.dispatch('contract/getContract', {
                      contract_name: 'SC_GAME_RIM',
                      signer: vm.account.wallet.signer,
                    })

                    let withdrawToken = await contract_game.withdrawRIMTokens(
                        vm.amount_rim.toString(),
                        0,
                        ethers.utils.parseEther(vm.amount_rim.toString()).toString(),
                        data.message,
                        time_expired,
                        signature
                    );
                    await withdrawToken.wait()
                    $('#modalWithdrawRim').modal('hide');
                  } catch (e) {
                    if (_.isNumber(e.code) && e.data) {
                      vm.error(e.data.message)
                    } else {
                      vm.error(e.message)
                    }
                    $('#modalWithdrawRim').modal('hide');
                    vm.disable_withdraw_btn = false;
                  }
                  await vm.$store.dispatch('account/getAssets');
                } else {
                  vm.error(message)
                  $('#modalWithdrawRim').modal('hide');
                }
              }).catch(error => {
                console.error(error)
                vm.error(error.message);
                $('#modalWithdrawRim').modal('hide');
              })
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
    formatEther(value) {
      if (value !== undefined && value !== null) {
        return Number(ethers.utils.formatEther(ethers.BigNumber.from(value).toString()));
      }
      return 0;
    },
  }
}
</script>

<style scoped>

</style>
