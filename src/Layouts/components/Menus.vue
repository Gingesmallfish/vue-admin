<!-- src/Layouts/components/Menus.vue -->
<template>
  <el-menu
      :default-active="activeMenu"
      class="el-menu-vertical-demo h-screen"
      @select="handleSelect"
      :collapse="isCollapsed"
  >
    <template v-for="item in menuTree" :key="item.id">
      <!-- 处理 is_title 为 true 的情况 -->
      <div v-if="item.is_title" class="menu-title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span>{{ item.name }}</span>
      </div>
      <el-sub-menu v-else-if="item.children && item.children.length > 0" :index="item.path">
        <template #title>
          <i :class="`el-icon-${item.icon}`"></i>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item
            v-for="child in item.children"
            :key="child.id"
            :index="child.path"
        >
          <i :class="`el-icon-${child.icon}`"></i>
          <span>{{ child.name }}</span>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item v-else :index="item.path">
        <i :class="`el-icon-${item.icon}`"></i>
        <span>{{ item.name }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getMenus } from '@/api/menusAPI.js';

const route = useRoute();
const router = useRouter();
const menuTree = ref([]);
const activeMenu = ref(route.path);
const isCollapsed = ref(false);

const fetchMenuTree = async () => {
  try {
    const response = await getMenus();
    if (response.data && response.data.data) {
      menuTree.value = response.data.data;
    } else {
      console.error('获取菜单树数据格式不正确:', response);
    }
  } catch (error) {
    console.error('获取菜单树失败:', error);
  }
};

const handleSelect = (index) => {
  router.push(index);
};

watch(
    () => route.path,
    (newPath) => {
      activeMenu.value = newPath;
    }
);

onMounted(() => {
  fetchMenuTree();
});
</script>

<style scoped lang="scss">
.menu-title {
  @apply p-2.5 text-base font-bold text-gray-700;
  // 可以根据需要调整样式
}

.el-menu-vertical-demo {
  @apply overflow-y-auto;
  // 当内容超出高度时显示垂直滚动条
}
</style>
