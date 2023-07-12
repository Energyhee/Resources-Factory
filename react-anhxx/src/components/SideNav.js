import React from 'react';

function SideNav(){
    console.log('on side nav');

    return (
        <nav className="nav-wrap">
            <ul>
                <li><a href="{() => false}">MENU 01</a></li>
                <li><a href="{() => false}">MENU 02</a></li>
                <li><a href="{() => false}">MENU 03</a></li>
                <li><a href="{() => false}">MENU 04</a></li>
            </ul>
        </nav>
    );
}

export default SideNav;
