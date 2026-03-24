import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PageHeader from "../../components/PageHeader";
import { adminService } from "../../services/adminService";

export default function OfficeManagementPage() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ name: "", address: "", city: "", state: "", contactNumber: "" });
  const { data: offices = [] } = useQuery({ queryKey: ["admin-offices"], queryFn: adminService.listOffices });
  const mutation = useMutation({
    mutationFn: adminService.createOffice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-offices"] });
      setForm({ name: "", address: "", city: "", state: "", contactNumber: "" });
    }
  });

  return (
    <div>
      <PageHeader title="Office Management" description="Create and maintain government office branches." />
      <Paper className="surface-card max-w-3xl rounded-3xl p-6">
        <form className="grid gap-4 md:grid-cols-2" onSubmit={(e) => { e.preventDefault(); mutation.mutate(form); }}>
          <TextField label="Office Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <TextField label="Contact Number" value={form.contactNumber} onChange={(e) => setForm({ ...form, contactNumber: e.target.value })} />
          <TextField label="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          <TextField label="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
          <TextField label="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
          <Button type="submit" variant="contained">Create Office</Button>
        </form>
      </Paper>
      <Paper className="surface-card mt-6 rounded-3xl p-6">
        <Typography variant="h6" className="mb-4">Existing Offices</Typography>
        <Stack spacing={2}>
          {offices.map((office) => (
            <div key={office.id} className="rounded-2xl border border-slate-700 p-4">
              <Typography fontWeight={700}>{office.name}</Typography>
              <Typography color="text.secondary">{office.city}, {office.state}</Typography>
              <Typography color="text.secondary">{office.address}</Typography>
            </div>
          ))}
        </Stack>
      </Paper>
    </div>
  );
}
