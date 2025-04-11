import {ref} from "vue";
import { getCaptcha } from '@/api/auth';
import { ElMessage } from 'element-plus';

export const useCaptcha = () => {
  const captchaUrl = ref(''); // 验证码图片的URL

  //
  const refreshCaptcha = async () => {
    try {
      const response = await getCaptcha();
      const base64Image = arrayBufferToBase64(response.data);
      captchaUrl.value = `data:image/svg+xml;base64,${base64Image}`;
      // 验证码获取失败, 显示错误信息
      if (!captchaUrl.value){
        ElMessage.error('获取验证码失败，请稍后重试');
      }
    } catch (error) {
      console.error('获取验证码失败:', error);

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
