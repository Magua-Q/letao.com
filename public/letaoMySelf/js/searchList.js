
$(function () {
    var currentPage=1;
    var key = lt.getUrlParams().key || "";
    mui.init({
        pullRefresh: {
            container: ".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                callback: function () {
                    // 下拉操作完成之后,业务代码在这里书写
                    //setTimeout(function () {
                    //    mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                    //}, 1000)
                    currentPage=1;
                    var order={};
                    if($("[data-type].now").length>0){
                        console.log($("[data-type].now"))
                        var type=$("[data-type].now").data("type");
                        var value=1;
                        if($("[data-type].now").find("span").hasClass("fa-angle-down")){
                            value=2
                        }else{
                            value=1;
                        }
                        order[type]=value;
                    }
                    getProductData ($.extend({
                        proName:key,
                        page:1,
                        pageSize:10
                    },order),function(data){
                        var html=template("productTpl",data);
                        $(".lt_product").html(html);
                        mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh(data.data.length==0)
                    })
                }
            },
            up: {
                callback: function () {

                    //setTimeout(function () {
                    //    mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
                    //}, 3000)
                    currentPage++;
                    var order={};
                    if($("[data-type].now").length>0){
                        console.log($("[data-type].now"))
                        var type=$("[data-type].now").data("type");
                        var value=1;
                        if($("[data-type].now").find("span").hasClass("fa-angle-down")){
                            value=2
                        }else{
                            value=1;
                        }
                        order[type]=value;
                    }
                    getProductData ($.extend({
                        proName:key,
                        page:1,
                        pageSize:10
                    },order),function(data){
                        var html=template("productTpl",data);
                        $(".lt_product").append(html);
                        mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(data.data.length==0);
                    })

                }
            }
        }
    });
    var render = function () {
        // 获取地址栏关键字
        // 1. 初始化渲染
        var key = lt.getUrlParams().key || "";
        //将key对象的value值显示在搜索框中
        $(".search_input").val(key);
        // 去后台获取数据
        getProductData({
            proName: key,
            page: 1,
            pageSize: 10
        }, function (data) {
            // console.log(data);
            // 获取数据成功之后
            // 渲染列表
            $(".lt_product").html(template("productTpl", data))

        });

        //2. 当前页搜索
        $(".search_btn").on("tap",function(){
        //    去掉排序
            $("[data-type].now").removeClass("now").find("span").removeClass("fa-angle-down").addClass("fa-angle-up");
        //    显示加载
            $(".lt_product").html('<div class="loading"><span class="mui-icon mui-icon-spinner"></span></div>'
            )
        //    当前页面
            currentPage=1;
        //    渲染
            render();

        })
        //3.排序展示
        //console.log($("[data-type]"));
        $("[data-type]").on("tap", function () {
            //  1. 静态页面的实现
            if ($(this).hasClass("now")) {
                //  改变箭头的方向
                $(this).find("span").toggleClass("fa-angle-down fa-angle-up")
            } else {
                $("[data-type].now").removeClass("now").find("span").removeClass("fa-angle-up").addClass("fa-angle-down");
                $(this).addClass("now");
            }
            //  2. 获取服务器的数据
            var order={};
            if($("[data-type].now").length>0){
                console.log($("[data-type].now"))
                var type=$("[data-type].now").data("type");
                var value=1;
                if($("[data-type].now").find("span").hasClass("fa-angle-down")){
                    value=2
                }else{
                    value=1;
                }
                order[type]=value;
            }
            getProductData ($.extend({
                proName:key,
                page:1,
                pageSize:10
            },order),function(data){
                var html=template("productTpl",data);
                $(".lt_product").html(html);

            })
        })
    }
    render();
});


// 获取后台数据 ,商品列表数据
var getProductData = function (params, callback) {
    $.ajax({
        url: '/product/queryProduct',
        type: "get",
        data: params,
        dataType: "json",
        success: function (data) {
            setTimeout(function(){
                    // 模拟加载数据
                callback&&callback(data)
        }, 1000)

}
})
}
