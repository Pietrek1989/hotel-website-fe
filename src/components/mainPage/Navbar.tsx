import { motion } from "framer-motion";
import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdLegendToggle } from "react-icons/md";

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
};

export const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      animate={isOpen ? "open" : "closed"}
      variants={variants}
      className="w-20"
    >
      <div className="h-24 w-24 bg-selected cursor-pointer">
        {isOpen ? (
          <MdLegendToggle onClick={() => setIsOpen((isOpen) => !isOpen)} />
        ) : (
          <AiFillCloseCircle onClick={() => setIsOpen((isOpen) => !isOpen)} />
        )}
      </div>
      <div>hej</div>
    </motion.nav>
  );
};
