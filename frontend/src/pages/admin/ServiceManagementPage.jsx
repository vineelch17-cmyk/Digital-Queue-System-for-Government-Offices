import { Button, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PageHeader from "../../components/PageHeader";
import { adminService } from "../../services/adminService";
import { queueService } from "../../services/queueService";

export default function ServiceManagementPage() {
  const queryClient = useQueryClient();
  const [officeId, setOfficeId] = useState("");
  const [form, setForm] = useState({ departmentId: "", name: "", description: "", avgServiceTimeMinutes: 10, prioritySupported: true, feeAmount: 0 });
  const { data: catalog } = useQuery({ queryKey: ["catalog"], queryFn: queueService.catalog });
  const { data: servicesList = [] } = useQuery({ queryKey: ["admin-services"], queryFn: adminService.listServices });
  const mutation = useMutation({
    mutationFn: adminService.createService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-services"] });
      setForm({ departmentId: "", name: "", description: "", avgServiceTimeMinutes: 10, prioritySupported: true, feeAmount: 0 });
    }
  });
  const departments = useMemo(() => (catalog?.departments ?? []).filter((item) => item.office?.id === Number(officeId)), [catalog, officeId]);

  return (
    <div>
      <PageHeader title="Service Management" description="Configure services offered by each department." />
      <Paper className="surface-card max-w-3xl rounded-3xl p-6">
        <form className="grid gap-4" onSubmit={(e) => { e.preventDefault(); mutation.mutate({ ...form, departmentId: Number(form.departmentId), avgServiceTimeMinutes: Number(form.avgServiceTimeMinutes), feeAmount: Number(form.feeAmount) }); }}>
          <TextField select label="Office" value={officeId} onChange={(e) => setOfficeId(e.target.value)}>
            {(catalog?.offices ?? []).map((office) => <MenuItem key={office.id} value={office.id}>{office.name}</MenuItem>)}
          </TextField>
          <TextField select label="Department" value={form.departmentId} onChange={(e) => setForm({ ...form, departmentId: e.target.value })}>
            {departments.map((department) => <MenuItem key={department.id} value={department.id}>{department.name}</MenuItem>)}
          </TextField>
          <TextField label="Service Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <TextField label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <TextField label="Average Service Time (minutes)" value={form.avgServiceTimeMinutes} onChange={(e) => setForm({ ...form, avgServiceTimeMinutes: e.target.value })} />
          <TextField label="Service Fee (INR)" value={form.feeAmount} onChange={(e) => setForm({ ...form, feeAmount: e.target.value })} />
          <Button type="submit" variant="contained">Create Service</Button>
        </form>
      </Paper>
      <Paper className="surface-card mt-6 rounded-3xl p-6">
        <Typography variant="h6" className="mb-4">Existing Services</Typography>
        <Stack spacing={2}>
          {servicesList.map((service) => (
            <div key={service.id} className="rounded-2xl border border-slate-700 p-4">
              <Typography fontWeight={700}>{service.name}</Typography>
              <Typography color="text.secondary">{service.department?.name}</Typography>
              <Typography color="text.secondary">Fee: Rs. {service.feeAmount} | Avg: {service.avgServiceTimeMinutes} mins</Typography>
            </div>
          ))}
        </Stack>
      </Paper>
    </div>
  );
}
