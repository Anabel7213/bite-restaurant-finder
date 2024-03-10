"use client"

import RestaurantCard from "./card"

export default function Distance({data, favorites, setFavorites, userLocation}) {
    return (
        <>
        {data ? (
            data.results.map((item, index) => (
                <RestaurantCard favorites={favorites} setFavorites={setFavorites} key={index} item={item} userLocation={userLocation}/>
            ))
        ) : null}
        </>
    )
}