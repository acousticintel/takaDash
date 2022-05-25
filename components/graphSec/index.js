import Image from "next/image";
import Link from "next/link";
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
              src={`/assets/glass-w.png`}
              className="object-contain"
              layout="fill"
              alt=""
            />
          </div>
          <div className="w-full">
            <div className="flex items-end justify-between">
              <h5>Glass</h5>
              <h6>5.74% - 111kg</h6>
            </div>
            <ProgressBar color="teal" value={5} />
          </div>
        </section>
        <section>
          <div className="icon">
            <Image
              src={`/assets/plastic-w.png`}
              className="object-contain"
              layout="fill"
              alt=""
            />
          </div>
          <div className="w-full">
            <div className="flex items-end justify-between">
              <h5>Plastic</h5>
              <h6>20.1% - 390kg</h6>
            </div>
            <ProgressBar color="orange" value={20} />
          </div>
        </section>
        <section>
          <div className="icon">
            <Image
              src={`/assets/metal-w.png`}
              className="object-contain"
              layout="fill"
              alt=""
            />
          </div>
          <div className="w-full">
            <div className="flex items-end justify-between">
              <h5>Metal</h5>
              <h6>12.9% - 250kg</h6>
            </div>
            <ProgressBar color="yellow" value={12} />
          </div>
        </section>
        <section>
          <div className="icon">
            <Image
              src={`/assets/paper-w.png`}
              className="object-contain"
              layout="fill"
              alt=""
            />
          </div>
          <div className="w-full">
            <div className="flex items-end justify-between">
              <h5>Paper </h5>
              <h6>13.4% - 260kg</h6>
            </div>
            <ProgressBar color="blue" value={13} />
          </div>
        </section>
        <section>
          <div className="icon">
            <Image
              src={`/assets/elec-w.png`}
              className="object-contain"
              layout="fill"
              alt=""
            />
          </div>
          <div className="w-full">
            <div className="flex items-end justify-between">
              <h5>Electronics </h5>
              <h6>2% - 28kg</h6>
            </div>
            <ProgressBar color="red" value={2} />
          </div>
        </section>
        <section>
          <div className="icon">
            <Image
              src={`/assets/org-w.png`}
              className="object-contain"
              layout="fill"
              alt=""
            />
          </div>
          <div className="w-full">
            <div className="flex items-end justify-between">
              <h5>Organic</h5>
              <h6>9.57% - 185kg</h6>
            </div>
            <ProgressBar color="slate" value={10} />
          </div>
        </section>
        <section>
          <div className="icon">
            <Image
              src={`/assets/non-w.png`}
              className="object-contain"
              layout="fill"
              alt=""
            />
          </div>
          <div className="w-full">
            <div className="flex items-end justify-between">
              <h5>Non-Recyclables </h5>
              <h6>38.3% - 743kg</h6>
            </div>
            <ProgressBar color="red" value={38} />
          </div>
        </section>
      </div>
      <div className="flex justify-end">
        <Link href="/breakdown">
          <button className="btn btn-sm btn-ghost">See More</button>
        </Link>
      </div>
      <div className="dash__linegraph">
        <LineG />
      </div>
      <div className="flex justify-end">
        <Link href="/breakdown">
          <button className="btn btn-sm btn-ghost">See More</button>
        </Link>
      </div>
    </div>
  );
}
