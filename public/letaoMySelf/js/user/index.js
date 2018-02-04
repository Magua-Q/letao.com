/**
 * Created by Administrator on 2017/12/18 0018.
 */
$(function(){
    //    显示用户信息
    var render=function(){
        getUserMassage(function(data){
            $(".mui-media-body").html(data.username+"<p>手机号码:"+data.mobile+"</p>")
        })
    }
    render();
})



//获取用户信息
var getUserMassage=function(callback){
    lt.ajaxFilter({
        url:'/user/queryUserMessage',
        type:"get",
        data:"",
        dataType:"json",
        success:function(data){
            callback && callback(data)
        }

    })
}