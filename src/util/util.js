export default {
  name:"Util",
  setCookie: function (cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays / 24 * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  },
  getCookie: function (cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1);
      if (c.indexOf(name) !== -1) return c.substring(name.length, c.length);
    }
    return null;
  },
  delCookie:function (key) {
    this.setCookie(key, null, -1);
  }
  ,
  setTimeFormat:function (value) {
    let time = new Date(value);
    let y = time.getFullYear();
    let m = time.getMonth()+1;
    let d = time.getDate();
    let h = time.getHours();
    let mm = time.getMinutes();
    let s = time.getSeconds();
    let add = function add0(m){return m < 10 ? '0' + m:m };
    return y+'-'+add(m)+'-'+add(d)+' '+add(h)+':'+add(mm)+':'+add(s);
  }

}