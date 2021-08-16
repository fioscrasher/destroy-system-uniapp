import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/blade-system/region/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}
