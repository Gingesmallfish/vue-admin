import http from "@/axios.js";

export const getMenus = () => {
  return http.get("/api/menus");

};