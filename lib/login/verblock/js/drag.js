
$.fn.drag = function(options) {
    var x, drag = this,
        isMove = false,
        defaults = {};
    var options = $.extend(defaults, options);
    var handler = drag.find('.handler');
    var drag_bg = drag.find('.drag_bg');
    var text = drag.find('.drag_text');
    var maxWidth = drag.width() - handler.width(); //能滑动的最大间距
    var timer = '';
    //鼠标按下时候的x轴的位置
    handler.mousedown(function(e) {
        isMove = true;
        x = e.pageX - parseInt(handler.css('left'), 10);
    });

    //鼠标指针在上下文移动时，移动距离大于0小于最大间距，滑块x轴位置等于鼠标移动距离
    $(document).mousemove(function(e) {

        var _x = e.pageX - x; // _x = e.pageX - (e.pageX - parseInt(handler.css('left'), 10)) = x
        if (isMove) {
            if (_x > 0 && _x <= maxWidth) {
                if (_x > maxWidth / 2) {
                    myonmove(true);
                } else {
                    myonmove(false);
                }

                handler.css({ 'left': _x });
                drag_bg.css({ 'width': _x+5 });//这里+5是为了遮挡背景圆角
            } else if (_x > maxWidth) { //鼠标指针移动距离达到最大时清空事件
                dragOk();
            }
        }
    }).mouseup(function(e) {
        if (isMove) {
            var _x = e.pageX - x;
            if (_x < maxWidth) { //鼠标松开时，如果没有达到最大距离位置，滑块就返回初始位置
                mynomove();
                var timer = setInterval(function() {
                    if (_x > 0 &&_x< 40) {
                        _x = _x - 1;
                        handler.css({ 'left': _x });
                        drag_bg.css({ 'width': _x });//这里+5是为了遮挡背景圆角
                    }else if(_x>=40&&_x<80){
                        _x = _x - 2;
                        handler.css({ 'left': _x });
                        drag_bg.css({ 'width': _x });//这里+5是为了遮挡背景圆角
                    }else if(_x>=80){
                        _x = _x - 4;
                        handler.css({ 'left': _x });
                        drag_bg.css({ 'width': _x });//这里+5是为了遮挡背景圆角
                    }
                    else {
                        clearInterval(timer);
                        handler.css({ 'left': 0 });
                        drag_bg.css({ 'width': 0 });
                    }
                }, 1)
            }
        }
        isMove = false;
    });

    //鼠标按下时候的x轴的位置
    handler.on('touchstart', function (e) {
        isMove = true;
        x = e.originalEvent.changedTouches[0].pageX - parseInt(handler.css('left'), 10);
    });

    //鼠标指针在上下文移动时，移动距离大于0小于最大间距，滑块x轴位置等于鼠标移动距离
    $(document).on('touchmove', function (e) {

        var _x = e.originalEvent.changedTouches[0].pageX - x; // _x = e.pageX - (e.pageX - parseInt(handler.css('left'), 10)) = x
        if (isMove) {
            if (_x > 0 && _x <= maxWidth) {
                if (_x > maxWidth / 2) {
                    myonmove(true);
                } else {
                    myonmove(false);
                }

                handler.css({ 'left': _x });
                drag_bg.css({ 'width': _x });
            } else if (_x > maxWidth) { //鼠标指针移动距离达到最大时清空事件
                dragOk();
            }
        }
    }).on('touchend', function (e) {
        if (isMove) {
            var _x = e.originalEvent.changedTouches[0].pageX - x;
            if (_x < maxWidth) { //鼠标松开时，如果没有达到最大距离位置，滑块就返回初始位置
                mynomove();
                var timer = setInterval(function () {
                    if (_x > 0 && _x < 40) {
                        _x = _x - 1;
                        handler.css({ 'left': _x });
                        drag_bg.css({ 'width': _x });//这里+5是为了遮挡背景圆角
                    } else if (_x >= 40 && _x < 80) {
                        _x = _x - 2;
                        handler.css({ 'left': _x });
                        drag_bg.css({ 'width': _x });//这里+5是为了遮挡背景圆角
                    } else if (_x >= 80) {
                        _x = _x - 4;
                        handler.css({ 'left': _x });
                        drag_bg.css({ 'width': _x });//这里+5是为了遮挡背景圆角
                    }
                    else {
                        clearInterval(timer);
                        handler.css({ 'left': 0 });
                        drag_bg.css({ 'width': 0 });
                    }
                }, 1)
            }
        }
        isMove = false;
        });

    //清空事件
    function dragOk() {
        handler.removeClass('handler_bg').addClass('handler_ok_bg');
        text.removeClass('slidetounlock').text('验证通过').css({ 'color': '#fff' }); 

        handler.css({ 'left': maxWidth }); // add
        drag_bg.css({ 'width': maxWidth }); // add

        handler.unbind('mousedown');//解除PC端鼠标事件绑定
        $(document).unbind('mousemove');
        $(document).unbind('mouseup');

        handler.unbind('touchstart');//解除移动端触摸事件绑定
        $(document).unbind('touchmove');
        $(document).unbind('touchend');

        $('#btn-sendcode').prop('disabled', false);//解除发送按钮禁用装填

        document.getElementById('drag').style.cursor='default';//恢复PC端鼠标移动指针形态
        document.getElementsByClassName('handler')[0].style.cursor='default';
    }

    var mdt = document.getElementById('my_drag_text');

    function myonmove(overhalf) {
        mdt.innerHTML = '松开验证';
        if (overhalf) {
            text.removeClass('slidetounlock').text('松开验证').css({ 'color': '#fff' });
        } else {
            text.removeClass('slidetounlock').text('松开验证').css({ 'color': '#9c9c9c' });
        }

    }

    function mynomove() {
        mdt.innerHTML = '请按住滑块，拖动到最右边';
        text.addClass('slidetounlock').text('请按住滑块，拖动到最右边').css({ 'color': '#9c9c9c' });

    }
};
