<template>
    <ul class="nav">
        <li class="nav-item"><router-link :class="['nav-link']" aria-current-value="page" :to="{ name: 'GameWallet' }" active-class="active">NFT SNAKES</router-link></li>
        <li class="nav-item"><router-link :class="['nav-link']" :to="{ name: 'GameEggs' }" active-class="active">NFT EGGS</router-link></li>
        <li class="nav-item"><router-link :class="['nav-link']" :to="{ name: 'GameEggsPiece' }" active-class="active">NFT Egg Pieces</router-link></li>
        <li class="nav-item"><router-link :class="['nav-link']" :to="{ name: 'GameBox' }" active-class="active">MYSTERY BOXES</router-link></li>
        <li class="nav-item"><router-link :class="['nav-link']" :to="{ name: 'Token' }" active-class="active">Token</router-link></li>
        <li class="nav-item"><router-link :class="['nav-link']" :to="{ name: 'Others' }" active-class="active">OtherS</router-link></li>
    </ul>
</template>

<script>
export default {
    name: "GameMenu"
}
</script>

<style scoped>

</style>