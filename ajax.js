/* jshint esversion: 6 */
export {
    post,
    get,
    ajax,
};

function post() {
    var argus = Object.assign({ "method": "post" }, ...arguments);
    var g = new Ajax(argus);
    g.init();
    g.type();
}

function get() {
    var argus = Object.assign({ "method": "get" }, ...arguments);
    var g = new Ajax(argus);
    g.init();
    g.type();
}

function ajax() {
    var a = new Ajax(...arguments);
    a.init();
    a.type();
}

class Ajax {
    constructor({ method, url, data, success, error }) {
        this.method = method;
        this.url = url;
        this.data = data;
        this.success = success;
        this.error = error;
        this.xhr = this.init();
    }

    init() {
        var xhr = null;
        try {
            xhr = new XMLHttpRequest();
        } catch (error) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        return xhr;
    }

    type() {
        var xhr = this.xhr;
        var querystring = "";
        if (this.data) {
            querystring = this.queryString(this.data);
        }
        if (this.method === "get") {
            xhr.open(this.method, this.url + "?" + querystring, true);
            xhr.send();
        } else {
            xhr.open(this.method, this.url, true);
            if (this.method === "post") {
                xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            }
            xhr.send(querystring);
        }

        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    if (this.success) {
                        this.success(xhr.responseText);
                    }
                } else {
                    if (this.error) {
                        this.error("error" + xhr.status);
                    }
                }
            }
        };
    }

    queryString(dataObj) {
        var str = '';
        for (var attr in dataObj) {
            if (dataObj.hasOwnProperty(attr)) {
                str += `${attr}=${dataObj[attr]}&`;
            }
        }
        return str.slice(0, -1);
    }
}
