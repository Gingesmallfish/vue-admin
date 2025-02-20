<template>
  <div class="register-container">
    <!-- 左栏，可添加背景图等 -->
    <div class="left-column">
      <div class="left-content">
        <h1 class="title">{{ props.title }}</h1>
        <p class="description">开启教务管理新体验</p>
      </div>
    </div>
    <!-- 右栏，注册表单 -->
    <div class="right-column">
      <div class="form-container">
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

const props = defineProps({
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
  @apply flex min-h-screen bg-gray-100;

  .left-column {
    @apply w-1/2 bg-cover bg-center;
    background-image: url('@/assets/images/register.png');
  }

  .left-content {
    @apply flex flex-col h-full justify-center items-center p-8 bg-black bg-opacity-30;

    .title {
      @apply text-4xl font-bold text-white mb-4;
    }

    .description {
      @apply text-lg text-white text-center;
    }
  }


  .right-column {
    @apply w-1/2 flex justify-center items-center p-8;
  }

  .form-container {
    @apply w-full max-w-md bg-white p-8 rounded-lg shadow-lg;
  }
}


</style>
