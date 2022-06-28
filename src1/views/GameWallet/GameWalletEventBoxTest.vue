<template>
  <div class="mywallet-content">
    <!-- sell-modal-->
    <div class="row mx-0">
      <div class="col-md-6 col-lg-3 mb-3" v-if="isWhiteList()">
        <div class="walltet-content-box py-4 d-flex align-items-start flex-column px-1">
          <div class="content-box-top">
            <img class="w-100" src="../../assets/images/eggs-box.png">
            <div class="content-box-top-eggs top-50 translate-middle-y text-center">
              <img class="w-50" src="../../assets/images/items/CHEST_EVENT.png"></div>
            <div class="content-box-top-name"></div>
          </div>
          <div class="content-box-bottom px-1 mt-auto">
            <div class="row mx-0 py-2">
              <div class="col-7 px-lg-0">
                <div class="text-radiant text-uppercase text-center fs-6">Event BOX</div>
              </div>
              <div class="col-5 px-lg-0">
                <div class="position-relative snake-id">
                  <img class="w-100" src="../../assets/images/id-egg.png">
                  <div class="position-absolute top-50 start-50 translate-middle">
                    #1
                  </div>
                </div>
              </div>
            </div>
            <div class="row mx-0 my-2">
              <div class="col-8 mx-auto px-1">
                <div class="d-grid hvr-bounce-in">
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

import * as WhiteList from '@/utils/white_list_wallet_airdrop'
import {mapState} from "vuex";

export default {
  name: "WarehouseEventBoxTest",

  computed: {
    ...mapState(['account', 'wallet_connect', 'contract', 'metamask', 'warehouse']),
  },
  methods: {
    isWhiteList() {
      let vm = this;
      return WhiteList.indexOf(vm.account.detail.wallet_address) >= 0;
    }
  }
}
</script>

<style scoped>

</style>