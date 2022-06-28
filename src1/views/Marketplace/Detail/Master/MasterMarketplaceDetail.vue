<template>
  <section>
    <div class="row mx-0">
      <LeftTab></LeftTab>
      <div class="col-lg-9">
        <div class="right-tab">
          <div class="row mx-0 mt-3">
            <div class="col-lg-10">
              <router-view/>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
import LeftTab from "@/components/LeftTab";

export default {
  name: "MasterMarketplaceDetail",
  components: {
    LeftTab,
  },
}
</script>

<style scoped>

</style>