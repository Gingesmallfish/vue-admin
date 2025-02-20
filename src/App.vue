<template>
  <div id="app" v-loading.fullscreen.lock="loading">
    <router-view></router-view>
  </div>
</template>


<script setup>
import { ref, provide } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const loading = ref(false);


// 设置全局加载状态
provide('loading', loading)


// 监听路由变化，设置加载状态
router.beforeEach((to, from, next) => {
  loading.value = true;
  next()
})


router.beforeEach(() => {
  loading.value = false;
})

</script>

<style lang="scss">
#app{
  @apply h-full
}
</style>

