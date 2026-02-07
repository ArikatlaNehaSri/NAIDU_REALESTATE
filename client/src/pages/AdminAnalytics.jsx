import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

const AdminAnalytics = () => {
  const [visits, setVisits] = useState([]);
  const [sells, setSells] = useState([]);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const unsubVisits = onSnapshot(collection(db, "visitRequests"), (snap) =>
      setVisits(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );

    const unsubSells = onSnapshot(collection(db, "sellRequests"), (snap) =>
      setSells(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );

    const unsubProps = onSnapshot(collection(db, "properties"), (snap) =>
      setProperties(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );

    return () => {
      unsubVisits();
      unsubSells();
      unsubProps();
    };
  }, []);

  /* ---------- TODAY LEADS COUNT ---------- */
  const today = new Date().toDateString();

  const todayVisits = visits.filter(
    (v) => v.createdAt?.toDate?.().toDateString() === today
  );

  const todaySells = sells.filter(
    (s) => s.createdAt?.toDate?.().toDateString() === today
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 text-white">

      <h1 className="text-3xl font-bold text-yellow-400 mb-8">
        Leads Analytics
      </h1>

      {/* ---------- CARDS ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Total Properties */}
        <div className="bg-[#111] border border-gray-700 rounded p-6 text-center">
          <p className="text-gray-400">Total Properties</p>
          <h2 className="text-3xl font-bold text-yellow-400 mt-2">
            {properties.length}
          </h2>
        </div>

        {/* Total Visit Leads */}
        <div className="bg-[#111] border border-gray-700 rounded p-6 text-center">
          <p className="text-gray-400">Visit Requests</p>
          <h2 className="text-3xl font-bold text-yellow-400 mt-2">
            {visits.length}
          </h2>
        </div>

        {/* Total Sell Leads */}
        <div className="bg-[#111] border border-gray-700 rounded p-6 text-center">
          <p className="text-gray-400">Sell Requests</p>
          <h2 className="text-3xl font-bold text-yellow-400 mt-2">
            {sells.length}
          </h2>
        </div>

        {/* Today Leads */}
        <div className="bg-[#111] border border-gray-700 rounded p-6 text-center">
          <p className="text-gray-400">Today Leads</p>
          <h2 className="text-3xl font-bold text-yellow-400 mt-2">
            {todayVisits.length + todaySells.length}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
