import React from 'react'
import { FaStar, FaStarHalf } from 'react-icons/fa';

function StarRating({ rating, style }) {
    let intPart = Math.trunc(rating);
    let fltPart = Number((rating-intPart).toFixed(2));
    let stars = [];
    let i = 0;
    for (i; i < intPart; i++) {
        stars.push(<FaStar key={i} className={style} />);
    }
    if(fltPart !== 0 && fltPart > 0.5) {
        stars.push(<FaStar key={i} className={style} />);
    } else if(fltPart !== 0 && fltPart <= 0.5) {
        stars.push(<FaStarHalf key={i} className={style} />);
    }
    return (
        <>
            {stars}
        </>
    );
}

export default StarRating
