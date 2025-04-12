<template>
    <p class="description">
        <slot> 开启教务管理新体验</slot>
    </p>
</template>

<script setup>
defineProps({
    animationName: {
        type: String,
        default: 'roll', // 默认动画名称
    },
    duration: {
        type: String,
        default: '5s', // 动画持续时间
    },
    infinite: {
        type: Boolean,
        default: true, // 是否无限循环
    },
});
</script>

<style lang="scss" scoped>
.description {
    @apply w-max whitespace-nowrap;
    animation: roll 5s linear infinite;

    &::before {
        content: '';
        display: inline-block;
        // 这里的长度需要与最外层容器一致
        width: 13rem;
        height: 100%;
    }
}

@keyframes roll {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(-100%);
    }
}
</style>