import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
//custom func
import { AuthGuard } from "../../components/elements/authGuard";
import DropDown from "../../components/elements/dropDown";
import { useData } from "../../context/dataContext";
//custom
const FaEdit = dynamic(async () => (await import("react-icons/fa")).FaEdit);
const BiRightArrow = dynamic(
  async () => (await import("react-icons/bi")).BiRightArrow
);
const HiInformationCircle = dynamic(
  async () => (await import("react-icons/hi")).HiInformationCircle
);
const MdHealthAndSafety = dynamic(
  async () => (await import("react-icons/md")).MdHealthAndSafety
);
const MdClass = dynamic(async () => (await import("react-icons/md")).MdClass);

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function EntryPage() {
  const { updateWasteProfile } = useData();

  const [loading, setLoading] = useState(false);

  const [company, setCompany] = useState("Pernod Ricard Kenya");
  const [section, setSection] = useState("");
  //plastics
  const [pet, setPet] = useState({ data: "", state: null });
  const [lpde, setLpde] = useState({ data: "", state: null });
  const [hpde, setHpde] = useState({ data: "", state: null });
  const [pp, setPp] = useState({ data: "", state: null });
  const [ps, setPs] = useState({ data: "", state: null });
  //metal
  const [foil, setFoil] = useState({ data: "", state: null });
  const [cans, setCans] = useState({ data: "", state: null });
  //paper
  const [tetra, setTetra] = useState({ data: "", state: null });
  const [cartons, setCartons] = useState({ data: "", state: null });
  //single
  const [glass, setGlass] = useState({ data: "", state: null });
  const [organic, setOrganic] = useState({ data: "", state: null });
  const [non, setNon] = useState({ data: "", state: null });

  useEffect(() => {
    //console.log("value", section);
  }, [section]);

  // function that verifies if value contains only numbers
  const verifyNumber = (value) => {
    var numberRex = new RegExp("^[0-9]+$");
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

  const isValidated = () => {
    if (
      section.state === "success" &&
      pet.state === "success" &&
      lpde.state === "success" &&
      hpde.state === "success" &&
      pp.state === "success" &&
      ps.state === "success" &&
      foil.state === "success" &&
      cans.state === "success" &&
      tetra.state === "success" &&
      cartons.state === "success" &&
      glass.state === "success" &&
      organic.state === "success" &&
      non.state === "success"
    ) {
      return true;
    } else {
      if (section.state !== "success") {
        setSection({ ...section, state: "error" });
      }
      if (pet.state !== "success") {
        setPet({ ...pet, state: "error" });
      }
      if (lpde.state !== "success") {
        setLpde({ ...lpde, state: "error" });
      }
      if (hpde.state !== "success") {
        setHpde({ ...hpde, state: "error" });
      }
      if (pp.state !== "success") {
        setPp({ ...pp, state: "error" });
      }
      if (ps.state !== "success") {
        setPs({ ...ps, state: "error" });
      }
      if (foil.state !== "success") {
        setFoil({ ...foil, state: "error" });
      }
      if (cans.state !== "success") {
        setCans({ ...cans, state: "error" });
      }
      if (tetra.state !== "success") {
        setTetra({ ...tetra, state: "error" });
      }
      if (cartons.state !== "success") {
        setCartons({ ...cartons, state: "error" });
      }
      if (glass.state !== "success") {
        setGlass({ ...glass, state: "error" });
      }
      if (organic.state !== "success") {
        setOrganic({ ...organic, state: "error" });
      }
      if (non.state !== "success") {
        setNon({ ...non, state: "error" });
      }
      return false;
    }
  };

  const clear = () => {
    setCompany("Pernod Ricard Kenya");
    setSection("");
    setPet({ data: "", state: null });
    setLpde({ data: "", state: null });
    setHpde({ data: "", state: null });
    setPp({ data: "", state: null });
    setPs({ data: "", state: null });
    setFoil({ data: "", state: null });
    setCans({ data: "", state: null });
    setTetra({ data: "", state: null });
    setCartons({ data: "", state: null });
    setGlass({ data: "", state: null });
    setOrganic({ data: "", state: null });
    setNon({ data: "", state: null });
  }

  const handleData = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isValidated()) {
      let obj = {
        pet: Number(pet.data.trim()),
        lpde: Number(lpde.data.trim()),
        hpde: Number(hpde.data.trim()),
        pp: Number(pp.data.trim()),
        ps: Number(ps.data.trim()),
        foil: Number(foil.data.trim()),
        cans: Number(cans.data.trim()),
        tetra: Number(tetra.data.trim()),
        cartons: Number(cartons.data.trim()),
        glass: Number(glass.data.trim()),
        organic: Number(organic.data.trim()),
        non: Number(non.data.trim()),
        total:
          Number(pet.data.trim()) +
          Number(lpde.data.trim()) +
          Number(hpde.data.trim()) +
          Number(pp.data.trim()) +
          Number(ps.data.trim()) +
          Number(foil.data.trim()) +
          Number(cans.data.trim()) +
          Number(tetra.data.trim()) +
          Number(cartons.data.trim()) +
          Number(glass.data.trim()) +
          Number(organic.data.trim()) +
          Number(non.data.trim()),
      };

      updateWasteProfile(
        "tI10yyei4ObyOQC9Txqd",
        "PKhGF843RE4eyHGTldrn",
        section.data,
        obj
      )
        .then((res) => {
          console.log(res);
          setLoading(false);
          clear()
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <AuthGuard>
      <main className="entry__page">
        <section className="user">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://api.lorem.space/image/face?hash=3174" />
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
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 ">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">PET</span>
              </label>
              <input
                type="text"
                value={pet.data}
                placeholder="Type here"
                onChange={(event) => change(event, setPet)}
                className={classNames(
                  "input input-bordered w-full focus:bg-white",
                  pet.state === "error" ? "input-error" : "input-primary"
                )}
              />
              {pet.state === "error" && (
                <span className="input-error-message">{pet.mess}</span>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">LDPE</span>
              </label>
              <input
                type="text"
                value={lpde.data}
                placeholder="Type here"
                onChange={(event) => change(event, setLpde)}
                className={classNames(
                  "input input-bordered w-full focus:bg-white",
                  lpde.state === "error" ? "input-error" : "input-primary"
                )}
              />
              {lpde.state === "error" && (
                <span className="input-error-message">{lpde.mess}</span>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">HDPE</span>
              </label>
              <input
                type="text"
                value={hpde.data}
                placeholder="Type here"
                onChange={(event) => change(event, setHpde)}
                className={classNames(
                  "input input-bordered w-full focus:bg-white",
                  hpde.state === "error" ? "input-error" : "input-primary"
                )}
              />
              {hpde.state === "error" && (
                <span className="input-error-message">{hpde.mess}</span>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">PP</span>
              </label>
              <input
                type="text"
                value={pp.data}
                placeholder="Type here"
                onChange={(event) => change(event, setPp)}
                className={classNames(
                  "input input-bordered w-full focus:bg-white",
                  pp.state === "error" ? "input-error" : "input-primary"
                )}
              />
              {pp.state === "error" && (
                <span className="input-error-message">{pp.mess}</span>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">PS</span>
              </label>
              <input
                type="text"
                value={ps.data}
                placeholder="Type here"
                onChange={(event) => change(event, setPs)}
                className={classNames(
                  "input input-bordered w-full focus:bg-white",
                  ps.state === "error" ? "input-error" : "input-primary"
                )}
              />
              {ps.state === "error" && (
                <span className="input-error-message">{ps.mess}</span>
              )}
            </div>
          </div>
          <h1>Metal</h1>
          <div className="grid gap-6 grid-cols-2 ">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Foil</span>
              </label>
              <input
                type="text"
                value={foil.data}
                placeholder="Type here"
                onChange={(event) => change(event, setFoil)}
                className={classNames(
                  "input input-bordered w-full focus:bg-white",
                  foil.state === "error" ? "input-error" : "input-primary"
                )}
              />
              {foil.state === "error" && (
                <span className="input-error-message">{foil.mess}</span>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Cans</span>
              </label>
              <input
                type="text"
                value={cans.data}
                placeholder="Type here"
                onChange={(event) => change(event, setCans)}
                className={classNames(
                  "input input-bordered w-full focus:bg-white",
                  cans.state === "error" ? "input-error" : "input-primary"
                )}
              />
              {cans.state === "error" && (
                <span className="input-error-message">{cans.mess}</span>
              )}
            </div>
          </div>
          <h1>Paper</h1>
          <div className="grid gap-6 grid-cols-2 ">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Tetra Pack</span>
              </label>
              <input
                type="text"
                value={tetra.data}
                placeholder="Type here"
                onChange={(event) => change(event, setTetra)}
                className={classNames(
                  "input input-bordered w-full focus:bg-white",
                  tetra.state === "error" ? "input-error" : "input-primary"
                )}
              />
              {tetra.state === "error" && (
                <span className="input-error-message">{tetra.mess}</span>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Cartons</span>
              </label>
              <input
                type="text"
                value={cartons.data}
                placeholder="Type here"
                onChange={(event) => change(event, setCartons)}
                className={classNames(
                  "input input-bordered w-full focus:bg-white",
                  cartons.state === "error" ? "input-error" : "input-primary"
                )}
              />
              {cartons.state === "error" && (
                <span className="input-error-message">{cartons.mess}</span>
              )}
            </div>
          </div>
          <h1>Glass</h1>
          <div className="grid gap-6 grid-cols-1 ">
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
          <div className="grid gap-6 grid-cols-1 ">
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
          <h1>Non Recyclable</h1>
          <div className="grid gap-6 grid-cols-1 ">
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
