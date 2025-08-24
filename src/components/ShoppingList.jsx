export default function ShoppingList() {
  return (
    <>
      <h3 className="text-4xl my-4 font-bold text-orange-500">Shopping List</h3>
      <div className="flex-col flex gap-4">
        <div className="flex justify-between items-center text-2xl border-2 gap-6 text-left border-black bg-yellow-200/50 rounded-xl p-4">
          <span>Groceries:</span>
          <span className="font-semibold">Milk, Bread, Eggs</span>
        </div>
        <div className="flex justify-between items-center text-2xl border-2 gap-6 text-left border-black bg-yellow-200/50 rounded-xl p-4">
          <span>Beach Supplies:</span>
          <span className="font-semibold">Towels, Sunscreen, Umbrella</span>
        </div>
        <div className="flex justify-between items-center text-2xl border-2 gap-6 text-left border-black bg-yellow-200/50 rounded-xl p-4">
          <span>Kitchen Items:</span>
          <span className="font-semibold">Paper Towels, Trash Bags</span>
        </div>
        <div className="flex justify-between items-center text-2xl border-2 gap-6 text-left border-black bg-yellow-200/50 rounded-xl p-4">
          <span>Bathroom:</span>
          <span className="font-semibold">Toilet Paper, Soap</span>
        </div>
      </div>
    </>
  );
}
