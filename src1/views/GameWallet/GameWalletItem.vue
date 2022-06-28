<template>
  <div class="mywallet-content">
    <div class="rate-filter">
      <div class="row mx-0">
        <div class="col-md-9">
        </div>
        <div class="col-md-3 d-lg-flex align-items-center justify-content-end">
          <div class="d-lg-grid">
            <select class="form-select select-point" aria-label="Default select example" v-model="item_filters.type">
              <option value="ALL">All</option>
              <option value="POTION">POTION</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="row mx-0" v-for="items in data_item.chunk">
      <div class="col-md-6 col-lg-3 mb-3" v-for="item in items" v-if="item.count > 0">
        <div class="walltet-content-box py-4 d-flex align-items-start flex-column px-1">
          <div class="content-box-top">
            <img class="w-100" src="../../assets/images/eggs-box.png">
            <div class="content-box-top-eggs top-50 translate-middle-y text-center">
              <img class="w-50" :src="itemImage(item.type,item.skin_id)"></div>
            <div class="content-box-top-name"></div>
          </div>
          <div class="content-box-bottom px-1 mt-auto">
            <div class="row mx-0 py-2">
              <div class="col-7 px-lg-0">
                <div class="text-radiant text-uppercase text-center fs-6">{{ convertNameItem(item.type) }}</div>
              </div>
              <div class="col-5 px-lg-0">
                <div class="position-relative snake-id">
                  <img class="w-100" src="../../assets/images/id-egg.png">
                  <div class="position-absolute top-50 start-50 translate-middle">
                    Qty: {{ item.count }}
                  </div>
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
import NAME_ITEM from "@/utils/name_items";

import {mapState} from "vuex";

export default {
  name: "WarehouseItem",
  components: {},
  computed: {
    ...mapState(['account', 'wallet_connect', 'contract', 'metamask', 'warehouse']),
  },
  data() {
    return {
      item_filters: {
        type: 'ALL',
      },
      data_item: {
        docs: [],
        chunk: [],
      },
    }
  },
  created() {
    this.filterItem();
  },
  methods: {
    itemImage(type, skin_id) {
      if (type && skin_id) {
        return require(`../../assets/images/items/${type}_${skin_id}.png`);
      }
    },
    filterItem() {
      let vm = this;
      vm.$store.dispatch('warehouse/filterItem', {
        type: vm.item_filters.type,
      }).then(response => {
        let {success, data} = response;
        if (success) {
          vm.data_item.docs = data;
          vm.data_item.chunk = _.chunk(vm.data_item.docs, 4);
          vm.$forceUpdate();
        }
      })
    },
    convertNameItem(type) {
      return NAME_ITEM[type];
    }
  },
  watch: {
    'item_filters.type'() {
      this.data_item = {
        docs: [],
        chunk: [],
        total: 0,
      }
      this.filterItem();
    }
  }
}
</script>

<style scoped>

</style>
