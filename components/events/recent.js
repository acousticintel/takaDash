import { query, onSnapshot, collection, where } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
//custom
import Title from "../elements/title";

export default function Recent({ events, company }) {
  useEffect(() => {
    //console.log("events", events);
  }, [events]);

  return (
    <section className="recent__events clear">
      <Title title="Recent Events" />
      <div className="list">
        {events?.length > 0 &&
          events.map((event) => (
            <Link
              href={`events/event?info=${JSON.stringify({
                company: company.id,
                event: event.id,
              })}`}
              key={event.id}
            >
              <div className="event">
                <div className="event__img">
                  <Image
                    src={event.image}
                    layout="fill"
                    className="object-cover"
                  />
                </div>
                <h6>{event.name}</h6>
                <span>{event.name}</span>
              </div>
            </Link>
          ))}
      </div>
      <div className="flex justify-end">
        <button className="btn btn-ghost">View All</button>
      </div>
    </section>
  );
}
