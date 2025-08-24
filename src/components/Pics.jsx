export default function Pics() {
  return (
    <>
      <h3 className="text-4xl my-4 font-bold text-orange-500">Photos</h3>
      <div className="flex-col flex gap-4">
        <div className="text-center text-2xl border-2 border-black bg-yellow-200/50 rounded-xl p-8">
          <p className="font-semibold">Photo Gallery Coming Soon!</p>
          <p className="text-lg mt-2">Share your vacation memories here</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border-2 border-black bg-gray-200 rounded-xl p-4 h-48 flex items-center justify-center">
            <p className="text-lg text-gray-600">Photo 1</p>
          </div>
          <div className="border-2 border-black bg-gray-200 rounded-xl p-4 h-48 flex items-center justify-center">
            <p className="text-lg text-gray-600">Photo 2</p>
          </div>
          <div className="border-2 border-black bg-gray-200 rounded-xl p-4 h-48 flex items-center justify-center">
            <p className="text-lg text-gray-600">Photo 3</p>
          </div>
        </div>
      </div>
    </>
  );
}
