<template>
  <el-form :model="registerForm" :rules="rules" ref="formRef" label-width="80px" class="space-y-6">
    <!-- 用户名 -->
    <el-form-item label="用户名" prop="username">
      <el-input v-model="registerForm.username" placeholder="请输入用户名">
        <template #prefix>
          <el-icon class="text-gray-400">
            <User/>
          </el-icon>
        </template>
      </el-input>
    </el-form-item>

    <!-- 密码 -->
    <el-form-item label="密码" prop="password">
      <el-input v-model="registerForm.password" type="password" placeholder="请输入密码">
        <template #prefix>
          <el-icon class="text-gray-400">
            <Lock/>
          </el-icon>
        </template>
      </el-input>
    </el-form-item>

    <!-- 确认密码 -->
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input v-model="registerForm.confirmPassword" type="password" placeholder="请再次输入密码">
        <template #prefix>
          <el-icon class="text-gray-400">
            <Lock/>
          </el-icon>
        </template>
      </el-input>
    </el-form-item>

    <!-- 姓名 -->
    <el-form-item label="姓名" prop="name">
      <el-input v-model="registerForm.name" placeholder="请输入姓名">
        <template #prefix>
          <el-icon class="text-gray-400">
            <User/>
          </el-icon>
        </template>
      </el-input>
    </el-form-item>

    <!-- 性别 -->
    <el-form-item label="性别" prop="sex">
      <el-radio-group v-model="registerForm.sex" class="flex space-3">
        <el-radio value="男" class="text-gray-700">男</el-radio>
        <el-radio value="女" class="text-gray-700">女</el-radio>
        <el-radio value="其他" class="text-gray-700">其他</el-radio>
        <el-radio value="保密" class="text-gray-700">保密</el-radio>
      </el-radio-group>
    </el-form-item>

    <!-- 手机号码 -->
    <el-form-item label="手机号码" prop="phone">
      <el-input v-model="registerForm.phone" placeholder="请输入手机号码">
        <template #prefix>
          <el-icon class="text-gray-400">
            <Phone/>
          </el-icon>
        </template>
      </el-input>
    </el-form-item>

    <!-- 用户角色 -->
    <el-form-item label="用户角色" prop="role">
      <el-select v-model="registerForm.role" placeholder="请选择用户角色" class="w-full">
        <el-option value="1" label="学生"/>
        <el-option value="2" label="教师"/>
        <el-option value="3" label="管理员"/>
      </el-select>
    </el-form-item>

    <!-- 验证码 -->
    <el-form-item label="验证码" prop="captcha" class="flex items-center space-2">
      <el-input v-model="registerForm.captcha" placeholder="请输入验证码" class="flex-1">
        <template #prefix>
          <el-icon class="text-gray-400">
            <Unlock/>
          </el-icon>
        </template>
      </el-input>
      <Captcha :captchaUrl="captchaUrl" @refresh-captcha="refreshCaptcha"/>
    </el-form-item>

    <!-- 注册按钮 -->
    <el-form-item>
      <el-button type="primary" @click="handleRegister" class="w-full">{{ props.button }}</el-button>
    </el-form-item>

    <!-- 跳转到登录 -->
    <el-form-item>
      <el-link @click="$emit('go-to-login')" class="text-blue-500">{{ props.goToLogin }}</el-link>
    </el-form-item>
  </el-form>
</template>

<script setup>
import {ref, defineProps, defineEmits} from 'vue';
import {register} from '@/api/auth';
import {ElMessage} from 'element-plus';
import {Lock, Unlock, User, Phone} from '@element-plus/icons-vue';
import Captcha from "@/components/Auth/Captcha.vue";
import {rules, validateConfirmPassword} from "@/utils/validationRules.js";

const props = defineProps({
  captchaUrl: String,
  button: {
    type: String,
    default: '注册',
  },
  goToLogin: {
    type: String,
    default: '没有账号？去登录',
  },
});

const emit = defineEmits(['refresh-captcha', 'go-to-login']);

const registerForm = ref({
  username: '',
  password: '',
  confirmPassword: '',
  name: '',
  sex: '',
  phone: '',
  role: '',
  captcha: '',
});

const formRef = ref(null);

const handleRegister = async () => {
  try {
    const valid = await formRef.value.validate();
    if (!valid) {
      return;
    }

    const {username, password, confirmPassword, name, sex, phone, role, captcha} = registerForm.value;
    const registerData = {
      username,
      password,
      confirmPassword,
      name,
      sex,
      phone,
      role: parseInt(role, 10),
      captcha
    };

    const response = await register(registerData);
    if (response.data.message === '注册成功') {
      ElMessage.success('注册成功,请登录');
      emit('go-to-login');
    } else {
      ElMessage.error(response.data.message);
      refreshCaptcha();
    }
  } catch (error) {
    ElMessage.error('注册失败，请稍后重试！');
    refreshCaptcha();
  }
};


const refreshCaptcha = () => {
  emit('refresh-captcha');
};

// 传递 registerForm 给我的工具验证规则
rules.confirmPassword[1].validator = (rule, value, callback) => validateConfirmPassword(registerForm)(rule, value, callback);
</script>

<style scoped lang="scss">
/* 这里可以根据需要添加一些无法用 Element Plus 类名实现的特殊样式 */
</style>
