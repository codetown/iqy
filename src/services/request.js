/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { history } from 'umi';
import { extend } from 'umi-request';
import { message, notification } from 'antd';

// 某个字符串是否在某个数组中
const inArray = (str, strArr) => {
  let tag = false;
  for (let index = 0; index < strArr.length; index++) {
    if (str == strArr[index]) {
      tag == true;
      break;
    }
    return tag;
  }
};

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status } = response;
    notification.error({
      // message: `请求错误 ${status}: ${url}`,
      message: `网络错误${status},请重新连接网络`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  if (sessionStorage.getItem('jwt')) {
    sessionStorage.removeItem('jwt');
  }
  return response;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

// response拦截器, 处理response
request.interceptors.response.use(async (response) => {
  const responseData = await response.clone().json();
  if (responseData) {
    if (responseData.code === 405) {
      message.info("登录超时，请重新登录", 2, function () {
        // 返回405时删除已缓存的jwt数据
        if (sessionStorage.getItem('jwt')) {
          sessionStorage.removeItem('jwt');
        }
        if (sessionStorage.getItem('menuTree')) {
          sessionStorage.removeItem('menuTree');
        }
        history.push("/login");
      });
    }
  }
  return response;
});

//不需要登录就可以访问的接口
const noLoginUrls = [
  "/api/v1/login",
  "/api/v1/plf/login",
  "/api/v1/get-captcha"
];


const myRequest = async (url, options) => {
  const result = { url, options };
  if (!inArray(url, noLoginUrls)) {
    const jwt = sessionStorage.getItem('jwt');
    if (jwt) {
      const headers = { "Authorization": `Bearer ${jwt}` };
      result.options = { ...options, headers };
    }
  }
  return result;
}
request.interceptors.request.use(myRequest);

export default request;
