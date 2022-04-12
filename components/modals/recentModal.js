import Image from "next/image";
import dayjs from "dayjs";
import { useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
//context
import { useData } from "../../context/dataContext";
import { prodPhotos } from "../../context/vars";

const contVar = {
  hide: {
    opacity: 1,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const modalVar = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 0.5,
    transition: {
      duration: 0.35,
    },
  },
};

const contentVar = {
  hide: {
    scale: 0,
    opacity: 0,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },
};

export default function RecentModal() {
  const box = useRef(null);
  useOutsideAlerter(box);
  const { recModal, selRequest } = useData();

  const getImageAdd = () => {
    var temp = prodPhotos.find(function (p) {
      return p.name == selRequest.prod;
    });

    if (temp) {
      return `${temp.image}`;
    } else {
      return "";
    }
  };

  const getDate = (date) => {
    let d = date.toDate();
    return dayjs(d).format("DD MMM YYYY");
  };

  return (
    <AnimatePresence className="overflow-auto">
      {recModal && (
        <motion.div
          variants={contVar}
          initial="hide"
          animate="show"
          exit="hide"
          className="modal"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <motion.div variants={modalVar} className="modal__blind" />
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <motion.div
              ref={box}
              variants={contentVar}
              className="relative inline-block align-bottom bg-gray-100 rounded-lg text-left overflow-hidden shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            >
              <div className="px-10 lg:px-20 py-10">
                <div className="relative h-20">
                  <Image
                    src={`/assets/${getImageAdd()}`}
                    className="object-contain"
                    layout="fill"
                    alt=""
                  />
                </div>
                <h1 className="text-xl text-center capitalize">
                  {selRequest.prod}
                </h1>
                <h1 className="text-center font-semibold">
                  Recycle Request Details
                </h1>
                <div className="bg-white px-14 pt-4 pb-8 my-10 rounded-md">
                  <div className="flex justify-between items-center text-sm py-2 my-1 border-b border-dotted">
                    <span className="font-normal text-gray-500">
                      Request by :
                    </span>
                    <span className="text-lg font-semibold capitalize">
                      {selRequest.username}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm py-2 my-1 border-b border-dotted">
                    <span className="font-normal text-gray-500">
                      Request Type :
                    </span>
                    <span className="text-lg font-semibold">
                      {selRequest.type === "pick" ? "Pick Up" : ""}
                      {selRequest.type === "drop" ? "Drop Off" : ""}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm py-2 my-1 border-b border-dotted">
                    <span className="font-normal text-gray-500">Size :</span>
                    <span className="text-lg font-semibold">
                      {selRequest.size}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 my-1 border-b border-dotted">
                    <span className="font-normal text-gray-500">
                      Quantity :
                    </span>
                    <span className="font-semibold text-lg">
                      {selRequest.qntt}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 my-1 border-b border-dotted">
                    <span className="font-normal text-gray-500">
                      Request Status :
                    </span>
                    <span className="font-semibold">Pending</span>
                  </div>
                  <div className="flex justify-between items-center py-2 my-1 border-b border-dotted">
                    <span className="font-normal text-gray-500">
                      Issued On :
                    </span>
                    <span className="font-semibold">
                      {getDate(selRequest.timestamp)}
                    </span>
                  </div>
                  {selRequest.pickdate && (
                    <div className="flex justify-between items-center py-2 my-1">
                      <span className="font-normal text-gray-500">
                        Pick Up Date :
                      </span>
                      <span className="font-semibold">
                        {getDate(selRequest.pickdate)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function useOutsideAlerter(ref) {
  const { recModal, onSetRecModal } = useData();

  useEffect(() => {
    // Function for click event
    function handleOutsideClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (recModal) onSetRecModal(false);
      }
    }

    // Adding click event listener
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [ref, recModal, onSetRecModal]);
}
