<template>
  <el-menu :default-active="$route.path" mode="vertical" router @select="handleMenuClick" :collapse="isCollapsed">
    <template v-for="menu in menuList" :key="menu.id">
      <template v-if="menu.children && menu.children.length > 0">
        <el-sub-menu :index="menu.path">
          <template #title>
            <el-icon>
              <component :is="menu.icon"></component>
            </el-icon>
            <span>{{ menu.name }}</span>
          </template>
          <template v-for="child in menu.children" :key="child.id">
            <el-menu-item :index="child.path">
             <el-icon>
               <component :is="child.icon"></component>
             </el-icon>
              <span>{{ child.name }}</span>
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
      <el-menu-item v-else :index="menu.path">
        <el-icon>
          <component :is="menu.icon"></component>
        </el-icon>
        <span>{{ menu.name }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import menus from '@/db/menus.json';
import { useRouter } from 'vue-router';
import { startLoading } from '@/utils/progress'; // 引入封装的工具函数

const menuList = ref([]);
const store = useStore();
const isCollapsed = computed(() => store.state.asideWidth === '65px');
const router = useRouter();

// 点击菜单时触发进度条
const handleMenuClick = (path) => {
  startLoading(); // 调用封装的进度条函数
  router.push(path); // 跳转到对应路由
};

onMounted(() => {
  menuList.value = menus;
});
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  @apply w-full;
}
.el-menu {
  border-right: none;
}
.el-menu span {
  transition: all 0.3s ease-in-out;
}


</style>
