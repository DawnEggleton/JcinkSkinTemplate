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

function capitalize(str, separators) {
    separators = separators || [ ' ' ];
    var regex = new RegExp('(^|[' + separators.join('') + '])(\\w)', 'g');
    return str.replace(regex, function(x) { return x.toUpperCase(); });
}

function moveLeft(e) {
    e.parentNode.querySelector('tag-labelset').scrollLeft -= 150;
}
function moveRight(e) {
    e.parentNode.querySelector('tag-labelset').scrollLeft += 150;
}

function highlightCode() {
console.log('clicked');
    let clipcodeQuick = new Clipboard('.copyQuick', {
        target: function(trigger) {
	    if(trigger.nextElementSibling.querySelector('textarea')) {
            	return trigger.nextElementSibling.querySelector('textarea');
	    } else {
		return trigger.nextElementSibling.querySelector('code');
	    }
        }
    });
}

function collapseCats() {
	let categories = document.querySelectorAll('.category--title[data-category]');
	categories.forEach(category => category.classList.add('collapsed'));
	localStorage.setItem('collapsed', Array.prototype.slice.call(categories).map(title => title = title.dataset.category));
}

function expandCats() {
	let categories = document.querySelectorAll('.category--title[data-category]');
	categories.forEach(category => category.classList.remove('collapsed'));
	localStorage.setItem('collapsed', '');
}

function profileScripts() {
    window.addEventListener('hashchange', function(e){
        //get hash
        let hash = $.trim( window.location.hash );
        let selected = document.querySelector(`.profile--unis a[href="${hash}"]`);
        let hashTab = document.querySelector(`.profile--tracking-wrap tag-tab[data-tab="${hash}"]`);
        let labels = document.querySelectorAll('.profile--unis a');
        let tabs = document.querySelectorAll('.profile--tracking-wrap tag-tab');
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
        let selected = document.querySelector(`.profile--unis a[href="${hash}"]`);
        let hashTab = document.querySelector(`.profile--tracking-wrap tag-tab[data-tab="${hash}"]`);
        let labels = document.querySelectorAll('.profile--unis a');
        let tabs = document.querySelectorAll('.profile--tracking-wrap tag-tab');
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
        document.querySelector(`.profile--unis a[href="${firstTab}"]`).classList.add('is-active');
        document.querySelector(`.profile--tracking-wrap tag-tab[data-tab="${firstTab}"]`).classList.add('is-active');
    }

    document.querySelectorAll('.profile--accordion-trigger').forEach(trigger => {
        trigger.addEventListener('click', e => {
            e.currentTarget.classList.toggle('open');
            e.currentTarget.nextElementSibling.classList.toggle('open');
        });
    });
}


function formatTracking(universes, characters) {
    universes.sort((a, b) => {
        if(!a.TabOrder || a.TabOrder === '' || a.TabOrder === 'NaN') {
            if(a.Universe < b.Universe) {
                return 2;
            } else if(a.Universe > b.Universe) {
                return 4;
            }  else {
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
    characters.sort((a, b) => {
        if(a.Character < b.Character) {
            return 1;
        } else if(a.Character > b.Character) {
            return 1;
        } else {
            return 0;
        }
    });

    let html = ``, labels = ``;
    universes.forEach(universe => {
        let uniChars = characters.filter(character => character.UniverseCode === universe.UniverseCode && character.MemberID === `1`);
        let characterCode = ``;
        uniChars.forEach(character => {
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

            characterCode += `<div class="character">
                <div class="character--topper">
                    <div class="character--image">
                        <img src="${character.Image}">
                    </div>
                    <div class="character--title">
                        <h3>${character.Character}</h3>
                    </div>
                </div>
                <div class="character--info">
                    <div class="character--flex">
                        <span>${character.Face}</span><span>${age}</span><span>${character.Gender}</span><span>${character.Pronouns}</span>${extras}
                    </div>
                </div>`;
            if(character.Summary && character.Summary !== ``) {
                characterCode += `<div class="character--summary"><div class="scroll">${character.Summary}</div></div>`;
            }
            
            characterCode += `</div>`;
        });
        html += `<tag-tab data-tab="#${universe.UniverseCode}" class="profile--universe">
            <h2>${universe.Universe}</h2>
            <h3 class="profile--accordion-trigger open">Characters</h3>
            <div data-universe="#${universe.UniverseCode}" class="profile--characters profile--accordion-content open">${characterCode}</div>
            <h3 class="profile--accordion-trigger">Threads</h3>
            <div data-universe="#${universe.UniverseCode}" class="profile--tracking profile--accordion-content" data-forums="${universe.RelatedWriting}"></div>
            <h3 class="profile--accordion-trigger">Development</h3>
            <div data-universe="#${universe.UniverseCode}" class="profile--dev profile--accordion-content" data-forums="${universe.RelatedDev}"></div>
        </tag-tab>`;

        labels += `<a href="#${universe.UniverseCode}">${universe.Universe}</a>`;
    });
    document.querySelector('.profile--unis tag-labelset').insertAdjacentHTML('beforeend', labels);
    document.querySelector('.profile--tracking-wrap').insertAdjacentHTML('beforeend', html);
}

/*** Fizzyelf profile thread tracker functions with edits by Lux
     https://fizzyelf.jcink.net ***/
async function FillTracker(username, params = {}) {
    /***  CONFIGURATION AREA ***/
    const config = {
        includedforums: (params.includeCategoryIds || []).map(x => "c_" + x).concat(params.includeForumIds || []),
        devforumids: params.devForumIds || [],
        ignoreforums: params.ignoreForumNames || [],
        ignoreforumids: params.ignoreForumIds || [],
        lockedclass: params.lockedMacroIdentifier || "[title=Closed]",
        lockedforums: params.archiveForumNames || [],
        lockedforumids: params.archiveForumIds || [],

        indicators: params.indicators || ['<span style="font-family: roboto, verdana, arial, sans">ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“</span>', '<span style="font-family: roboto, verdana, arial, sans">ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¾ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤</span>'],
        separator: params.separator || "|",
        username: username.replace(/&#([0-9]+);/g, (m, p1) => String.fromCharCode(p1)),

        trackerwrap: params.thisTracker || $('.profile--tracking'),
        devwrap: params.thisDevTracker || $('.profile--dev'),

        pagelimit: params.pageLimit || 5,
        previousposters: params.previousPosters || {},
        lockedregex: (params.archiveForumRegex)?  RegExp(params.archiveForumRegex) : /archive/i ,
        closedthreads: (params.completedThreads) || []
    }
    if (!config.includedforums.length) config.includedforums.push("all");
    /*** END CONFIGURATION ***/

    if (/^[-\w _\d]+$/.test(params.indicators[0])) {
        params.indicators[0] = `<i class="${params.indicators[0]}"></i>`
    }
    if (/^[-\w _\d]+$/.test(params.indicators[1])) {
        params.indicators[1] = `<i class="${params.indicators[1]}"></i>`
    }
  
    /***  RUN THE SEARCH ***/
  
    let href = `/index.php?act=Search&CODE=01&nomobile=1`;
    let data = '';
    try {
        data = await $.post(href, {
            keywords: "",
            namesearch: config.username,
            forums: config.includedforums,
            searchsubs: "1",
            prune: "0",
            prune_type: "newer",
            sort_key: "last_post",
            sort_order: "desc",
            search_in: "posts",
            result_type: "topics",
        });
    } catch (err) {
        console.log(`Ajax error loading page: ${href} - ${err.status} ${err.statusText}`);
        config.trackerwrap.append('<div class="profile--nothreads">Search Failed</div>');
        config.devwrap.append('<div class="profile--nothreads">Search Failed</div>');
        return;
    }
    doc = new DOMParser().parseFromString(data, 'text/html');
  
    let meta = $('meta[http-equiv="refresh"]', doc);
    if (meta.length) {
        href = meta.attr('content').substr(meta.attr('content').indexOf('=') + 1) + '&st=0';
    } else {
        let boardmessage = $('#board-message .tablefill .postcolor', doc).text();
        config.trackerwrap.append(`<div class="profile--nothreads">${boardmessage}</div>`);
        return;
    }
  
    await parseResults(href, config, 0);
}
parseResults = async (searchlink, config, page) => {
    let doc;
    searchlink = searchlink.replace(/&st=\d+/, `&st=${page * 25}`);
    let data = '';
    try {
        data = await $.get(searchlink);
    } catch (err) {
        console.log(`Ajax error loading page: ${searchlink} - ${err.status} ${err.statusText}`);
        console.log(err)
        config.trackerwrap.append('<div class="profile--nothreads">Search Failed</div>');
        return;
    }
    doc = new DOMParser().parseFromString(data, 'text/html');
  
    $('#search-topics .tablebasic > tbody > tr', doc).each(function (i, e) {
        if (i > 0) {
            const cells = $(e).children('td');
            const location = $(cells[3]).text();
            const location_id = $(cells[3]).find('a').attr('href').match(/showforum=([^&]+)&?/)[1]
            const threadLink = $(cells[7]).children('a').attr('href');
            const thread_id = threadLink.match(/showtopic=([^&]+)&?/)[1];

            if (!config.ignoreforums.includes(location) && !config.ignoreforumids.includes(location_id)) {
                const dev = config.devforumids.includes(location_id);
                const title = $(cells[2]).find('td:nth-child(2) > a').first().text();
                const threadDesc = $(cells[2]).find('.desc').text();
                const lastPoster = $(cells[7]).find('a[href*=showuser]').text().trim().replace(/&#([0-9]+);/g, (m, p1) => String.fromCharCode(p1));
                const lastPosterId = $(cells[7]).find('a[href*=showuser]').attr('href');
                let myturn = (config.username == lastPoster) ? 'Caught Up' : 'Owing';
                if (config.previousposters[thread_id]) {
                    myturn = (lastPoster == config.previousposters[thread_id].replace(/&#([0-9]+);/g, (m, p1) => String.fromCharCode(p1))) ? 'Owing' : 'Caught Up';
                }
                const symbol = (myturn == 'Caught Up') ? config.indicators[0] : config.indicators[1];
                let postDate = $(cells[7]).html();
                postDate = postDate.substr(0, postDate.indexOf('<br>'));
                const sep = (threadDesc) ? config.separator : '';

                if(dev) {   
                    config.devwrap.each(function(i, el) {
                        if(el.dataset.forums && el.dataset.forums.split(`, `).includes(location_id)) {
                            el.insertAdjacentHTML('beforeend', `
                                <div class="profile--thread development" aria-described-by="Development">
                                    <div class="profile--thread-topper">
                                        <div class="profile--thread-marker">
                                            <i class="fa-duotone fa-palette" style="--fa-primary-color: var(--bg-secondary); --fa-secondary-color: var(--text-accent); --fa-secondary-opacity: 1;"></i>
                                        </div>
                                    <div class="profile--thread-title">
                                            <a href="?showtopic=${thread_id}">${title}</a>
                                            <span>${threadDesc}</span>
                                        </div>
                                    </div>
                                    <div class="profile--thread-info">
                                        <span>${postDate}</span>
                                    </div>
                                </div>
                            `);
                        }
                    });
                } else {     
                    config.trackerwrap.each(function(i, el) {
                        if(el.dataset.forums && el.dataset.forums.split(`, `).includes(location_id)) {
                            if(el.dataset.forums.split(`, `)[el.dataset.forums.split(`, `).length - 1] === location_id) {	
                                el.insertAdjacentHTML('beforeend', `
                                    <div class="profile--thread archived" aria-described-by="Archived">
                                        <div class="profile--thread-topper">
                                            <div class="profile--thread-marker">
                                                <i class="fa-duotone fa-circle-xmark" style="--fa-primary-color: var(--border-secondary); --fa-secondary-color: var(--text-main); --fa-secondary-opacity: 1;"></i>
                                            </div>
                                            <div class="profile--thread-title">
                                                <a href="?showtopic=${thread_id}">${title}</a>
                                                <span>${threadDesc}</span>
                                            </div>
                                        </div>
                                        <div class="profile--thread-info">
                                                <span>last post by <a href="?showuser=${lastPosterId}">${lastPoster}</a></span>
                                            <span>${postDate}</span>
                                        </div>
                                    </div>
                                `);
                            } else {
                                el.insertAdjacentHTML('beforeend', `
                                    <div class="profile--thread ${myturn.replace(/ /g, '').toLowerCase()}" aria-described-by="${myturn}">
                                        <div class="profile--thread-topper">
                                            <div class="profile--thread-marker">
                                                <i class="fa-duotone fa-circle-check" style="--fa-primary-color: var(--bg-secondary); --fa-secondary-color: var(--text-main); --fa-secondary-opacity: 1;"></i>
                                                <i class="fa-duotone fa-circle-star" style="--fa-primary-color: var(--bg-secondary); --fa-secondary-color: var(--text-accent); --fa-secondary-opacity: 1;"></i>
                                            </div>
                                            <div class="profile--thread-title">
                                                <a href="?showtopic=${thread_id}">${title}</a>
                                                <span>${threadDesc}</span>
                                            </div>
                                        </div>
                                        <div class="profile--thread-info">
                                                <span>last post by <a href="?showuser=${lastPosterId}">${lastPoster}</a></span>
                                            <span>${postDate}</span>
                                        </div>
                                    </div>
                                `);
                                if(document.querySelectorAll('.profile--owing').length > 0) {
                                    document.querySelector('.profile--owing').insertAdjacentHTML('beforeend', `
                                        <div class="profile--thread ${myturn.replace(/ /g, '').toLowerCase()}" aria-described-by="${myturn}">
                                            <div class="profile--thread-topper">
                                                <div class="profile--thread-marker">
                                                    <i class="fa-duotone fa-circle-check" style="--fa-primary-color: var(--bg-secondary); --fa-secondary-color: var(--text-main); --fa-secondary-opacity: 1;"></i>
                                                    <i class="fa-duotone fa-circle-star" style="--fa-primary-color: var(--bg-secondary); --fa-secondary-color: var(--text-accent); --fa-secondary-opacity: 1;"></i>
                                                </div>
                                                <div class="profile--thread-title">
                                                    <a href="?showtopic=${thread_id}">${title}</a>
                                                    <span>${threadDesc}</span>
                                                </div>
                                            </div>
                                            <div class="profile--thread-info">
                                                    <span>last post by <a href="?showuser=${lastPosterId}">${lastPoster}</a></span>
                                                <span>${postDate}</span>
                                            </div>
                                        </div>
                                    `);
                                }
                            }
                        }
                    });
                }
            }
        }
    });
  
    if ($('#search-topics .tablebasic > tbody > tr', doc).length == 26 && page < config.pagelimit) {
        page = page + 1;
        await parseResults(searchlink, config, page)
    } else {
        if (!config.trackerwrap.children().length) {
            config.trackerwrap.append($('<div class="profile--nothreads">No results found.</div>'));
        }
        if (!config.devwrap.children().length) {
            config.devwrap.append($('<div class="profile--nothreads">No results found.</div>'));
        }
    }
}