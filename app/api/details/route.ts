import axios from 'axios';
import { NextResponse } from 'next/server';

export interface Query extends Request {
  query: any
}

export async function GET(req: Query) {
  const { placeId } = req.query;
  const api = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${api}`, {
      headers: {
        "Content-Type": "application/json"
    }
    });
    return NextResponse.json(response.data)
  } catch (error) {
    console.error('Error fetching place details:', error);
    return NextResponse.json({status: 500})
  }
}