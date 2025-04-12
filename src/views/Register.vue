<template>
  <WatermarkWrapper class="absolute inset-0 ">
    <div class="register-container">
      <!-- 左栏，可添加背景图等 -->
      <div class="left-column ">
        <div class="overlay"></div>
        <div class="left-content ">
          <h1 class="title">{{ title }}</h1>
          <div class="w-1/3 text-white overflow-hidden">
            <AnimatedText animationName="roll" duration="5s" />
          </div>
        </div>
      </div>
      <!-- 右栏，注册表单 -->
      <div class="right-column">
        <div class="form-container fade-in">
          <h2 class="form-title">教务管理系统注册</h2>
          <RegisterForm :captchaUrl="captchaUrl" @refresh-captcha="refreshCaptcha" @go-to-login="goToLogin" />
        </div>
      </div>
    </div>
  </WatermarkWrapper>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import RegisterForm from "@/components/Auth/RegisterForm.vue";
import { useCaptcha } from "@/utils/Captcha.js";
import AnimatedText from "@/components/AnimatedText.vue";
import WatermarkWrapper from "@/components/WatermarkWrapper.vue";
import { handleRegister } from "@/utils/register.js"; // 引入封装的注册方法

const { captchaUrl, refreshCaptcha } = useCaptcha();
const router = useRouter();

defineProps({
  title: {
    type: String,
    default: "教务管理系统注册",
  },
});

// 跳转到登录页面
const goToLogin = () => {
  router.push("/login");
};

// 提交注册
const handleSubmit = (registerData) => {
  handleRegister(registerData, router, refreshCaptcha); // 调用封装的注册方法
};

onMounted(() => {
  refreshCaptcha();
});
</script>

<style scoped lang="scss">
.register-container {
  @apply flex flex-col md:flex-row min-h-screen bg-gray-100;

  .left-column {
    @apply lg:w-2/5 md:w-1/2 w-full  bg-cover bg-center relative z-10 flex flex-col justify-center items-center;
    background-image: url('@/assets/images/register.png');

    min-height: 100vh; /* 默认高度为屏幕高度 */

    @media (max-width: 768px) {
      min-height: 20vh; /* 小屏幕下高度为屏幕高度的一半 */
    }

    @media (max-width: 480px) {
      min-height: 20vh; /* 更小屏幕下调整为 60% 的屏幕高度 */
    }

    .overlay {
      @apply absolute inset-0 bg-black bg-opacity-50;
      /* 调整不透明度 */
    }

    .left-content {
      @apply relative flex flex-col h-full justify-center items-center bg-opacity-30;

      .title {
        @apply text-4xl font-bold text-white mb-4 ;
      }

    }
  }

  .right-column {
    @apply lg:w-3/5 md:w-1/2 w-full flex justify-center items-center p-6 z-10;


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
