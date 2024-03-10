"use client"

import CardsContainer from "@/components/cards";
import CuisineCategories from "@/components/cuisines";
import Map from "@/components/map";
import Radius from "@/components/radius";
import FoodTypes from "@/components/types";
import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { addDoc, collection } from "firebase/firestore";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {

  const [ userLocation, setUserLocation ] = useState({lat: null, lng: null})
  useEffect(() => {
    const getUserLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      })
    }
    getUserLocation()
  }, [])

  const [ data, setData ] = useState(null)
  const [ category, setCategory ] = useState("Italian Restaurant")
  const [ radius, setRadius ] = useState(2500)
  const api = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
  useEffect(() => {
    const fetchData = async (category: string, radius: number, lat: number, lng: number) => {
      try {
        const response = await axios.get(`/api/places?query=${category}&location=${lat},${lng}&radius=${radius}&key=${api}`)
        setData(response.data)
      } catch(err) {
        console.error("Error making a fetch request:" + err)
      }
    }
    fetchData(category, radius, userLocation.lat, userLocation.lng)
  }, [userLocation.lat, userLocation.lng, category, radius, api])

  const { user } = useUser()
  const handleSubmit = async (e, placeId) => {
    e.preventDefault()
    const newFavorite = {
      user: user?.id,
      placeId: placeId,
    } //only record a place id and use it to fetch the relevant place from my API
    try {
      await addDoc(collection(db, "favorites"), newFavorite)
      toast.success('Added to Favorites', {
        style: {
          border: '1px solid #000000',
          padding: '16px',
          background: "#FFBE60",
          color: '#000000',
        },
        icon: "😊",
      });
    } catch(err) {
      console.error("Error adding favorites:" + err)
      toast.success('Something wrong wrong', {
        style: {
          border: '1px solid #000000',
          padding: '16px',
          background: "#FFBE60",
          color: '#000000',
        },
        icon: "🥲",
      });
    }
  }
  return (
    <>
    <div className="flex flex-col md:flex-row justify-between m-4">
      <button onClick={() => console.log(data)}>test</button>
    <div className="flex flex-col">
      <CuisineCategories onSelect={setCategory} />
      <FoodTypes onSelect={setCategory} />
      <Radius onSelect={setRadius} />
    </div>
    <div>
      <Map userLocation={userLocation} data={data} />
      <CardsContainer favorites={""} setFavorites={handleSubmit} data={data} userLocation={userLocation} />
    </div>
    </div>
    </>
  )
}