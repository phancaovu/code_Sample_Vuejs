<template>
  <section class="container">
    <div class="admin-page">
      <AdminMenu></AdminMenu>
      <LoginPassword v-if="!auth.IS_ADMIN"></LoginPassword>
      <router-view v-else/>
    </div>
  </section>
</template>

<script>
import LeftTab from "@/components/LeftTab";
import MarketMenu from "@/components/MarketMenu";
import AdminMenu from "@/components/AdminMenu";
import LoginPassword from "@/components/LoginPassword";
import {mapState} from "vuex";

export default {
  name: "MasterAdmin",
  components: {
    LeftTab,
    MarketMenu,
    AdminMenu,
    LoginPassword
  },
  computed: {
    ...mapState(['auth'])
  },
}
</script>

<style scoped>

</style>
