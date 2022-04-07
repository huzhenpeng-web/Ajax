function resolveData(data) {
    var arr = []
    for (var i in data) {
        var str = i + '=' + data[i]
        arr.push(str)
    }
    return arr.join('&')
}

var result = resolveData({ name: 'hzp', age: 20 })
console.log(result);

function hzp(options) {
    var xhr = new XMLHttpRequest()
        //把外界传递过来的参数对象 转化为查询字符串
    var qs = resolveData(options.data)
    if (options.method === 'get') {
        //发起get请求
        xhr.open(options.method, options.url + '?' + qs)
        xhr.send()
    } else if (options.method === 'post') {
        //发起post请求
        xhr.open(options.method, options.url)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.send(qs)
    }
    //监听请求状态改变事件
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var results = JSON.parse(xhr.responseText)
            options.success(results)
            console.log(results);
        }
    }
}
hzp({ name: '张三' })