function $(selector) {
    return document.querySelector(selector);
}

function _click(event) {

    // event.origin是regular中封装的对象
    if(event.target.nodeName === 'I') {
        var children = [].slice.call(event.currentTarget.children);
        children.forEach(function (item, index) {
            if(item.classList.contains('z-crt'))
                item.classList.remove('z-crt')

            if(item === event.target) {
                event.target.classList.add('z-crt');
                $('.wrap').style.left = (-130 * index) + 'px';
            }
        })
    }
}
