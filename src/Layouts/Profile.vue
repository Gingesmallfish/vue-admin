<template>
  <div class="flex gap-3">
    <div class="flex gap-4 w-1/3">
      <el-card class="bg-white rounded-lg shadow-md">
        <AvatarComponent/>
      </el-card>
    </div>
    <div class="flex gap-4 w-3/4">
      <el-card class=" bg-white rounded-lg shadow-md">
        <UserInfoComponent/>
      </el-card>
    </div>
  </div>


</template>

<script setup>
import AvatarComponent from "../components/AvatarComponent.vue";
import UserInfoComponent from "../components/UserInfoComponent.vue";
</script>

<style scoped lang="scss">
.el-card {
  width: 100%;
  margin: 0;
}
</style>
