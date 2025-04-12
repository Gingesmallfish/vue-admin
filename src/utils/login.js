import { ElMessage } from "element-plus";
import { login } from "../api/auth";
import store from "../store/index.js";

export const handleLogin = async (loginData, router, refreshCaptcha, startCountdown) => {
  // 检查是否已登录
  if (store.getters.isLoggedIn) {
    ElMessage.error("您已经登录，请勿重复登录");
    return;
  }

  try {
    const res = await login(loginData);
    const { data } = res;

    if (data.message === "登录成功") {
      const { token, user } = data;
      const { username, password, captcha } = loginData;

      // 保存登录信息到 Vuex
      await store.dispatch("login", {token, user, username, password, captcha});

      ElMessage.success("登录成功");
      // 3.3Element-Plus 已被弃用，使用link
      await router.push("/admin")
      
    } else {
      ElMessage.error(data.message);
      refreshCaptcha(); // 刷新验证码
    }
  } catch (error) {
    console.error(error);
    ElMessage.error("登录失败，60s之后重新登录");
    startCountdown(); // 启动倒计时
  }
};


// 注册
