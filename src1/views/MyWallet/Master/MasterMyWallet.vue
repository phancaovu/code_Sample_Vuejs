<template>
  <section>
    <div class="row mx-0">
      <LeftTab></LeftTab>
      <div class="col-lg-9 ps-xxl-0">
        <div class="right-tab mt-3">
          <div class="my-wallet">
            <div class="mywallet-menu">
              <MyWalletMenu></MyWalletMenu>
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
import MyWalletMenu from "@/components/MyWalletMenu";

export default {
  name: "MasterMyWallet",
  components: {
    MyWalletMenu,
    LeftTab
  },
}
</script>

<style scoped>

</style>
