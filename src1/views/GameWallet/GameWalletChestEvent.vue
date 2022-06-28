<template>
  <div class="mywallet-content">
    <!-- step-modal -->
    <ModalStep :step_detail="step_detail"></ModalStep>

    <div class="row mx-0 my-2" v-for="chests in data_chest.chunk">
      <div class="col-md-6 col-lg-3 mb-3" v-for="chest in chests">
        <div class="walltet-content-box py-4 d-flex align-items-start flex-column px-1">
          <div class="content-box-top">
            <img class="w-100" src="../../assets/images/eggs-box.png">
            <div class="content-box-top-eggs top-50 translate-middle-y text-center">
              <img class="w-50" :src="API_NFT_URL+'/'+chest.GameEvent.thumbnail"></div>
            <div class="content-box-top-name"></div>
          </div>
          <div class="content-box-bottom px-1 mt-auto">
            <div class="row mx-0 py-2">
              <div class="col-7 px-lg-0">
                <div class="text-radiant text-uppercase text-center fs-6">{{ chest.GameEvent.title }}</div>
              </div>
              <div class="col-5 px-lg-0">
                <div class="position-relative snake-id">
                  <img class="w-100" src="../../assets/images/id-egg.png">
                  <div class="position-absolute top-50 start-50 translate-middle">
                    #{{ chest.id }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <scroll-loader :loader-method="scrollLoad" :loader-disable="disable_load_more_chest"></scroll-loader>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {API_NFT_URL} from "@/utils/config";
import ModalStep from "@/components/ModalStep";

export default {
  name: "WarehouseChestEvent",
  components: {
    ModalStep
  },
  computed: {
    ...mapState(['account', 'wallet_connect', 'contract', 'metamask', 'warehouse', 'server']),
  },
  data() {
    return {
      API_NFT_URL,
      chest_filters: {
        page: 0,
        paginate: 12,
      },
      data_chest: {
        docs: [],
        chunk: [],
        total: 0,
      },
      disable_load_more_chest: false,
      step_detail: {
        step: 1,
        message: ''
      }
    }
  },
  methods: {
    scrollLoad() {
      let vm = this;
      vm.$store.dispatch('warehouse/filterChestEvent', {
        page: ++vm.chest_filters.page,
        paginate: vm.chest_filters.paginate,
        snake_type: vm.chest_filters.snake_type,
      }).then(response => {
        let {success, data} = response;
        if (success) {
          vm.disable_load_more_chest = data.pages === 0 || data.pages === vm.chest_filters.page;
          vm.data_chest.docs = vm.data_chest.docs.concat(data.docs);
          vm.data_chest.chunk = _.chunk(vm.data_chest.docs, 4);
          vm.$forceUpdate();
        }
      })
    },
    sellChest(nft_id) {
      let vm = this;
      vm.sell_chest = {
        nft_id,
        price: null,
      }
      $('#sell-modal').modal('show');
    },
  },
  watch: {
    'chest_filters.snake_type'() {
      this.chest_filters.page = 0;
      this.data_chest = {
        docs: [],
        chunk: [],
        total: 0,
      }
      this.scrollLoad();
    }
  }
}
</script>

<style scoped>

</style>
