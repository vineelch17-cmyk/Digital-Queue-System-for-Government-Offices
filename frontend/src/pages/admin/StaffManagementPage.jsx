import { Paper, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "../../components/PageHeader";
import { adminService } from "../../services/adminService";

export default function StaffManagementPage() {
  const { data: staff = [] } = useQuery({ queryKey: ["admin-staff"], queryFn: adminService.listStaff });

  return (
    <div>
      <PageHeader title="Staff Management" description="Provision and govern staff access. Current staff accounts available in the system are listed below." />
      <Paper className="surface-card rounded-3xl p-6">
        <Stack spacing={2}>
          {staff.map((member) => (
            <div key={member.id} className="rounded-2xl border border-slate-700 p-4">
              <Typography fontWeight={700}>{member.fullName}</Typography>
              <Typography color="text.secondary">{member.email}</Typography>
              <Typography color="text.secondary">{member.phoneNumber}</Typography>
            </div>
          ))}
        </Stack>
      </Paper>
    </div>
  );
}
