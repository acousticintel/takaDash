import Image from "next/image";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
//custom
import { useData } from "../../context/dataContext";
import Status from "../elements/status";

const childVar = {
  hide: {
    y: 5,
    scale: 0.95,
    opacity: 0,
  },
  show: (i) => ({
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      delay: i * 0.1,
    },
  }),
};

export default function RequestTable() {
  const { onSetRecModal, requests, onSetSelRequest } = useData();

  const handleClick = (r) => {
    //console.log(r)
    onSetSelRequest(r);
    onSetRecModal(true);
  };

  useEffect(() => {
    //console.log(requests)
  }, [requests]);

  const getDate = (date) => {
    let d = date.toDate();
    return dayjs(d).format("DD MMM YYYY");
  };

  return (
    <div className="request__table">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="overflow-hidden">
            <table>
              <thead>
                <tr>
                  <th scope="col">Customer</th>
                  <th scope="col">Type</th>
                  <th scope="col">Issued on</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {requests?.length > 0 &&
                  requests.slice(0, 5).map((r, i) => (
                    <motion.tr
                      variants={childVar}
                      initial="hide"
                      animate="show"
                      exit="hide"
                      custom={i}
                      key={i}
                      onClick={() => handleClick(r)}
                    >
                      <td className="flex justify-start items-center">
                        <div className="relative h-8 w-8 mr-4 rounded-md overflow-hidden">
                          <Image
                            src={r.profileImg}
                            className="object-contain"
                            layout="fill"
                            alt=""
                          />
                        </div>
                        {`${r.username}`}
                      </td>
                      <td className="">{r.type}</td>
                      <td className="pending">{getDate(r.timestamp)}</td>
                      <td>
                        <Status status={r.status} />
                      </td>
                    </motion.tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
