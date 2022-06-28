<template>
  <section>
    <div class="admin-page">
      <div class="row mx-0 mt-5 justify-content-center">
        <div class="col-md-6">
          <h4>Web Config</h4>
          <hr>
          <form class="row" enctype="multipart/form-data">
            <!--            <div class="col-md-6">-->
            <div class="form-group">
              <div class="input-group my-3">
                <label class="col-sm-2 col-form-label text-warning text-capitalize">type</label>
                <select class="form-select" v-model="select_type">
                  <option v-for="item in listType" :value="item.type">
                    {{ item.type }}
                  </option>
                </select>
              </div>

              <div class="input-group my-3" v-for="(value,key) in valueObject">
                <label class="col-sm-2 col-form-label text-warning text-capitalize">{{ key }}</label>
                <input type="text" class="form-control" v-model="valueObject[key]">
                <input class="form-control" type="file" @change="fileUpload(key)" :ref="key" name="filename" accept="image/*">
              </div>
              <!--                <button class="btn btn-submit mx-auto btn-block" @click="addItem">add field</button>-->

              <!--                <div class="input-group my-3" v-for="(item,index) in items">-->
              <!--                  <div class="col-2">-->
              <!--                    <input placeholder="key" type="text" class="form-control col-2" v-model="item.key">-->
              <!--                  </div>-->
              <!--                    <input placeholder="value" type="text" class="form-control" v-model="item.value">-->
              <!--                    <button class="btn btn-danger " @click="removeItem(index)">-</button>-->
              <!--                </div>-->
              <!--                <div class="mb-3">-->
              <!--                  <label for="formFile" class="form-label">Image</label>-->
              <!--                  <input class="form-control" type="file" id="formFile">-->
              <!--                </div>-->
            </div>

            <!--            </div>-->
          </form>
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
      select_type: null,
      listType: [],
      valueObject: {},
      items: [{
        key: '',
        value: ''
      }],
      file: []
    }
  },
  created() {
    this.list()
  },
  methods: {
    fileUpload(key) {
      let vm = this
      vm.file.push(this.$refs[key][0].files[0]);
      vm.$forceUpdate()
    },
    async update() {
      let vm = this;
      if (!vm.auth.IS_ADMIN) {
        vm.error('Please login to access function');
        return null;
      }
      vm.$store.dispatch('admin/updateWebConfig', {
        password: vm.auth.PASSWORD,
        type: 'SCREEN_PASSWORD_' + this.currentRouteName,
        config_type: vm.select_type,
        value: vm.valueObject
      }).then(async response => {
        let {data, message, success} = response;
        if (success) {
          this.success('Config Successfully');
          await vm.list();
        } else {
          this.error(message);
        }
      }).catch(e => {
        if (_.isArray(e)) {
          e.forEach(msg => {
            this.error(msg);
          })
        } else {
          this.error(e.message)
        }
        vm.$store.dispatch('auth/setAdmin', false);
      });
    },
    async list() {
      let vm = this;
      vm.$store.dispatch('admin/listWebConfig', {
        password: vm.auth.PASSWORD,
        type: 'SCREEN_PASSWORD_' + this.currentRouteName,
      }).then(async response => {
        let {data, message, success} = response;
        if (success) {
          vm.listType = data
          vm.select_type = data[0].type
          vm.valueObject = _.isString(data[0].value) ? JSON.parse(data[0].value) : data[0].value
        } else {
          this.error(message);
        }
      }).catch(e => {
        if (_.isArray(e)) {
          e.forEach(msg => {
            this.error(msg);
          })
        } else {
          this.error(e)
        }
        vm.$store.dispatch('auth/setAdmin', false);
      });
    },
    addItem() {
      this.items.push({
        value: ''
      });
    },
    removeItem(index) {
      this.items.splice(index, 1);
    }
  },
  watch: {
    'select_type'(new_value) {
      let vm = this
      vm.listType.forEach(item => {
        if (item.type === new_value) {
          vm.valueObject = _.isString(item.value) ? JSON.parse(item.value) : item.value
        }
      })
    },
    async 'auth.IS_ADMIN'(new_value) {
      let vm = this;
      if (new_value) {
        await vm.list();
        // await vm.getListItem();
      }
    }
  }
}
</script>
