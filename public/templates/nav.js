/*
Put your nav HTML between the backticks below and it will auto-populate on all pages of this local copy. It has been pre-populated with the HTML of the Jcink nav strip.
*/

const navHTML = `
<div class="nav--left">
    <b class="guestOnly">Welcome, Guest</b>
    <b class="memOnly">Welcome, <a href="profile.html">Lux</a></b>
    <a href="usercp/user-edit.html" class="memOnly">Controls</a>
    <a href="javascript:;" class="memOnly">Alerts (0)</a>
    <a href="defaults/login.html" class="memOnly">Logout</a>
    <a href="#" target="_blank" class="staffOnly">Admin</a>
    <a href="defaults/login.html" class="guestOnly">Login</a>
    <a href="defaults/register1.html" class="guestOnly">Register</a>
</div>
<div class="nav--right">
    <div id="navstrip" align="left">
        <a href="index.html">My Community</a>
    </div>
    <a href="index.html"><i class="fa-solid fa-home"></i></a>
    <button onClick="switchBrightness()" disabled>
        <i class="fa-solid fa-brightness"></i>
        <i class="fa-light fa-brightness-low"></i>
    </button>
    <button onClick="switchSize()">
        <i class="fa-solid fa-arrow-up-right-and-arrow-down-left-from-center"></i>
        <i class="fa-solid fa-arrow-down-left-and-arrow-up-right-to-center"></i>
    </button>
</div>
`;

document.querySelector('nav').innerHTML = navHTML;
document.querySelector('nav').classList.add('nav');
