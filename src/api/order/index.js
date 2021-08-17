import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: "/order/page",
    method: "get",
    params: {
      ...params,
      current,
      size
    }
  });
};
