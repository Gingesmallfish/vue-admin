<template>
  <div class="sidebar-container">
    <el-menu :default-active="activeMenu" class=" h-seconds" @select="handleSelect"
             :collapse="isCollapse">
      <template v-for="item in menuTree" :key="item.id">
        <el-menu-item v-if="item.is_title" :index="item.path" class="menu-title">
          <el-icon class="text-xl" :class="{ 'hidden': item.hideIconOnExpand && !isCollapse }">
            <component :is="item.icon"></component>
          </el-icon>
          <span class="ml-2">{{ item.name }}</span>
        </el-menu-item>
        <el-sub-menu v-else-if="item.children && item.children.length > 0" :index="item.path">
          <template #title>
            <el-icon class="text-xl" :class="{ 'hidden': item.hideIconOnExpand && !isCollapse }">
              <component :is="item.icon"></component>
            </el-icon>
            <span class="ml-2">{{ item.name }}</span>
          </template>
          <el-menu-item v-for="child in item.children" :key="child.id" :index="child.path" class="child-menu-item">
            <el-icon class="text-lg">
              <component :is="child.icon"></component>
            </el-icon>
            <span class="ml-2">{{ child.name }}</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="item.path" class="menu-item">
          <el-icon class="text-xl">
            <component :is="item.icon"></component>
          </el-icon>
          <span class="ml-2">{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import {computed, onMounted, ref, watch} from 'vue';
import {useStore} from 'vuex';
import {useRoute, useRouter} from 'vue-router';
import {getMenus} from '../api/menusAPI.js';

const route = useRoute();
const router = useRouter();
const menuTree = ref([]);
const activeMenu = ref(route.path);
const store = useStore();
const isCollapse = computed(() => store.state.asideWidth === '65px');

const fetchMenuTree = async () => {
  try {
    const response = await getMenus();
    if (response.data && response.data.data) {
      menuTree.value = response.data.data.map(item => {
        if (item.name === '教务管理系统') {
          return {
            ...item,
            hideIconOnExpand: true
          };
        }
        return item;
      });
    }
  } catch (error) {
    console.error('获取菜单数据失败:', error);
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

</style>
