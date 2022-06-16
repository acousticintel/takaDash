import Image from "next/image";
import Link from "next/link";

export default function Categories() {
  return (
    <div className="my-6">
      <h1 className="text-2xl font-bold">Categories</h1>
      <p className="text-gray-500 font-medium my-4">
        Click on the sections below to see a breakdown of the waste collected by
        Category
      </p>
      <div className="grid gap-6 grid-cols-2 md:grid-cols-3">
        <Link href="/breakdown/glass">
          <div className="bg-white shadow-lg rounded-3xl overflow-hidden flex flex-col items-center">
            <div className="bg-green-200 w-full h-full">
              <div className="relative h-40 w-40 mx-auto">
                <Image
                  src={`/assets/glass-w.png`}
                  className="object-contain"
                  layout="fill"
                  alt=""
                />
              </div>
            </div>
            <div className="font-semibold text-xl p-6 text-green-800">
              Glass
            </div>
          </div>
        </Link>
        <Link href="breakdown/plastic">
          <div className="bg-white shadow-lg rounded-3xl overflow-hidden flex flex-col items-center">
            <div className="bg-orange-200 w-full h-full">
              <div className="relative h-40 w-40 mx-auto">
                <Image
                  src={`/assets/plastic-w.png`}
                  className="object-contain"
                  layout="fill"
                  alt=""
                />
              </div>
            </div>
            <div className="font-semibold text-xl p-6 text-orange-800">
              Plastic
            </div>
          </div>
        </Link>
        <Link href="breakdown/metal">
          <div className="bg-white shadow-lg rounded-3xl overflow-hidden flex flex-col items-center">
            <div className="bg-yellow-200 w-full h-full">
              <div className="relative h-40 w-40 mx-auto">
                <Image
                  src={`/assets/metal-w.png`}
                  className="object-contain"
                  layout="fill"
                  alt=""
                />
              </div>
            </div>
            <div className="font-semibold text-xl p-6 text-yellow-800">
              Metal
            </div>
          </div>
        </Link>
        <Link href="breakdown/paper">
          <div className="bg-white shadow-lg rounded-3xl overflow-hidden flex flex-col items-center">
            <div className="bg-blue-200 w-full h-full">
              <div className="relative h-40 w-40 mx-auto">
                <Image
                  src={`/assets/paper-w.png`}
                  className="object-contain"
                  layout="fill"
                  alt=""
                />
              </div>
            </div>
            <div className="font-semibold text-xl p-6 text-blue-800">Paper</div>
          </div>
        </Link>
        <Link href="breakdown/electronics">
          <div className="bg-white shadow-lg rounded-3xl overflow-hidden flex flex-col items-center">
            <div className="bg-purple-200 w-full h-full">
              <div className="relative h-40 w-40 mx-auto">
                <Image
                  src={`/assets/elec-w.png`}
                  className="object-contain"
                  layout="fill"
                  alt=""
                />
              </div>
            </div>
            <div className="font-semibold text-xl p-6 text-purple-800">
              Electronics
            </div>
          </div>
        </Link>
        <Link href="breakdown/nonrecycle">
          <div className="bg-white shadow-lg rounded-3xl overflow-hidden flex flex-col items-center">
            <div className="bg-slate-200 w-full h-full">
              <div className="relative h-40 w-40 mx-auto">
                <Image
                  src={`/assets/org-w.png`}
                  className="object-contain"
                  layout="fill"
                  alt=""
                />
              </div>
            </div>
            <div className="font-semibold text-xl p-6 text-slate-800">
              Organic
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
