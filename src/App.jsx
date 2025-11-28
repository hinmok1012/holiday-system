import { useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Login from "./components/Login";
import LeaveForm from "./components/LeaveForm";
import LeaveList from "./components/LeaveList";
import ApproveList from "./components/ApproveList";
import Dashboard from "./components/Dashboard";
import RoleManager from "./components/RoleManager";

export default function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("employee");

  const handleLogin = async (user) => {
    setUser(user);

    const userRef = doc(db, "users", user.email);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, { email: user.email, role: "employee" });
      setRole("employee");
    } else {
      setRole(userSnap.data().role);
    }
  };

  if (!user) return <Login setUser={handleLogin} />;

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2 text-center">假期系統</h1>
      <p className="mb-4 text-center">登入者: {user.email} | 角色: {role}</p>

      {role === "employee" && (
        <>
          <LeaveForm user={user} />
          <LeaveList user={user} />
        </>
      )}

      {role === "manager" && (
        <>
          <Dashboard />
          <ApproveList />
          <RoleManager />
        </>
      )}

      <button
        onClick={() => auth.signOut().then(() => setUser(null))}
        className="mt-4 w-full bg-red-500 text-white py-2 rounded"
      >
        登出
      </button>
    </div>
  );
}
