<template>
  <el-dialog v-model="visible" :title="title" width="30%">
    <div class="flex flex-col items-center space-y-4">
      <el-avatar v-if="currentAvatar" :size="100" :src="currentAvatar" />
      <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-change="handleChange"
          :show-file-list="false"
      >
      </el-upload>
      <div class="flex justify-between">
        <el-button slot="trigger" type="primary">选择文件</el-button>
        <el-button type="success" @click="submitUpload">上传到服务器</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';
import { ElMessage } from 'element-plus';

const props = defineProps({
  modelValue: Boolean,
  title: String,
  currentAvatar: String
});

const emit = defineEmits(['update:modelValue', 'uploaded']);

const visible = ref(props.modelValue);
const file = ref(null);

watch(
    () => props.modelValue,
    (newValue) => {
      visible.value = newValue;
    }
);

watch(
    () => visible.value,
    (newValue) => {
      emit('update:modelValue', newValue);
    }
);

const handleChange = (file) => {
  const isJPG = file.raw.type === 'image/jpeg';
  const isLt2M = file.raw.size / 1024 / 1024 < 2;

  if (!isJPG) {
    ElMessage.error('上传头像图片只能是 JPG 格式!');
  }
  if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过 2MB!');
  }
  if (isJPG && isLt2M) {
    this.file = file.raw;
  }
  return isJPG && isLt2M;
};

const submitUpload = () => {
  if (!file.value) {
    ElMessage.error('请选择文件!');
    return;
  }
  // 提交上传逻辑
  emit('uploaded', file.value);
  visible.value = false;
};
</script>

<style scoped lang="scss">
.el-upload {
  display: inline-block;
}
</style>
