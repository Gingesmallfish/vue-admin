<template>
  <div class="permissions-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h3>用户权限管理</h3>
        </div>
      </template>
      <div class="permissions-content">
        <!-- 用户权限列表 -->
        <el-table :data="userPermissions" style="width: 100%">
          <el-table-column prop="username" label="用户名" width="180" />
          <el-table-column prop="role" label="角色" width="180" />
          <el-table-column prop="permissions" label="权限" />
          <el-table-column label="操作" width="200">
            <template #default="scope">
              <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

// 模拟用户权限数据
const userPermissions = ref([
  {
    username: 'admin',
    role: '管理员',
    permissions: '所有权限'
  },
  {
    username: 'teacher',
    role: '教师',
    permissions: '课程管理、成绩管理'
  },
  {
    username: 'student',
    role: '学生',
    permissions: '查看课程、查看成绩'
  }
]);

// 编辑用户权限
const handleEdit = (row) => {
  ElMessage.info('编辑用户：' + row.username);
};

// 删除用户权限
const handleDelete = (row) => {
  ElMessage.warning('删除用户：' + row.username);
};
</script>

<style lang="scss" scoped>
.permissions-container {

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .permissions-content {
    margin-top: 20px;
  }
}
</style>