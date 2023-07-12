import React from 'react';

function Wrapper ({cName, children}){
    return (
        <div className={cName}>
            {children}
        </div>
    )
}

export default Wrapper;
