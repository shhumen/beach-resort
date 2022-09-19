import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import RoomContainer from "../components/RoomContainer";
import {Link} from "react-router-dom";

const Rooms = () => {
    return (
        <>
            <Hero hero='roomsHero'>
                <Banner title="our Rooms">
                    <Link to="/ " className='btn-primary'>
                        Return Home
                    </Link>
                </Banner>
            </Hero>
            <RoomContainer/>
        </>
    )
}

export default Rooms