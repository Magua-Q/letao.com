/**
 * Created by Administrator on 2017/12/17 0017.
 */
$(function(){
    //给登录注册点击事件
    $(".mui-btn-primary").on("tap",function(){
    //    获取数据

        var data={
            username:$('[name="username"]').val(),
            password:$('[name="password"]').val(),
        };
    //    校验数据
        if(!data.username){
            mui.toast("请输入用户名");
            return false;
        }
        if(!data.password){
            mui.toast("请输入密码");
            return false;
        }
    //    发送数据
        $.ajax({
            url:"/user/login",
            type:"post",
            data:data,
            dataType:"json",
            success:function(data){
                console.log(data)
                if(data.success){
                    if(location.search  && location.search.indexOf("?returnUrl=")>-1){
                        returnUrl=location.search.replace("?returnUrl=","")
                        console.log(returnUrl);
                        location.href=returnUrl;
                    }else{
                        location.href="/letaoMySelf/user/index.html"
                    }
                }else{
                    mui.toast("登录失败")
                }
            },
            error:function(){
                mui.toast("服务器繁忙")
            }
        })
    //    成功
    //    失败
    //    检验是否重复
    })
})