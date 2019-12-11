// todo: revert this back to 18.216.120.186
export const apiAddress = window.location.pathname.substr(0, window.location.pathname.indexOf('/'));

export function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";path=/";
}

export function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export function clearCookies() {
    let cookies = document.cookie.split(";");
    cookies.forEach((cookie) => {
        eraseCookie(cookie.split("=")[0]);
    });
}

function eraseCookie(name) {
    setCookie(name,"");
}