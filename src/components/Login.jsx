import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password.trim());
      setUser(userCredential.user);
    } catch (error) {
      alert("登入失敗: " + error.message);
    }
  };

  return (
    <div>
      <h2>登入</h2>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="密碼" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>登入</button>
    </div>
  );
}
