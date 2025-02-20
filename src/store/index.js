import {createStore} from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  state() {
    return {
      token: null,
    user: null,
    redirectPath: null, // 添加重定向路径

      asideWidth: "250px"
    }

  },


  mutations: {
    login(state, { token, user }) {
      state.token = token;
      state.user = user;
    },
    logout(state) {
      state.token = null;
      state.user = null;
    },

     // 展开/缩起侧边
        handleAsideWidth(state){
            state.asideWidth = state.asideWidth === "250px" ? "64px" : "250px"
        },

     setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
    setRedirectPath(state, path) {
      state.redirectPath = path; // 设置重定向路径
    }
  },
  actions: {
    login({ commit }, { token, user }) {
      commit('login', { token, user });
    },
    logout({ commit }) {
      commit('logout');
    },
    setRedirectPath({ commit }, path) {
      commit('setRedirectPath', path);
    }
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
    getRedirectPath(state) {
      return state.redirectPath; // 获取重定向路径
    }
  },
  plugins: [
    createPersistedState({
      paths: ['token', 'user'],
      storage: window.localStorage
    })
  ]
});

export default store;
