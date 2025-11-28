import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";

export default function ApproveList() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "leaves"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, snapshot => {
      setLeaves(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const approve = async (id) => {
    await updateDoc(doc(db, "leaves", id), { status: "Approved" });
  };

  const reject = async (id) => {
    await updateDoc(doc(db, "leaves", id), { status: "Rejected" });
  };

  return (
    <div>
      <h3>主管審批</h3>
      {leaves.map(l => (
        <div key={l.id} style={{ marginBottom: 10 }}>
          {l.name} | {l.date} | {l.type} | {l.status}
          {l.status === "Pending" && (
            <>
              <button onClick={() => approve(l.id)}>通過</button>
              <button onClick={() => reject(l.id)}>拒絕</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
