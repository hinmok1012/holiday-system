import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function LeaveList({ user }) {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "leaves"), where("userEmail", "==", user.email));
    const unsubscribe = onSnapshot(q, snapshot => {
      setLeaves(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [user.email]);

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">我的假期</h3>
      <div className="flex flex-col gap-2">
        {leaves.length === 0 && <p>尚無假期申請</p>}
        {leaves.map(l => (
          <div key={l.id} className="flex justify-between items-center border p-2 rounded">
            <span>{l.date} | {l.type} | {l.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
