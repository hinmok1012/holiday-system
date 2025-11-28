import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, onSnapshot, doc, updateDoc } from "firebase/firestore";

export default function ApproveList() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "leaves"), where("status", "==", "pending"));
    const unsubscribe = onSnapshot(q, snapshot => {
      setLeaves(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const approve = async (id) => {
    await updateDoc(doc(db, "leaves", id), { status: "approved" });
  };

  const reject = async (id) => {
    await updateDoc(doc(db, "leaves", id), { status: "rejected" });
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">待審批假期</h3>
      <div className="flex flex-col gap-2">
        {leaves.length === 0 && <p>目前沒有待審批假期</p>}
        {leaves.map(l => (
          <div key={l.id} className="flex justify-between items-center border p-2 rounded flex-wrap">
            <span className="w-full sm:w-auto">{l.userEmail} | {l.date} | {l.type}</span>
            <div className="flex gap-2 mt-2 sm:mt-0">
              <button onClick={() => approve(l.id)} className="bg-green-500 text-white py-1 px-2 rounded">批准</button>
              <button onClick={() => reject(l.id)} className="bg-red-500 text-white py-1 px-2 rounded">拒絕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
