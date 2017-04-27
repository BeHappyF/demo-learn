(function () {
    const div = document.querySelector('div'),
          ul  = document.querySelector('ul');
    div.addEventListener('contextmenu', function (event) {
        event.preventDefault() && event.stopPropagation();
        // 获取鼠标点击的点的位置
        ul.style.left = event.offsetX + 'px';
        ul.style.top = event.offsetY + 'px';
        // todo
        // 在不同点击位置，为了让内容能够合理的显示，弹窗需要适当的显示在点击点的左上，右上，左下，右下
        ul.classList.add('z-show');
    });

    document.addEventListener('click', function (event) {
        ul.classList.remove('z-show');
    })
})();
