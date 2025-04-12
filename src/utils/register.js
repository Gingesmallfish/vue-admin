import { ElMessage } from "element-plus";
import { register } from "@/api/auth";

export const handleRegister = async (registerData, refreshCaptcha, goToLogin) => {
  try {
    const response = await register(registerData);
    if (response.data.message === "注册成功") {
      ElMessage.success("注册成功,请登录");
      goToLogin(); // 跳转到登录页面
    } else {
      ElMessage.error(response.data.message);
      refreshCaptcha(); // 刷新验证码
    }
  } catch (error) {
    console.error(error);
    ElMessage.error("注册失败，请稍后重试！");
    refreshCaptcha(); // 刷新验证码
  }
};