import service from '@/api/http';

export function addCategory(params: object) {
  return service.post(`/goods/addCategory`, params);
}
export function getCategory<T>(params: object) {
  return service.get<T>(`/goods/getCategory`, params);
}
export function getAllCategory<T>() {
  return service.get<T>(`/goods/getAllCategory`);
}
