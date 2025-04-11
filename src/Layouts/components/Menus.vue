<template>
  <el-menu :default-active="$route.path" mode="vertical" router>
    <template v-for="menu in menuList" :key="menu.id" >
      <template v-if="menu.children && menu.children.length > 0">
        <el-sub-menu :index="menu.path">
          <template #title>
            <i :class="`el-icon-${menu.icon}`"></i>
            <span>{{ menu.name }}</span>
          </template>
          <template v-for="child in menu.children" :key="child.id">
            <el-menu-item :index="child.path">
              <i :class="`el-icon-${child.icon}`"></i>
              <span>{{ child.name }}</span>
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
      <el-menu-item v-else :index="menu.path">
        <i :class="`el-icon-${menu.icon}`"></i>
        <span>{{ menu.name }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import menus from '@/db/menus.json';
const menuList = ref([]);
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
</style>