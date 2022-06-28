<template>
  <div class="row mx-0 mt-5">
    <div class="col-md-8 offset-md-2">
      <h4>Update social media</h4>
      <hr>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group my-2">
            <label>File:</label>
            <input type="text" class="form-control" v-model="edit.value.file">
          </div>
          <div class="form-group my-2">
            <label>Discord:</label>
            <input type="text" class="form-control" v-model="edit.value.discord">
          </div>
          <div class="form-group my-2">
            <label>Telegram:</label>
            <input type="text" class="form-control" v-model="edit.value.telegram">
          </div>
          <div class="form-group my-2">
            <label>Twitter:</label>
            <input type="text" class="form-control" v-model="edit.value.twitter">
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
  name: "SocialMedia",
  computed: {
    ...mapState(['auth']),
    currentRouteName() {
      return this.$route.name
    }
  },
  data() {
    return {
      edit: {
        type: '',
        value: {}
      }
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
          type: 'SOCIAL_MEDIA'
        }
      }).then(response => {
        let {data, success} = response;
        if (success) {
          vm.edit = {
            type: 'SOCIAL_MEDIA',
            value: JSON.parse(data[0].value)
          }
        }
      })
    },
    save() {
      let vm = this;
      vm.$store.dispatch('admin/updateWebConfig', {
        password: vm.auth.PASSWORD,
        type: 'SCREEN_PASSWORD_' + this.currentRouteName,
        data: vm.edit,
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
