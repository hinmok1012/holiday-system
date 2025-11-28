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
    } catch (err) {
      alert("登入失敗：" + err.message);
    }
  };

  return (
    <div className="flex flex-col gap-2 max-w-md mx-auto p-4">
      <h2 className="text-xl font-semibold mb-2">登入</h2>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 rounded w-full"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="密碼"
        className="border p-2 rounded w-full"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button
        onClick={login}
        className="bg-blue-500 text-white py-2 rounded mt-2"
      >
        登入
      </button>
    </div>
  );
}
