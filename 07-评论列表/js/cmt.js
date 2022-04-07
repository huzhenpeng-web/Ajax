function getCommontList() {
  $.ajax({
    method: 'GET',
    url: 'http://www.liulongbin.top:3006/api/cmtlist',
    success: function (res) {
      if (res.status != 200) {
        alert('获取失败!')
      }
      var rows = [];
      $.each(res.data, function (i, item) {
        var str = '<li class="list-group-item"> <span class = "badge"style = "background-color: #F0AD4E" > 评论时间: ' + item.time +
          '</span><span class = "badge"style = "background-color: #5BC0DE;"> 评论人:' + item.username + ' </span>' + item.content + ' </li>'
        rows.push(str);
      })
      $('#cmt-list').empty().append(rows.join(''))
      console.log('获取成功!')
    }
  })
}

getCommontList();

$(function(){
  $('#formAddCmt').submit(function(e){
    e.preventDefault();
    var data = $(this).serialize();
    //发送数据
    $.post('http://www.liulongbin.top:3006/api/addcmt', data,
      function (res) {
        if(res.status != 201) {
          return alert("评论失败!")
        }
        getCommontList();
        $('#formAddCmt')[0].reset();
      }
    );
  })
})