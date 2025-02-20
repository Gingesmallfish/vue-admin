<template>
  <div class="register-container">
    <!-- 左栏，可添加背景图等 -->
    <div class="left-column">
      <div class="overlay"></div>
      <div class="left-content">
        <h1 class="title">{{ title }}</h1>
        <div class="w-1/3 text-white overflow-hidden">
          <p class="description">开启教务管理新体验</p>
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
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import RegisterForm from "@/components/Auth/RegisterForm.vue";
import { useCaptcha } from '@/utils/Captcha.js';

const { captchaUrl, refreshCaptcha } = useCaptcha();
const router = useRouter();

defineProps({
  title: {
    type: String,
    default: '教务管理系统注册'
  }
});

onMounted(() => {
  refreshCaptcha();
});

const goToLogin = () => {
  router.push('/login');
};
</script>

<style scoped lang="scss">
.register-container {
  @apply flex flex-col md:flex-row min-h-screen bg-gray-100;

  .left-column {
    @apply lg:w-2/5 md:w-1/2 w-full bg-cover bg-center relative;
    background-image: url('@/assets/images/register.png');

    .overlay {
      @apply absolute inset-0 bg-black bg-opacity-50; /* 调整不透明度 */
    }

    .left-content {
      @apply relative flex flex-col h-full justify-center items-center p-8  bg-opacity-30;

      .title {
        @apply text-4xl font-bold text-white mb-4;
      }

      .description {
        @apply w-max whitespace-normal;
        animation: roll 5s linear infinite;

        &::before {
          content: '';
          display: inline-block;

          width: 13rem;
          height: 100%;
        }
      }
    }
  }

  .right-column {
    @apply lg:w-3/5 md:w-1/2 w-full flex justify-center items-center p-8;
  }

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

// 应用淡入动画
.fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes roll {
  from {
    transform: translateX(0);
  }

  to {
    transform:  translateX(-100%);
  }
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
