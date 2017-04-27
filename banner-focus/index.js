function onLiClick(event) {
    clearCurrent();
    // Event.srcElement 是标准的 Event.target 属性的一个别名。它只对老版本的IE浏览器有效。
    // target 指向触发事件的对象
    // currentTarget 该属性总是指向被绑定事件句柄（event handler）的元素(绑定事件的对象)
    event.target.classList.add('z-crt');
}

function clearCurrent() {
    Array.from(document.querySelectorAll('li > a')).forEach(function (item, index) {
        item.classList.contains('z-crt') && item.classList.remove('z-crt');
    });
}

document.onscroll = function (event) {
        clearCurrent();
        var i = parseInt(document.body.scrollTop / 500);
        document.querySelectorAll('li > a')[i].classList.add('z-crt');
}

