import './style.scss';

// 只有当页面上有链接存在时，再引用按钮组件
// 如果页面没有a标签，那么不会加载builds/0.bundle.js
// 只会加载一个很小的bundle.js
if (document.querySelectorAll('a').length) {
    // require.ensure
    // 根据这个来生成独立的依赖
    // 这里生成的是builds/0.bundle.js
    require.ensure([], () => {
        const Button = require('./components/Button').default;
        const button = new Button('google.com');

        button.render('a');
    // 0.bundle.js是默认生成的文件名称，这里可以采用更有语义的命名
    // 即指定require.ensure的第三个参数
    // 相应生成button.bundle.js
    }, 'button');
}

// 如果有标题，则渲染标题组件
if (document.querySelectorAll('h1').length) {
    require.ensure([], () => {
        const Header = require('./components/Header').default;

        new Header().render('h1');
    }, 'header');
}

// 这个时候会产生0.bundle.js和1.bundle.js重复依赖的问题
// 都有jQuery和Mustache
