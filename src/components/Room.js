import React from "react";
import {Link} from 'react-router-dom'
import defaultImg from '../images/room-8.jpeg'
import PropTypes from 'prop-types';


export default function Room({room}) {
    const {images, slug, price, name} = room
    return (
        <article className='room'>
            <div className='img-container'>
                <img src={images[0] || defaultImg} alt="single room"/>
                <div className='price-top'>
                    <h6>${price}</h6>
                    <p>per night</p>
                </div>
                <Link className='btn-primary room-link' to={`/rooms/${slug}`}>Features</Link>
            </div>
            <p className='room-info'>{name}</p>
        </article>
    )
}


Room.propTypes = {
    room: PropTypes.shape({
        name: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        price: PropTypes.number.isRequired
    })
}