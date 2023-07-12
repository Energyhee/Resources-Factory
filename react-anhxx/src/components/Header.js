import React from 'react';

function Header({cName, iName}){
    console.log('on header');

    return (
        <header className={cName}>
            <h1>HEADER</h1>
            <input type="checkbox" id={iName} />
            <label htmlFor={iName} className="nav-btn">
                <span></span>
                <span></span>
                <span></span>
            </label>
        </header>
    );
}

export default Header;
