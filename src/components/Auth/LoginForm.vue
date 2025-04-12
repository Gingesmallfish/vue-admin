<template>
  <div class="LoginFrom">
    <el-form :model="loginForm" :rules="rules" ref="formRef" label-width="80px">
      <!-- 用户名 -->
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入用户名">
          <template #prefix>
            <el-icon class="text-gray-400">
              <User />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <!-- 密码 -->
      <el-form-item label="密码" prop="password">
        <el-input
            v-model="loginForm.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="请输入密码"
        >
          <template #prefix>
            <el-icon class="text-gray-400">
              <Lock />
            </el-icon>
          </template>
          <template #suffix>
            <el-icon @click="showPassword = !showPassword" class="text-gray-400 cursor-pointer">
              <Hide v-if="!showPassword" />
              <View v-else />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <!-- 验证码 -->
      <el-form-item label="验证码" prop="captcha" class="flex items-center  space-3">
        <el-input v-model="loginForm.captcha" placeholder="请输入验证码"  class="flex-1">
          <template #prefix>
            <el-icon class="text-gray-400">
              <Unlock />
            </el-icon>
          </template>
        </el-input>
        <Captcha :captchaUrl="captchaUrl" @refresh-captcha="refreshCaptcha" />
      </el-form-item>

      <!-- 登录按钮 -->
      <el-form-item>
        <el-button
            type="primary"
            @click="handleLogin"
            :disabled="loginDisabled"
            class="w-full"
        >
          {{ loginDisabled ? `${countdown}秒后重试` : '登录' }}
        </el-button>
      </el-form-item>

      <!-- 跳转到注册 -->
      <el-form-item>
        <el-link @click="emit('go-to-register')" class="text-blue-500 hover:underline fade-in underline-offset-8">
          {{ goToRegister }}
        </el-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {Lock, Unlock, User, View, Hide} from '@element-plus/icons-vue';
import Captcha from "@/components/Auth/Captcha.vue";
import { rules } from "@/utils/validationRules.js";

defineProps({
  // 验证码图片
  captchaUrl: String,

  // 按钮参数
  goToRegister: {
    type: String,
    default: '没有账号？去注册',
  },
  // 登录按钮是否禁用
  loginDisabled: {
    type: Boolean,
    default: false,
  },
  // 倒计时
  countdown: {
    type: Number,
    default: 0,
  },
});

// 组件事件 发送事件
const emit = defineEmits(['submit', 'refresh-captcha', 'go-to-register']);

const loginForm = ref({
  username: '',
  password: '',
  captcha: '',
});

const formRef = ref(null);

const showPassword = ref(false);

const handleLogin = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return;
    }
    emit('submit', loginForm.value);
  });
};

const refreshCaptcha = () => {
  emit('refresh-captcha');
};
</script>

<style scoped lang="scss">
/* 这里可以根据需要添加一些无法用 Element Plus 类名实现的特殊样式 */
.LoginFrom {
  @apply  space-x-2 cursor-pointer mr-6;

  .fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }

}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>