const infoRowStyle =
  "flex justify-between items-center text-2xl border-2 gap-6 text-left border-black bg-yellow-200/50 rounded-xl p-4";

export default function GeneralInfo() {
  return (
    <>
      <h3 className="mt-16 text-4xl my-4 font-bold text-orange-500">
        General Information
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
    </>
  );
}
