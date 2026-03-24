import { Alert, Button, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const defaults = {
  citizen: { label: "Citizen Demo", form: { email: "citizen@govqueue.com", password: "Citizen@123" } },
  admin: { label: "Admin Demo", form: { email: "admin@govqueue.com", password: "Admin@123" } },
  staffRevenue: { label: "Staff - Revenue", form: { email: "staff@govqueue.com", password: "Staff@123" } },
  staffMeeSeva: { label: "Staff - MeeSeva", form: { email: "staff.mee@govqueue.com", password: "Staff@123" } },
  staffMunicipal: { label: "Staff - Municipal", form: { email: "staff.municipal@govqueue.com", password: "Staff@123" } },
  staffHealth: { label: "Staff - Health", form: { email: "staff.health@govqueue.com", password: "Staff@123" } }
};

export default function LoginPage() {
  const [preset, setPreset] = useState("citizen");
  const [form, setForm] = useState(defaults.citizen.form);
  const [error, setError] = useState("");
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(form);
      navigate(user.role === "ROLE_ADMIN" ? "/admin" : user.role === "ROLE_STAFF" ? "/staff" : "/citizen");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Paper className="surface-card mx-auto max-w-xl rounded-[32px] p-8">
      <Typography variant="h4" fontWeight={700} className="mb-6">Portal Login</Typography>
      {error ? <Alert severity="error" className="mb-4">{error}</Alert> : null}
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <TextField
          select
          label="Quick account preset"
          value={preset}
          onChange={(e) => {
            const nextPreset = e.target.value;
            setPreset(nextPreset);
            setForm(defaults[nextPreset].form);
          }}
        >
          {Object.entries(defaults).map(([value, presetOption]) => (
            <MenuItem key={value} value={value}>{presetOption.label}</MenuItem>
          ))}
        </TextField>
        <TextField label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <TextField label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <Button type="submit" variant="contained" disabled={loading}>Login</Button>
      </form>
      <Typography className="mt-4" sx={{ color: "var(--soft-text)" }}>
        Staff logins are counter-specific. For the token you shared from Secunderabad MeeSeva, use `staff.mee@govqueue.com`.
      </Typography>
      <Typography className="mt-4">Need an account? <Link to="/register">Register</Link></Typography>
    </Paper>
  );
}
