function switchSize() {
    let page = document.querySelector('body');
    if(page.classList.contains('lrgFont')) {
        page.classList.remove('lrgFont');
        localStorage.setItem('fontSize', 'regular');
    } else {
        page.classList.add('lrgFont');
        localStorage.setItem('fontSize', 'large');
    }
}