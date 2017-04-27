import $ from 'jquery';
import Mustache from 'mustache';
import template from './Button.html';
import './Button.scss';

export default class Button  {
    constructor(link) {
        this.link = link;
    }

    onClick(event) {
        event.preventDefault();
        alert(this.link);
    }

    render(node) {
        const text = $(node).text();
        // Render our button
        $(node).html(
            // Mustache.render(tpl, data)
            // {text} 这里是一个Object参数
            // 写全了就是：{text: text};
            Mustache.render(template, {text})
        );
        // Attach our listeners
        $('.button').click(this.onClick.bind(this));
    }
}
