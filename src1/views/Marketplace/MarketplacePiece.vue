<template>
  <div class="mywallet-content">
    <div class="rate-filter">
      <div class="row mx-0 mt-2 mb-2">
        <!--        <div class="col-md-9">-->
        <!--          <ul class="nav">-->
        <!--            <li class="nav-item" @click="piece_filters.snake_type = 'ALL'">-->
        <!--              <a :class="`nav-link ${piece_filters.snake_type === 'ALL' ? 'active' : ''}`" aria-current="page" href="javascript:void(0)">-->
        <!--                <div class="btn box-text me-1">ALL</div>-->
        <!--                <div class="box-check">-->
        <!--                  <img class="icon-check" src="../../assets/images/icon-check.png">-->
        <!--                </div>-->
        <!--              </a>-->
        <!--            </li>-->
        <!--            <li class="nav-item" @click="piece_filters.snake_type = 'NAGA'">-->
        <!--              <a :class="`nav-link ${piece_filters.snake_type === 'NAGA' ? 'active' : ''}`" aria-current="page" href="javascript:void(0)">-->
        <!--                <div class="btn box-text me-1">N</div>-->
        <!--                <div class="box-check">-->
        <!--                  <img class="icon-check" src="../../assets/images/icon-check.png">-->
        <!--                </div>-->
        <!--              </a>-->
        <!--            </li>-->
        <!--            <li class="nav-item" @click="piece_filters.snake_type = 'HYDRA'">-->
        <!--              <a :class="`nav-link ${piece_filters.snake_type === 'HYDRA' ? 'active' : ''}`" aria-current="page" href="javascript:void(0)">-->
        <!--                <div class="btn box-text me-1">R</div>-->
        <!--                <div class="box-check">-->
        <!--                  <img class="icon-check" src="../../assets/images/icon-check.png">-->
        <!--                </div>-->
        <!--              </a>-->
        <!--            </li>-->
        <!--            <li class="nav-item" @click="piece_filters.snake_type = 'LORD'">-->
        <!--              <a :class="`nav-link ${piece_filters.snake_type === 'LORD' ? 'active' : ''}`" aria-current="page" href="javascript:void(0)">-->
        <!--                <div class="btn box-text me-1">sr</div>-->
        <!--                <div class="box-check">-->
        <!--                  <img class="icon-check" src="../../assets/images/icon-check.png">-->
        <!--                </div>-->
        <!--              </a>-->
        <!--            </li>-->
        <!--            <li class="nav-item" @click="piece_filters.snake_type = 'SHENRON'">-->
        <!--              <a :class="`nav-link ${piece_filters.snake_type === 'SHENRON' ? 'active' : ''}`" aria-current="page" href="javascript:void(0)">-->
        <!--                <div class="btn box-text me-1">ssr</div>-->
        <!--                <div class="box-check">-->
        <!--                  <img class="icon-check" src="../../assets/images/icon-check.png">-->
        <!--                </div>-->
        <!--              </a>-->
        <!--            </li>-->
        <!--          </ul>-->
        <!--        </div>-->
        <div class="col-md-9 d-lg-flex align-items-center justify-content-start">
          <div class="d-lg-grid">
            <select class="form-select select-point" v-model="piece_filters.selectNEP">
              <option value="ALL">ALL</option>
              <option v-for="index in 17" :key="index" :value="`NEP-`+index">NEP{{ index }}</option>
            </select>
          </div>
        </div>
        <div class="col-md-3 d-lg-flex align-items-center justify-content-end">
          <div class="d-lg-grid">
            <select class="form-select select-point" v-model="piece_filters.sort">
              <option value="RECENT">Recently list</option>
              <option value="ASC">Lowest price</option>
              <option value="DESC">Highest price</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="row mx-0">
      <div class="col-md-6 col-lg-3 mb-3" v-for="piece in filterDocs">
        <div class="walltet-content-box py-4 d-flex align-items-start flex-column">
          <div class="content-box-top"><img class="w-100" src="../../assets/images/eggs-box.png">
            <div class="content-box-top-eggs top-50 translate-middle-y text-center">
              <img class="w-50" :src="parsePieceTypeImage(piece.transaction_id.result.message)">
            </div>
            <div class="content-box-top-name">
              <div class="d-flex justify-content-center align-items-center">
                <div class="text-radiant text-uppercase text-center">
                  {{ symbolSnake(parsePieceType(piece.transaction_id.result.message), parsePieceSkin(piece.transaction_id.result.message)) }}
                </div>
                <div class="position-relative ms-2 snake-id"><img class="w-100" src="../../assets/images/id-egg.png">
                  <div class="position-absolute top-50 start-50 translate-middle">{{ piece.amount }}</div>
                </div>
              </div>
              <div class="d-flex justify-content-center align-items-center mt-1"><img class="snake-icon me-2" src="../../assets/images/cowscoin.png">
                <div class="text-radiant text-uppercase text-center snake-price">{{ piece.price | money('COWS') }} - SaleID: {{ piece.saleId }}</div>
              </div>
            </div>
          </div>
          <div class="content-box-bottom px-3 mt-auto">
            <div class="row mx-0 my-2" v-if="piece['owner'] !== account.detail.wallet_address">
              <div class="col-8 px-1 mx-auto">
                <div class="d-grid hvr-bounce-in">
                  <router-link :class="['btn btn-transfer']" :to="{ name: 'MarketplacePieceDetail', params:{id:piece['saleId']} }">
                    <div class="text-radiant text-uppercase">buy now</div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
<!--    <scroll-loader :loader-method="scrollLoad" :loader-disable="disable_load_more_piece"></scroll-loader>-->
    <pagination
      :totalPages="totalDocs"
      :perPage="piece_filters.limit"
      :currentPage="piece_filters.page"
      @pagechanged="onPageChange"
    />
  </div>
</template>

<script>
import {mapState} from "vuex";
import ModalStep from "@/components/ModalStep";
import * as config from "@/utils/config";
import Pagination from "@/components/Pagination";

export default {
  name: 'WarehousePiece',
  components: {
    Pagination,
    ModalStep
  },
  computed: {
    ...mapState(['account', 'wallet_connect', 'contract', 'metamask', 'market']),
  },
  data() {
    return {
      piece_filters: {
        snake_type: 'ALL',
        page: 1,
        sort: 'RECENT',
        selectNEP: 'ALL',
        skin_id: 'ALL',
        limit: 8
      },
      data_piece: {
        docs: [],
        chunk: [],
      },
      filterDocs: [],
      disable_load_more_piece: false,
      totalDocs: 0
    }
  },
  created() {
    let vm = this;
    vm.scrollLoad();
  },
  methods: {
    onPageChange(page) {
      this.piece_filters.page = page;
      this.getSnakeTypeAndSkin()
      this.scrollLoad()
    },
    pieceImage(snake_type, skin_id) {
      if (snake_type !== null && skin_id !== null)
        return require(`../../assets/images/pieces/${snake_type}_${skin_id}.png`);
      return null
    },
    scrollLoad(isFilterSnake = false) {
      let vm = this;

      let sortPayload = '';
      if (vm.piece_filters.sort === 'RECENT') {
        sortPayload = {
          _id: 'DESC'
        }
      } else {
        sortPayload = {
          price: vm.piece_filters.sort
        }
      }
      let listNFT = [];
      for (let i = 1; i <= 17; i++) {
        listNFT.push(config[`SC_NEP_${i}`]);
      }
      vm.$store.dispatch('market/listDataMarket', {
        nft: listNFT,
        page: vm.piece_filters.page,
        limit: vm.piece_filters.limit,
        sort: sortPayload,
        snake_type: vm.piece_filters.snake_type,
        skin_id: vm.piece_filters.skin_id
      }).then(response => {
        let {success, data} = response;
        if (success) {
          vm.data_piece.docs = data.docs
          vm.filterDocs = data.docs
          vm.totalDocs = data.totalPages
          //   console.log('docs before', vm.data_piece.docs)
          // for (let i = 0; i < vm.data_piece.docs.length; i++) {
          //   _.remove(vm.data_piece.docs, doc => {
          //     if (vm.piece_filters.snake_type === 'ALL') {
          //       return false;
          //     } else {
          //         console.log(vm.parsePieceType(doc.transaction_id.result.message))
          //         if (vm.parsePieceType(doc.transaction_id.result.message) === vm.piece_filters.snake_type) {
          //             // console.log(vm.symbolSnake(vm.parsePieceType(doc.transaction_id.result.message), vm.parsePieceSkin(doc.transaction_id.result.message)))
          //         }
          //         return vm.parsePieceType(doc.transaction_id.result.message) !== vm.piece_filters.snake_type;
          //     }
          //   })
          // }
          //   if (vm.piece_filters.selectNEP !== 'ALL') {
          //       vm.filterDocs = _.filter(vm.data_piece.docs, function (n) {
          //           console.log(vm.symbolSnake(vm.parsePieceType(n.transaction_id.result.message), vm.parsePieceSkin(n.transaction_id.result.message)))
          //           return vm.symbolSnake(vm.parsePieceType(n.transaction_id.result.message), vm.parsePieceSkin(n.transaction_id.result.message)) === vm.piece_filters.selectNEP
          //       });
          //   } else {
          //       vm.filterDocs = vm.data_piece.docs
          //   }
            console.log('docs', vm.data_piece.docs)
            console.log('chunk', vm.data_piece.chunk)
            vm.data_piece.chunk = _.chunk(vm.data_piece.docs, 4)
          vm.disable_load_more_piece = !data.hasNextPage;
          console.log('gọi ScrollLoad')
        }
      }).catch(error => {
        vm.error(error.message);
      })
    },
    parsePieceTypeImage(message) {
      let data = message.split('#');
      return this.pieceImage(data[1], data[2]);
    },
    parsePieceType(message) {
      let data = message.split('#');
      return data[1];
    },
    parsePieceSkin(message) {
      let data = message.split('#');
      return data[2];
    },
    parsePieceAmount(message) {
      let data = message.split('#');
      return data[6];
    },
    symbolSnake(snake_type, skin_id, prefix = '-') {
      let type = 'NEP';
      let snakes = [
        {snake_type: 'NAGA', skin_id: 1, id: 1},
        {snake_type: 'NAGA', skin_id: 8, id: 2},
        {snake_type: 'NAGA', skin_id: 9, id: 3},
        {snake_type: 'NAGA', skin_id: 10, id: 4},
        {snake_type: 'HYDRA', skin_id: 1, id: 5},
        {snake_type: 'HYDRA', skin_id: 2, id: 6},
        {snake_type: 'HYDRA', skin_id: 3, id: 7},
        {snake_type: 'HYDRA', skin_id: 4, id: 8},
        {snake_type: 'LORD', skin_id: 4, id: 9},
        {snake_type: 'LORD', skin_id: 5, id: 10},
        {snake_type: 'LORD', skin_id: 6, id: 11},
        {snake_type: 'LORD', skin_id: 7, id: 12},
        {snake_type: 'SHENRON', skin_id: 1, id: 13},
        {snake_type: 'SHENRON', skin_id: 2, id: 14},
        {snake_type: 'SHENRON', skin_id: 3, id: 15},
        {snake_type: 'SHENRON', skin_id: 4, id: 16},
        {snake_type: 'UNICORN', skin_id: 1, id: 17},
      ];
      let obj = _.find(snakes, snake => {
        return snake.snake_type === snake_type && snake.skin_id == skin_id;
      });

      if (obj) {
        return type + prefix + obj.id;
      }
      return type;
    },
    getSnakeTypeAndSkin() {
      let snakes = [
        {snake_type: 'NAGA', skin_id: 1, id: 1},
        {snake_type: 'NAGA', skin_id: 8, id: 2},
        {snake_type: 'NAGA', skin_id: 9, id: 3},
        {snake_type: 'NAGA', skin_id: 10, id: 4},
        {snake_type: 'HYDRA', skin_id: 1, id: 5},
        {snake_type: 'HYDRA', skin_id: 2, id: 6},
        {snake_type: 'HYDRA', skin_id: 3, id: 7},
        {snake_type: 'HYDRA', skin_id: 4, id: 8},
        {snake_type: 'LORD', skin_id: 4, id: 9},
        {snake_type: 'LORD', skin_id: 5, id: 10},
        {snake_type: 'LORD', skin_id: 6, id: 11},
        {snake_type: 'LORD', skin_id: 7, id: 12},
        {snake_type: 'SHENRON', skin_id: 1, id: 13},
        {snake_type: 'SHENRON', skin_id: 2, id: 14},
        {snake_type: 'SHENRON', skin_id: 3, id: 15},
        {snake_type: 'SHENRON', skin_id: 4, id: 16},
        {snake_type: 'UNICORN', skin_id: 1, id: 17},
      ];
      if (this.piece_filters.selectNEP !== 'ALL') {
        const skinId = this.piece_filters.selectNEP.split('-')[1]
        let obj = _.find(snakes, snake => {
          return snake.id == skinId
        });
        this.piece_filters.snake_type = obj.snake_type
        this.piece_filters.skin_id = obj.skin_id
      } else {
        this.piece_filters.snake_type = 'ALL'
        this.piece_filters.skin_id = 'ALL'
      }
    }
  },
  watch: {
    'piece_filters.selectNEP'() {
      this.onPageChange(1);
    },
    'piece_filters.sort'() {
      // let vm = this;
      // let clone = _.clone(this.data_piece);
      // this.piece_filters.page = 1;
      // this.data_piece = {
      //   docs: [],
      //   chunk: [],
      // }
      // clone.docs = _.orderBy(clone.docs, ['price'], [vm.piece_filters.sort.toLowerCase()])
      // vm.data_piece.docs = clone.docs;
      // vm.data_piece.chunk = _.chunk(clone.docs, 4);
      // vm.$forceUpdate();
      this.onPageChange(1);
    }
  }
}
</script>
