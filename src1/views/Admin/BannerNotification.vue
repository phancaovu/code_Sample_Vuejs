<template>
  <div class="row mx-0 mt-5">
    <div class="col-md-8 offset-md-2">
      <h4>Update Banner Notifications</h4>
      <hr>
      <div class="row">
        <div class="col-md-12">
          <div class="input-group my-2" v-for="(item,index) in edit.value">
            <div class="input-group mb-3">
              <span class="input-group-text">Image</span>
              <input type="text" class="form-control" v-model="item.image">
              <span class="input-group-text">Link active</span>
              <input type="text" class="form-control" v-model="item.url">
              <button class="btn btn-danger " @click="removeItem(index)">Remove</button>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <button class="btn btn-primary" @click="addItem">add field</button>
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
  name: "BannerNotification",
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
        value: []
      },
      items: [{
        image: '',
        url: ''
      }],
    }
  },
  created() {
    let vm = this;
    vm.loadSetting();
  },
  methods: {
    addItem() {
      this.edit.value.push({
        image: 'link image',
        url: 'link active'
      });
      this.$forceUpdate()
    },
    removeItem(index) {
      this.edit.value.splice(index, 1);
      this.$forceUpdate()
    },
    loadSetting() {
      let vm = this;
      vm.$store.dispatch('admin/listWebConfig', {
        password: vm.auth.PASSWORD,
        type: 'SCREEN_PASSWORD_' + this.currentRouteName,
        where: {
          type: 'BANNER_LEFT'
        }
      }).then(response => {
        let {data, success} = response;
        if (success) {
          // console.log(data[0].value)
          // console.log(JSON.parse(data[0].value))
          // console.log(JSON.parse(JSON.parse(data[0].value)))
          vm.edit = {
            type: 'BANNER_LEFT',
            value: _.isString(data[0].value) ? (_.isArray(JSON.parse(data[0].value)) ? JSON.parse(data[0].value) : JSON.parse(JSON.parse(data[0].value))) : data[0].value
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
