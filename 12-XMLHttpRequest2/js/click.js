window.onload = function() {
    //获取上传文件的按钮
    var btns = document.getElementById('btn')
        //为按钮绑定监听事件
    btns.addEventListener('click', function(e) {
        e.preventDefault()
        var files = document.getElementById('files').files
        if (files.length <= 0) {
            return alert("您未选择任何文件!")
        }
        console.log('用户选择了文件');
        var fd = new FormData()
            //向formdata中追加文件
        fd.append('avatar', files[0])

        var xhr = new XMLHttpRequest()
            //监听文件上传进度
        xhr.upload.onprogress = function(e) {
            //e.lengthComputable为布尔值
            if (e.lengthComputable) {
                var percent = Math.ceil((e.loaded / e.total) * 100)
                    //获取进度条元素
                $('#jd')
                    .attr('style', 'width:' + percent + '%')
                    .html(percent + '%')
                console.log(percent + "%");
            }
        }

        xhr.upload.onload = function() { //成功后的进度条样式
            $('#jd').removeClass().addClass('progress-bar progress-bar-success')
        }

        xhr.open('post', 'http://www.liulongbin.top:3006/api/upload/avatar')
        xhr.send(fd)
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(xhr.responseText);
                var data = JSON.parse(xhr.responseText); //转化为对象
                if (data.status === 200) { //上传文件成功
                    //将服务器返回的图片地址 设置为img标签的src属性
                    document.querySelector('#img').src = 'http://www.liulongbin.top:3006' + data.url
                    console.log(data);
                } else { //上传文件失败
                    console.log(data.message);
                }
            }
        }
    })


}