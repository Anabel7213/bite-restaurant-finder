"use client";

import RestaurantCard from "@/components/card";
import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Favorites({ favorites, setFavorites, userLocation }) {
  const [data, setData] = useState(null);
  const [apiData, setApiData] = useState(null);
  const { user } = useUser();
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "favorites"), where("user", "==", user?.id));
      const querySnapshot = await getDocs(q);
      const fetchedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(fetchedData);
    }

    if(user?.id) {
        fetchData();
    }
  }, [user?.id]);

  useEffect(() => {
    const fetchDetails = async () => {
      const promises = data.map(favorite => 
        axios.get(`/api/details?placeId=${favorite.placeId}`)
      );
  
      try {
        const results = await Promise.all(promises);
        const details = results.map(result => result.data.result);
        setApiData(details);
      } catch (err) {
        console.error("Error fetching place details:", err);
      }
    };
  
    if (data?.length > 0) {
      fetchDetails();
    }
  }, [data]);
  return (
    <>
      <button onClick={() => console.log(apiData)}>test</button>
    </>
  );
}