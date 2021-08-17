import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: "/work/page",
    method: "get",
    params: {
      ...params,
      current,
      size
    }
  });
};
