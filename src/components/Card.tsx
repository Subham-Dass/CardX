import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

const Card = ({ cardData, onDelete }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.15,
  });

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="rounded-xl bg-white p-4 shadow-md flex flex-col justify-between text-gray-900 
        hover:shadow-xl 
        hover:-translate-y-1 
        transition-transform duration-300 border border-gray-200"
    >
      <img
        src={cardData.thumbnail}
        alt={cardData.title}
        className="w-full h-48 object-contain mb-4 rounded"
      />

      <h3 className="text-lg font-semibold mb-1">{cardData.title}</h3>
      <p className="text-sm text-gray-600 mb-2 capitalize">
        {cardData.category}
      </p>
      <p className="text-base font-bold mb-4">₹{cardData.price}</p>

      <button
        onClick={() => onDelete(cardData.id)}
        className="mt-auto bg-red-100 text-red-600 font-medium px-3 py-1 rounded hover:bg-red-400 hover:text-red-100 transition cursor-pointer"
      >
        Delete
      </button>
    </motion.div>
  );
};

export default Card;
