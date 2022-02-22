import { message, notification } from 'antd';
import request from './request';

// callRestfulApi通用调用Restful API
export function callRestfulApi(
  objName,
  method,
  params,
  handleSuccess = null,
  handleError = null,
) {
  let url = `/api/v1/${objName}s`;
  const options = { method: method.toUpperCase() };
  if (params.id && options.method !== 'POST') {
    url = `${url}/${params.id}`;
  }
  if (
    options.method === 'POST' ||
    options.method === 'PUT' ||
    options.method === 'PATCH'
  ) {
    options.data = params;
  } else {
    //if(method==='GET'||method==='DELETE'){
    const newParams = {};
    Object.keys(params).forEach((key) => {
      if (key !== 'id') {
        newParams[key] = params[key];
      }
    });
    options.params = newParams;
  }
  request(url, options)
    .then((res) => {
      if (res.code === 200) {
        if (handleSuccess) {
          handleSuccess(res);
        } else {
          const wordMap = {
            GET: '查询',
            POST: '新增',
            PUT: '修改',
            DELETE: '删除',
          };
          message.success(res.message || `${wordMap[method]}成功`);
        }
      } else if (handleError) {
        handleError(res);
      } else {
        message.error(res.message);
      }
    })
    .catch((errors) => {
      notification.error(errors);
    });
}

// fakeLogin 登录
export async function fakeLogin(params) {
  return request('/api/v1/plt/login', {
    method: 'POST',
    data: params,
  });
}

// getCaptcha 获取登录验证码
export async function getCaptcha(params) {
  return request(`/api/v1/get-captcha`, {
    method: 'POST',
    data: params,
  });
}

// 获取系统通知
export async function getNotices(params) {
  return request('/api/v1/get-notices', {
    method: 'GET',
    params,
  });
}

// getMyInfo 获取个人信息
export async function getMyInfo(params) {
  return request('/api/v1/member/my-info', {
    method: 'GET',
    params,
  });
}

// putMyInfo 修改个人信息
export async function putMyInfo(params) {
  return request('/api/v1/member/my-info', {
    method: 'PUT',
    params,
  });
}

// logout 退出系统
export async function fakeLogout(params) {
  return request('/api/v1/logout', {
    method: 'DELETE',
    params,
  });
}

// getHomeInfo 获取首页信息
export async function getHomeInfo(params) {
  return request('/api/v1/home', {
    method: 'GET',
    params,
  });
}

// getMemberDetail 获取用户信息详情
export async function getMemberDetail(id) {
  return request(`/api/v1/members/${id}`, {
    method: 'GET',
  });
}

// getMemberList 获取用户信息列表
export async function getMemberList(params) {
  return request('/api/v1/members', {
    method: 'GET',
    params,
  });
}

// getVideoDetail 获取视频详情信息和播放链接地址
export async function getVideoDetail(parmas) {
  return request(`/api/v1/videos/${parmas?.id}`, {
    method: 'GET',
    parmas,
  });
}

// getVideos 获取视频列表
export async function getVideos(params) {
  return request('/api/v1/videos', {
    method: 'GET',
    params,
  });
}

// 第三方平台搜索视频
export async function searchVideos(params) {
  return request(`/api/v1/bt4kyy/search/${params.keywords}`, {
    method: 'GET',
    params,
  });
}

// getVcateDetail 获取视频分类详情
export async function getVideoCateDetail(id) {
  return request(`/api/v1/video-cates/${id}`);
}

// getVcates 获取视频分类列表
export async function getVcates(params) {
  return request('/api/v1/video-cates', {
    method: 'GET',
    params,
  });
}

// getTVChannels 获取电视频道
export async function getTVChannels(params) {
  return request('/api/v1/tv-channels', {
    method: 'GET',
    params,
  });
}

//getMenus 分页获取菜单列表
export async function getMenus(params) {
  return request('/api/v1/menus', {
    method: 'GET',
    params,
  });
}

// getMenuTree 获取菜单树
export async function getMenuTree(params) {
  return request('/api/v1/menu-tree', {
    method: 'GET',
    params,
  });
}

// getOptions获取菜单树
export async function getOptions(params) {
  return request('/api/v1/options', {
    method: 'GET',
    params,
  });
}

// getOptionDetail获取菜单树
export async function getOptionDetail(params) {
  return request(`/api/v1/options/${params.id}`, {
    method: 'GET',
    params,
  });
}

// addOption 添加字典项
export async function addOption(params) {
  console.info('params', params);
  return request('/api/v1/options', {
    method: 'POST',
    data: params,
  });
}

// addOption 添加字典项
export async function modifyOption(params) {
  return request(`/api/v1/options/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

// addOption 添加字典项
export async function removeOption(params) {
  return request(`/api/v1/options/${params.id}`, {
    method: 'DELETE',
    params,
  });
}

// getAdmins获取菜单树
export async function getAdmins(params) {
  return request('/api/v1/admins', {
    method: 'GET',
    params,
  });
}
