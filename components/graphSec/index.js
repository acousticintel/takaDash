import Image from "next/image";
import ProgressBar from "../elements/progressBar";
import LineG from "./lineG";

export default function GraphSec() {
  return (
    <div className="dash__graphs">
      <div className="dash__graph">
        <h1>Recycled Waste Types</h1>
        <section>
          <div className="icon">
            <Image
              src={`/assets/wine.webp`}
              className="object-contain"
              layout="fill"
              alt=""
            />
          </div>
          <div className="w-full">
            <h6>Glass</h6>
            <ProgressBar color="blue" value={30} />
          </div>
        </section>
        <section>
          <div className="icon">
            <Image
              src={`/assets/soda.webp`}
              className="object-contain"
              layout="fill"
              alt=""
            />
          </div>
          <div className="w-full">
            <h6>Plastic</h6>
            <ProgressBar color="pink" value={25} />
          </div>
        </section>
        <section>
          <div className="icon">
            <Image
              src={`/assets/smartphone.png`}
              className="object-contain"
              layout="fill"
              alt=""
            />
          </div>
          <div className="w-full">
            <h6>Electronics</h6>
            <ProgressBar color="teal" value={45} />
          </div>
        </section>
      </div>
      <div className="dash__graph">
        <h1>Waste Type Weights</h1>
        <LineG />
      </div>
    </div>
  );
}
