import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";

export default function RoleManager() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), snapshot => {
      const userList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(userList);
    });
    return () => unsubscribe();
  }, []);

  const toggleRole = async (id, currentRole) => {
    const newRole = currentRole === "employee" ? "manager" : "employee";
    try {
      await updateDoc(doc(db, "users", id), { role: newRole });
    } catch (error) {
      alert("修改失敗：" + error.message);
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3>角色管理（僅主管可修改）</h3>
      {users.map(user => (
        <div key={user.id} style={{ marginBottom: 10 }}>
          {user.email} | {user.role}
          <button onClick={() => toggleRole(user.id, user.role)} style={{ marginLeft: 10 }}>
            切換角色
          </button>
        </div>
      ))}
    </div>
  );
}
