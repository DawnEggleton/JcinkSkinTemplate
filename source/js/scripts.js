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


if(pageType !== 'idx' && pageType !== 'Pages' && pageType !== 'Profile') {
	document.querySelector('header h1').innerText = capitalize(document.querySelector('#navstrip a:last-child').innerText.toLowerCase(), separators);
}

/***** Index *****/
if(pageType === 'idx' || pageType === 'SC') {
	let collapsedCats = localStorage.getItem('collapsed');
	let categories = document.querySelectorAll('.category--title[data-category]');
	if(!collapsedCats) {
		let allCats = Array.prototype.slice.call(document.querySelectorAll('.category--title[data-category]')).map(title => title = title.dataset.category);
		localStorage.setItem('collapsed', allCats);
		categories.forEach(category => category.classList.add('collapsed'));
	} else {
		collapsedCats = collapsedCats.split(',');
		categories.forEach(category => {
			if(collapsedCats.includes(category.dataset.category)) {
				category.classList.add('collapsed');
			} else {
				category.classList.remove('collapsed');
			}
		});
	}
	categories.forEach(category => {
		category.addEventListener('click', e => {
			if(e.currentTarget.classList.contains('collapsed')) {
				e.currentTarget.classList.remove('collapsed');
				collapsedCats = collapsedCats.filter(item => item !== e.currentTarget.dataset.category);
				localStorage.setItem('collapsed', collapsedCats);
			} else {
				e.currentTarget.classList.add('collapsed');
				collapsedCats.push(e.currentTarget.dataset.category);
				localStorage.setItem('collapsed', collapsedCats);
			}
		});
	});

	document.querySelector('#recent-topics-clip .stats--border').insertAdjacentHTML('beforeend', document.querySelector('#recent-topics table').outerHTML);
	document.querySelector('#recent-topics').remove();
}

/***** Topic List ******/
if(pageType === 'SF') {
	document.querySelector('header h1').innerText = document.querySelector('#forumName').innerText;
}


/***** Thread ******/
if(pageType === 'ST') {
	document.querySelector('header h1').innerText = document.querySelector('.maintitle .topic-title').innerText;
	if(document.querySelector('.maintitle .topic-desc').innerText && document.querySelector('.maintitle .topic-desc').innerText !== '') {
		document.querySelector('header p').innerText = document.querySelector('.maintitle .topic-desc').innerText.split(', ')[0];
	} else {
		if(document.querySelectorAll('header p').length > 0) {
		document.querySelector('header p').remove();
		}
	}

	document.querySelectorAll('.post').forEach(post => {
		let templates = post.querySelectorAll('tag-wrap, tag-avatar');
		if(templates.length === 0) {
			post.classList.add('no-template');
		}
	});
}


/***** Thread or Post Preview *****/
if(pageType === 'ST' || pageType === 'Post') {

	if(document.querySelectorAll('tag-character').length > 0) {
		fetch("https://opensheet.elk.sh/1gspirnJDGinhNdZB9zQc85e3VjAFmV4KmXxHt8qnLBs/Characters")
		.then((response) => response.json())
		.then((data) => {
			let characterCalls = document.querySelectorAll('tag-character');
			characterCalls.forEach(call => {
console.log(data);
				let match = data.filter(item => item.Character === call.dataset.character.toLowerCase().trim() && item.Universe === call.dataset.universe.toLowerCase().trim())[0];

				let age, extras;
	
				    if(match.Age === 'immortal') {
					age = match.Age;
				    } else {
					age = `${match.Age} years old`;
				    }

				if(match.Extras && match.Extras !== ``) {
					let array = match.Extras.split('|').map(item => `<span>${item}</span>`);
					extras = array.join('');
				} else {
					extras = ``;
				}

				let html = `<strong>${match.Character}</strong>
				<div class="post--stats">
					<span>${match.Pronouns}</span>
					<span>${age}</span>
					${extras}
				</div>`;
				
				call.innerHTML = html;
			});
		});
	}

	if(document.querySelectorAll('[data-type="tabs"]').length > 0) {
		let tabSets = document.querySelectorAll('[data-type="tabs"]');
		tabSets.forEach(set => {
			let labels = set.querySelectorAll('tag-label');
			let tabs = set.querySelectorAll('tag-tab');
			labels[0].classList.add('is-active');
			tabs[0].classList.add('is-active');

			labels.forEach((label, i) => {
				label.addEventListener('click', e => {
					//Remove active from everything
					labels.forEach(label => label.classList.remove('is-active'));
					tabs.forEach(tab => tab.classList.remove('is-active'));
			
					//Add active
					label.classList.add('is-active');
					tabs[i].classList.add('is-active');
					tabs.forEach(tab => tab.style.left = `${-100 * i}%`);
				})
			})
		});
	}

	if(document.querySelectorAll('[data-type="toggle"]').length > 0) {
		let questions = document.querySelectorAll('tag-question');
		questions.forEach(question => {
			question.addEventListener('click', e => {
				e.currentTarget.classList.toggle('is-active');
				let next = e.currentTarget.nextElementSibling;
				while (next) {
					if (next.nodeName === "TAG-ANSWER") {
						next.classList.toggle('is-active');
						break;
					}
					next = next.nextElementSibling;
				} 
			});
		});
	}

	document.querySelectorAll(`tag-wrap[data-type="playlist"] tag-border br`).forEach(item => item.remove());
}


/***** Posting *****/
if(pageType === 'Post') {
    if(document.querySelector('body.code-00')) {
        document.querySelector('#topic-title input').setAttribute('placeholder', 'Topic Title');
        document.querySelector('#topic-desc input').setAttribute('placeholder', 'Topic Description');
    }
    document.querySelector('#bbcode-buttons').innerHTML = document.querySelector('#bbcode-buttons').innerHTML.replace(/&nbsp;/g,'');
    document.querySelector('#posting-form tr:last-child').innerHTML = document.querySelector('#posting-form tr:last-child').innerHTML.replace(/&nbsp;/g,'');
    document.querySelector('#post-icon-options .pformright').innerHTML = document.querySelector('#post-icon-options .pformright').innerHTML.replace(/&nbsp;/g,'');
    $('#post-options .pformright input').first().wrap('<label class="emoteWrap"></label>');
    $('.emoteWrap').append('<span><i class="fa-solid fa-xmark"></i></span> Enable Emojis');
    $('#post-options .pformright input').last().wrap('<label class="repWrap"></label>');
    $('.repWrap').append('<span><i class="fa-solid fa-xmark"></i></span> Enable Notifications');
    let save = $('.emoteWrap, .repWrap').detach();
    $('#post-options .pformright').empty().append(save);

    document.querySelectorAll('#post-preview .postcolor').forEach(post => {
	let templates = post.querySelectorAll('tag-wrap, tag-avatar');
	if(templates.length === 0) {
	    post.parentNode.classList.add('no-template');
	}
    });
}


/***** Profile ******/
if(pageType === 'Members') {
	document.querySelector('header h1').innerText = `Members`;
}