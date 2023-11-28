let pageType = document.querySelector('body').id;
let pageClasses = document.querySelector('body').classList;

/********** Login **********/
if(pageType === 'Login') {
    let textNodes = getAllTextNodes(document.querySelector('main'));
    textNodes.forEach(node => {
        const paragraph = document.createElement('p');
        node.after(paragraph);
        paragraph.appendChild(node);
    });
    $("main > p").nextUntil("div.tableborder").andSelf().wrapAll(`<div class="textNodes"></div>`);
    $(`input[name="UserName"]`).attr('placeholder','Username');
    $(`input[name="PassWord"]`).attr('placeholder','Password');
}

/********** Registration **********/
if(pageType === 'Reg') {
    let textNodes = getAllTextNodes(document.querySelector('.tablepad > table > tbody > tr:first-child > td:last-child fieldset:first-child'));
    if(textNodes) {
        textNodes.forEach(node => {
            const paragraph = document.createElement('p');
            node.after(paragraph);
            paragraph.appendChild(node);
        });
    }
    inputWrap(`label[for="agree_cbox"] input[name="read_tos"]`);
    inputWrap(`fieldset input[name="allow_admin_mail"]`);
    inputWrap(`fieldset input[name="allow_member_mail"]`);
    fancyBoxes();
    if(document.querySelector('input[name="agree"][type="checkbox"]')) {
        $('input[name="agree"][type="checkbox"]').wrap('<label class="input-wrap tos"></label>');
        $('.input-wrap.tos').append('<div class="fancy-input checkbox"><i class="fa-solid fa-check"></i></div> <p>I agree to the terms of this registration, <b>I am at least 18 years of age,</b> and wish to proceed.</p>');
    }
}

/********** Topic View **********/
if(pageType === 'ST') {
    let descript = $('.topic-desc').html();
    if (descript != undefined) {
        var newDescript = descript.replace(", ", "");
        $('.topic-desc').html(newDescript);
    }
    
    //input clean up
    document.querySelector('#qr_open .tablepad').innerHTML = document.querySelector('#qr_open .tablepad').innerHTML.replace('|', '');
    let textNodes = getAllTextNodes(document.querySelector('#qr_open .tablepad'));
    textNodes.forEach(node => {
        const paragraph = document.createElement('p');
        node.after(paragraph);
        paragraph.appendChild(node);
        paragraph.innerText = paragraph.innerText.replace(`|`, ``).trim();
    });
    document.querySelectorAll(`#qr_open input[type="checkbox"]`).forEach(input => inputWrap(input));
    document.querySelectorAll('#qr_open .input-wrap').forEach(label => {
        label.querySelector('input').insertAdjacentHTML('afterend', `<div class="fancy-input checkbox">x</div>`);
    });
    $('#qr_open .tablepad > input').wrapAll('<div class="qr_buttons"></div>');
}

/********** Topic View **********/
if(pageType === 'Post') {
    let textNodes = getAllTextNodes(document.querySelector('#post-options .pformright'));
    if(textNodes) {
        textNodes.forEach(node => {
            const paragraph = document.createElement('p');
            node.after(paragraph);
            paragraph.appendChild(node);
        });
    }
    inputWrap(`input[name="enableemo"]`, 'br');
    inputWrap(`input[name="enablesig"]`, 'br');
    inputWrap(`input[name="enabletrack"]`, 'br');
    document.querySelectorAll('input[name="iconid"]').forEach(icon => {
        inputWrap(icon, `input`, 'radio');
    });
    fancyBoxes();
}

/********** User CP & Messages **********/
if(pageType === 'UserCP' || pageType === 'Msg') {
    /* Remove on Jcink; leave present on local */
    document.querySelector('#ucpmenu').innerHTML = `<div class="sticky"><b>Account</b>
    <div class="menu-section">
    <a href="./user-edit.html">Edit Profile</a>
    <a href="./user-avatar.html">Update Avatar</a>
    <a href="./user-accounts.html">Sub-accounts</a>
    <a href="./user-name.html">Edit Username</a>
    <a href="./user-pass.html">Change Password</a>
    <a href="./user-email.html">Update Email</a>
    </div>
    <b class="is-closed">Messages</b>
    <div class="menu-section">
    <a href="./user-inbox.html">Inbox</a>
    <a href="./user-message.html">Send Message</a>
    <a href="./user-viewmessage.html">View Message</a>
    </div>
    <b class="is-closed">Tracking</b>
    <div class="menu-section">
    <a href="./user-alerts.html">Alerts</a>
    <a href="./user-forums.html">Forums</a>
    <a href="./user-forum-none.html">Forums (None Tracked)</a>
    <a href="./user-topics.html">Topics</a>
    <a href="./user-topics-none.html">Topics (None Tracked)</a>
    </div>
    <b class="is-closed">Settings</b>
    <div class="menu-section">
    <a href="./user-boardset.html">Board</a>
    <a href="./user-alertset.html">Alerts</a>
    <a href="./user-emailset.html">Emails</a>
    </div>
    </div>`;

    /* Uncomment on Jcink; leave commented on local
    document.querySelector('#ucpmenu').innerHTML = `<div class="sticky"><b>Account</b>
    <div class="menu-section">
    <a href="?act=UserCP&CODE=01">Edit Profile</a>
    <a href="?act=UserCP&CODE=24">Update Avatar</a>
    <a href="?act=UserCP&CODE=54">Sub-accounts</a>
    <a href="?act=UserCP&CODE=52">Edit Username</a>
    <a href="?act=UserCP&CODE=28">Change Password</a>
    <a href="?act=UserCP&CODE=08">Update Email</a>
    </div>
    <b class="is-closed">Messages</b>
    <div class="menu-section">
    <a href="?act=Msg&CODE=01">Inbox</a>
    <a href="?act=Msg&CODE=04">Send Message</a>
    </div>
    <b class="is-closed">Tracking</b>
    <div class="menu-section">
    <a href="?act=UserCP&CODE=alerts">Alerts</a>
    <a href="?act=UserCP&CODE=50">Forums</a>
    <a href="?act=UserCP&CODE=26">Topics</a>
    </div>
    <b class="is-closed">Settings</b>
    <div class="menu-section">
    <a href="?act=UserCP&CODE=04">Board</a>
    <a href="?act=UserCP&CODE=alerts_settings">Alerts</a>
    <a href="?act=UserCP&CODE=02">Emails</a></div></div>`;
    */

    //subaccounts
    if($('body.code-54').length > 0) {
        document.querySelectorAll('input[name="sub_ids[]"]').forEach(input => {
            inputWrap(input);
        });
        fancyBoxes();
    }

    //alerts
    if($('body.code-alerts').length > 0) {
        document.querySelectorAll('input[name="alert_id[]"]').forEach(input => {
            inputWrap(input);
        });
        fancyBoxes();
    }

    //forum and topic subscriptions
    if (pageClasses.contains('code-50') || pageClasses.contains('code-26')) {
        document.querySelectorAll('.tableborder > table > tbody > tr').forEach(row => {
            if(row.querySelectorAll('th, td').length === 1) {
                row.classList.add('ucp--header', 'pformstrip');
            }
        });

        if(pageClasses.contains('code-26')) {
            document.querySelectorAll(`.tableborder input[type="checkbox"]`).forEach(input => inputWrap(input));
            fancyBoxes();
        }
    }
    
    //board settings
    if (pageClasses.contains('code-04')) {
        inputWrap(document.querySelector(`input[name="DST"]`));
        fancyBoxes();
    }
    
    //alert settings
    if (pageClasses.contains('code-alerts_settings') || pageClasses.contains('code-02')) {
        document.querySelectorAll(`input[type="checkbox"]`).forEach(input => inputWrap(input));
        fancyBoxes();
    }
}

/********** Store **********/
if(pageType === 'store') {
    /* Remove on Jcink; leave present on local */
    document.querySelector('#ucpmenu').innerHTML = `<div class="sticky"><b>Shop</b>
    <div class="menu-section">
    <a href="./store.html">Home</a>
    <a href="./store-category.html">Category</a>
    </div>
    <b>Personal</b>
    <div class="menu-section">
    <a href="./store-inventory.html">Inventory</a>
    <a href="./store-sendmoney.html">Send Money</a>
    <a href="./store-senditem.html">Send Item</a>
    </div>
    <b class="is-closed staffOnly">Staff</b>
    <div class="menu-section">
    <a href="./store-fine.html" class="staffOnly">Fine</a>
    <a href="./store-editpoints.html" class="staffOnly">Edit Points</a>
    <a href="./store-editpoints-screen2.html" class="staffOnly">Edit Points (Page 2)</a>
    <a href="./store-edititems.html" class="staffOnly">Edit Inventory</a>
    <a href="./store-edititems-screen2.html" class="staffOnly">Edit Inventory (Page 2)</a>
    </div>
    </div>`;

    /* Uncomment on Jcink; leave commented on local
    document.querySelector('#ucpmenu').innerHTML = `<div class="sticky"><b>Shop</b>
    <div class="menu-section">
    <a href="?act=store&code=shop&category=1">Manually</a>
    <a href="?act=store&code=shop&category=2">Add</a>
    <a href="?act=store&code=shop&category=3">Categories</a>
    </div>
    <b>Personal</b>
    <div class="menu-section">
    <a href="?act=store&CODE=inventory">Inventory</a>
    <a href="?act=store&code=donate_money">Send Money</a>
    <a href="?act=store&code=donate_item">Send Item</a>
    </div>
    <b class="is-closed staffOnly">Staff</b>
    <div class="menu-section">
    <a href="?act=store&code=fine" class="staffOnly">Fine</a>
    <a href="?act=store&code=edit_points" class="staffOnly">Edit Points</a>
    <a href="?act=store&code=edit_inventory" class="staffOnly">Edit Inventory</a></div></div>`;
    */
}