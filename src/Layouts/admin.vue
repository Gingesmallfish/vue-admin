<template>
  <el-container class="common-layout">
    <el-aside width="200px">
      <Menus></Menus>
    </el-aside>
    <el-container>
      <el-header>
          <Header></Header>
      </el-header>
      <el-main>
        <router-view ></router-view>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script setup>
import Header from "@/Layouts/components/Header.vue";
import Menus from "@/Layouts/components/Menus.vue";
</script>

<style lang="scss" scoped>

</style>