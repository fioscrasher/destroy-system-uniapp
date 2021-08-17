import request from '@/router/axios';

export const apiStatusCount = () => {
  return request({
    url: "/home/statusCount",
    method: "get"
  });
};
