<template>
  <div class="flex justify-between items-center w-full">
    <div class="flex items-center space-x-4">
      <el-button type="text" @click="toggleCollapse"
                 class="text-gray-700 hover:text-blue-600 transition-colors duration-200">
        <el-icon class="fixed-icon-size">
          <!-- 使用了正确的图标组件 -->
          <component :is="isCollapsed ? 'Expand' : 'Fold'"></component>
        </el-icon>
      </el-button>
      <!-- 根据侧边栏是否折叠来显示或隐藏标题 -->
      <!-- 标题显示逻辑 -->
      <TransitionGroup name="fade" >
        <h1
            v-show="isCollapsed"
            class="font-mono text-gray-800 transition-opacity duration-300"
            :key="'title-header'"
        >
          教务管理系统
        </h1>
      </TransitionGroup>
    </div>
    <div class="flex items-center space-x-4">
      <el-dropdown @command="handleCommand" trigger="click">
        <div class="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 rounded-full p-1 transition-colors duration-200">
          <el-avatar :size="40" :src="avatarUrl" class="border-2 border-gray-200"/>
          <span class="text-gray-700">{{ username }}</span>
          <el-icon class="text-gray-500">
            <ArrowDown/>
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="profile" class="flex items-center">
              <el-icon class="mr-2">
                <User/>
              </el-icon>
              个人资料
            </el-dropdown-item>
            <el-dropdown-item command="logout" class="flex items-center">
              <el-icon class="mr-2">
                <SwitchButton/>
              </el-icon>
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { computed, defineEmits, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { ArrowDown, SwitchButton, User } from '@element-plus/icons-vue';
import { logoutApi } from '@/api/user.js';


const avatarUrl = ref(''); // 初始头像
const store = useStore();
const router = useRouter();
// 计算属性，根据侧边栏宽度判断是否折叠
const isCollapsed = computed(() => store.state.asideWidth === '65px');
const username = ref('');

const toggleCollapse = () => {
  // 触发侧边栏折叠或展开的状态更新
  store.commit('handleAsideWidth');
};

const emit = defineEmits(['showProfile']);

// 退出登录
const handleCommand = (command) => {
  if (command === 'profile') {
    emit('showProfile'); // 触发 showProfile 事件
  } else if (command === 'logout') {
    handleLogout();
  }
};

// 退出登录
const handleLogout = () => {
  logoutApi()
      .then(() => {
        return store.dispatch('logout'); // 清空用户信息
      })
      .then(() => {
        ElMessage.success('退出成功');
        router.push('/login');
      })
      .catch((error) => {
        console.error('退出失败:', error);
        ElMessage.error('退出失败，请稍后重试');
      });
};

</script>

<style scoped lang="scss">
.fixed-icon-size {
  font-size: 20px; /* 可以根据需要调整图标大小 */
}
</style>