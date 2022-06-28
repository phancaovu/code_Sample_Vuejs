<template>
    <ul class="nav">
        <li class="nav-item"><router-link :class="['nav-link']" :to="{ name: 'GameWalletSnake' }" active-class="active">SNAKES</router-link></li>
        <li class="nav-item"><router-link :class="['nav-link']" :to="{ name: 'GameWalletEgg1155' }" active-class="active">Eggs</router-link></li>
        <li class="nav-item"><router-link :class="['nav-link']" :to="{ name: 'GameWalletPiece' }" active-class="active">Egg Pieces</router-link></li>
        <li class="nav-item"><router-link :class="['nav-link']" :to="{ name: 'GameWalletChest' }" active-class="active">MYSTERY BOXES</router-link></li>
        <li class="nav-item"><router-link :class="['nav-link']" :to="{ name: 'GameWalletChestEvent' }" active-class="active">Event BOXES</router-link></li>
        <li class="nav-item"><router-link :class="['nav-link']" :to="{ name: 'GameWalletItem' }" active-class="active">Items</router-link></li>
        <li class="nav-item"><router-link :class="['nav-link']" :to="{ name: 'GameWalletToken' }" active-class="active">Token</router-link></li>
      <li class="nav-item"><router-link :class="['nav-link']" :to="{ name: 'GameWalletTopSnake' }" active-class="active">Top Snake</router-link></li>

    </ul>
</template>

<script>
export default {
    name: "WalletMenu"
}
</script>

<style scoped>

</style>
