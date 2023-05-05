import { useAnimation, useMotionValue, useTransform } from "framer-motion";
export const textVariant = (delay: any) => {
  return {
    hidden: {
      y: -50,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 1.25,
        delay: delay,
      },
    },
  };
};

export const slideInVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: index * 0.1,
    },
  }),
};

export const slideFromTopVariantWithOpacity = {
  hidden: { opacity: 0, y: -100 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -100 },
};
export const slideFromTopVariant = {
  hidden: { y: -100 },
  visible: { y: 0 },
  exit: { y: -100 },
};

export const slideFromRightVariantWithOpacity = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

export const slideFromRightVariant = {
  hidden: { x: 100 },
  visible: { x: 0 },
  exit: { x: 100 },
};
