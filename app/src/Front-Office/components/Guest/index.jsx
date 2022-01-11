import React from 'react'
import { FaUser, FaBaby } from 'react-icons/fa';

function Guest({ number, type, style }) {
    let intPart = Math.trunc(number);
    let icons = [];
    let i = 0;
    for (i; i < intPart; i++) {
        if(type.toUpperCase() === 'ADULT') {
            icons.push(<FaUser key={i} className={style} />);
        } else if (type.toUpperCase() === 'CHILD') {
            icons.push(<FaBaby key={i} className={style} />);
        }
    }
    return (
        <>
            {icons}
        </>
    );
}

export default Guest;
