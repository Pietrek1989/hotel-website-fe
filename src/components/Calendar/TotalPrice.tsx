import { useSelector } from "react-redux";

const TotalPrice: React.FC = () => {
  const totalPrice = useSelector((state: any) => state.totalPrice.totalPrice);

  return (
    <div className="bg-white shadow-md rounded-md p-4 mt-4">
      <p className="font-bold text-lg">Total Price:</p>
      <p className="text-gray-500">${totalPrice}</p>
    </div>
  );
};

export default TotalPrice;
