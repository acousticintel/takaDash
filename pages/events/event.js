import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { AuthGuard } from "../../components/elements/authGuard";
import EventG from "../../components/graphSec/eventG";
import EventsStats from "../../components/stats/eventStats";
import { db } from "../../firebase";

export default function EventPage({}) {
  const router = useRouter();
  const info = router.query.info;
  const [sections, setSections] = useState([]);
  const [eventData, setEventData] = useState({});
  const [total, setTotal] = useState(0);

  function sumObjectsByKey(...objs) {
    return objs.reduce((a, b) => {
      for (let k in b) {
        if (b.hasOwnProperty(k)) a[k] = (a[k] || 0) + b[k];
      }
      return a;
    }, {});
  }

  useEffect(() => {
    if (info) {
      const { company, event } = JSON.parse(info);
      const q = collection(
        db,
        "wasteProfiles",
        company,
        "events",
        event,
        "sections"
      );

      getDocs(q).then((querySnapshot) => {
        let tmp = [];
        querySnapshot.forEach((doc) => {
          tmp.push(doc.data());
        });

        setSections(tmp);
      });
    }
  }, [info]);

  useEffect(() => {
    let e = {};
    if (info) {
      const { company, event } = JSON.parse(info);

      const docRef = doc(db, "wasteProfiles", company, "events", event);
      getDoc(docRef).then((doc) => {
        e = {
          ...doc.data(),
          id: doc.id,
          timestamp: doc.data().timestamp.toDate(),
        };
        setEventData(e);
      });
    }
  }, [info]);

  useEffect(() => {
    if (sections.length > 0) {
      let t = sumObjectsByKey(...sections);
      delete t.section;
      setTotal(t);
    }
  }, [sections]);

  return (
    <AuthGuard>
      <main className="events__page">
        <div className="event__details">
          <>
            <div className="detail">
              {" "}
              <span>Date: </span>{" "}
              <h6>
                {eventData.timestamp
                  ? format(eventData.timestamp, "EEE do MMM yyyy")
                  : ""}
              </h6>
            </div>
            <div className="detail">
              {" "}
              <span>Venue: </span> <h6>{eventData.location}</h6>
            </div>
          </>
          <>
            <div className="detail">
              {" "}
              <span>Host: </span> <h6>Pernod Ricard Kenya</h6>
            </div>
            <div className="detail">
              {" "}
              <span>Division: </span> <h6>Nairobi</h6>
            </div>
          </>
        </div>
        <EventsStats total={total?.total ? total.total : 0} />
        <section>
          <EventG total={total} />
        </section>
      </main>
    </AuthGuard>
  );
}
