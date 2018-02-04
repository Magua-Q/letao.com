/**
 * Created by Administrator on 2017/12/17 0017.
 */
//初始化区域滚动组件
mui(".mui-scroll-wrapper").scroll({
    indicators:false,
})

$(function(){
    var urlParams=lt.getUrlParams();
    var render=function(){
        getProductDetailData({
            id:urlParams.productId,
        },function(data){

            $(".mui-scroll").html(template("detail",data));
        //    轮播图初始化
            mui(".mui-slider").slider({
                interval:3000,
            })
        //    数量选择初始化
            mui(".mui-numbox").numbox()
        })
    }
    render();
    //刷新
    $(".mui-icon-reload").on("tap",function(){
        $('.mui-scroll').html('<div class="loading"><span class="mui-icon mui-icon-spinner"></span></div>');
        render();
    })
//    尺寸选择
    $(".mui-scroll").on("tap",".size",function(){
        $(".size").removeClass("now")
        $(this).addClass("now")
    })
//    数量
    $(".mui-btn-danger").on("tap",function(){

        var data={
            productId:urlParams.productId,
            size:$(".size.now").html(),
            num:$(".mui-numbox-input").val()
        };
        console.log(data);
    //    数据校验
        if(!data.productId){
            mui.toast("商品异常");
            return false;
        }
        if(!data.size){
            mui.toast("请选择尺码");
            return false;
        }
        if(!data.num){
            mui.toast("请选择数量");
            return false;
        }

    //    发送后台
        lt.ajaxFilter({
            url:'/cart/addCart',
            type:"post",
            data:data,
            dataType:"json",
            beforeSend:function(){
                window.addingCart=true;
            },
            success:function(data){
                if(data.success){
                    mui.confirm('加入购物车成功，去购物车看看？', '温馨提示', ['去看看','继续浏览'], function(e) {
                        if (e.index == 0) {
                            /*按了第一个按钮*/
                            location.href = 'user/cart.html';
                        } else {
                            /*按了其他按钮 暂时处理*/
                        }
                    });
                }
                else{
                    mui.toast('添加失败，请重试！');
                }
                window.addCarting=false;
            },
            error:function(){
                mui.toast('网络繁忙！');
                window.addCarting = false;
            }
        });
    });
});

//获取产品详细信息
var getProductDetailData=function(params,callback){
    $.ajax({
        url:'/product/queryProductDetail',
        type:"get",
        data:params,
        dataType:"json",
        success:function(data){
            callback && callback(data);
        }
    })
}