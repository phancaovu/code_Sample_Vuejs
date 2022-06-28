<template>
  <header>
    <div class="menubg position-relative my-5">
      <nav class="navbar navbar-expand-lg menu-bar">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Admin Panel</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Config
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <div v-for="(menu, index) in menus">
                      <router-link :key="index" :class="['dropdown-item']" :to="{ name: menu.component }" active-class="active">{{ menu.name }}</router-link>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import {AdminMenus} from "@/utils/admin_menu";
export default {
  name: "AdminMenu",
  data() {
    return {
      menus: AdminMenus
    }
  }
}
</script>

<style scoped>

</style>
