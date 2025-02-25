import http from "@/axios.js";

export const getMenus = (data) => {
  return http.get("/api/menus/menu-tree",data);

};