import Image from "next/image";
import { useEffect, useState } from "react";
//custom func
import { AuthGuard } from "../../components/elements/authGuard";
import DropDown from "../../components/elements/dropDown";
import { useData } from "../../context/dataContext";
import swal from "sweetalert";
import { query, collection, where, limit, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function EntryPage() {
  const { updateWasteProfile } = useData();

  const [loading, setLoading] = useState(false);

  const [company, setCompany] = useState("Pernod Ricard Kenya");
  const [section, setSection] = useState("");
  //plastics
  const [plastic, setPlastic] = useState({ data: "", state: null });
  //metal
  const [metal, setMetal] = useState({ data: "", state: null });
  //paper
  const [paper, setPaper] = useState({ data: "", state: null });
  const [glass, setGlass] = useState({ data: "", state: null });
  const [organic, setOrganic] = useState({ data: "", state: null });
  const [non, setNon] = useState({ data: "", state: null });
  const [cloth, setCloth] = useState({ data: "", state: null });

  useEffect(() => {
    let c = {};
    if (section?.data) {
      const q = query(
        collection(
          db,
          "wasteProfiles",
          "tI10yyei4ObyOQC9Txqd",
          "events",
          "v99YlQ1WbMfeUewLfe7V",
          "sections"
        ),
        where("section", "==", section.data),
        limit(1)
      );

      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          c = { ...doc.data(), id: doc.id };
        });
        fill(c);
      });
    }
  }, [db, section]);

  // function that verifies if value contains only numbers
  const verifyNumber = (value) => {
    var numberRex = new RegExp("^[+-]?([0-9]+.?[0-9]*|.[0-9]+)$");
    if (numberRex.test(value) || value?.length === 0) {
      return true;
    }
    return false;
  };

  const change = (event, setFunction) => {
    if (verifyNumber(event.target.value)) {
      setFunction({
        data: event.target.value,
        state: "success",
      });
    } else {
      setFunction({
        data: event.target.value,
        state: "error",
        mess: "Input must be a number",
      });
    } 
  };

  const fill = (obj) => {
    setCompany("Pernod Ricard Kenya");
    setPlastic({ data: obj.plastic, state: null });
    setMetal({ data: obj.metal, state: null });
    setPaper({ data: obj.paper, state: null });
    setGlass({ data: obj.glass, state: null });
    setOrganic({ data: obj.organic, state: null });
    setNon({ data: obj.non, state: null });
    setCloth({ data: obj.cloth, state: null });
  };

  const clear = () => {
    setCompany("Pernod Ricard Kenya");
    setSection("");
    setPlastic({ data: "", state: null });
    setMetal({ data: "", state: null });
    setPaper({ data: "", state: null });
    setGlass({ data: "", state: null });
    setOrganic({ data: "", state: null });
    setNon({ data: "", state: null });
    setCloth({ data: "", state: null });
  };

  const handleData = async (e) => {
    e.preventDefault();
    setLoading(true);
    //validate()
    let obj = {
      plastic: Number(plastic?.data !== "" ? plastic.data : 0),
      metal: Number(metal?.data !== "" ? metal.data : 0),
      paper: Number(paper?.data !== "" ? paper.data : 0),
      glass: Number(glass?.data !== "" ? glass.data : 0),
      organic: Number(organic?.data !== "" ? organic.data : 0),
      non: Number(non?.data !== "" ? non.data : 0),
      cloth: Number(cloth?.data !== "" ? cloth.data : 0),
      total:
        Number(plastic?.data !== "" ? plastic.data : 0) +
        Number(metal?.data !== "" ? metal.data : 0) +
        Number(paper?.data !== "" ? paper.data : 0) +
        Number(glass?.data !== "" ? glass.data : 0) +
        Number(organic?.data !== "" ? organic.data : 0) +
        Number(non?.data !== "" ? non.data : 0) +
        Number(cloth?.data !== "" ? cloth.data : 0),
    };

    //console.log(obj);
    updateWasteProfile(
      "tI10yyei4ObyOQC9Txqd",
      "v99YlQ1WbMfeUewLfe7V",
      section.data,
      obj
    )
      .then((res) => {
        console.log(res);
        setLoading(false);
        swal("Done!", "Update Complete!", "success");
        clear();
      })
      .catch((err) => {
        console.log(err);
        swal("Sorry!", "Error whle updating!", "error");
      });
    
  };

  return (
    <AuthGuard>
      <main className="entry__page">
        <section className="user">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <Image src="/assets/pernod.png" layout="fill" />
            </div>
          </div>
          <h1>Pernod Ricard Kenya</h1>
        </section>
        <section className="form__sec mt-6">
          <div className="grid gap-6 grid-cols-1 w-full md:w-2/3 lg:w-3/5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Company Profile</span>
              </label>
              <DropDown
                value={company}
                setFunc={setCompany}
                placeholder="Company Profile"
                list={["Pernod Ricard Kenya"]}
              />
            </div>
          </div>
          <div className="grid gap-6 grid-cols-1 w-full md:w-2/3 lg:w-3/5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Supervision Secions</span>
              </label>
              <DropDown
                value={section.data}
                setFunc={setSection}
                placeholder="Section 1"
                error={section.state === "error"}
                list={["Section 1", "Section 2", "Section 3", "Section 4"]}
              />
            </div>
          </div>
          <h1>Plastics</h1>
          <div className="grid gap-6 grid-cols-1 w-full md:w-2/3 lg:w-3/5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Plastics</span>
              </label>
              <input
                type="text"
                value={plastic.data}
                placeholder="Type here"
                onChange={(event) => change(event, setPlastic)}
                className={classNames(
                  "input input-bordered w-full focus:bg-white",
                  plastic.state === "error" ? "input-error" : "input-primary"
                )}
              />
              {plastic.state === "error" && (
                <span className="input-error-message">{plastic.mess}</span>
              )}
            </div>
          </div>
          <h1>Metal</h1>
          <div className="grid gap-6 grid-cols-1 w-full md:w-2/3 lg:w-3/5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Metal</span>
              </label>
              <input
                type="text"
                value={metal.data}
                placeholder="Type here"
                onChange={(event) => change(event, setMetal)}
                className={classNames(
                  "input input-bordered w-full focus:bg-white",
                  metal.state === "error" ? "input-error" : "input-primary"
                )}
              />
              {metal.state === "error" && (
                <span className="input-error-message">{metal.mess}</span>
              )}
            </div>
          </div>
          <h1>Paper</h1>
          <div className="grid gap-6 grid-cols-1 w-full md:w-2/3 lg:w-3/5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Paper</span>
              </label>
              <input
                type="text"
                value={paper.data}
                placeholder="Type here"
                onChange={(event) => change(event, setPaper)}
                className={classNames(
                  "input input-bordered w-full focus:bg-white",
                  paper.state === "error" ? "input-error" : "input-primary"
                )}
              />
              {paper.state === "error" && (
                <span className="input-error-message">{paper.mess}</span>
              )}
            </div>
          </div>
          <h1>Glass</h1>
          <div className="grid gap-6 grid-cols-1 w-full md:w-2/3 lg:w-3/5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Glass</span>
              </label>
              <input
                type="text"
                value={glass.data}
                placeholder="Type here"
                onChange={(event) => change(event, setGlass)}
                className={classNames(
                  "input input-bordered w-full focus:bg-white",
                  glass.state === "error" ? "input-error" : "input-primary"
                )}
              />
              {glass.state === "error" && (
                <span className="input-error-message">{glass.mess}</span>
              )}
            </div>
          </div>
          <h1>Organic</h1>
          <div className="grid gap-6 grid-cols-1 w-full md:w-2/3 lg:w-3/5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Organic</span>
              </label>
              <input
                type="text"
                value={organic.data}
                placeholder="Type here"
                onChange={(event) => change(event, setOrganic)}
                className={classNames(
                  "input input-bordered w-full focus:bg-white",
                  organic.state === "error" ? "input-error" : "input-primary"
                )}
              />
              {organic.state === "error" && (
                <span className="input-error-message">{organic.mess}</span>
              )}
            </div>
          </div>
          <h1>Cloth</h1>
          <div className="grid gap-6 grid-cols-1 w-full md:w-2/3 lg:w-3/5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Cloth</span>
              </label>
              <input
                type="text"
                value={cloth.data}
                placeholder="Type here"
                onChange={(event) => change(event, setCloth)}
                className={classNames(
                  "input input-bordered w-full focus:bg-white",
                  cloth.state === "error" ? "input-error" : "input-primary"
                )}
              />
              {cloth.state === "error" && (
                <span className="input-error-message">{cloth.mess}</span>
              )}
            </div>
          </div>
          <h1>Non Recyclable</h1>
          <div className="grid gap-6 grid-cols-1 w-full md:w-2/3 lg:w-3/5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Non Recycleable</span>
              </label>
              <input
                type="text"
                value={non.data}
                placeholder="Type here"
                onChange={(event) => change(event, setNon)}
                className={classNames(
                  "input input-bordered w-full focus:bg-white",
                  non.state === "error" ? "input-error" : "input-primary"
                )}
              />
              {non.state === "error" && (
                <span className="input-error-message">{non.mess}</span>
              )}
            </div>
          </div>
        </section>
        <div className="flex justify-center mt-12 w-full sm:2/3 max-w-lg mx-auto">
          <div
            onClick={handleData}
            className={`btn btn-lg rounded-2xl btn-primary w-full ${
              loading && "loading"
            }`}
          >
            Save
          </div>
        </div>
      </main>
    </AuthGuard>
  );
}
