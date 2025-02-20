import { getCaptcha } from '@/api/auth';
import { ElMessage } from 'element-plus';
import {ref} from "vue";

export const useCaptcha = () => {
  const captchaUrl = ref('');

  const refreshCaptcha = async () => {
    try {
      const response = await getCaptcha();
      const base64Image = arrayBufferToBase64(response.data);
      captchaUrl.value = `data:image/svg+xml;base64,${base64Image}`;
    } catch (error) {
      console.error('获取验证码失败:', error);
      ElMessage.error('获取验证码失败，请稍后重试');
    }
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  return {
    captchaUrl,
    refreshCaptcha
  };
};
