import { ref } from 'vue';

const loading = ref(false);

export const startLoading = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000); // 加载 2 秒
};

export const isLoading = () => loading.value;