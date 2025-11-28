import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function Dashboard() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "leaves"), snapshot => {
      setLeaves(snapshot.docs.map(doc => doc.data()));
    });
    return () => unsubscribe();
  }, []);

  const total = leaves.length;
  const approved = leaves.filter(l => l.status === "approved").length;
  const pending = leaves.filter(l => l.status === "pending").length;
  const rejected = leaves.filter(l => l.status === "rejected").length;

  return (
    <div className="mb-4 border p-2 rounded">
      <h3 className="text-lg font-semibold mb-2">假期統計</h3>
      <div className="flex justify-between text-sm sm:text-base flex-wrap gap-2">
        <span>總申請: {total}</span>
        <span>已批准: {approved}</span>
        <span>待審批: {pending}</span>
        <span>已拒絕: {rejected}</span>
      </div>
    </div>
  );
}
