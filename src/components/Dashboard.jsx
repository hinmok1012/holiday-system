import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function Dashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "leaves"), snapshot => {
      const count = {};
      snapshot.docs.forEach(doc => {
        const type = doc.data().type;
        count[type] = (count[type] || 0) + 1;
      });
      setStats(count);
    });
    return unsubscribe;
  }, []);

  return (
    <div>
      <h3>假期統計</h3>
      {Object.entries(stats).map(([type, num]) => (
        <div key={type}>
          {type}: {num}
        </div>
      ))}
    </div>
  );
}
