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
      <div className="flex justify-center gap-8 m-5">
        <button
          onClick={() => setSelectedTab("info")}
          className={`px-6 py-3 rounded-full text-3xl font-semibold transition-colors duration-200 ${
            selectedTab === "info"
              ? "bg-red-600 text-white"
              : "bg-orange-300 text-black hover:bg-orange-400"
          }`}
        >
          Info
        </button>
        <button
          onClick={() => setSelectedTab("shopping")}
          className={`px-6 py-3 rounded-full text-3xl font-semibold transition-colors duration-200 ${
            selectedTab === "shopping"
              ? "bg-red-600 text-white"
              : "bg-orange-300 text-black hover:bg-orange-400"
          }`}
        >
          Shopping List
        </button>
        <button
          onClick={() => setSelectedTab("pics")}
          className={`px-6 py-3 rounded-full text-3xl font-semibold transition-colors duration-200 ${
            selectedTab === "pics"
              ? "bg-red-600 text-white"
              : "bg-orange-300 text-black hover:bg-orange-400"
          }`}
        >
          Pics
        </button>
      </div>
      {renderContent()}
    </div>
  );
}
