import { useState } from "react";
import { auth } from "./firebase";
import Login from "./components/Login";
import LeaveForm from "./components/LeaveForm";
import LeaveList from "./components/LeaveList";
import ApproveList from "./components/ApproveList";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("employee"); // 員工預設

  // 登入後自動判斷角色
  const handleLogin = (user) => {
    setUser(user);

    // 這裡判斷誰是主管，改成你的主管 email
    const managerEmails = ["manager@example.com"];
    if (managerEmails.includes(user.email)) {
      setRole("manager");
    } else {
      setRole("employee");
    }
  };

  if (!user) return <Login setUser={handleLogin} />;

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>假期系統</h1>
      <p>登入者: {user.email}</p>

      {role === "employee" && (
        <>
          <LeaveForm user={user} />
          <LeaveList user={user} />
        </>
      )}

      {role === "manager" && <ApproveList />}

      <Dashboard />

      <button onClick={() => auth.signOut().then(() => setUser(null))}>
        登出
      </button>
    </div>
  );
}
