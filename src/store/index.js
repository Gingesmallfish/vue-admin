import {createStore} from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import {login} from "@/api/auth.js";

// 创建 Vuex store 实例
const store = createStore({
    // 定义状态（state）
    state() {
        return {
            token: null, // 用户认证令牌
            user: null, // 用户信息
            redirectPath: null, // 重定向路径
            asideWidth: "250px", // 侧边栏宽度
            username: null, // 用户名
            password: null, // 密码
            captcha: null // 验证码
        };
    },
    // 定义 mutations，用于修改 state
    mutations: {
        // 登录操作，设置 token、user、username、password 和 captcha
        login(state, {token, user, username, password, captcha}) {
            state.token = token;
            state.user = user;
            state.username = username;
            state.password = password;
            state.captcha = captcha;
        },
        // 登出操作，清除 token、user、username、password 和 captcha
        logout(state) {
            state.token = null;
            state.user = null;
            state.username = null;
            state.password = null;
            state.captcha = null;
        },
        // 切换侧边栏宽度
        handleAsideWidth(state) {
            state.asideWidth = state.asideWidth === "250px" ? "65px" : "250px";
        },
        // 设置用户信息
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
        // 设置重定向路径
        setRedirectPath(state, path) {
            state.redirectPath = path;
        }
    },
    // 定义 actions，用于处理异步操作并提交 mutations
    actions: {
        // 登录操作，提交 login mutation
        login({commit}, {token, user, username, password, captcha}) {
            commit('login', {token, user, username, password, captcha});
        },
        // 登出操作，提交 logout mutation
        logout({commit}) {
            commit('logout');
        },
        // 设置重定向路径，提交 setRedirectPath mutation
        setRedirectPath({commit}, path) {
            commit('setRedirectPath', path);
        }
    },
    // 定义 getters，用于从 state 中派生出一些状态
    getters: {
        // 检查用户是否已登录
        isLoggedIn(state) {
            return !!state.token;
        },
        // 获取重定向路径
        getRedirectPath(state) {
            return state.redirectPath;
        }
    },
    // 定义 plugins，用于持久化 state
    plugins: [
        // 将 token 和 user 持久化到 localStorage
        createPersistedState({
            paths: ['token', 'user', 'username', 'password'],
            storage: window.localStorage
        }),
        // 将 captcha 持久化到 sessionStorage
        createPersistedState({
            paths: ['captcha'],
            storage: window.sessionStorage
        })
    ]
});

// 导出 store 实例
export default store;