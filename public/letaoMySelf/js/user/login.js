/**
 * Created by Administrator on 2017/12/17 0017.
 */
$(function(){
    //����¼ע�����¼�
    $(".mui-btn-primary").on("tap",function(){
    //    ��ȡ����

        var data={
            username:$('[name="username"]').val(),
            password:$('[name="password"]').val(),
        };
    //    У������
        if(!data.username){
            mui.toast("�������û���");
            return false;
        }
        if(!data.password){
            mui.toast("����������");
            return false;
        }
    //    ��������
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
                    mui.toast("��¼ʧ��")
                }
            },
            error:function(){
                mui.toast("��������æ")
            }
        })
    //    �ɹ�
    //    ʧ��
    //    �����Ƿ��ظ�
    })
})