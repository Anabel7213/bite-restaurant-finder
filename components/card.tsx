"use client"

import useDistanceCalculator from "@/data/distance";
import { Rating } from "@mui/material";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";

export default function RestaurantCard({item, favorites, setFavorites, userLocation}) {
    const { getDirections } = useDistanceCalculator(item, userLocation)
    const handleFavoriteClick = useCallback((e) => {
        e.stopPropagation(); // Prevents the click from bubbling up to parent elements
        setFavorites(e, item.place_id); // Pass the placeId to the setFavorites function
      }, [item.place_id, setFavorites]);
    
      const [ fav, setFav ] = useState(false)
      const handleSubmit = () => {
        handleFavoriteClick
        setFav(true)
      }
    return (
        <>
            <div key={item?.place_id} className="flex shrink-0 flex-col border border-black rounded-[4px] bg-white p-6 w-full md:w-[236px]">
            <Image
            src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${
                item?.photos?.[0]?.photo_reference ? item?.photos[0]?.photo_reference : 'defaultPhotoReference'
            }&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`}
            alt={item?.name}
            width={100}
            height={100}
            className="object-cover w-full md:w-full h-[100px] border border-black rounded-[4px] mb-2"
            />
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                        {item?.rating}
                        <Rating value={item?.rating} size="small" readOnly icon={ <Image src="star.svg" alt="Rating" width={16} height={16} />} emptyIcon={<Image src="emptyStar.svg" alt="Rating" width={16} height={16} />} />
                        <span>{item?.price_level === 1 ? "·$" : item?.price_level === 2 ? "·$$" : item?.price_level === 3 ? "·$$$" : item?.price_level === 4 ? "·$$$$" : "·$$"}</span>
                    </div>
                    <span className={item?.opening_hours?.open_now === true ? "bg-[#BBCC3F] text-sm px-[4px] border-black border rounded-[4px]" : "bg-[#FFADC0] text-sm px-[4px] border-black border rounded-[4px]"}>{item?.opening_hours?.open_now === true ? "Open" : "Closed"}</span>
                </div>
                <h1 className="capitalize font-medium text-lg">{item?.name?.length > 18 ? item?.name.slice(0,20) + "...": item?.name}</h1>
                <p>{item?.formatted_address.substring(0, item?.formatted_address?.lastIndexOf(",")).slice(0, 43)}</p>
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-[4px] bg-slate-100 border border-black"><Heart onClick={handleSubmit} fill={fav ? "#FF8195" : "#FFFFFF"} strokeWidth={1.5} size={20} className="top-[10%] left-[18.5%] cursor-pointer" /></div>
                    <button onClick={getDirections} className="p-2 rounded-[4px] border-black border w-full">Directions</button>
                </div>
            </div>
        </>
    )
}