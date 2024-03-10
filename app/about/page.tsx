import Image from "next/image";
import Link from "next/link";

export default function About() {
    return (
        <>
        <div className="flex flex-col px-4 w-full items-center justify-center h-screen">
            <div className="flex flex-col w-full md:max-w-[500px] items-start">
                <div className="mb-4 flex gap-4">
                    <Image src="/pizza.png" width={80} height={80} alt="Cartoony Food Image" className="w-[64px] md:w-[80px] hover:animate-bounce cursor-pointer transition-all" />
                    <Image src="/tacos.png" width={100} height={100} alt="Cartoony Food Image" className="w-[64px] md:w-[80px] hover:animate-bounce cursor-pointer transition-all" />
                    <Image src="/sandwich.png" width={100} height={100} alt="Cartoony Food Image" className="w-[64px] md:w-[80px] hover:animate-bounce cursor-pointer transition-all" />
                </div>
                <h1 className="font-medium text-xl">Satisfy your cravings with Bite! </h1>
                <p className="text-lg">This app makes it easy to discover delicious eateries in your area. Harnessing the power of Google Maps, it automatically detects your location, offers filters to refine your search, and even provides directions to your chosen destination.</p>
                <Link href="https://github.com/Anabel7213" className="p-4 text-lg hover:bg-[#FFBE60] transition-all mt-4 rounded-[4px] border border-black">More Fun Projects</Link>
            </div>
        </div>
        </>
    )
}