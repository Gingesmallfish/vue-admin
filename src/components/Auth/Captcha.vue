<template>
  <img
      :src="captchaUrl"
      @click="$emit('refresh-captcha')"
      alt="验证码"
      class="w-2/5 h-[30px] cursor-pointer "
  >
</template>

<script setup>
defineProps({
  captchaUrl: String
});

const emit = defineEmits(['refresh-captcha']);
</script>

<style scoped lang="scss">

</style>
