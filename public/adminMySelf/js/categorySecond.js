$(function(){
//    1. 默认首页渲染
    var currentPage=1;
    var  render=function(){
        getSecondCategoryData({
            page:currentPage,
            pageSize:5
        },function(data){
            //渲染列表
            $("tbody").html(template("secondCategoryTpl",data))
            setPaginator(data.page,Math.ceil(data.total/data.size),render)
        })
    }
    render();
//    2. 实现分页渲染
    var setPaginator=function(pageCurr,pageSum,callback){
        $(".pagination").bootstrapPaginator({
            /*当前使用的是3版本的bootstrap*/
            bootstrapMajorVersion: 3,
            /*配置的字体大小是小号*/
            size: 'small',
            /*当前页*/
            currentPage: pageCurr,
            /*一共多少页*/
            totalPages: pageSum,
            /*点击页面事件*/
            onPageClicked:function(event,originalEvent,type,page){
                currentPage=page;
                callback && callback();
            }
        })
    }
//    3.添加二级分类
    $("#addSecondCategory").on("click",function(){
        $("#addModal").modal("show");
    });
    //初始化模态框功能
    initDropDown();
    initUpload();
    $('#form').bootstrapValidator({
        /*校验插件默认会忽略  隐藏的表单元素
         不忽略任何情况的表单元素*/
        excluded:[],
        /*默认样式*/
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        /*校验的字段*/
        fields:{
            categoryId:{
                validators: {
                    notEmpty: {
                        message: '请选择一级分类'
                    }
                }
            },
            brandName:{
                validators: {
                    notEmpty: {
                        message: '请输入二级分类名称'
                    }
                }
            },
            brandLogo:{
                validators: {
                    notEmpty: {
                        message: '请上传二级分类Logo'
                    }
                }
            }
        }
    }).on('success.form.bv', function(e) {
        e.preventDefault();
        var $form=$(e.target);
        $.ajax({
            url:"/category/addSecondCategory",
            type:"post",
            data:$form.serialize(),
            dataType:"json",
            success:function(data){
                if(data.success){
                    $("#addModal").modal("hide");
                    currentPage=1;
                    render();
                    $form[0].reset();
                    $form.data('bootstrapValidator').resetForm();
                    $('.dropdown-text').html('请选择');
                    $form.find('img').attr('src','images/none.png');
                }
            }
        });

    })
})


//1. 获取后台数据
var getSecondCategoryData=function(params,callback){
    $.ajax({
        url:"/category/querySecondCategoryPaging",
        type:"get",
        data:params,
        dataType:"json",
        success:function(data){
            callback && callback(data);
        }
    });
}
// 下拉选择
var initDropDown=function(){
    var $dropDown=$(".dropdown-menu");
    $.ajax({
        type:"get",
        url:"/category/queryTopCategoryPaging",
        data:{
            page:1,
            pageSize:100
        },
        dataType:"json",
        success:function(data){
            var html=[];
            $.each(data.rows,function(i,item){
                html.push('<li><a data-id="'+item.id+'" href="javascript:;">'+item.categoryName+'</a></li>');
            })
            $dropDown.html(html.join(""))
        }
    });
    $dropDown.on("click","a",function(){
        $(".dropdown-text").html($(this).html());
        $("[name='categoryId']").val($(this).data("id"));
        $("#form").data("bootstrapValidator").updateStatus("categoryId","VALID");
    })
}
// 图片上传
var initUpload=function(){
    $("[name='pic1']").fileupload({
        dataType:"json",
        done:function(e,data){
            $(".form-group").find("img").attr("src",data.result.picAddr);
            $("[name='brandLogo']").val(data.result.picAddr);
            $("#form").data("bootstrapValidator").updateStatus("brandLogo","VALID");
        }
    })
}