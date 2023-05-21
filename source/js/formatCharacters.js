function formatUniverses(data) {
    let html = ``;

    data.sort((a, b) => {
        if(!a.TabOrder || a.TabOrder === '') {
            if(a.Universe < b.Universe) {
                return 2;
            } else if(a.Universe > b.Universe) {
                return 4;
            } else {
                return 3;
            }
        } else if(parseInt(a.TabOrder) < parseInt(b.TabOrder)) {
            return -1;
        } else if(parseInt(a.TabOrder) > parseInt(b.TabOrder)) {
            return 1;
        } else if(a.Universe < b.Universe) {
            return -1;
        } else if(a.Universe > b.Universe) {
            return 1;
        }  else {
            return 0;
        }
    });

    data.forEach(item => {
        html += `<option value="${item.UniverseCode.toLowerCase().trim()}" data-tab-order="${item.TabOrder}">${capitalize(item.Universe.trim(), separators)}</option>`;
    });
    document.querySelector('select[name="reg-universe"]').insertAdjacentHTML('beforeend', html);
}

function formatLabel(code, title) {
    return `<a href="#${code}">${title}</a>`;
}
function formatTabStart(code, title) {
    return `<tag-tab data-tab="#${code}">
    <h2>${title}</h2><div class="character--grid">`;
}
function formatTabEnd() {
    return `</div></tag-tab>`;
}
function formatCharacterBlock(character) {
    let age, extras;

    if(character.Age === 'immortal') {
	age = character.Age;
    } else {
	age = `${character.Age} years old`;
    }

    if (character.Extras && character.Extras !== ``) {
        let array = character.Extras.split('|');
        extras = array.map(item => `<span>${item}</span>`).join('');
    } else {
        extras = ``;
    }
    
    let html = `<div class="character">
        <div class="character--topper">
            <div class="character--image">
                <img src="${character.Image}" />
            </div>
            <div class="character--title">
                <h3>${capitalize(character.Character, separators)}</h3>
                <a href="?showuser=${character.MemberID}">Written by ${character.Member}</a>
            </div>
        </div>
        <div class="character--info"><div class="character--flex">
            <span>${character.Face}</span><span>${age}</span><span>${character.Gender}</span><span>${character.Pronouns}</span>${extras}
        </div></div>`;
    if(character.Summary && character.Summary !== ``) {
            html += `<div class="character--summary"><div class="scroll">${character.Summary}</div></div>`;
    }
    html += `</div>`;
    return html;
}

function formatCharacters(data) {
    console.log(data);
    let labels = ``;
    let tabs = ``;

    data.sort((a, b) => {
        if(!a.TabOrder || a.TabOrder === '' || a.TabOrder === 'NaN') {
            if(a.Universe < b.Universe) {
                return 2;
            } else if(a.Universe > b.Universe) {
                return 4;
            } else if(a.Character < b.Character) {
                return 2;
            } else if(a.Character > b.Character) {
                return 4;
            } else {
                return 3;
            }
        } else if(parseInt(a.TabOrder) < parseInt(b.TabOrder)) {
            return -1;
        } else if(parseInt(a.TabOrder) > parseInt(b.TabOrder)) {
            return 1;
        } else if(a.Universe < b.Universe) {
            return -1;
        } else if(a.Universe > b.Universe) {
            return 1;
        } else if(a.Character < b.Character) {
            return 1;
        } else if(a.Character > b.Character) {
            return 1;
        } else {
            return 0;
        }
    });

    data.forEach((item, i) => {
        //first item
        if (i === 0) {
            labels += formatLabel(item.UniverseCode, item.Universe);
            tabs += formatTabStart(item.UniverseCode, item.Universe);
            tabs += formatCharacterBlock(item);
        }
        //new universe
        else if (data.length > 1 && data[i - 1].UniverseCode !== item.UniverseCode) {
            tabs += formatTabEnd();
            labels += formatLabel(item.UniverseCode, item.Universe);
            tabs += formatTabStart(item.UniverseCode, item.Universe);
            tabs += formatCharacterBlock(item);
        }
        //otherwise
        else {
            tabs += formatCharacterBlock(item);
        }

        if(i === data.length - 1) {
            tabs += formatTabEnd();
        }
    })

    document.querySelector('.webpage--menu tag-labelset').insertAdjacentHTML('beforeend', labels);
    document.querySelector('.webpage--content').insertAdjacentHTML('beforeend', tabs);
}

function webpageFunctions() {
	//document.querySelector('header h1').innerText = `Guidebook`;

    window.addEventListener('hashchange', function(e){
        //get hash
        let hash = $.trim( window.location.hash );
        let selected = document.querySelector(`.webpage--menu a[href="${hash}"]`);
        let hashTab = document.querySelector(`.webpage--content tag-tab[data-tab="${hash}"]`);
        let labels = document.querySelectorAll('.webpage--menu a');
        let tabs = document.querySelectorAll('.webpage--content tag-tab');
        let tabIndex = Array.from(tabs).indexOf.call(Array.from(tabs), hashTab);
        //find the sub menu/inner menu link with the matching hash
        if (hash) {
            $(selected).trigger('click');
        }
        //select based on this

        //Tabs
        //Remove active from everything
        labels.forEach(label => label.classList.remove('is-active'));
        tabs.forEach(tab => tab.classList.remove('is-active'));

        //Add active
        selected.classList.add('is-active');
        hashTab.classList.add('is-active');
        tabs.forEach(tab => tab.style.left = `${-100 * tabIndex}%`);
    });

    //hash linking
    if (window.location.hash){
        //get hash
        let hash = $.trim( window.location.hash );
        let selected = document.querySelector(`.webpage--menu a[href="${hash}"]`);
        let hashTab = document.querySelector(`.webpage--content tag-tab[data-tab="${hash}"]`);
        let labels = document.querySelectorAll('.webpage--menu a');
        let tabs = document.querySelectorAll('.webpage--content tag-tab');
        let tabIndex = Array.from(tabs).indexOf.call(Array.from(tabs), hashTab);
        //find the sub menu/inner menu link with the matching hash
        if (hash) {
            $(selected).trigger('click');
        }
        //select based on this

        //Tabs
        //Remove active from everything
        labels.forEach(label => label.classList.remove('is-active'));
        tabs.forEach(tab => tab.classList.remove('is-active'));

        //Add active
        selected.classList.add('is-active');
        hashTab.classList.add('is-active');
        tabs.forEach(tab => tab.style.left = `${-100 * tabIndex}%`);
    } else {
        //Auto-select  tab without hashtag present
        let firstTab = document.querySelector(`.profile--unis a`).getAttribute(`href`);
        document.querySelector(`.webpage--menu a[href="${firstTab}"]`).classList.add('is-active');
        document.querySelector(`.webpage--content tag-tab[data-tab="${firstTab}"]`).classList.add('is-active');
    }

    let universe = window.location.href.split('universe=')[1] ? window.location.href.split('universe=')[1].split('&')[0] : null;
    let universeSelect = document.querySelector('select[name="reg-universe"]');
    if(universe) {
        universeSelect.value = universe;
    }
}

function postCharacter(character) {
    $.ajax({
        url: `https://script.google.com/macros/s/AKfycbxp8TPIS55-yil0J3F7u0PP4L286hj_j4eME9jRyCWDsqU1GvEfuRShwBwbTSbzelD4/exec`,   
        data: character,
        method: 'POST',
        type: 'POST',
        dataType: "json", 
        success: function () {
            console.log('success');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('error');
            document.querySelector('#register .form--warning').innerHTML = `Whoops! The sheet connection didn't quite work. Please refresh the page and try again! If this persists, please open the console (ctrl + shift + J) and send Lux a screenshot of what's there.`;
        },
        complete: function () {
            $('#register').trigger('reset');
            $('#register button[type="submit"]').text('Register');
            document.querySelector('#register .form--warning').innerHTML = 'Success! Your character has been added to the sheet.';
        }
      });
    
      return false;
}

function postUniverse(universe) {
    $.ajax({
        url: `https://script.google.com/macros/s/AKfycbxp8TPIS55-yil0J3F7u0PP4L286hj_j4eME9jRyCWDsqU1GvEfuRShwBwbTSbzelD4/exec`,   
        data: universe,
        method: 'POST',
        type: 'POST',
        dataType: "json", 
        success: function () {
            console.log('success');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('error');
            document.querySelector('#add .form--warning').innerHTML = `Whoops! The sheet connection didn't quite work. Please refresh the page and try again! If this persists, please open the console (ctrl + shift + J) and send Lux a screenshot of what's there.`;
        },
        complete: function () {
            $('#add').trigger('reset');
            $('#add button[type="submit"]').text('Add');
            document.querySelector('#add .form--warning').innerHTML = 'Success! Your universe has been added to the sheet.';
        }
      });
    
      return false;
}

function editUniverse(universe) {
    $.ajax({
        url: `https://script.google.com/macros/s/AKfycbxp8TPIS55-yil0J3F7u0PP4L286hj_j4eME9jRyCWDsqU1GvEfuRShwBwbTSbzelD4/exec`,   
        data: universe,
        method: 'POST',
        type: 'POST',
        dataType: "json", 
        success: function () {
            console.log('success');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('error');
            document.querySelector('#related .form--warning').innerHTML = `Whoops! The sheet connection didn't quite work. Please refresh the page and try again! If this persists, please open the console (ctrl + shift + J) and send Lux a screenshot of what's there.`;
        },
        complete: function () {
            $('#related').trigger('reset');
            $('#related button[type="submit"]').text('Add');
            document.querySelector('#add .form--warning').innerHTML = 'Success! Your universe has been added to the sheet.';
        }
      });
    
      return false;
}


document.querySelector('#register').addEventListener('submit', e => {
    e.preventDefault();
    $('#register button[type="submit"]').text('Registering...');
    document.querySelector('#register .form--warning').innerHTML = '';
    let fields = document.querySelector('#register');
    let universe = fields.querySelector('#reg-universe').options[fields.querySelector('#reg-universe').selectedIndex].innerText.toLowerCase().trim(),
    member = fields.querySelector('#reg-member').value.toLowerCase().trim(),
    characterName = fields.querySelector('#reg-character').value.toLowerCase().trim(),
    face = fields.querySelector('#reg-face').value.toLowerCase().trim(),
    age = fields.querySelector('#reg-age').value.trim(),
    pronouns = fields.querySelector('#reg-pronouns').value.toLowerCase().trim(),
    gender = fields.querySelector('#reg-gender').value.toLowerCase().trim(),
    extras = fields.querySelector('#reg-extras').value.toLowerCase().trim(),
    summary = fields.querySelector('#reg-summary').value.trim(),
    memberID = fields.querySelector('#reg-memberid').value.trim(),
    universeCode = fields.querySelector('#reg-universe').options[fields.querySelector('#reg-universe').selectedIndex].value.toLowerCase().trim(),
    image = fields.querySelector('#reg-image').value.trim();

    let character = {
        SubmissionType: 'claims-submit',
        Universe: universe,
        Member: member,
        Character: characterName,
        Face: face,
        Age: age,
        Pronouns: pronouns,
        Gender: gender,
        Extras: extras,
        Summary: summary,
        MemberID: memberID,
        UniverseCode: universeCode,
        Image: image
    };
    postCharacter(character);
});

document.querySelector('#add').addEventListener('submit', e => {
    e.preventDefault();

    //fetch universes
    fetch("https://opensheet.elk.sh/184AzHQJ_wVgzc1FBbtZHQB6C6h5EHfIA9_4ocE-9uS0/Universes")
    .then((response) => response.json())
    .then((data) => {
        $('#add button[type="submit"]').text('Adding...');
        document.querySelector('#add .form--warning').innerHTML = '';
        let fields = document.querySelector('#add');
        let universeName = fields.querySelector('#add-universe').value.toLowerCase().trim(),
        universeCode = fields.querySelector('#add-code').value.toLowerCase().trim(),
        universeBase = `${fields.querySelector('#add-month').options[fields.querySelector('#add-month').selectedIndex].value} ${fields.querySelector('#add-year').value.trim()}`,
        tabOrder = '',
        relatedForums = fields.querySelector('#add-forums').value.toLowerCase().trim(),
        relatedDev = fields.querySelector('#add-dev').value.toLowerCase().trim();
        if(universeCode.split('uni').length > 1) {
            tabOrder = universeCode.split('uni')[1];
        }

        let matches = data.filter(item => item.UniverseCode === universeCode);
        if (matches.length === 0) {
            let universe = {
                SubmissionType: 'universe-submit',
                Universe: universeName,
                UniverseCode: universeCode,
                UniverseBase: universeBase,
		        TabOrder: tabOrder,
                RelatedWriting: relatedForums,
                RelatedDev: relatedDev
            };
            postUniverse(universe);
        } else {
            $('#add button[type="submit"]').text('Add');
            document.querySelector('#add .form--warning').innerHTML = 'This universe code already exists. Please try another.';
        }
    
    });
});

document.querySelector('#related').addEventListener('submit', e => {
    e.preventDefault();

    //fetch universes
    fetch("https://opensheet.elk.sh/184AzHQJ_wVgzc1FBbtZHQB6C6h5EHfIA9_4ocE-9uS0/Universes")
    .then((response) => response.json())
    .then((data) => {
        $('#related button[type="submit"]').text('Adding...');
        document.querySelector('#related .form--warning').innerHTML = '';
        let fields = document.querySelector('#related');

	let matches = data.filter(item => item.UniverseCode === fields.querySelector('#rel-universe').options[fields.querySelector('#rel-universe').selectedIndex].value.toLowerCase().trim());
	let universe = matches[0];

	if(matches.length === 1) {
        	let relatedForums = fields.querySelector('#rel-forums').value.toLowerCase().trim().split(', '),
	        relatedDev = fields.querySelector('#rel-dev').value.toLowerCase().trim().split(', ');
	
		let existingForums = universe.RelatedWriting.split(', '),
		existingDev = universe.RelatedDev.split(', ');
	
		let updatedForums = [...existingForums],
		updatedDev = [...existingDev, ...relatedDev];
	
		if(relatedForums.length !== 0) {
			updatedForums = [...existingForums.splice(0, existingForums.length - 1), ...relatedForums, ...existingForums.splice(existingForums.length - 1, 1)];
		}
	
	        let update = {
	            SubmissionType: 'universe-edit',
	            UniverseCode: universe.UniverseCode,
	            RelatedWriting: updatedForums.join(', '),
	            RelatedDev: updatedDev.join(', ')
	        };
                editUniverse(update);
	} else if(matches.length > 1) {
            $('#related button[type="submit"]').text('Add');
            document.querySelector('#related .form--warning').innerHTML = `Somehow, there's universe code duplicates. Please fix the sheet manually before proceeding.`;
	} else {
            $('#related button[type="submit"]').text('Add');
            document.querySelector('#related .form--warning').innerHTML = `This universe doesn't exist. Please edit an existing universe.`;
	}
	
    
    });
});