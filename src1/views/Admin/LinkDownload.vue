<template>
  <div class="row mx-0 mt-5">
    <div class="col-md-8 offset-md-2">
      <h4>Update link download game</h4>
      <hr>
      <div class="row">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group my-2">
                <label>Window:</label>
                <input type="text" class="form-control" v-if="config.value" v-model="config.value.windows">
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group my-2">
                <label>MacOs:</label>
                <input type="text" class="form-control" v-if="config.value" v-model="config.value.macos">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <button class="btn btn-success" type="button" @click="save">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "LinkDownload",
  computed: {
    ...mapState(['auth']),
    currentRouteName() {
      return this.$route.name
    }
  },
  data() {
    return {
      config: {}
    }
  },
  created() {
    let vm = this;
    vm.loadSetting();
  },
  methods: {
    loadSetting() {
      let vm = this;
      vm.$store.dispatch('admin/listWebConfig', {
        password: vm.auth.PASSWORD,
        type: 'SCREEN_PASSWORD_' + this.currentRouteName,
        where: {
          type: 'LINK_DOWNLOAD_APP'
        }
      }).then(response => {
        let {data, success} = response;
        if (success) {
          vm.config = {
            type: data[0].type,
            value: JSON.parse(data[0].value)
          }
          vm.$forceUpdate();
        }
      })
    },
    save() {
      let vm = this;
      vm.$store.dispatch('admin/updateWebConfig', {
        password: vm.auth.PASSWORD,
        type: 'SCREEN_PASSWORD_' + this.currentRouteName,
        data: vm.config,
      }).then(async response => {
        let {data, message, success} = response;
        if (success) {
          vm.success('Update success');
          await vm.loadSetting();
        } else {
          vm.error(message);
        }
      }).catch(e => {
        vm.error(e.message);
        vm.$store.dispatch('auth/setAdmin', false);
      });
    }
  }
}
</script>

<style scoped>

</style>
