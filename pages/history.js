import React from "react";
import { AuthGuard } from "../components/elements/authGuard";
import GraphSec from "../components/graphSec";

export default function History() {
  return (
    <AuthGuard>
      <main className="history__page">
        <h1>Collections History</h1>
        <div className="bg-white rounded-3xl p-6 mt-10">
          <div>
            <div className="flex justify-between font-bold px-8">
              <span className="w-2/5">Date</span>
              <span className="w-2/5 text-center">Collected</span>
              <span className="w-1/5 text-right">Recycled</span>
            </div>
            <div className="text-gray-500">
              <div className="collapse">
                <input type="checkbox" />
                <div className="collapse-title text-xl flex justify-between">
                  <span className="w-2/5">Friday 3rd May 2022</span>
                  <span className="w-2/5 text-center">56 Kg</span>
                  <span className="w-1/5 text-right">70%</span>
                </div>
                <div className="collapse-content">
                  <GraphSec />
                </div>
              </div>
            </div>
            <div className="text-gray-500">
              <div className="collapse">
                <input type="checkbox" />
                <div className="collapse-title text-xl flex justify-between">
                  <span className="w-2/5">Friday 3rd April 2022</span>
                  <span className="w-2/5 text-center">42 Kg</span>
                  <span className="w-1/5 text-right">70%</span>
                </div>
                <div className="collapse-content">
                  <GraphSec />
                </div>
              </div>
            </div>
            <div className="text-gray-500">
              <div className="collapse">
                <input type="checkbox" />
                <div className="collapse-title text-xl flex justify-between">
                  <span className="w-2/5">Friday 3rd March 2022</span>
                  <span className="w-2/5 text-center">54 Kg</span>
                  <span className="w-1/5 text-right">70%</span>
                </div>
                <div className="collapse-content">
                  <GraphSec />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </AuthGuard>
  );
}
