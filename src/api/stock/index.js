import request from '@/router/axios';

export const inStock = (current, size, params) => {
  return request({
    url: "/stock/inStockPage",
    method: "get",
    params: {
      ...params,
      current,
      size
    }
  });
};

export const outStock = (current, size, params) => {
  return request({
    url: "/stock/outStockPage",
    method: "get",
    params: {
      ...params,
      current,
      size
    }
  });
};
