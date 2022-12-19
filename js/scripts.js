const pageType = document.querySelector('body').getAttribute('id');

let fontSize = localStorage.getItem('fontSize');
if(fontSize && fontSize === 'large') {
    let page = document.querySelector('body');
    page.classList.add('lrgFont');
} else {
    localStorage.setItem('fontSize', 'regular');
}


document.querySelectorAll('.forum--extras').forEach(linkSet => {
	let html = linkSet.innerHTML;
	let subLinks = linkSet.nextElementSibling.nextElementSibling;
	subLinks.insertAdjacentHTML('beforeend', html);
	linkSet.remove();
});


if(pageType !== 'idx') {
	document.querySelector('header h1').innerText = document.querySelector('#navstrip a:last-child').innerText;
}


/***** Topic List ******/
if(pageType === 'SF') {
	document.querySelector('header h1').innerText = document.querySelector('#forumName').innerText;
}


/***** Thread ******/
if(pageType === 'ST') {
	document.querySelector('header h1').innerText = document.querySelector('.topic-title').innerText;
	if(document.querySelector('.topic-desc').innerText && document.querySelector('.topic-desc').innerText !== '') {
		document.querySelector('header p').innerText = document.querySelector('.topic-desc').innerText.split(', ')[1];
	}
}


/***** Profile ******/
if(pageType === 'Members') {
	document.querySelector('header h1').innerText = `Members`;
}