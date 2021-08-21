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

export const submitFeedback = data => {
  return request({
    url: "/workReturn/evaluateRegister",
    method: "post",
    data
  });
};

export const submitReview = data => {
  return request({
    url: "/workReturn/returnRegister",
    method: "post",
    data
  });
};
