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
                        message:"�û�������Ϊ��"
                    },
                    callback:{
                        message:"�û�������"
                    }
                }
            },
            password:{
                validators:{
                    notEmpty:{
                        message:"���벻��Ϊ��"
                    },
                    stringLength:{
                        min:6,
                        max:18,
                        message:"������6-18���ַ���"
                    },
                    callback:{
                        message:"���벻��ȷ"
                    }
                }
            }
        }

    }).on('success.form.bv',function(e){
        e.preventDefault();

        var $form=$(e.target)
        console.log($(e.target));
    //    ����ajaxȥ����
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
//    ���ù���
    $("[type='reset']").on("click",function(){
        $('#login').data('bootstrapValidator').resetForm();
    });
})