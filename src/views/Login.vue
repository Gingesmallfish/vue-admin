<template>
  <WatermarkWrapper class="absolute inset-0">
    <div class="login-container">
      <!-- 左侧图片及文字 -->
      <div class="left-column">
        <div class="overlay"></div>
        <div class="left-content">
          <h1 class="title">{{ title }}</h1>
          <div class="w-1/3 text-white overflow-hidden">
            <!-- 使用 AnimatedText 组件 -->
            <AnimatedText animationName="roll" duration="5s" />
          </div>
        </div>
      </div>
      <!-- 右侧登录表单 -->
      <div class="right-column">
        <div class="form-container fade-in">
          <!-- 添加标题 -->
          <h2 class="form-title">教务管理系统登录</h2>
          <LoginForm :captchaUrl="captchaUrl" @submit="handleSubmit" @refresh-captcha="refreshCaptcha"
            @go-to-register="gotoRegister" :loginDisabled="loginDisabled" :countdown="countdown" />
        </div>
      </div>
    </div>
  </WatermarkWrapper>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useCaptcha } from "../utils/Captcha.js";
import { handleLogin } from "../utils/login.js"; // 引入封装的登录方法
import LoginForm from "../components/Auth/LoginForm.vue";
import WatermarkWrapper from "../components/WatermarkWrapper.vue";
import AnimatedText from "../components/AnimatedText.vue";

const { captchaUrl, refreshCaptcha } = useCaptcha();
const router = useRouter();

const loginDisabled = ref(false);
const countdown = ref(0);

// 获取标题
defineProps({
  title: {
    type: String,
    default: '教务管理系统登录'
  }
});

// 启动倒计时
const startCountdown = () => {
  loginDisabled.value = true;
  countdown.value = 60;
  const interval = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      clearInterval(interval);
      loginDisabled.value = false;
    }
  }, 1000);
};

// 提交登录
const handleSubmit = (loginData) => {
  handleLogin(loginData, router, refreshCaptcha, startCountdown); // 调用封装的登录方法
};

// 跳转到注册页面
const gotoRegister = () => {
  router.push("/register");
};

onMounted(() => {
  refreshCaptcha();
});

// 监听倒计时的变化
watch(countdown, (newCountdown) => {
  if (newCountdown === 0) {
    loginDisabled.value = false;
  }
});
</script>

<style scoped lang="scss">
.login-container {
  @apply flex flex-wrap min-h-screen cursor-pointer bg-gray-100;

  .left-column {
    @apply lg:w-2/5 md:w-1/2 w-full bg-cover bg-center relative z-10;
    background-image: url('@/assets/images/register.png');

    .overlay {
      @apply absolute inset-0 bg-black bg-opacity-50;
    }

    .left-content {
      @apply relative flex flex-col h-full justify-center items-center bg-opacity-30;

      .title {
        @apply text-4xl font-bold text-white mb-4;
      }
    }
  }

  .right-column {
    @apply lg:w-3/5 md:w-1/2 w-full flex justify-center items-center relative z-10;

    .form-container {
      @apply w-full max-w-md bg-white p-8 rounded-lg shadow-lg transition-shadow duration-300 ease-in-out;

      &:hover {
        @apply shadow-xl;
      }

      .form-title {
        @apply text-2xl font-bold text-center mb-6 text-gray-700;
      }

      .el-input input {
        @apply text-gray-700 border border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-200 focus:ring-opacity-50;
      }

      .el-button {
        @apply bg-blue-500 text-white hover:bg-blue-600;
      }

      .el-link {
        @apply text-blue-500 hover:underline;
      }
    }
  }
}

// 应用淡入动画
.fade-in {
  animation: fadeIn 0.5s ease-out;
}

// 淡入动画关键帧
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
