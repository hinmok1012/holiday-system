import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";

export default function LeaveList({ user }) {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "leaves"),
      where("name", "==", user.email),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, snapshot => {
      setLeaves(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, [user]);

  return (
    <div>
      <h3>我的假期申請</h3>
      {leaves.map(l => (
        <div key={l.id}>
          {l.date} - {l.type} - {l.status}
        </div>
      ))}
    </div>
  );
}
