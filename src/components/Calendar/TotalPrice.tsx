import { useSelector } from "react-redux";
interface OffersProps {
  selectedRange: {
    start: Date | null;
    end: Date | null;
  };
}
const TotalPrice: React.FC<OffersProps> = ({ selectedRange }) => {
  const totalPrice = useSelector((state: any) => state.totalPrice.totalPrice);

  return (
    <div className="bg-white shadow-md rounded-md p-4 mt-4 price-container">
      <p className="font-bold text-lg">Total Price:</p>
      <p className="text-gray-500">€{totalPrice}</p>
      {selectedRange && (
        <div>
          <p>Check In: {selectedRange.start?.toDateString()}</p>
          <p>Check Out: {selectedRange.end?.toDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default TotalPrice;
