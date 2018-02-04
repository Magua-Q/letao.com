/**
 * Created by Administrator on 2017/12/20 0020.
 */
$(function(){
    $("#login").bootstrapValidator({
        feedbackIcons:{
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            username:{
                validators:{
                    notEmpty:{
                        message:"用户名不能为空"
                    },
                    callback:{
                        message:"用户名错误"
                    }
                }
            },
            password:{
                validators:{
                    notEmpty:{
                        message:"密码不能为空"
                    },
                    stringLength:{
                        min:6,
                        max:18,
                        message:"密码在6-18个字符内"
                    },
                    callback:{
                        message:"密码不正确"
                    }
                }
            }
        }

    }).on('success.form.bv',function(e){
        e.preventDefault();

        var $form=$(e.target)
        console.log($(e.target));
    //    发送ajax去请求
        $.ajax({
            url:"/employee/employeeLogin",
            type:"post",
            data:$form.serialize(),
            dataType:"json",
            success:function(data){
                if(data.success){
                    location.href="index.html";
                }else{
                    $form.data('bootstrapValidator').disableSubmitButtons(false);
                    if(data.error==1000){
                        $form.data('bootstrapValidator').updateStatus('username','INVALID','callback');
                    }else if(data.error==1001) {
                        $form.data('bootstrapValidator').updateStatus('password','INVALID','callback');
                    }
                }
            }
        });
    });
//    重置功能
    $("[type='reset']").on("click",function(){
        $('#login').data('bootstrapValidator').resetForm();
    });
})