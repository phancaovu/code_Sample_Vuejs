<template>
  <header>
    <div class="offcanvas offcanvas-start menu-bar-mb" id="menu-bm" tabindex="-1"
         aria-labelledby="offcanvasExampleLabel">
      <div class="offcanvas-header">
        <button class="btn-close invisible d-md-none" type="button" data-bs-dismiss="offcanvas"
                aria-label="Close"></button>
        <div class="offcanvas-title">
          <div class="brand-logo"><img class="logo" src="../assets/images/logo.png"></div>
        </div>
        <button class="btn-close text-reset" type="button" data-bs-dismiss="offcanvas"
                aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <nav class="navbar navbar-expand-lg">
          <ul class="navbar-nav mb-2 mb-lg-0 mx-auto">
            <!--            <li class="nav-item mb-2">-->
            <!--              <a :href="$router.resolve({name: 'Event'}).href" class="nav-link px-4">EVENT</a>-->
            <!--            </li>-->
            <li class="nav-item mb-2">
              <a :href="$router.resolve({name: 'Marketplace'}).href" class="nav-link px-4">Marketplace</a>
            </li>
            <li class="nav-item mb-2" v-if="account.detail.wallet_address !== null">
              <a :href="$router.resolve({name: 'MyWallet'}).href" class="nav-link px-4">My Wallet</a>
            </li>
            <li class="nav-item mb-2" v-if="account.detail.wallet_address !== null">
              <a :href="$router.resolve({name: 'GameWallet'}).href" class="nav-link px-4">Warehouse</a>
            </li>
            <!--            <li class="nav-item mb-2">-->
            <!--              <a :href="$router.resolve({name: 'Pool'}).href" class="nav-link px-4">Pool</a>-->
            <!--            </li>-->
            <!--            <li class="nav-item mb-2">-->
            <!--              <a :href="$router.resolve({name: 'ClaimToken'}).href" class="nav-link px-4">Claim Token</a>-->
            <!--            </li>-->
            <li v-if="!account.detail.wallet_address" class="nav-item mb-2">
              <a class="btn btn-connect py-2 w-100" href="#" data-bs-toggle="modal" data-bs-target="#wallet-connect">
                <div class="text-radiant">CONNECT WALLET</div>
              </a>
            </li>
            <li v-if="account.detail.wallet_address" class="nav-item mb-2">
              <a class="btn btn-connect py-2 w-100" href="#">
                <div class="text-radiant">{{ splitAddress(account.detail.wallet_address) }}</div>
              </a>
            </li>
            <li v-if="account.detail.wallet_address" class="nav-item mb-2">
              <a class="btn btn-connect py-2 w-100" href="/profile">
                <div class="text-radiant">Profile</div>
              </a>
            </li>
            <li v-if="account.detail.wallet_address" class="nav-item mb-2">
              <a class="btn btn-connect py-2 w-100" href="#">
                <div class="text-radiant" @click="disconnectWallet">DISCONNECT</div>
              </a></li>
          </ul>
        </nav>
      </div>
    </div>
    <!-- wallet-popup-->
    <div class="modal fade" id="wallet-connect" tabindex="-1" aria-labelledby="exampleModalLabel"
         aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content wallet-box">
          <div class="modal-header border-0 pb-0">
            <h3 class="modal-title"></h3>
            <button class="btn" type="button" data-bs-dismiss="modal" aria-label="Close"><i
                class="fas fa-times fa-2x text-light"></i></button>
          </div>
          <div class="modal-body pt-0">
            <div class="row mx-0">
              <div class="col-10 offset-1">
                <h3 class="modal-title text-center text-uppercase text-radiant mb-3">Connect to a wallet</h3>
                <!--                <a href="javascript:void(0)">-->
                <!--                <div class="btn-wallet p-3 mb-3">-->
                <!--                  <div class="row mx-0 px-2">-->
                <!--                    <div class="col-9 d-flex align-items-center">-->
                <!--                      <p class="mb-0 name-wallet">MOBOX Wallet (Recommended)</p>-->
                <!--                    </div>-->
                <!--                    <div class="col-3"><img class="w-100" src="../assets/images/mobox.png"></div>-->
                <!--                  </div>-->
                <!--                </div>-->
                <!--              </a>-->
                <!--                <a href="javascript:void(0)">-->
                <!--                <div class="btn-wallet p-3 mb-3">-->
                <!--                  <div class="row mx-0 px-2">-->
                <!--                    <div class="col-9 d-flex align-items-center">-->
                <!--                      <p class="mb-0 name-wallet">Binance Chain Wallet</p>-->
                <!--                    </div>-->
                <!--                    <div class="col-3"><img class="w-100" src="../assets/images/bnc.png"></div>-->
                <!--                  </div>-->
                <!--                </div>-->
                <!--              </a>-->
                <a href="javascript:void(0)" @click.prevent="metamaskConnect">
                  <div class="btn-wallet p-3 mb-3">
                    <div class="row mx-0 px-2">
                      <div class="col-9 d-flex align-items-center">
                        <p class="mb-0 name-wallet">Metamask (Recommended)</p>
                      </div>
                      <div class="col-3"><img class="w-100" src="../assets/images/metamask.png"></div>
                    </div>
                  </div>
                </a>
                <a href="javascript:void(0)" @click.prevent="walletConnect">
                  <div class="btn-wallet p-3 mb-3">
                    <div class="row mx-0 px-2">
                      <div class="col-9 d-flex align-items-center">
                        <p class="mb-0 name-wallet">WalletConnect</p>
                      </div>
                      <div class="col-3"><img class="w-100" src="../assets/images/wcon.png"></div>
                    </div>
                  </div>
                </a>
                <!--                <a href="javascript:void(0)">-->
                <!--                <div class="btn-wallet p-3 mb-3">-->
                <!--                  <div class="row mx-0 px-2">-->
                <!--                    <div class="col-9 d-flex align-items-center">-->
                <!--                      <p class="mb-0 name-wallet">Safepal</p>-->
                <!--                    </div>-->
                <!--                    <div class="col-3"><img class="w-100" src="../assets/images/safepal.png"></div>-->
                <!--                  </div>-->
                <!--                </div>-->
                <!--              </a>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- login-popup-->
    <div class="modal fade" id="register-game-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
         aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content mywallet-modal">
          <div class="modal-header border-0 pb-0 d-flex justify-content-center">
            <!--            <button class="btn invisible" type="button" data-bs-dismiss="modal" aria-label="Close"><i class="fas fa-times fa-2x text-light"></i></button>-->
            <h3 class="modal-title mb-3 text-center">Register Game</h3>
            <!--            <button class="btn" type="button" data-bs-dismiss="modal" aria-label="Close"><i class="fas fa-times fa-2x text-light"></i></button>-->
          </div>
          <div class="modal-body pt-0">
            <div class="row mx-0 my-3">
              <div class="col-8 offset-2">
                <!--                <div v-if="!isRegisterSC" class="text-center">-->
                <!--                  <h3>Step 1</h3>-->
                <!--                  <h4>Register wallet address</h4>-->
                <!--                  <h5>{{ account.detail.wallet_address | splitAddress(5) }}</h5>-->
                <!--                  <h6>Please confirm the contract to next step</h6>-->
                <!--                  <div class="spinner-border mt-3" role="status">-->
                <!--                    <span class="visually-hidden">Loading...</span>-->
                <!--                  </div>-->
                <!--                </div>-->
                <form>
                  <!--                <form v-else>-->
                  <div class="text-center">
                    <h3>Step 2</h3>
                    <h4 class="mb-2">Register account game</h4>
                  </div>
                  <div class="form-floating mb-3">
                    <input v-model="register.username" class="form-control" id="floatingUsername" type="text"
                           placeholder="Username">
                    <label for="floatingPassword">Username</label>
                  </div>
                  <div class="form-floating mb-3">
                    <input v-model="register.password" class="form-control" id="floatingPassword" type="password"
                           placeholder="Password">
                    <label for="floatingPassword">Password</label>
                  </div>
                  <div class="form-floating mb-3">
                    <input v-model="register.email" class="form-control" id="floatingInput" type="email"
                           placeholder="name@example.com">
                    <label for="floatingInput">Email</label>
                  </div>
                  <div class="d-grid">
                    <button @click.prevent="registerAccountGame" class="btn btn-submit mx-auto" type="submit">
                      <div class="text-radiant">Submit</div>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <!-- loading-mark -->
          <div id="loading-register" class="loading d-flex justify-content-center align-items-center invisible">
            <div class="spinner-border text-warning" role="status"><span class="visually-hidden"></span></div>
          </div>
        </div>
      </div>
    </div>
    <!-- download app-->
    <div class="modal fade" id="download-app" tabindex="-1" aria-labelledby="exampleModalLabel"
         aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content wallet-box">
          <div class="modal-header border-0 pb-0">
            <h3 class="modal-title"></h3>
            <button class="btn" type="button" data-bs-dismiss="modal" aria-label="Close"><i
                class="fas fa-times fa-2x text-light"></i></button>
          </div>
          <div class="modal-body pt-0">
            <div class="row mx-0">
              <div class="col-10 offset-1">
                <h3 class="modal-title text-center text-uppercase text-radiant mb-3">Choose version</h3>
                <a :href="`${left_menu['data']['LINK_DOWNLOAD_APP'] ? left_menu['data']['LINK_DOWNLOAD_APP']['value']['windows'] : ''}`">
                  <div class="btn-wallet p-3 mb-3">
                    <div class="row mx-0 px-2">
                      <div class="col-9 d-flex align-items-center">
                        <p class="mb-0 name-wallet">Windows</p>
                      </div>
                      <div class="col-3"><img class="w-100" src="../assets/images/windows.svg"></div>
                    </div>
                  </div>
                </a>
                <a :href="`${left_menu['data']['LINK_DOWNLOAD_APP'] ? left_menu['data']['LINK_DOWNLOAD_APP']['value']['macos'] : ''}`">
                  <div class="btn-wallet p-3 mb-3">
                    <div class="row mx-0 px-2">
                      <div class="col-9 d-flex align-items-center">
                        <p class="mb-0 name-wallet">Mac OS</p>
                      </div>
                      <div class="col-3"><img class="w-100" src="../assets/images/apple.svg"></div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- maintenance-modal -->
    <div class="modal fade" id="modalMaintenance" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
         aria-labelledby="modalMaintenance" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content mywallet-modal">
          <div class="modal-header border-0 pb-0 d-flex justify-content-center">
            <div><img src="../assets/images/logo.png" alt="Cowboysnake"></div>
          </div>
          <div class="modal-body pt-0">
            <div class="row mx-0 my-3">
              <div class="col-12 text-center">
                <h1>Website is maintenance</h1>
              </div>
            </div>
          </div>
          <!-- loading-mark -->
        </div>
      </div>
    </div>

    <div class="modal fade" id="loginSign" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
         aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content mywallet-modal">
          <div class="modal-header border-0 pb-0 d-flex justify-content-center">
            <!--            <button class="btn invisible" type="button" data-bs-dismiss="modal" aria-label="Close"><i class="fas fa-times fa-2x text-light"></i></button>-->
            <h3 class="modal-title mb-3 text-center">Signature login wallet</h3>
            <!--            <button class="btn" type="button" data-bs-dismiss="modal" aria-label="Close"><i class="fas fa-times fa-2x text-light"></i></button>-->
          </div>
          <div class="modal-body pt-0">
            <div class="row mx-0 my-3">
              <div class="col-8 offset-2">
                <div class="text-center">
                  <h4 class="mb-2">Please sign before access account in system</h4>
                  <div class="spinner-border mt-3" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="menubg position-relative">
      <img class="w-100 img-bg-menu" src="../assets/images/bgmenu.png">
      <div class="position-absolute top-0 brand-logo">
        <a class="navbar-brand ms-lg-5" href="#">
          <img class="logo" src="../assets/images/logo.png">
        </a>
      </div>
      <nav class="navbar navbar-expand-lg menu-bar">
        <div class="container">
          <div class="brand-logo"></div>
          <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#menu-bm">
            <img src="../assets/images/btn-menu.png">
          </button>
          <div class="collapse navbar-collapse">
            <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
              <!--              <li class="nav-item me-lg-3">-->
              <!--                <router-link :to="{ name: 'Event' }" :class="['nav-link', 'px-4']" active-class="active">Event-->
              <!--                </router-link>-->
              <!--              </li>-->
              <li class="nav-item me-lg-3">
                <router-link :to="{ name: 'Marketplace' }" :class="['nav-link', 'px-4']" active-class="active">
                  MARKETPLACE
                </router-link>
              </li>
              <li class="nav-item me-lg-3" v-if="account.detail.wallet_address !== null">
                <router-link :to="{ name: 'MyWallet' }" :class="['nav-link', 'px-4']" active-class="active">My Wallet
                </router-link>
              </li>
              <li class="nav-item me-lg-3" v-if="account.detail.wallet_address !== null">
                <router-link :to="{ name: 'GameWallet' }" :class="['nav-link', 'px-4']" active-class="active">Warehouse
                </router-link>
              </li>
              <li class="nav-item me-lg-3">
                <router-link :to="{ name: 'Pool' }" :class="['nav-link', 'px-4']" active-class="active">Pool
                </router-link>
              </li>
              <!--              <li class="nav-item">-->
              <!--                <router-link :to="{ name: 'ClaimToken' }" :class="['nav-link', 'px-4']" active-class="active">Claim-->
              <!--                  Token-->
              <!--                </router-link>-->
              <!--              </li>-->
            </ul>
            <div v-if="!account.detail.wallet_address" class="d-flex">
              <a class="btn btn-connect py-2" href="#" data-bs-toggle="modal" data-bs-target="#wallet-connect">
                <div class="text-radiant">CONNECT WALLET</div>
              </a>
            </div>
            <div v-else class="dropdown">
              <button class="btn btn-connect py-2 dropdown-toggle text-lowercase" type="button"
                      data-bs-toggle="dropdown" aria-expanded="false"
                      v-text="splitAddress(account.detail.wallet_address)"></button>
              <ul class="dropdown-menu dropdown-menu-end text-center" aria-labelledby="dropdownMenuButton1">
                <li>
                  <router-link :to="{name: 'Profile'}" class="dropdown-item">
                    Profile
                    <svg class="svg-inline--fa fa-user-cog fa-w-20 ms-2" aria-hidden="true" focusable="false"
                         data-prefix="fas" data-icon="user-cog" role="img" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 640 512" data-fa-i2svg="">
                      <path fill="currentColor"
                            d="M610.5 373.3c2.6-14.1 2.6-28.5 0-42.6l25.8-14.9c3-1.7 4.3-5.2 3.3-8.5-6.7-21.6-18.2-41.2-33.2-57.4-2.3-2.5-6-3.1-9-1.4l-25.8 14.9c-10.9-9.3-23.4-16.5-36.9-21.3v-29.8c0-3.4-2.4-6.4-5.7-7.1-22.3-5-45-4.8-66.2 0-3.3.7-5.7 3.7-5.7 7.1v29.8c-13.5 4.8-26 12-36.9 21.3l-25.8-14.9c-2.9-1.7-6.7-1.1-9 1.4-15 16.2-26.5 35.8-33.2 57.4-1 3.3.4 6.8 3.3 8.5l25.8 14.9c-2.6 14.1-2.6 28.5 0 42.6l-25.8 14.9c-3 1.7-4.3 5.2-3.3 8.5 6.7 21.6 18.2 41.1 33.2 57.4 2.3 2.5 6 3.1 9 1.4l25.8-14.9c10.9 9.3 23.4 16.5 36.9 21.3v29.8c0 3.4 2.4 6.4 5.7 7.1 22.3 5 45 4.8 66.2 0 3.3-.7 5.7-3.7 5.7-7.1v-29.8c13.5-4.8 26-12 36.9-21.3l25.8 14.9c2.9 1.7 6.7 1.1 9-1.4 15-16.2 26.5-35.8 33.2-57.4 1-3.3-.4-6.8-3.3-8.5l-25.8-14.9zM496 400.5c-26.8 0-48.5-21.8-48.5-48.5s21.8-48.5 48.5-48.5 48.5 21.8 48.5 48.5-21.7 48.5-48.5 48.5zM224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm201.2 226.5c-2.3-1.2-4.6-2.6-6.8-3.9l-7.9 4.6c-6 3.4-12.8 5.3-19.6 5.3-10.9 0-21.4-4.6-28.9-12.6-18.3-19.8-32.3-43.9-40.2-69.6-5.5-17.7 1.9-36.4 17.9-45.7l7.9-4.6c-.1-2.6-.1-5.2 0-7.8l-7.9-4.6c-16-9.2-23.4-28-17.9-45.7.9-2.9 2.2-5.8 3.2-8.7-3.8-.3-7.5-1.2-11.4-1.2h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c10.1 0 19.5-3.2 27.2-8.5-1.2-3.8-2-7.7-2-11.8v-9.2z"></path>
                    </svg>
                  </router-link>
                </li>
                <li><a class="dropdown-item" href="#" @click.prevent="disconnectWallet">Logout<i
                    class="fas fa-sign-out-alt ms-2"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import {mapState} from "vuex";
import {CHAIN_ID, CHAIN_ID_HEX, CLIENT_TOKEN, RPC_URL, SC_SIGN} from "@/utils/config";
import $ from "jquery";
import {ethers, providers} from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import * as moment from "moment";

export default {
  name: "Header",
  computed: {
    ...mapState(['account', 'wallet_connect', 'contract', 'metamask', 'server', 'left_menu']),
    currentRouteName() {
      return this.$route.name;
    },
  },
  data() {
    return {
      isConnect: false,
      register: {
        username: '',
        password: '',
        email: ''
      },
      isRegisterSC: false,
      isRegisterGame: false,
      loopCheck: null,
    }
  },
  async created() {
    let vm = this;
    await vm.saveRef();
    await vm.$store.dispatch('left_menu/loadConfig');
    vm.$forceUpdate();
  },
  async mounted() {
    let vm = this;
    await vm.autoConnectWallet()
    await vm.checkServerMaintenance();
  },
  methods: {
    async checkServerMaintenance() {
      let vm = this;
      if (vm.server.ping) {
        let {data, success} = await vm.$store.dispatch('server/ping');
        if (!success) {
          $('#modalMaintenance').modal('show');
        } else if (!data) {
          $('#modalMaintenance').modal('show');
        }
      } else {
        $('#modalMaintenance').modal('show');
      }
    },
    async checkRegisterSC() {
      let vm = this
      if (vm.account.detail.wallet_address) {
        let contract = await vm.$store.dispatch('contract/getContract', {
          contract_name: 'SC_USER',
          signer: vm.account.wallet.signer,
        })
        try {
          vm.isRegisterSC = await contract.isRegister(vm.account.detail.wallet_address)
        } catch (e) {
          if (e.data) {
            vm.error(e.data.message)
          } else {
            vm.error(e.message)
          }
          vm.isRegisterSC = false
        }
        if (!vm.isRegisterSC) {
          setTimeout(async () => {
            await vm.registerSC();
          }, 1000)
        }
      }
    },
    async registerSC() {
      let vm = this
      if (vm.account.detail.wallet_address) {
        let ref_address = sessionStorage.getItem('ref_address');
        if (!ethers.utils.isAddress(ref_address) || ref_address === '0x0000000000000000000000000000000000000000') {
          ref_address = '0xE0665882ABFa0872926a7AC39fA491155D5E9e05'
        }

        let contract = await vm.$store.dispatch('contract/getContract', {
          contract_name: 'SC_USER',
          signer: vm.account.wallet.signer,
        })
        try {
          let transaction = null;
          if (!vm.isRegisterSC) {
            transaction = await contract.Register(ref_address)
            await transaction.wait();
          }
          vm.loopCheck = setInterval(async () => {
            await vm.checkRegisterSC();
            if (vm.isRegisterSC) {
              clearInterval(vm.loopCheck);
              vm.loopCheck = null
            }
          }, 3000)
        } catch (e) {
          if (e.data) {
            vm.error(e.data.message)
          } else {
            vm.error(e.message)
          }
          vm.isRegisterSC = false
        }
      } else {
        vm.error('Please connect wallet')
      }
    },
    async registerAccountGame() {
      let vm = this
      if (vm.account.detail.wallet_address) {
        vm.$store.dispatch('account/registerAccountGame', {
          email: vm.register.email,
          username: vm.register.username,
          password: vm.register.password,
          ref_id: null,
          wallet_address: vm.account.detail.wallet_address
        }).then(async response => {
          let {data, success, code, message} = response
          if (success) {
            await $('#register-game-modal').modal('hide');
            await $('body').removeClass('modal-open')
            await $('body').removeAttr('style');
            await $('.modal-backdrop').remove();
            vm.isRegisterGame = true
            vm.success('Register successfully')
            await vm.loginAPI(await vm.signLogin());
            vm.$forceUpdate();
          } else {
            vm.error(message)
            vm.isRegisterGame = false
            await $('#loading-register').addClass('invisible')
            await $('#register-game-modal').modal('show');
            vm.$forceUpdate();
          }
        }).catch(async e => {
          vm.error(e)
          await $('#loading-register').addClass('invisible')
          await $('#register-game-modal').modal('show');
        })
      } else {
        vm.error('Please connect wallet')
      }
    },
    async autoConnectWallet() {
      let vm = this;
      let auto_connect = sessionStorage.getItem('auto_connect');
      let connect_by = sessionStorage.getItem('connect_by');
      if (auto_connect === 'on') {
        // check is connect metamask
        if (window.ethereum) {
          if (connect_by === 'metamask') {
            const walletAddress = await window.ethereum.request({
              method: "eth_requestAccounts",
              params: [
                {
                  eth_accounts: {}
                }
              ]
            });
            if (walletAddress.length > 0) {
              await vm.metamaskConnect();
            }
          } else {
            await vm.walletConnect();
          }
        } else {
          await vm.walletConnect();
        }
      }
    },
    async saveRef() {
      let vm = this;
      if (vm.$route.query.ref_id && ethers.utils.isAddress(vm.$route.query.ref_id)) {
        sessionStorage.setItem('ref_address', vm.$route.query.ref_id)
      } else {
        sessionStorage.setItem('ref_address', '0x0000000000000000000000000000000000000000');
      }
    },
    splitAddress(address) {
      if (address === null || address.length === 0) {
        return 'CONNECT';
      }
      let strTemp = '';
      return strTemp.concat(address.slice(0, 4), '...', address.slice(-5));
    },
    async signLogin() {
      let vm = this;
      try {
        let payload = await vm.$store.dispatch('account/decodeToken');
        let tokenAlive = false;
        if (payload === null) {
          tokenAlive = false;
          sessionStorage.removeItem(CLIENT_TOKEN);
        } else {
          if (payload.exp < moment().utc().unix()) {
            await vm.$store.dispatch('account/resetState');
          } else {
            tokenAlive = true;
          }
        }
        if (!tokenAlive && vm.account.wallet.signer !== null) {
          let contract = await vm.$store.dispatch('contract/getContract', {
            contract_name: 'SC_SIGN',
            signer: vm.account.wallet.signer,
          })
          $('#loginSign').modal('show');
          let hash = await contract.getMessageHash(vm.account.detail.wallet_address, 1, 'signature', 1);
          return await vm.account.wallet.signer.signMessage(ethers.utils.arrayify(hash));
        }
        return true;
      } catch (error) {
        if (error.code === 4001) {
          vm.error(error.message);
        } else {
          vm.error(error);
        }
        await vm.$store.dispatch('account/resetState');
        $('#loginSign').modal('hide');
        return null;
      }
    },
    async loginAPI(signature) {
      let vm = this
      vm.isConnect = true
      let payload = await vm.$store.dispatch('account/decodeToken');
      if (!payload) {
        vm.$store.dispatch('account/loginWallet', {
          wallet_address: vm.account.detail.wallet_address,
          signature
        }).then(async response => {
          $('#wallet-connect').modal('hide');
          if (response.success) {
            vm.isRegisterGame = true
            setTimeout(() => {
              vm.getAssets();
            }, 1200);
            vm.$forceUpdate();
          } else {
            if (response.data != null && !response.data.signature && response.data.wallet) {
              let signatureHash = await vm.signLogin();
              if (signatureHash !== null && signatureHash !== true && signatureHash.length > 0) {
                await vm.loginAPI(signatureHash);
              }
            } else {
              vm.error(response.message)
              vm.isRegisterGame = false
              await $('#register-game-modal').modal('show');
              vm.$forceUpdate();
            }
          }
          $('#loginSign').modal('hide');
        }).catch(error => {
          vm.error(error);
          vm.$store.dispatch('account/resetState');
          $('#loginSign').modal('hide');
        })
      } else {
        await vm.getAssets();
      }
    },
    async getAssets() {
      let vm = this;
      let contractCows = await vm.$store.dispatch('contract/getContract', {
        contract_name: 'SC_TOKEN',
        signer: vm.account.wallet.signer,
      });
      let contractRim = await vm.$store.dispatch('contract/getContract', {
        contract_name: 'SC_TOKEN_RIM',
        signer: vm.account.wallet.signer,
      });

      let balanceCows = await contractCows.balanceOf(vm.account.detail.wallet_address);
      let balanceRim = await contractRim.balanceOf(vm.account.detail.wallet_address);

      await vm.$store.dispatch('account/updateAsset', {
        cows: Number(ethers.utils.formatEther(balanceCows)),
        rim: Number(ethers.utils.formatEther(balanceRim))
      })
      // vm.$store.dispatch('account/getAssets');
    },
    async metamaskConnect() {
      let vm = this;
      let ethereum = window.ethereum;
      if (ethereum) {
        await ethereum.request({method: 'eth_requestAccounts'}).then(async () => {
          try {
            await ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{chainId: CHAIN_ID_HEX}],
            });
            let provider = new ethers.providers.Web3Provider(ethereum);
            await vm.$store.dispatch('metamask/setProvider', provider);
            await vm.$store.dispatch('account/updateSigner', await provider.getSigner());
            await vm.$store.dispatch('account/updateWalletAddress', await provider.getSigner().getAddress());
            await vm.loginAPI();
            await vm.eventMetamask();
            $('#wallet-connect').modal('hide');
            vm.$forceUpdate();
          } catch (error) {
            if (error.code === 4902) {
              try {
                await ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [{chainId: CHAIN_ID_HEX, rpcUrl: RPC_URL,},],
                });
                await vm.metamaskConnect();
              } catch (addError) {
                vm.error(addError.message)
              }
            } else if (error.code === 4001) {
              vm.error(`Can't connect wallet`);
            } else {
              vm.error(error.message);
            }
          }
        }).catch(e => {
          vm.error(e.message)
        })
      }
    },
    async walletConnect() {
      let vm = this
      try {
        const providerWalletConnect = new WalletConnectProvider({
          rpc: {56: RPC_URL, 97: RPC_URL},
          chainId: CHAIN_ID,
          network: "Binance",
          qrcode: true,
        });
        await providerWalletConnect.enable();

        providerWalletConnect.on("accountsChanged", async () => {
          await providerWalletConnect.disconnect();
          vm.$store.commit('account/RESET_STATE');
        });

        providerWalletConnect.on("disconnect", async () => {
          await vm.$store.dispatch('contract/setToken', null);
          await vm.$store.dispatch('account/updateSigner', null);
          await vm.$store.dispatch('wallet_connect/setProvider', null);
          await vm.$store.dispatch('account/updateWalletAddress', null);
          await vm.$store.dispatch('account/resetState');
          vm.$forceUpdate();
        });

        providerWalletConnect.on("session_update", async (error) => {
          if (error) {
            throw error;
          }
        });

        let providerEthers = new providers.Web3Provider(providerWalletConnect);

        if (providerWalletConnect.chainId === CHAIN_ID) {
          let signer = await providerEthers.getSigner(vm.account.detail.wallet_address);
          await vm.$store.dispatch('account/updateSigner', signer);
          await vm.$store.dispatch('wallet_connect/setProvider', providerWalletConnect);
          await vm.$store.dispatch('account/updateWalletAddress', providerWalletConnect.accounts[0]);
          await vm.loginAPI();
        } else {
          if (process.env.NODE_ENV === 'production') {
            await providerWalletConnect.disconnect();
            vm.$store.commit('account/RESET_STATE');
            vm.error('Please change network to Binance Smart Chain!')
          }
        }
      } catch (e) {
        vm.error(e.message)
      }
    },
    async eventMetamask() {
      let vm = this;
      if (vm.isConnect) {
        window.ethereum.on('accountsChanged', async function (accounts) {
          if (accounts.length === 0) {
            // MetaMask is locked or the user has not connected any accounts
            vm.error('Please connect to MetaMask.');
            vm.isConnect = false
            await vm.$store.commit('account/RESET_STATE')

          } else if (accounts[0] !== vm.account.detail.wallet_address) {
            vm.warning('Your address wallet is changed')
            vm.isConnect = false
            await vm.$store.commit('account/RESET_STATE')
          }
        });
        window.ethereum.on('chainChanged', async (chainId) => {
          if (chainId !== CHAIN_ID_HEX) {
            await vm.$store.commit('account/RESET_STATE')
            vm.isConnect = false
            vm.warning('Please change network to Binance Smart Chain!')
          }
        });
      }
    },
    async disconnectWallet() {
      let vm = this;
      // Disconnect wallet connect
      if (vm.wallet_connect.provider) {
        await vm.wallet_connect.provider.disconnect();
      }
      if (vm.metamask.provider) {
        // vm.metamask.provider.disconnect()
        await vm.$store.dispatch('account/resetState')
      }
      if (vm.$route.name !== 'MarketplaceEgg') {
        await vm.$router.push({name: 'MarketplaceEgg'})
      }
      vm.$forceUpdate();
    },
    async connectContractMarket() {
      let vm = this;
      if (vm.account.wallet.signer != null) {
        await vm.$store.dispatch('contract/updateSignerContract', {
          contract_name: 'SC_COWS_GAME',
          signer: vm.account.wallet.signer
        })
        await vm.$store.dispatch('contract/updateSignerContract', {
          contract_name: 'SC_COWS_GAME',
          signer: vm.account.wallet.signer
        })
        await vm.$store.dispatch('contract/updateSignerContract', {
          contract_name: 'SC_NFTEggCBS',
          signer: vm.account.wallet.signer
        })
        await vm.$store.dispatch('contract/updateSignerContract', {
          contract_name: 'SC_USER_SNAKE',
          signer: vm.account.wallet.signer
        })
      }
    },
  },
  watch: {
    async 'account.detail.wallet_address'() {
      await this.checkRegisterSC();
      await this.connectContractMarket();
    },
  }
}
</script>

<style scoped>

</style>
