import React, {useState, useContext} from 'react';
import defaultBcg from '../images/defaultBcg.jpeg'
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import {Link} from 'react-router-dom'
import {useParams} from "react-router-dom";
import {RoomContext} from '../context'
import StyledHero from "../components/StyledHero";


export default function SingleRoom() {
    //context
    const value = useContext(RoomContext);
    //get slug with useParams
    let {slug} = useParams();
    const [state, setState] = useState({
        slug: slug,
        defaultBcg: defaultBcg
    })
    //getRoom is giving us room object , which is contains room information by slug
    const {getRoom} = value;
    const room = getRoom(state.slug);
    //fixing error after refresh
    if (!room) {
        return (
            <div className='error'>
                <h3>no such room could be found...</h3>
                <Link to='/rooms' className='btn-primary'>Back to Rooms</Link>
            </div>
        )
    }
    //destructuring room object
    const {
        name,
        description,
        capacity,
        size,
        price,
        extras,
        breakfast,
        pets,
        images
    } = room
    //destructuring images prop
    const [mainImg, ...defaultImg] = images

    return (
        <>
            {/*Checking if mainImg exists ? then show us mainImg if not show us defaultImg*/}
            <StyledHero img={mainImg || state.defaultBcg} hero='roomsHero'>
                <Banner title={`${name} room`}>
                    <Link to='/rooms' className='btn-primary'>Back to rooms</Link>
                </Banner>
            </StyledHero>
            <section className='single-room'>
                <div className='single-room-images'>
                    {defaultImg.map((image, index) => {
                        return <img src={image} key={index} alt={name}/>
                    })}
                </div>
                <div className='single-room-info'>
                    <article className='desc'>
                        <h3>details</h3>
                        <p>{description}</p>
                    </article>
                    <article className='info'>
                        <h3>info</h3>
                        <h6>Price: ${price}</h6>
                        <h6>Size: {size} SQFT</h6>
                        <h6>max capacity: {capacity > 1 ? `${capacity} people` : `${capacity} person`}</h6>
                        <h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
                        <h6>{breakfast && "free breakfast included"}</h6>
                    </article>
                </div>
            </section>
            <section className='room-extras'>
                <h6>extras</h6>
                <ul className='extras'>
                    {
                        extras.map((item, index) => {
                            return <li key={index}>- {item}</li>
                        })
                    }
                </ul>
            </section>
        </>
    );
}

