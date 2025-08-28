import { useState } from "react";
import GeneralInfo from "./GeneralInfo";
import ShoppingList from "./ShoppingList";
import Pics from "./Pics";
import Expenses from "./Expenses";

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
      case "expenses":
        return <Expenses />;
      default:
        return <GeneralInfo />;
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 m-5 gap-2">
        <button
          onClick={() => setSelectedTab("info")}
          className={`h-24 transition-all duration-300 ease-in-out text-4xl font-semibold rounded-2xl ${
            selectedTab === "info"
              ? "bg-red-600 text-white"
              : "bg-orange-300 text-black hover:bg-orange-400"
          }`}
        >
          Info
        </button>
        <button
          onClick={() => setSelectedTab("pics")}
          className={`h-24 transition-all duration-300 ease-in-out text-4xl font-semibold rounded-2xl ${
            selectedTab === "pics"
              ? "bg-red-600 text-white"
              : "bg-orange-300 text-black hover:bg-orange-400"
          }`}
        >
          Pics
        </button>
        <button
          onClick={() => setSelectedTab("shopping")}
          className={`h-24 transition-all duration-300 ease-in-out text-4xl font-semibold rounded-2xl ${
            selectedTab === "shopping"
              ? "bg-red-600 text-white"
              : "bg-orange-300 text-black hover:bg-orange-400"
          }`}
        >
          Shopping List
        </button>
        <button
          onClick={() => setSelectedTab("expenses")}
          className={`h-24 transition-all duration-300 ease-in-out text-4xl font-semibold rounded-2xl ${
            selectedTab === "expenses"
              ? "bg-red-600 text-white"
              : "bg-orange-300 text-black hover:bg-orange-400"
          }`}
        >
          Expenses
        </button>
      </div>
      {renderContent()}
    </div>
  );
}
