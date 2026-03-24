import { Alert, Button, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const [form, setForm] = useState({ fullName: "", email: "", phoneNumber: "", password: "", preferredLanguage: "en", role: "ROLE_CITIZEN" });
  const [error, setError] = useState("");
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate("/citizen");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Paper className="surface-card mx-auto max-w-2xl rounded-[32px] p-8">
      <Typography variant="h4" fontWeight={700} className="mb-6">Citizen Registration</Typography>
      {error ? <Alert severity="error" className="mb-4">{error}</Alert> : null}
      <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <TextField label="Full Name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
        <TextField label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <TextField label="Phone Number" value={form.phoneNumber} onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })} />
        <TextField label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <TextField select label="Preferred Language" value={form.preferredLanguage} onChange={(e) => setForm({ ...form, preferredLanguage: e.target.value })}>
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="hi">Hindi</MenuItem>
          <MenuItem value="te">Telugu</MenuItem>
        </TextField>
        <Button type="submit" variant="contained" disabled={loading}>Create Account</Button>
      </form>
    </Paper>
  );
}
