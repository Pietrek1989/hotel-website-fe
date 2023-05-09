import {
  slideFromLeftVariantWithOpacity,
  slideFromRightVariantWithOpacity,
} from "../../utils/motion";
import { motion } from "framer-motion";

export const SectionWrapperLeft = (Component: any, idName: any) =>
  function HOC() {
    return (
      <motion.section
        variants={slideFromLeftVariantWithOpacity}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.25 }}
        className={`mx-auto relative z-0`}
      >
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>
        <Component />
      </motion.section>
    );
  };

export const SectionWrapperRight = (Component: any, idName: any) =>
  function HOC() {
    return (
      <motion.section
        variants={slideFromRightVariantWithOpacity}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.25 }}
        className={`container max-w-7xl mx-auto relative z-0`}
      >
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>
        <Component />
      </motion.section>
    );
  };
