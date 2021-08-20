import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: "/workReturn/page",
    method: "get",
    params: {
      ...params,
      current,
      size
    }
  });
};
