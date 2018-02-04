$(function(){
    var currentPage=1;
    var render=function(){
        //1. Ĭ����Ⱦ��һҳ
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
//    2. ʵ�ַ�ҳ��Ⱦ
    var setPaginator=function(pageCurr, pageSum, callback){
        $('.pagination').bootstrapPaginator({
            /*��ǰʹ�õ���3�汾��bootstrap*/
            bootstrapMajorVersion: 3,
            /*���õ������С��С��*/
            size: 'small',
            /*��ǰҳ*/
            currentPage: pageCurr,
            /*һ������ҳ*/
            totalPages: pageSum,
            /*���ҳ���¼�*/
            onPageClicked: function (event, originalEvent, type, page) {
                /*�ı䵱ǰҳ����Ⱦ page��ǰ����İ�ť��ҳ��*/
                currPage = page;
                callback && callback();
            }
        });
    }
})













//��ȡ��̨����
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