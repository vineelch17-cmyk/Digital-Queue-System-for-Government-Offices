import { Button, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PageHeader from "../../components/PageHeader";
import { adminService } from "../../services/adminService";
import { queueService } from "../../services/queueService";

export default function CounterManagementPage() {
  const queryClient = useQueryClient();
  const [officeId, setOfficeId] = useState("");
  const [form, setForm] = useState({ departmentId: "", staffUserId: 2, name: "", status: "ACTIVE" });
  const { data: catalog } = useQuery({ queryKey: ["catalog"], queryFn: queueService.catalog });
  const { data: counters = [] } = useQuery({ queryKey: ["admin-counters"], queryFn: adminService.listCounters });
  const { data: staffUsers = [] } = useQuery({ queryKey: ["admin-staff"], queryFn: adminService.listStaff });
  const mutation = useMutation({
    mutationFn: adminService.createCounter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-counters"] });
      setForm({ departmentId: "", staffUserId: 2, name: "", status: "ACTIVE" });
    }
  });
  const departments = useMemo(() => (catalog?.departments ?? []).filter((item) => item.office?.id === Number(officeId)), [catalog, officeId]);

  return (
    <div>
      <PageHeader title="Counter Management" description="Assign staff to counters and activate queue control points." />
      <Paper className="surface-card max-w-3xl rounded-3xl p-6">
        <form className="grid gap-4" onSubmit={(e) => { e.preventDefault(); mutation.mutate({ ...form, officeId: Number(officeId), departmentId: Number(form.departmentId), staffUserId: Number(form.staffUserId) }); }}>
          <TextField select label="Office" value={officeId} onChange={(e) => setOfficeId(e.target.value)}>
            {(catalog?.offices ?? []).map((office) => <MenuItem key={office.id} value={office.id}>{office.name}</MenuItem>)}
          </TextField>
          <TextField select label="Department" value={form.departmentId} onChange={(e) => setForm({ ...form, departmentId: e.target.value })}>
            {departments.map((department) => <MenuItem key={department.id} value={department.id}>{department.name}</MenuItem>)}
          </TextField>
          <TextField label="Counter Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <TextField select label="Staff" value={form.staffUserId} onChange={(e) => setForm({ ...form, staffUserId: e.target.value })}>
            {staffUsers.map((staff) => <MenuItem key={staff.id} value={staff.id}>{staff.fullName}</MenuItem>)}
          </TextField>
          <Button type="submit" variant="contained">Create Counter</Button>
        </form>
      </Paper>
      <Paper className="surface-card mt-6 rounded-3xl p-6">
        <Typography variant="h6" className="mb-4">Existing Counters</Typography>
        <Stack spacing={2}>
          {counters.map((counter) => (
            <div key={counter.id} className="rounded-2xl border border-slate-700 p-4">
              <Typography fontWeight={700}>{counter.name}</Typography>
              <Typography color="text.secondary">{counter.office?.name} | {counter.department?.name}</Typography>
              <Typography color="text.secondary">{counter.assignedStaff?.fullName} | {counter.status}</Typography>
            </div>
          ))}
        </Stack>
      </Paper>
    </div>
  );
}
