import { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png"
import axios from "axios";

const Header = () => {
  const [image,setImage] = useState(logo);
  useEffect((()=>{
    const fetchLogo = async () => {
      try {
        const ran = Math.floor(Math.random() * 1000);
        console.log("Random number:", ran);
        const response = await axios.get(`https://picsum.photos/id/${ran}/info`)
        if (response.data && response.data.download_url) {
          console.log(response.data.url);
          setImage(response.data.download_url);
        } else {
          console.warn("Logo URL not found in response");
        }
      } catch (error) {
        console.error("Error fetching logo:", error);
      }
    };
    fetchLogo();
  }))
  return (
    <header className="sticky top-0 left-0 right-0 w-full h-auto bg-[#1A4A8C] shadow-sm px-6 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-3 ">
        <img
          src={logo}
          alt="Logo"
          className="w-16 h-16 object-contain object-center mix-blend-lighten"
        />
        <h1 className="text-2xl font-semibold text-white">TasksBoard</h1>
      </div>

      <div>
        <img
          src={image}
          alt="User Profile"
          className="w-12 h-12 rounded-full object-cover border border-gray-200"
        />
      </div>
    </header>
  );
};

export default Header;
