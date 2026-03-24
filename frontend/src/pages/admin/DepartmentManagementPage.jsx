import { Button, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PageHeader from "../../components/PageHeader";
import { adminService } from "../../services/adminService";
import { queueService } from "../../services/queueService";

export default function DepartmentManagementPage() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ officeId: "", name: "", description: "" });
  const { data: catalog } = useQuery({ queryKey: ["catalog"], queryFn: queueService.catalog });
  const { data: departments = [] } = useQuery({ queryKey: ["admin-departments"], queryFn: adminService.listDepartments });
  const mutation = useMutation({
    mutationFn: adminService.createDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-departments"] });
      setForm({ officeId: "", name: "", description: "" });
    }
  });

  return (
    <div>
      <PageHeader title="Department Management" description="Create office-specific departments." />
      <Paper className="surface-card max-w-3xl rounded-3xl p-6">
        <form className="grid gap-4" onSubmit={(e) => { e.preventDefault(); mutation.mutate({ ...form, officeId: Number(form.officeId) }); }}>
          <TextField select label="Office" value={form.officeId} onChange={(e) => setForm({ ...form, officeId: e.target.value })}>
            {(catalog?.offices ?? []).map((office) => <MenuItem key={office.id} value={office.id}>{office.name}</MenuItem>)}
          </TextField>
          <TextField label="Department Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <TextField label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <Button type="submit" variant="contained">Create Department</Button>
        </form>
      </Paper>
      <Paper className="surface-card mt-6 rounded-3xl p-6">
        <Typography variant="h6" className="mb-4">Existing Departments</Typography>
        <Stack spacing={2}>
          {departments.map((department) => (
            <div key={department.id} className="rounded-2xl border border-slate-700 p-4">
              <Typography fontWeight={700}>{department.name}</Typography>
              <Typography color="text.secondary">{department.office?.name}</Typography>
              <Typography color="text.secondary">{department.description}</Typography>
            </div>
          ))}
        </Stack>
      </Paper>
    </div>
  );
}
