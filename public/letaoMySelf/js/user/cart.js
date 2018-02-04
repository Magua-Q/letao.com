/**
 * Created by Administrator on 2017/12/18 0018.
 */
$(function(){
//    1.չʾ���ﳵ��Ʒ
            //1.1 �������ˢ��Ч��
    mui.init({
        pullRefresh : {
            container:".mui-scroll-wrapper",//����ˢ��������ʶ��querySelector�ܶ�λ��cssѡ�������ɣ����磺id��.class��
            down : {
                auto: true,//��ѡ,Ĭ��false.�״μ����Զ�����ˢ��һ��
                callback :function(){
                    getCartData(function(data){
                        $(".mui-table-view").html(template("cart",data))
                    })

                    mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                } //��ѡ��ˢ�º��������ݾ���ҵ������д������ͨ��ajax�ӷ�������ȡ�����ݣ�
            }
        }
    });

//    2. ɾ�����ﳵ
    $(".mui-table-view").on("tap",".mui-btn-blue",function(){
        //console.log(1);
        var id=$(this).attr("data-id");
        console.log(id);
        mui.confirm("您确定要删除吗?","删除",["确定","取消"],function(e){
            if(e.index==0){
                lt.ajaxFilter({
                    url:"/cart/deleteCart",
                    type:"get",
                    data:{id:id},
                    dataType:"json",
                    success:function(data){
                        if(data.success){
                            mui.toast("删除成功");
                            getCartData(function(data){
                                $(".mui-table-view").html(template("cart",data))
                            })
                        }
                    }
                })
            }
        })

    })
//    3. 修改数据
    $(".mui-table-view").on("tap",".mui-btn-yellow",function(){
        var data=this.dataset;
        mui.confirm(template("modify",data).replace(/\n/g,""),"编辑商品",["确定","取消"],function(e){
            if(e.index==0){
                lt.ajaxFilter({
                    url:"/cart/updateCart",
                    type:"post",
                    data:{
                        id:data.id,
                        size:$('.lt_cart_edit span.now').html(),
                        num:$(".mui-numbox input").val()
                    },
                    dataType:"json",
                    success:function(data){
                        if(data.success){
                            mui.toast("操作成功")
                            getCartData(function(data){
                                $('.mui-table-view').html(template('cart',data));
                            })
                        }
                    }
                })
            }
        });
        mui('.mui-numbox').numbox();
        $(".lt_cart_edit").on("tap","span",function(){
            $(".lt_cart_edit span").removeClass("now")
            $(this).addClass("now")
        })
    })
//    4.生成价格
    $(".mui-table-view").on("change","input",function(){
        setAmount();
    })



})
//获取购物车详细
var getCartData=function(callback){
    lt.ajaxFilter({
        url:"/cart/queryCartPaging",
        type:"get",
        data:{
            page:1,
            pageSize:100
        },
        dataType:"json",
        success:function(data){
            console.log(data)
            setTimeout(function(){
                callback && callback(data);
            },500)
        }
    })
}
var setAmount=function(){
    var amount=0;
    console.log($("input:checked"))
    $("input:checked").each(function(){
        var num=$(this).attr("data-num")
        console.log(num);

        var price=$(this).attr("data-price")
        console.log(price);
        amount+=num*price;
    })
    $(".lt_cart span").html(Math.ceil(amount*100)/100)
}