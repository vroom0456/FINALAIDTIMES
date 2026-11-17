import { useState, useCallback } from "react";
import { useAdminStore } from "../store/useAdminStore";
import toast from "react-hot-toast";

export default function AdminGate() {
  const login   = useAdminStore((s) => s.login);
  const loading = useAdminStore((s) => s.loading);
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = useCallback(async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) return;
    const result = await login(email.trim(), password);
    if (!result.success) { toast.error(result.message || "Login failed."); return; }
    document.getElementById("adminGate")?.classList.remove("open");
    toast.success("Admin access granted.");
  }, [email, password, login]);

  const closeGate = useCallback(() => {
    document.getElementById("adminGate")?.classList.remove("open");
  }, []);

  return (
    <div
      id="adminGate"
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Admin login"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeGate();
      }}
    >
      <div className="modal-box" style={{ maxWidth: 420 }}>
        <button
          type="button"
          className="modal-close"
          onClick={closeGate}
          aria-label="Close admin login"
        >
          <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin} noValidate>
          <div className="form-row">
            <label className="form-label" htmlFor="admin_email">Admin Email</label>
            <input id="admin_email" className="form-input" type="email" placeholder="admin@example.com" value={email} autoComplete="email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="admin_password">Password</label>
            <input id="admin_password" type="password" className="form-input" placeholder="••••••" value={password} autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: 8 }} disabled={loading || !email || !password} aria-busy={loading}>
            {loading ? "Signing in…" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}



