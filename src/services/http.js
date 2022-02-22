import { message, notification } from 'antd';
import request from './request';
export default {
    get: (objName, params) => request(`/api/v1/${objName}`, {
        method: 'GET',
        params,
    }), post: (objName, params) => request(`/api/v1/${objName}`, {
        method: 'POST',
        params,
    }), put: (objName, params) => request(`/api/v1/${objName}`, {
        method: 'PUT',
        params,
    }), delete: (objName, params) => request(`/api/v1/${objName}`, {
        method: 'DELETE',
        params,
    }), patch: (objName, params) => request(`/api/v1/${objName}`, {
        method: 'PATCH',
        params,
    })
};