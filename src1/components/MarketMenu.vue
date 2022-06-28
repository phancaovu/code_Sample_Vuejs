<template>
  <ul class="nav">
    <li class="nav-item">
      <router-link :class="['nav-link']" aria-current-value="page" :to="{ name: 'MarketplaceSnake' }" active-class="active">SNAKES</router-link>
    </li>
    <li class="nav-item">
      <router-link :class="['nav-link']" :to="{ name: 'MarketplaceEgg' }" active-class="active">EGGS</router-link>
    </li>
    <li class="nav-item">
      <router-link :class="['nav-link']" :to="{ name: 'MarketplacePiece' }" active-class="active">Pieces</router-link>
    </li>
    <li class="nav-item" v-if="account.detail.wallet_address">
      <router-link :class="['nav-link']" :to="{ name: 'MyOrderMarketplaceEgg' }" active-class="active">My orders</router-link>
    </li>
    <li class="nav-item" v-if="account.detail.wallet_address">
      <router-link :class="['nav-link']" :to="{ name: 'MarketplaceSwapEgg' }" active-class="active">Swap Egg</router-link>
    </li>
    <!--        <li class="nav-item"><router-link :class="['nav-link']" :to="{ name: 'MarketplaceChest' }" active-class="active">MYSTERY BOXES</router-link></li>-->
  </ul>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "MarketMenu",
  computed: {
    ...mapState(['account']),
  },
}
</script>

<style scoped>

</style>
