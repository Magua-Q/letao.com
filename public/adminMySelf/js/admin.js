/**
 * Created by Administrator on 2017/12/20 0020.
 */
//1. 进度条显示
NProgress.configure({
    showSpinner: false
});
//在ajax开始请求的时候,把进度条显示出来
$(window).ajaxStart(function(){
    NProgress.start();
})
//在ajax结束请求的时候,把进度条完成
$(window).ajaxStop(function(){
    NProgress.done();
})
//2.左侧菜单栏的显示与隐藏
$("[data-menu]").on("click",function(){
    $("aside").toggle();
    $(".ad_section").toggleClass("margin-left")
})
//3. 二级菜单的显示与隐藏
$(".menu [href='javascript:;']").on("click",function(){
    var $child=$(this).siblings(".child");
    $child.slideToggle();
})
//4. 退出功能
$("[data-logout]").on("click",function(){
    var logoutModal =
        '<div class="modal fade" id="logoutModal">'+
        '<div class="modal-dialog modal-sm">'+
        '<div class="modal-content">'+
        '<div class="modal-header">'+
        '<button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>'+
        '<h4 class="modal-title">温馨提示</h4>'+
        '</div>'+
        '<div class="modal-body">'+
        '<p class="text-danger"><span class="glyphicon glyphicon-info-sign"></span> 您确定要退出后台管理系统吗？</p>'+
        '</div>'+
        '<div class="modal-footer">'+
        '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
        '<button type="button" class="btn btn-primary">确定</button>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>';
    $("#motai").html(logoutModal);
    $("#logoutModal").modal("show");
    $("#logoutModal").off("click",".btn-primary").on("click",".btn-primary",function(){
        $.ajax({
            type:"get",
            url:'/employee/employeeLogout',
            data:{},
            dataType:"json",
            success:function(data){
                if(data.success){
                    location.href="login.html"
                }
            }
        })
    })

})