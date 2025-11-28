import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, onSnapshot, updateDoc, doc, orderBy } from "firebase/firestore";

export default function ApproveList() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "leaves"), where("status", "==", "Pending"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, snapshot => {
      setLeaves(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  const approve = async (id) => {
    await updateDoc(doc(db, "leaves", id), { status: "Approved" });
  };

  const reject = async (id) => {
    await updateDoc(doc(db, "leaves", id), { status: "Rejected" });
  };

  return (
    <div>
      <h3>待審批申請</h3>
      {leaves.map(l => (
        <div key={l.id}>
          {l.name} - {l.date} - {l.type} - {l.status}
          <button onClick={() => approve(l.id)}>Approve</button>
          <button onClick={() => reject(l.id)}>Reject</button>
        </div>
      ))}
    </div>
  );
}
