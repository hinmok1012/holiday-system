import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";

export default function LeaveList({ user }) {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    if (!user || !user.email) return;

    // 建立即時監聽 query
    const q = query(
      collection(db, "leaves"),
      where("name", "==", user.email),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const leaveData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLeaves(leaveData);
    }, (error) => {
      console.error("Firestore onSnapshot error:", error);
    });

    // 組件卸載時取消監聽
    return () => unsubscribe();
  }, [user]);

  return (
    <div style={{ marginTop: 20 }}>
      <h3>我的假期申請</h3>
      {leaves.length === 0 ? (
        <p>尚無申請紀錄</p>
      ) : (
        <table border="1" cellPadding="5" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>日期</th>
              <th>假期類型</th>
              <th>狀態</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map(l => (
              <tr key={l.id}>
                <td>{l.date}</td>
                <td>{l.type}</td>
                <td>{l.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
