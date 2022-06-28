<template>
  <section>
    <div class="admin-page">
      <div class="row mx-0 mt-5">
        <div class="col-md-4 offset-md-2">
          <h4>Change page password</h4>
          <hr>
          <div class="row">
            <div class="form-group">
              <p class="text-center mb-1 text-warning text-capitalize">Please select page</p>
              <select class="form-select" v-model="selectPage">
                <option v-for="page in listPages" :value="page.component">
                  {{ page.name }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <p class="text-center mb-1 text-warning text-capitalize">New password</p>
              <input class="form-control" v-model="new_password" type="password" required/>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-12 d-grid gap-2">
              <button @click.prevent="update" class="btn btn-submit mx-auto btn-block">Update</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {mapState} from 'vuex';
import {AdminMenus} from "@/utils/admin_menu";

export default {
  name: 'GameSetting',
  computed: {
    ...mapState(['auth']),
    currentRouteName() {
      return this.$route.name
    }
  },
  data() {
    return {
      listPages: AdminMenus,
      selectPage: AdminMenus[0].component,
      new_password: ''
    }
  },
  created() {
    this.list()
  },
  methods: {
    async update() {
      let vm = this;
      if (this.new_password === '') {
        vm.error('Please input password')
        return null;
      }
      vm.$store.dispatch('admin/updatePagePassword', {
        password: vm.auth.PASSWORD,
        type: 'SCREEN_PASSWORD_' + this.currentRouteName,
        page_name: this.selectPage,
        new_password: this.new_password
      }).then(response => {
        let {success, message} = response
        if (success) {
          vm.success(message)
          this.new_password = ''
        }
      }).catch(e => {
        vm.error(e.message);
      })
    },
    async list() {
      let vm = this;
      if (!vm.auth.IS_ADMIN) {
        vm.error('Please login to access function');
        return null;
      }
    },
  }
}
</script>
