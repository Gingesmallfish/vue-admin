import http from "../axios.js";

export const getMenus = () => {
  return http({
    url: "/api/menus",
    method: "get",
  })

};