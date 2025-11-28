import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function LeaveForm({ user }) {
  const [type, setType] = useState("VL");
  const [date, setDate] = useState("");

  const submitLeave = async () => {
    if (!date) return alert("請選擇日期");
    await addDoc(collection(db, "leaves"), {
      name: user.email,
      type,
      date,
      status: "Pending",
      createdAt: serverTimestamp()
    });
    setDate("");
    alert("申請送出");
  };

  return (
    <div>
      <h3>假期申請</h3>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <select value={type} onChange={e => setType(e.target.value)}>
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
