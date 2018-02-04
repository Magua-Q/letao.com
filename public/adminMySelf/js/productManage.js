$(function(){
    var currentPage=1;
    var render=function(){
        //1. 默认渲染第一页
        getProductManageData({
            page:currentPage,
            pageSize:5
        },function(data){
            console.log(data);
            $("tbody").html(template("productManageTpl",data))
            setPaginator(data.page, Math.ceil(data.total / data.size), render);

        })
    }
    render();
//    2. 实现分页渲染
    var setPaginator=function(pageCurr, pageSum, callback){
        $('.pagination').bootstrapPaginator({
            /*当前使用的是3版本的bootstrap*/
            bootstrapMajorVersion: 3,
            /*配置的字体大小是小号*/
            size: 'small',
            /*当前页*/
            currentPage: pageCurr,
            /*一共多少页*/
            totalPages: pageSum,
            /*点击页面事件*/
            onPageClicked: function (event, originalEvent, type, page) {
                /*改变当前页再渲染 page当前点击的按钮的页面*/
                currPage = page;
                callback && callback();
            }
        });
    }
})













//获取后台数据
var getProductManageData=function(params,callback){
    $.ajax({
        url:"/product/queryProductDetailList",
        type:"get",
        data:params,
        dataType:"json",
        success:function(data){
            callback && callback(data);
        }
    })
}