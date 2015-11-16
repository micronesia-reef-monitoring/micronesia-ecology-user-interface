
export function storeToken (token) {
  return window.localStorage.setItem("token", token);
}

export function getToken () {
  return window.localStorage.getItem("token");
}

export function isTokenSet () {
  return window.localStorage.getItem("token") ? true : false;
}

export function getCookieToken () {
  let cookie;
  if (document.cookie){
    let cookies = document.cookie.split(";");
    cookies = cookies.map((c)=>{var arr = c.split("=");var obj={};obj[arr[0]]=arr[1];return obj;});
    cookies = cookies.filter((c)=>{return typeof c.csrftoken !== "undefined"});
    cookie = cookies[0].csrftoken;
  }
  return cookie;
}

export function deleteCookie () {
  let cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
	let cookie = cookies[i];
	let eqPos = cookie.indexOf("=");
	let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
	document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
	}
  return true;
}