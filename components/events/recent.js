import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
//custom packages
import { motion, AnimatePresence } from "framer-motion";
//custom Components
import Title from "../elements/title";

const contVar = {
  show: {
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.35,
    },
  },
};


const slideVar = {
  hide: {
    opacity: 0,
    x: "100%",
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.25,
      duration: 0.25,
    },
  },
};

export default function Recent({ events, company }) {
  useEffect(() => {
    //console.log("events", events);
  }, [events]);

  return (
    <section className="recent__events clear">
      <Title title="Recent Events" />
      <AnimatePresence initial="hide" animate="show" exit="hide">
        {events?.length < 1 && (
          <motion.div variants={slideVar} className="flex items-center justify-center w-full" key="empty">
            <h6 className="text-xl text-gray-500 my-20">
              There are currently no events
            </h6>
          </motion.div>
        )}
        {events?.length > 0 && (
          <motion.div variants={contVar} className="list" key="not_empty">
            {events.map((event) => (
              <Link
                href={`events/event?info=${JSON.stringify({
                  company: company.id,
                  event: event.id,
                })}`}
                key={event.id}
              >
                <motion.div variants={slideVar} className="event">
                  <div className="event__img">
                    <Image
                      src={event.image}
                      layout="fill"
                      className="object-cover"
                    />
                  </div>
                  <h6>{event.name}</h6>
                  <span>{event.name}</span>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex justify-end">
        <button className="btn btn-ghost">View All</button>
      </div>
    </section>
  );
}
