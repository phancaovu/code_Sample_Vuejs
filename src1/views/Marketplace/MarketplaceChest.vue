<template>
  <div class="mywallet-content">
    <!-- sell-modal-->
    <div class="modal fade" id="sell-modal" tabindex="-1" aria-labelledby="exampleModalLabel"
         aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content mywallet-modal">
          <div class="modal-header border-0">
            <h5 class="modal-title"></h5>
            <button class="btn" type="button" data-bs-dismiss="modal"
                    aria-label="Close"><i class="fas fa-times fa-2x text-light"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="row mx-0">
              <div class="col-6 offset-3 col-md-4 offset-md-4">
                <div class="position-relative snake-id">
                  <img class="w-100" src="../../assets/images/id-egg.png">
                  <div class="position-absolute top-50 start-50 translate-middle">
                    #97920
                  </div>
                </div>
              </div>
            </div>
            <div class="row mx-0 my-3">
              <div class="col-6 offset-3">
                <div class="position-relative">
                  <img class="w-100" src="../../assets/images/box2.png">
                </div>
                <div class="text-radiant text-uppercase text-center">SPECIAL</div>
              </div>
            </div>
            <div class="row mx-0 my-3">
              <div class="col-8 offset-2">
                <p class="text-center mb-1 text-warning">Input Price</p>
                <div class="input-group mb-3">
                  <input class="form-control" type="text"
                         aria-describedby="basic-addon3">
                </div>
                <div class="d-grid">
                  <button class="btn btn-submit mx-auto" type="submit">
                    <div class="text-radiant">Submit</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
                    #{{ chest.nft_id }}
                  </div>
                </div>
              </div>
            </div>
            <div class="row mx-0 my-2">
              <div class="col-8 mx-auto px-1">
                <div class="d-grid hvr-bounce-in">
                  <button class="btn btn-sell" type="button" disabled>
                    <div class="text-radiant text-uppercase">SELL</div>
                  </button>
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
import LeftTab from "@/components/LeftTab";
import {mapState} from "vuex";

export default {
  name: "WarehouseChest",
  components: {
    LeftTab
  },
  computed: {
    ...mapState(['account', 'wallet_connect', 'contract', 'metamask', 'warehouse']),
  },
  data() {
    return {
      chest_filters: {
        page: 1,
        paginate: 12,
      },
      data_chest: {
        docs: [],
        chunk: [],
        total: 0,
      },
      sell_chest: {
        nft_id: null,
        price: null,
      },
      disable_load_more_chest: false,
    }
  },
  methods: {
    scrollLoad() {
      let vm = this;
      vm.$store.dispatch('warehouse/filterChest', {
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
      this.chest_filters.page = 1;
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
