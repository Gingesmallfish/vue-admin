<template>
  <div class="w-full h-full">
    <el-menu>
      <h2 class="h-[60px] flex justify-center items-center">教务管理系统</h2>
      <template v-for="item in sidebar" :key="item.id">
        <el-menu-item v-if="!item.children || item.children.length === 0" :index="item.id.toString()">
          <router-link :to="item.link" style="text-decoration: none; color: inherit;">
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </router-link>
        </el-menu-item>
        <el-sub-menu v-else :index="item.id.toString()">
          <template #title>
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item v-for="child in item.children" :key="child.id" :index="child.id.toString()">
            <router-link :to="child.link" style="text-decoration: none; color: inherit;">
              <i :class="child.icon"></i>
              <span>{{ child.title }}</span>
            </router-link>
          </el-menu-item>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import lesson from '@/api/menus/menus.json';

const sidebar = ref([]);

onMounted(() => {
  console.log('Lesson data:', lesson); // 添加调试日志
  sidebar.value = lesson.sidebar;
});

</script>

<style lang="scss" scoped>
</style>
