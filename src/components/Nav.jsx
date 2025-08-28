import { useState } from "react";
import GeneralInfo from "./GeneralInfo";
import ShoppingList from "./ShoppingList";
import Pics from "./Pics";

export default function Nav() {
  const [selectedTab, setSelectedTab] = useState("info");

  const renderContent = () => {
    switch (selectedTab) {
      case "info":
        return <GeneralInfo />;
      case "shopping":
        return <ShoppingList />;
      case "pics":
        return <Pics />;
      default:
        return <GeneralInfo />;
    }
  };

  return (
    <div>
      <div className="flex m-5 h-24 bg-orange-300 rounded-2xl overflow-hidden">
        <button
          onClick={() => setSelectedTab("info")}
          className={`flex-1 transition-all duration-300 ease-in-out text-4xl font-semibold ${
            selectedTab === "info"
              ? "bg-red-600 text-white flex-[4]"
              : "bg-orange-300 text-black hover:bg-orange-400 flex-[3]"
          }`}
        >
          Info
        </button>
        <button
          onClick={() => setSelectedTab("shopping")}
          className={`flex-1 transition-all duration-300 ease-in-out text-4xl font-semibold ${
            selectedTab === "shopping"
              ? "bg-red-600 text-white flex-[4]"
              : "bg-orange-300 text-black hover:bg-orange-400 flex-[3]"
          }`}
        >
          Shopping List
        </button>
        <button
          onClick={() => setSelectedTab("pics")}
          className={`flex-1 transition-all duration-300 ease-in-out text-4xl font-semibold ${
            selectedTab === "pics"
              ? "bg-red-600 text-white flex-[4]"
              : "bg-orange-300 text-black hover:bg-orange-400 flex-[3]"
          }`}
        >
          Pics
        </button>
      </div>
      {renderContent()}
    </div>
  );
}
