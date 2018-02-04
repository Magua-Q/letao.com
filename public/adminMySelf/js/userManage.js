/**
 * Created by Administrator on 2017/12/21 0021.
 */
$(function(){
    var currentPage=1;
    var render=function(){
        getUserData({
            page:currentPage,
            pageSize:5
        },function(data){
            $('tbody').html(template('list',data));
            setPaginator(data.page,Math.ceil(data.total/data.size),render)
        });
    };
    render();
    var setPaginator = function(pageCurr,pageSum,callback){
        /*��ȡ��Ҫ��ʼ��Ԫ�� ʹ��bootstrapPaginator����*/
        $('.pagination').bootstrapPaginator({
            /*��ǰʹ�õ���3�汾��bootstrap*/
            bootstrapMajorVersion:3,
            /*���õ������С��С��*/
            size:'small',
            /*��ǰҳ*/
            currentPage:pageCurr,
            /*һ������ҳ*/
            totalPages:pageSum,
            /*���ҳ���¼�*/
            onPageClicked:function(event, originalEvent, type, page){
                /*�ı䵱ǰҳ����Ⱦ page��ǰ����İ�ť��ҳ��*/
                currPage = page;
                callback && callback();
            }
        });
    }
    $('tbody').on('click','.btn',function(){
        /*��ȡ����*/
        var id = $(this).data('id');
        var name = $(this).data('name');
        var isDelete = $(this).hasClass('btn-danger')?0:1;
        /*��ʾģ̬��*/
        $('#optionModal').find('strong').html(($(this).hasClass('btn-danger')?'���� ':'���� ')+name);
        $('#optionModal').modal('show');
        $('#optionModal').off('click','.btn-primary').on('click','.btn-primary',function(){
            /*��������*/
            $.ajax({
                type:'post',
                url:'/user/updateUser',
                data:{
                    id:id,
                    isDelete:isDelete
                },
                dataType:'json',
                success:function(data){
                    if(data.success){
                        render();
                        $('#optionModal').modal('hide');
                    }
                }
            })
        });
    });
});

/*��ȡ�û�����*/
var getUserData = function(params,callback){
    $.ajax({
        type:'get',
        url:'/user/queryUser',
        data:params,
        datType:'json',
        success:function(data){
            callback && callback(data);
        }
    });
};