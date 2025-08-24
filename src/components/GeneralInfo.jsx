import GoogleMap from "./GoogleMap";
import house from "url:../assets/house.jpg";
import inside from "url:../assets/inside.jpg";
import pool from "url:../assets/pool.jpg";
import beach from "url:../assets/beach.jpg";

const infoRowStyle =
  "flex justify-between items-center text-3xl border-2 gap-6 text-left border-black bg-yellow-200/50 rounded-xl p-4";

const pictureStyle =
  "w-full h-96 object-cover rounded-lg border-2 border-orange-300";

export default function GeneralInfo() {
  return (
    <div className="flex flex-col gap-5">
      {/* GOOGLE MAPS PLACEHOLDER */}
      <div className="w-full h-80 rounded-lg border-8 bg-green-300 overflow-hidden"></div>
      {/* <GoogleMap /> */}
      <div>
        <a
          href="https://maps.google.com/?q=6508 S Virginia Dare Trail, Kill Devil Hills, NC 27948"
          className="text-red-500 hover:text-red-900 font-bold text-5xl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Click here for directions
        </a>
        <p className="text-xl">
          6508 South Virginia Dare Trail <br />
          Nags Head, NC 27959
        </p>
      </div>
      <div className="w-full mb-6">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          <img src={house} alt="Property view 1" className={pictureStyle} />
          <img src={inside} alt="Property view 2" className={pictureStyle} />
          <img src={pool} alt="Property view 3" className={pictureStyle} />
          <img src={beach} alt="Property view 4" className={pictureStyle} />
        </div>
      </div>
      <h3 className="text-4xl my-4 font-bold text-orange-500">
        📝 General Information 📝
      </h3>
      <div className="flex-col flex gap-4">
        <div className={infoRowStyle}>
          <span>Bedrooms:</span>
          <span className="font-semibold">5</span>
        </div>
        <div className={infoRowStyle}>
          <span>Bathrooms:</span>
          <span className="font-semibold">5 Full</span>
        </div>
        <div className={infoRowStyle}>
          <span>Occupancy:</span>
          <span className="font-semibold">10 People</span>
        </div>
        <div className={infoRowStyle}>
          <span>WiFi Name:</span>
          <span className="font-semibold">NH13 or Off Course</span>
        </div>
        <div className={infoRowStyle}>
          <span>WiFi PW:</span>
          <span className="font-semibold">2524801891</span>
        </div>
        <div className={infoRowStyle}>
          <span>Security Code:</span>
          <span className="font-semibold">Given 5 days before check-in</span>
        </div>
        <div className={infoRowStyle}>
          <span>Security Code Instructions:</span>
          <span className="font-semibold">
            Enter your six digit door code followed by the bottom left button
            (star or check mark) on the keypad. You will hear a tone and the
            door will automatically unlock for you. Press down on the lever to
            open the door. To lock the door, press the button on the bottom left
            of the key pad.
          </span>
        </div>
        <div className={infoRowStyle}>
          <span>Checkout Procedure:</span>
          <span className="font-semibold">
            Check-out is at 10 am. <br></br>
            If you were given a physical key at check-in, please be sure to
            bring your keys back to the Nags Head office upon check out. If you
            are checking out prior to office hours, you can place them in the
            dropbox located to the right of our office door. <br></br>
            You may reply to the text you received from Village Realty using the
            words "check out". <br></br>
          </span>
        </div>
        <div className={infoRowStyle}>
          <span>Office Hours:</span>
          <span className="font-semibold">9:00a - 5:00p, Mon-Sun</span>
        </div>
        <div className={infoRowStyle}>
          <span>Main #:</span>
          <span className="font-semibold">
            252-449-4074 <br></br>
            Housekeeping - ext 1 <br></br>
            Maintenance - ext 2<br></br>
            Pool and spa - ext 3
          </span>
        </div>
        <div className={infoRowStyle}>
          <span>Emergency #:</span>
          <span className="font-semibold">252-202-8671</span>
        </div>
      </div>
    </div>
  );
}
