<template>
  <ul class="nav">
    <li class="nav-item"><router-link :class="['nav-link']" :to="{ name: 'MyWalletSnake' }" active-class="active">SNAKES</router-link></li>
<!--    <li class="nav-item"><router-link :class="['nav-link']" :to="{ name: 'MyWalletEgg' }" active-class="active">Eggs</router-link></li>-->
    <li class="nav-item"><router-link :class="['nav-link']" :to="{ name: 'MyWalletEgg1155' }" active-class="active">Eggs</router-link></li>
    <li class="nav-item"><router-link :class="['nav-link']" :to="{ name: 'MyWalletPiece' }" active-class="active">Egg Pieces</router-link></li>
<!--    <li class="nav-item"><router-link :class="['nav-link']" :to="{ name: 'MyWalletChest' }" active-class="active">MYSTERY BOXES</router-link></li>-->
<!--    <li class="nav-item"><router-link :class="['nav-link']" :to="{ name: 'MyWalletChestEvent' }" active-class="active">Event BOXES</router-link></li>-->
  </ul>
</template>

<script>
export default {
  name: "MyWalletMenu",
}
</script>

<style scoped>

</style>
