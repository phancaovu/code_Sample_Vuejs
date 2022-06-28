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
        <div class="col-md-3 d-lg-flex align-items-center justify-content-end">
          <div class="d-lg-grid">
            <select class="form-select select-point" v-model="egg_filters.sort">
              <option value="RECENT">Recently list</option>
              <option value="ASC">Lowest price</option>
              <option value="DESC">Highest price</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="row mx-0 my-2" v-for="eggs in data_egg.chunk">
      <div class="col-md-6 col-lg-3 mb-3" v-for="egg in eggs">
        <div class="walltet-content-box py-4 d-flex align-items-start flex-column">
          <div class="content-box-top"><img class="w-100" src="../../assets/images/eggs-box.png">
            <div class="content-box-top-eggs top-50 translate-middle-y text-center"><img class="w-50" :src="require('../../assets/images/eggs/UNICORN_1.png')"></div>
            <div class="content-box-top-name">
              <div class="d-flex justify-content-center align-items-center">
                <div class="text-radiant text-uppercase text-center">UNICORN</div>
                <div class="position-relative ms-2 snake-id"><img class="w-100" src="../../assets/images/id-egg.png">
                  <div class="position-absolute top-50 start-50 translate-middle">{{ egg['amount'] }}</div>
                </div>
              </div>
              <div class="d-flex justify-content-center align-items-center mt-1"><img class="snake-icon me-2" src="../../assets/images/cowscoin.png">
                <div class="text-radiant text-uppercase text-center snake-price">{{ egg['price'] | money }} - ID: {{ egg['saleId'] }}</div>
              </div>
            </div>
          </div>
          <div class="content-box-bottom px-3 mt-auto">
            <div class="row mx-0 my-2" v-if="egg['owner'] !== account.detail.wallet_address">
              <div class="col-8 px-1 mx-auto">
                <div class="d-grid hvr-bounce-in">
                  <router-link :class="['btn btn-transfer']" :to="{ name: 'MarketplaceEggDetail', params:{id:egg['saleId']} }">
                    <div class="text-radiant text-uppercase">buy now</div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <scroll-loader :loader-method="scrollLoad" :loader-disable="disable_load_more_egg"></scroll-loader>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {ethers} from 'ethers';
import ModalStep from "@/components/ModalStep";
import {SC_NFTEggCBS_1155} from "@/utils/config";

export default {
  name: 'WarehouseEgg',
  components: {
    ModalStep
  },
  computed: {
    ...mapState(['account', 'wallet_connect', 'contract', 'metamask', 'market']),
  },
  data() {
    return {
      egg_filters: {
        snake_type: 'UNICORN',
        page: 1,
        paginate: 12,
        sort: 'RECENT',
      },
      data_egg: {
        docs: [],
        chunk: [],
      },
      disable_load_more_egg: true,
      step_detail: {
        step: 1,
        message: 'Confirm cancel order'
      }
    }
  },
  created() {
    let vm = this;
    vm.scrollLoad();
  },
  methods: {
    scrollLoad() {
      let vm = this;
      let sortPayload = '';
      if (vm.egg_filters.sort === 'RECENT') {
        sortPayload = {
          _id: 'DESC'
        }
      } else {
        sortPayload = {
          price: vm.egg_filters.sort
        }
      }
      vm.$store.dispatch('market/listDataMarket', {
        nft: SC_NFTEggCBS_1155,
        page: vm.egg_filters.page++,
        sort: sortPayload
      }).then(response => {
        let {success, data} = response;
        if (success) {
          vm.data_egg.docs = vm.data_egg.docs.concat(data.docs);
          vm.data_egg.chunk = _.chunk(vm.data_egg.docs, 4)
          vm.disable_load_more_egg = !data.hasNextPage;
        }
      }).catch(error => {
        vm.error(error.message);
      })
    },
    toNumber(hex) {
      return ethers.BigNumber.from(hex).toString();
    },
    cancelSell(saleId) {
      let vm = this;
      let modal = $('#modalStep');
      vm.$store.dispatch('contract/getContract', {
        contract_name: 'SC_MARKET_EGG_1155',
        signer: vm.account.wallet.signer,
      }).then(async contract => {
        modal.modal('show');
        vm.step_detail = {
          step: 1,
          message: 'Confirm cancel order'
        }
        let cancel = await contract.cancelTokenSale(saleId.toString());

        vm.step_detail = {
          step: 1,
          message: 'Confirm cancel order success, please wait...'
        }
        await cancel.wait();

        vm.data_egg = {
          docs: [],
          chunk: [],
        }
        await vm.scrollLoad();
        modal.modal('hide');

        vm.success('Cancel success');
      }).catch(e => {
        modal.modal('hide');
        console.error(e);
        vm.error('Not found contract Marketplace 1155')
      })
    },
  },
  watch: {
    'egg_filters.snake_type'() {
      this.egg_filters.page = 1;
      this.data_egg = {
        docs: [],
        chunk: [],
      }
      this.$forceUpdate();
      this.scrollLoad();
    },
    'egg_filters.sort'() {
      let vm = this;
      this.egg_filters.page = 1;
      this.data_egg = {
        docs: [],
        chunk: [],
      }
      vm.$forceUpdate();
      vm.scrollLoad();
    }
  }
}
</script>
