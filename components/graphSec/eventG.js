import Image from "next/image";
import ProgressBar from "../elements/progressBar";

export default function EventG({ total }) {
  const getPercentage = (a, b) => {
    return Number(Math.round((a / b) * 100 + "e2") + "e-2")
      ? Number(Math.round((a / b) * 100 + "e2") + "e-2")
      : 0;
  };

  const getRoundInt = (a, b) => {
    return Number(Math.round((a / b) * 100 + "e0") + "e-0")
      ? Number(Math.round((a / b) * 100 + "e0") + "e-0")
      : 0;
  };

  console.log(total);

  return (
    <div className="dash__graphs event">
      <div className="dash__graph">
        <h1>Collected Waste Types</h1>
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
              <h5 className="font-medium">Glass</h5>
              <h6 className="font-medium">
                {getPercentage(total.glass, total.total)}% - {total?.glass}kg
              </h6>
            </div>
            <ProgressBar
              color="teal"
              value={getRoundInt(total.glass, total.total)}
            />
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
            <div tabIndex="0" className="collapse">
              <div className="collapse-title p-0 pr-2">
                <div className="w-full">
                  <div className="flex items-end justify-between">
                    <h5 className="font-medium">Plastic</h5>
                    <h6 className="font-medium">
                      {getPercentage(total.plastic, total.total)}% - {total.plastic}
                      kg
                    </h6>
                  </div>
                  <ProgressBar
                    color="orange"
                    value={getRoundInt(total.plastic, total.total)}
                  />
                </div>
              </div>
              <div className="collapse-content p-0 pl-4">
                <div>
                  <div className="flex items-end justify-between">
                    <h5>PET</h5>
                    <h6>
                      {getPercentage(total.pet, total.total)}% - {total?.pet}kg
                    </h6>
                  </div>
                  <ProgressBar
                    color="orange"
                    value={getRoundInt(total.pet, total.total)}
                  />
                </div>
                <div>
                  <div className="flex items-end justify-between">
                    <h5>LPDE</h5>
                    <h6>
                      {getPercentage(total.lpde, total.total)}% - {total?.lpde}
                      kg
                    </h6>
                  </div>
                  <ProgressBar
                    color="orange"
                    value={getRoundInt(total.lpde, total.total)}
                  />
                </div>
                <div>
                  <div className="flex items-end justify-between">
                    <h5>HDPE</h5>
                    <h6>
                      {getPercentage(total.hpde, total.total)}% - {total?.hpde}
                      kg
                    </h6>
                  </div>
                  <ProgressBar
                    color="orange"
                    value={getRoundInt(total.hpde, total.total)}
                  />
                </div>
                <div>
                  <div className="flex items-end justify-between">
                    <h5>PP</h5>
                    <h6>
                      {getPercentage(total.pp, total.total)}% - {total?.pp}kg
                    </h6>
                  </div>
                  <ProgressBar
                    color="orange"
                    value={getRoundInt(total.pp, total.total)}
                  />
                </div>
                <div>
                  <div className="flex items-end justify-between">
                    <h5>PS</h5>
                    <h6>
                      {getPercentage(total.ps, total.total)}% - {total?.ps}kg
                    </h6>
                  </div>
                  <ProgressBar
                    color="orange"
                    value={getRoundInt(total.ps, total.total)}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
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
              <h5 className="font-medium">Cloth</h5>
              <h6 className="font-medium">
                {getPercentage(total.cloth, total.total)}% - {total?.cloth}kg
              </h6>
            </div>
            <ProgressBar
              color="teal"
              value={getRoundInt(total.cloth, total.total)}
            />
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
            <div tabIndex="0" className="collapse">
              <div className="collapse-title p-0 pr-2">
                <div className="w-full">
                  <div className="flex items-end justify-between">
                    <h5 className="font-medium">Metal</h5>
                    <h6 className="font-medium">
                      {" "}
                      {getPercentage(total.metal, total.total)}% -{" "}
                      {total.metal}
                      kg
                    </h6>
                  </div>
                  <ProgressBar
                    color="yellow"
                    value={getRoundInt(total.metal, total.total)}
                  />
                </div>
              </div>
              <div className="collapse-content p-0 pl-4">
                <div>
                  <div className="flex items-end justify-between">
                    <h5>Aluminium Foil</h5>
                    <h6>
                      {getPercentage(total.foil, total.total)}% - {total?.foil}
                      kg
                    </h6>
                  </div>
                  <ProgressBar
                    color="yellow"
                    value={getRoundInt(total.foil, total.total)}
                  />
                </div>
                <div>
                  <div className="flex items-end justify-between">
                    <h5>Metal Cans</h5>
                    <h6>
                      {getPercentage(total.cans, total.total)}% - {total?.cans}
                      kg
                    </h6>
                  </div>
                  <ProgressBar
                    color="yellow"
                    value={getRoundInt(total.cans, total.total)}
                  />
                </div>
              </div>
            </div>
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
            <div tabIndex="0" className="collapse">
              <div className="collapse-title p-0 pr-2">
                <div className="w-full">
                  <div className="flex items-end justify-between">
                    <h5 className="font-medium">Paper</h5>
                    <h6 className="font-medium">
                      {" "}
                      {getPercentage(total.paper, total.total)}%
                      - {total.paper}
                      kg
                    </h6>
                  </div>
                  <ProgressBar
                    color="blue"
                    value={getRoundInt(
                      total.paper,
                      total.total
                    )}
                  />
                </div>
              </div>
              <div className="collapse-content p-0 pl-4">
                <div>
                  <div className="flex items-end justify-between">
                    <h5>Tetra Pack</h5>
                    <h6>
                      {getPercentage(total.tetra, total.total)}% -{" "}
                      {total?.tetra}kg
                    </h6>
                  </div>
                  <ProgressBar
                    color="blue"
                    value={getRoundInt(total.tetra, total.total)}
                  />
                </div>
                <div>
                  <div className="flex items-end justify-between">
                    <h5>Carton</h5>
                    <h6>
                      {getPercentage(total.cartons, total.total)}% -{" "}
                      {total?.cartons}kg
                    </h6>
                  </div>
                  <ProgressBar
                    color="blue"
                    value={getRoundInt(total.cartons, total.total)}
                  />
                </div>
              </div>
            </div>
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
              <h5 className="font-medium">Organic</h5>
              <h6 className="font-medium">
                {getPercentage(total.organic, total.total)}% - {total?.organic}
                kg
              </h6>
            </div>
            <ProgressBar
              color="slate"
              value={getRoundInt(total.organic, total.total)}
            />
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
              <h5 className="font-medium">Non-Recyclables </h5>
              <h6 className="font-medium">
                {getPercentage(total.non, total.total)}% - {total?.non}kg
              </h6>
            </div>
            <ProgressBar
              color="red"
              value={getRoundInt(total.non, total.total)}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
