<template>
  <section>
    <div class="row mx-0">
      <LeftTab></LeftTab>
      <div class="col-lg-9 ps-xxl-0">
        <div class="right-tab mt-3">
          <div class="my-wallet">
            <div class="mywallet-menu">
              <GameWalletMenu></GameWalletMenu>
            </div>
            <router-view/>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LeftTab from "@/components/LeftTab";
import GameWalletMenu from "@/components/GameWalletMenu";

export default {
  name: "MasterWarehouse",
  components: {
    GameWalletMenu,
    LeftTab
  },
}
</script>

<style scoped>

</style>
