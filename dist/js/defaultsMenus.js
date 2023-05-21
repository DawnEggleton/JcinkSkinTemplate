//UCP Only
if($('body#UserCP').length > 0) {
    document.querySelector('#ucpmenu').innerHTML = `<b>Account</b>
    <a href="user-edit.html">Edit Profile</a>
    <a href="user-avatar.html">Update Avatar</a>
    <a href="user-accounts.html">Sub-accounts</a>
    <a href="user-name.html">Edit Username</a>
    <a href="user-pass.html">Change Password</a>
    <a href="user-email.html">Update Email</a>
    <b>Tracking</b>
    <a href="user-alerts.html">Alerts</a>
    <a href="user-forums.html">Forums</a>
    <a href="user-topics.html">Topics</a>
    <b>Settings</b>
    <a href="user-boardset.html">Board</a>
    <a href="user-alertset.html">Alerts</a>
    <a href="user-emailset.html">Emails</a>`;

    // If using menu replacement in live skin, remove the above and uncomment the below:
    /*
    document.querySelector('#ucpmenu').innerHTML = `<b>Account</b>
    <a href="?act=UserCP&CODE=01">Edit Profile</a>
    <a href="?act=UserCP&CODE=22">Update Avatar</a>
    <a href="?act=UserCP&CODE=54">Sub-accounts</a>
    <a href="?act=UserCP&CODE=52">Edit Username</a>
    <a href="?act=UserCP&CODE=28">Change Password</a>
    <a href="?act=UserCP&CODE=08">Update Email</a>
    <b>Tracking</b>
    <a href="?act=UserCP&CODE=alerts">Alerts</a>
    <a href="?act=UserCP&CODE=50">Forums</a>
    <a href="?act=UserCP&CODE=26">Topics</a>
    <b>Settings</b>
    <a href="?act=UserCP&CODE=04">Board</a>
    <a href="?act=UserCP&CODE=alerts_settings">Alerts</a>
    <a href="?act=UserCP&CODE=02">Emails</a>`;
    */
}


//Store Only
if($('body#store').length > 0) {
    document.querySelector('#ucpmenu').innerHTML = `<b>Personal</b>
    <a href="store-inventory.html">Inventory</a>
    <a href="store-sendmoney.html">Send Money</a>
    <a href="store-senditem.html">Send Item</a>
    <b>Shop</b>
    <a href="store-category.html">Category Name</a>
    <b class="staffOnly">Staff</b>
    <a href="store-fine.html" class="staffOnly">Fine</a>
    <a href="store-editpoints.html" class="staffOnly">Edit Points</a>
    <a href="store-edititems.html" class="staffOnly">Edit Inventory</a>`;

    // If using menu replacement in live skin, remove the above and uncomment the below:
    /*
    document.querySelector('#ucpmenu').innerHTML = `<b>Personal</b>
    <a href="?act=store&CODE=inventory">Inventory</a>
    <a href="?act=store&code=donate_money">Send Money</a>
    <a href="?act=store&code=donate_item">Send Item</a>
    <b>Shop</b>
    <a href="?act=store&code=shop&category=5">Appreciation</a>
    <a href="?act=store&code=shop&category=2">Education</a>
    <a href="?act=store&code=shop&category=6" class="staffOnly">Events</a>
    <a href="?act=store&code=shop&category=1">Features & Occupations</a>
    <a href="?act=store&code=shop&category=7" class="staffOnly">Longevity</a>
    <a href="?act=store&code=shop&category=9" class="staffOnly">Posting</a>
    <a href="?act=store&code=shop&category=8" class="staffOnly">Productivity</a>
    <a href="?act=store&code=shop&category=3">Relationship Status</a>
    <a href="?act=store&code=shop&category=4">Traits & Other</a>
    <b class="staffOnly">Staff</b>
    <a href="?act=store&code=fine" class="staffOnly">Fine</a>
    <a href="?act=store&code=edit_points" class="staffOnly">Edit Points</a>
    <a href="?act=store&code=edit_inventory" class="staffOnly">Edit Inventory</a>`;
    */
}


//Store Only
if($('body#modcp').length > 0) {
    document.querySelector('#modcp main > table:first-child > tbody > tr > td:first-child').innerHTML = `<b>Forums & Posts</b>
    <a href="mod-queue.html">Queue</a>
    <a href="mod-reported.html">Reported</a>
    <a href="mod-postlogs.html">Logs</a>
    <a href="mod-prune.html">Prune</a>
    <b>Users</b>
    <a href="mod-edit.html">Edit</a>
    <a href="mod-warn.html">Warn</a>
    <a href="mod-userlogs.html">Logs</a>
    <a href="mod-ip.html">IP Tools</a>
    <a href="mod-validate.html">Validaion</a>`;

    // If using menu replacement in live skin, remove the above and uncomment the below:
    /*
    document.querySelector('#modcp main > table:first-child > tbody > tr > td:first-child').innerHTML = `<b>Forums & Posts</b>
    <a href="?act=modcp&CODE=queue">Queue</a>
    <a href="?act=modcp&CODE=reported">Reported</a>
    <a href="?act=modcp&CODE=modlogs">Logs</a>
    <a href="?act=modcp&CODE=prune">Prune</a>
    <b>Users</b>
    <a href="?act=modcp&CODE=members">Edit</a>
    <a href="?act=modcp&CODE=warnpanel">Warn</a>
    <a href="?act=modcp&CODE=warnlogs">Logs</a>
    <a href="?act=modcp&CODE=ip">IP Tools</a>
    <a href="?act=modcp&CODE=validating">Validation</a>`
    */
}