import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function LeaveForm({ user }) {
  const [type, setType] = useState("VL");
  const [date, setDate] = useState("");

  const submitLeave = async () => {
    if (!date) return alert("請選擇日期");
    if (!user || !user.email) return alert("使用者資訊錯誤，請重新登入");

    console.log("Submitting leave:", { email: user.email, date, type });

    try {
      await addDoc(collection(db, "leaves"), {
        name: user.email,
        type,
        date,
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      setDate(""); // 清空日期
      setType("VL"); // 重置假期類型
      alert("假期申請已送出！");
      console.log("Leave request submitted successfully");
    } catch (error) {
      console.error("Firestore error:", error);
      alert("送出失敗：" + error.message);
    }
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>假期申請</h3>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <select value={type} onChange={(e) => setType(e.target.value)} style={{ marginRight: 10 }}>
        <option value="VL">VL</option>
        <option value="CL">CL</option>
        <option value="ROTA">ROTA</option>
        <option value="SL">SL</option>
        <option value="AA">AA</option>
        <option value="ASVL">ASVL</option>
        <option value="SD">SD</option>
        <option value="Course">Course</option>
        <option value="Other">Other</option>
      </select>
      <button onClick={submitLeave}>送出申請</button>
    </div>
  );
}
