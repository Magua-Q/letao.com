/**
 * Created by Administrator on 2017/12/21 0021.
 */
$(function(){
//   1.  分类列表分页展示
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
//    2.分页展示
    var setPaginator=function(pageCurr,pageSum,callback){
    //    获取需要初始化的元素,使用bootstrapPaginator方法
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

//    3. 添加一级分类功能
    $("#addCategory").on("click",function(){
    //    模态框显示
        $("#addModal").modal("show");
    });
    // 进行表单校验
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
                        message:"一级分类名称不能为空"
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
                    //重置表单
                    $form.data("bootstrapValidator").resetForm();
                    $form.find("input").val("");
                }
            }
        });
    });
})
//获取后台数据
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