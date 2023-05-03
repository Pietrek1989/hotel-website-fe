import { useSelector } from "react-redux";
import { motion } from "framer-motion";
interface OffersProps {
  selectedRange: {
    start: Date | null;
    end: Date | null;
  };
}
const TotalPrice: React.FC<OffersProps> = ({ selectedRange }) => {
  const totalPrice = useSelector((state: any) => state.totalPrice.totalPrice);
  const selectedOffer = useSelector(
    (state: any) => state.selectedOffer.selectedOffer
  );

  return (
    <div className="bg-white shadow-md rounded-md p-4 mt-4 price-container flex flex-col sm:text-lg md:text-sm lg:text-lg">
      <p className="font-bold text-lg text-cennter mb-5">
        Booking information:
      </p>

      {selectedRange && (
        <div>
          <p>Check In: {selectedRange.start?.toDateString()}</p>
          <p>
            <em>After 15:00</em>
          </p>
          <br />
          <p>Check Out: {selectedRange.end?.toDateString()}</p>
          <p>
            <em>Before 12:00</em>
          </p>
          <br />
        </div>
      )}
      <p className="text-gray-500">Selected: {selectedOffer.name}</p>
      <br />

      <p className="text-gray-500">
        Price including taxes:
        <hr className="bg-black mb-2" /> €{totalPrice}
      </p>
      <br />
      <div className="text-center">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-lightgreen p-2 rounded-md text-white hover:bg-selected mb-5"
        >
          {" "}
          BOOK
        </motion.button>
      </div>
      {/* <img
        src={require("../../assets/haus-rheingold-high-resolution-logo-color-on-transparent-background.png")}
        alt="logo"
        className=" bg-blue"
      /> */}
      <div className="mx-auto">
        <img
          src={require("../../assets/haus-rheingold-high-resolution-logo-color-on-transparent-background (1).png")}
          alt="logo"
          className=" w-40 md:w-20"
        />
      </div>
      {/* <img
        src={require("../../assets/logo-no-background(1).png")}
        alt="logo"
        className=" bg-blue"
      /> */}
    </div>
  );
};

export default TotalPrice;
