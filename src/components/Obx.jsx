import GoogleMap from "./GoogleMap";
import Countdown from "./Countdown";
import GeneralInfo from "./GeneralInfo";
import Nav from "./Nav";

export default function Obx() {
  return (
    <div className="bg-orange-200 min-h-screen min-w-[320px] p-2">
      <div className="relative max-w-5xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl my-4 font-bold text-orange-500">
            ☀️ Outer Banks 2025 🏖️
          </h1>
          <Countdown />
          {/* GOOGLE MAPS PLACEHOLDER */}
          <div className="w-full h-80 rounded-lg border-8 bg-green-300 overflow-hidden"></div>
          {/* <GoogleMap /> */}
          <p className="text-lg">
            6508 South Virginia Dare Trail <br />
            Nags Head, NC 27959
          </p>
          <a
            href="https://maps.google.com/?q=35.9208629,-75.6039274"
            className="text-red-500 hover:text-red-900 font-bold text-2xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Directions
          </a>
          <Nav />
          <GeneralInfo />
        </div>
      </div>
    </div>
  );
}
