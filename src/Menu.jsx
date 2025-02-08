import { useState } from "react";
import "./index.css";
import ValentineMenuButton from "./ValentineMenuButton";
import { motion } from 'framer-motion';
import { LucideArrowLeft } from "lucide-react";
import {  useNavigate } from "react-router-dom";

export default function Menu() {
  const [menu, setMenu] = useState(1);

  const handleNextMenu = () => {
    setMenu((prev) => prev + 1);
  };

  const handleBackToMenu = () => {
    setMenu((prev) => prev - 1);
  };

  const navigate = useNavigate();

  return (
    <header className="bg-inherit flex justify-center p-6 text-center">
      {menu === 1 && (
        <div className="w-full  ">
          <motion.h1 
            className="text-4xl font-bold text-pink-600 mb-10 font-[Dancing Script] w-full"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Welcome to Pluggito Valentine&apos;s Special
          </motion.h1>
          <div>
            <ValentineMenuButton onClick={handleNextMenu} />
          </div>
        </div>
      )}

      {menu === 2 && (
        <div>
          <div className="text-lg flex flex-row mb-4 cursor-pointer items-center"
                 onClick={handleBackToMenu}>
            <LucideArrowLeft />
            back
          </div>

          <div className="flex-col flex gap-3">
            <h4 className="text-4xl font-semibold">Select the preferred Language</h4>
            <div className="flex-wrap justify-between ">
            <button className="bg-pink-500 text-white w-full h-12 cursor-pointer rounded-md hover:bg-pink-600 transition duration-300 ease-in-out  text-lg mb-4" onClick={()=>navigate('/countdown')}>English</button>
            <button className="bg-pink-500 text-white w-full h-12 cursor-pointer rounded-md hover:bg-pink-600 transition duration-300 ease-in-out  text-lg mb-4" onClick={()=>navigate('/countdown')}>Yoruba</button>
            <button className="bg-pink-500 text-white w-full rounded-lg h-12 cursor-pointer rounded-md hover:bg-pink-600 transition duration-300 ease-in-out  text-lg mb-4">Spanish</button>
            <button className="bg-pink-500 text-white w-full h-12 cursor-pointer rounded-md hover:bg-pink-600 transition duration-300 ease-in-out  text-lg mb-4" onClick={()=>navigate('/countdown')}>Japanese</button>
            <button className="bg-pink-500 text-white w-full rounded-lg h-12 cursor-pointer rounded-md hover:bg-pink-600 transition duration-300 ease-in-out text-lg mb-4">Korean</button>
            <button className="bg-pink-500 text-white w-full h-12 cursor-pointer rounded-md hover:bg-pink-600 transition duration-300 ease-in-out  text-lg mb-4" onClick={()=>navigate('/countdown')}>French</button>
            <button className="bg-pink-500 text-white w-full rounded-lg h-12 cursor-pointer rounded-md hover:bg-pink-600 transition duration-300 ease-in-out  text-lg">italian</button>
            </div>
            
          </div>
        </div>
      )}
    </header>
  );
}
