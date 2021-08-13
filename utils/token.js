//设置键名，这里我设置的是固定的
const tokenKey = 'token';

//设置token
export function setToken(token){
    return sessionStorage.setItem(tokenKey,token);
}
//获取token
export function getToken(){
    return sessionStorage.getItem(tokenKey);
}
//删除token
export function removeToken(){
    return sessionStorage.removeItem(tokenKey);
}
