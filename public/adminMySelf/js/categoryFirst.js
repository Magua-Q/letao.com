/**
 * Created by Administrator on 2017/12/21 0021.
 */
$(function(){
//   1.  �����б��ҳչʾ
    var currentPage=1;
    var render=function(){
        getCategoryFirstData({
            page:currentPage,
            pageSize:10
        },function(data){
            console.log(data)
            $("tbody").html(template("categoryFirstTpl",data));
            setPaginator(data.page,Math.ceil(data.total/data.size),render)
        });
    }
    render();
//    2.��ҳչʾ
    var setPaginator=function(pageCurr,pageSum,callback){
    //    ��ȡ��Ҫ��ʼ����Ԫ��,ʹ��bootstrapPaginator����
        $(".pagination").bootstrapPaginator({
            bootstrapMajorVersion:3,
            size:"small",
            alignment:"right",
            currentPage:pageCurr,
            totalPages:pageSum,
            onPageClicked:function(event,originalEvent,type,page){
                currentPage=page;
                callback && callback();
            }
        });
    }

//    3. ���һ�����๦��
    $("#addCategory").on("click",function(){
    //    ģ̬����ʾ
        $("#addModal").modal("show");
    });
    // ���б�У��
    $("#form").bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            categoryName:{
                validators:{
                    notEmpty:{
                        message:"һ���������Ʋ���Ϊ��"
                    }
                }
            }
        }
    }).on("success.form.bv",function(e){
        e.preventDefault();
        var $form=$(e.target);
        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            data:$form.serialize(),
            dataType:"json",
            success:function(data){
                if(data.success){
                    $("#addModal").modal("hide");
                    currentPage=1;
                    render();
                    //���ñ�
                    $form.data("bootstrapValidator").resetForm();
                    $form.find("input").val("");
                }
            }
        });
    });
})
//��ȡ��̨����
var getCategoryFirstData=function(params,callback){
    $.ajax({
        url:"/category/queryTopCategoryPaging",
        type:"get",
        data:params,
        dataType:"json",
        success:function(data){
            callback && callback(data);
        }
    });
}