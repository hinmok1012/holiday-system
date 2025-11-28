import { useState } from "react";

export default function App() {
  const [requests, setRequests] = useState([]);
  const [type, setType] = useState("VL");
  const [name, setName] = useState("");

  function submitRequest() {
    if (!name) return alert("請輸入員工名稱");
    setRequests([...requests, { name, type }]);
    setName("");
  }

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>假期申請系統</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="員工名稱"
          value={name}
          onChange={(e) => setName(e.target.value)}
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

        <button onClick={submitRequest}>送出申請</button>
      </div>

      <h2>申請列表</h2>
      {requests.length === 0 && <p>目前沒有申請</p>}
      {requests.map((r, i) => (
        <div key={i} style={{ border: "1px solid #ddd", padding: 8, margin: 4 }}>
          <strong>{r.name}</strong> — {r.type}
        </div>
      ))}
    </div>
  );
}
