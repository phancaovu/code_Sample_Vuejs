<template>
  <div id="app">
    <Header></Header>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Logo from '@/assets/logo.png'

export default {
  metaInfo: {
    meta: [
      {charset: 'utf-8'},
      {name: 'robots', content: 'noindex, nofollow'},
      {name: 'googlebot', content: 'noindex'},
    ],
    link: [
      {rel: 'icon', href: Logo, type: 'image/gif', sizes: '16x16'}
    ]
  },
  components: {
    Header
  }
}
</script>
