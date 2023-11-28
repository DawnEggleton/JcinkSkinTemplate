function getAllTextNodes(element) {
    if(element) {
        return Array.from(element.childNodes).filter(node => node.nodeType === 3 && node.textContent.trim().length > 1);
    }
}
function inputWrap(el, next = null, type = 'checkbox') {
    if(next) {
        $(el).nextUntil(next).andSelf().wrapAll(`<label class="input-wrap ${type}"></label>`);
    } else {
        $(el).next().andSelf().wrapAll(`<label class="input-wrap ${type}"></label>`);
    }
}
function fancyBoxes(type = 'checkbox') {
    document.querySelectorAll('.input-wrap.checkbox').forEach(label => {
        label.querySelector('input').insertAdjacentHTML('afterend', `<div class="fancy-input checkbox">x</div>`);
    });
    document.querySelectorAll('.input-wrap.radio').forEach(label => {
        label.querySelector('input').insertAdjacentHTML('afterend', `<div class="fancy-input radio">x</div>`);
    });
}