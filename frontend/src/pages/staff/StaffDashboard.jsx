import { Button, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import { useAuth } from "../../context/AuthContext";
import { staffService } from "../../services/staffService";

export default function StaffDashboard() {
  const { user } = useAuth();
  const { data: waiting = [] } = useQuery({
    queryKey: ["waitingUsers"],
    queryFn: staffService.waitingUsers,
    enabled: Boolean(user && ["ROLE_STAFF", "ROLE_ADMIN"].includes(user.role)),
    retry: false
  });

  return (
    <div>
      <PageHeader title="Staff Counter Dashboard" description="Manage token flow at the assigned counter." action={<Button component={Link} to="/staff/control" variant="contained">Open Control Panel</Button>} />
      <Paper className="surface-card mb-6 rounded-[28px] p-5">
        <Typography variant="overline" sx={{ color: "var(--soft-text)" }}>Current Queue Feed</Typography>
        <Typography variant="h6" fontWeight={700}>
          {waiting[0] ? waiting[0].officeName : "No active tokens in this staff queue"}
        </Typography>
        <Typography sx={{ color: "var(--soft-text)" }}>
          {waiting[0]
            ? `${waiting[0].departmentName} | ${waiting[0].counterName ?? "Counter assigned on call"}`
            : "If you joined a MeeSeva token, log in with staff.mee@govqueue.com to view that queue."}
        </Typography>
        <Typography sx={{ color: "var(--soft-text)" }}>
          Visible active tokens: {waiting.length}
        </Typography>
      </Paper>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}><StatCard title="Waiting Users" value={waiting.filter((item) => item.status === "WAITING").length} /></Grid>
        <Grid size={{ xs: 12, md: 4 }}><StatCard title="Called Tokens" value={waiting.filter((item) => item.status === "CALLED").length} /></Grid>
        <Grid size={{ xs: 12, md: 4 }}><StatCard title="Skipped Tokens" value={waiting.filter((item) => item.status === "SKIPPED").length} /></Grid>
      </Grid>
    </div>
  );
}
