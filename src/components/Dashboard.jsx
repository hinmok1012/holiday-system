import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function Dashboard() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "leaves"), snapshot => {
      setCount(snapshot.size);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div style={{ marginTop: 20 }}>
      <h3>假期統計</h3>
      <p>總申請數: {count}</p>
    </div>
  );
}
