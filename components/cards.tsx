"use client"

import Distance from "./directions";
import Skeleton from "./skeleton";

export default function CardsContainer({data, favorites, setFavorites, userLocation}) {
    return (
        <>
        <div className="scrollbar flex w-full md:w-[980px] overflow-auto scroll-smooth overscroll-none items-center my-4 gap-3 md:absolute md:bottom-[2%] md:left-[28%]">
            {data ? (
                <Distance favorites={favorites} setFavorites={setFavorites} data={data} userLocation={userLocation} />
            ): (
                Array.from({length: 4}).map((_, index) => (
                    <Skeleton key={index} />
                ))
            )}
        </div>
        </>
    )
}