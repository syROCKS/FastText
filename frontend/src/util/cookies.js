export const getCookie = (cname) => {
  let name = cname + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
};

export const setCookie = (name, value) => {
  document.cookie = name + '=' + value + ';path=/';
};

export const deleteCookie = (name) => {
  document.cookie = name + '=;path=/;expires=' + new Date(0).toUTCString();
}
