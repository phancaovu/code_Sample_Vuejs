<template>
  <div class="col-lg-3">
    <div class="left-tab ms-lg-4 py-4 d-none d-lg-block sticky-top">
      <a href="#" data-bs-toggle="modal" data-bs-target="#download-app">
        <div class="btn btn-play mt-xxl-5">
          PLAY GAME<img class="ms-2" src="../assets/images/down.png">
        </div>
      </a>
      <img class="w-100 my-2" src="../assets/images/line.png">
      <div class="fs-5 text-radiant mb-2">NOTIFICATION</div>
      <div class="carousel slide mb-2 px-3" id="snake-slider" data-bs-ride="carousel">
        <div class="carousel-inner" v-if="left_menu['data']['BANNER_LEFT']">
          <div v-if="left_menu['data']['BANNER_LEFT']" v-for="(value,key) in left_menu['data']['BANNER_LEFT']['value']" :class="`carousel-item ${key == 1 ? 'active' : ''} `">
            <a :href="value['url']" target="_blank">
              <img class="d-block w-100" :src="value['image']">
            </a>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#snake-slider" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#snake-slider" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

      <img class="w-100 my-2" src="../assets/images/line.png">
      <div class="px-3">
        <div class="row mx-0">
          <div class="col-8 px-0 text-start">
            <div class="fs-5 text-radiant">COWS</div>
            <p class="mb-0">{{ cows | money('$',true,4) }}</p>
          </div>
          <div class="col-4">
            <a href="https://pancakeswap.finance/swap?inputCurrency=0x33b48893B8f119Fb45F431b36F830a9584804201" target="_blank">
              <img class="w-100 px-1" src="../assets/images/cowscoin.png">
            </a>
          </div>
        </div>
      </div>

      <img class="w-100 my-2" src="../assets/images/line.png">
      <div class="px-3">
        <div class="row mx-0">
          <div class="col-8 px-0 text-start">
            <div class="fs-5 text-radiant">RIM</div>
            <p class="mb-0">{{ rim | money('$',true,4) }}</p>
          </div>
          <div class="col-4">
            <a href="https://pancakeswap.finance/swap?inputCurrency=0x9FE70801C3B26f466d7e7B884659e88c7492A126" target="_blank">
              <img class="w-100 px-1" src="../assets/images/rimcoin.png">
            </a>
          </div>
        </div>
      </div>

      <img class="w-100 my-2" src="../assets/images/line.png">
      <div class="px-3">
        <div class="btn-wallet py-2 mb-2">
          <div class="row mx-0 px-1">
            <div class="col-4"><img class="w-100 px-1" src="../assets/images/cowscoin.png"></div>
            <div class="col-8 d-flex align-items-center justify-content-end">
              <p class="mb-0">{{ account.assets.cows | money }}</p>
            </div>
          </div>
        </div>
        <div class="btn-wallet py-2">
          <div class="row mx-0 px-1">
            <div class="col-4"><img class="w-100 px-1" src="../assets/images/rimcoin.png"></div>
            <div class="col-8 d-flex align-items-center justify-content-end">
              <p class="mb-0">{{ account.assets.rim | money }}</p>
            </div>
          </div>
        </div>
      </div>

      <img class="w-100 my-2" src="../assets/images/line.png">
      <div class="px-3">
        <div class="d-flex justify-content-center" v-if="left_menu['data']['SOCIAL_MEDIA']">
          <a v-for="(value,key,index) in left_menu['data']['SOCIAL_MEDIA']['value']" :class="`social-box hvr-float ${index === 3 ? '': 'me-4'}`" :href="`${value}`" target="_blank">
            <i :class="`${key === 'file' ? 'fas' : 'fab'} fa-${key === 'file' ? key+'-alt' : key} fa-2x`"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "LeftTab",
  computed: {
    ...mapState(['account', 'token_price', 'left_menu']),
  },
  data() {
    return {
      cows: 0,
      rim: 0,
    }
  },
  created() {
    let vm = this;
    vm.$store.dispatch('token_price/getPriceCows').then(response => {
      vm.cows = Number(response.data.price);
      vm.$store.dispatch('token_price/setPriceCows', vm.cows);
    })
    vm.$store.dispatch('token_price/getPriceRim').then(response => {
      vm.rim = Number(response.data.price);
      vm.$store.dispatch('token_price/setPriceCows', vm.rim);
    })
  }
}
</script>

<style scoped>

</style>
