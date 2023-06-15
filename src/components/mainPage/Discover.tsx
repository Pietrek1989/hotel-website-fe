import { motion } from "framer-motion";
import "../../styles/discover.css";
import { SectionWrapperLeft } from "../sectionAnimation";
import { slideFromLeftVariantWithOpacity } from "../../utils/motion";

const Discover = () => {
  const imageVariants = {
    hover: {
      scale: 1.1,
      zIndex: 10,
      boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.3)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      <motion.div
        variants={slideFromLeftVariantWithOpacity}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.25 }}
        className="container max-w-7xl mx-auto relative -z-1 mt-[300px] lg:mt-[500px] xl:mt-[800px] "
      >
        <div
          className="container max-w-7xl  flex sm:mt-10 md:mt-40 mb-10 discover-container text-center md:text-start   "
          id="discovery"
        >
          <div className="basis-3/3 md:basis-1/3 mr-8">
            <h2 className="text-white  md:text-charcoal text-4xl mb-20">
              <em>Discover Alpbach</em>
            </h2>
            <p className="  md:pr-10">
              Located in the hear of Pristine Alps.
              <br /> Staying with us you can Immerse yourself in the
              breathtaking beauty of the alpine mountains, where adventure,
              relaxation, and culinary delights await. <br />
              <br />
              Explore scenic hiking trails during the summer, or glide down
              glistening slopes in the winter. Indulge in exquisite local
              cuisine crafted from fresh, locally sourced ingredients.
              <br />
              <br />
              Experience the enchanting allure of nature in this unforgettable
              destination that promises memories to last a lifetime.
            </p>
          </div>
          <div className="basis-2/3 relative  hidden md:block">
            <motion.img
              variants={imageVariants}
              whileHover="hover"
              loading="lazy"
              src="https://res.cloudinary.com/dvagn6szo/image/upload/v1683360095/hotel-Rheingold/gallery/20200826_140506_lboyai.jpg"
              alt="Summer galtenberg peak"
              className=" absolute -top-20  md:left-20 lg:left-50 xl:left-60 w-50 md:h-3/6 lg:h-3/5 xl:h-2/3 object-cover"
            />
            <motion.img
              variants={imageVariants}
              whileHover="hover"
              loading="lazy"
              src="https://res.cloudinary.com/dvagn6szo/image/upload/v1683366475/hotel-Rheingold/tinified/cropped_hz5gus.png"
              alt="Winter ski "
              className="absolute bottom-0 left-0 w-2/5 md:h-3/4 lg:h-full object-cover"
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Discover;
