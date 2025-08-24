import Countdown from "./Countdown";
import GeneralInfo from "./GeneralInfo";
import Nav from "./Nav";

export default function Obx() {
  return (
    <div className="bg-orange-200 min-h-screen min-w-[320px] p-2">
      <div className="relative max-w-5xl mx-auto">
        <div className="text-center">
          <h1 className="text-5xl my-4 font-bold text-orange-500">
            ☀️ Outer Banks 2025 🏖️
          </h1>
          <Countdown />
          <Nav />
        </div>
      </div>
    </div>
  );
}
