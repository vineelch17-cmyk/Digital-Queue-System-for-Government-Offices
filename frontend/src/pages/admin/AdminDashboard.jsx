import { Paper, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import { adminService } from "../../services/adminService";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function AdminDashboard() {
  const { data } = useQuery({ queryKey: ["analytics"], queryFn: adminService.analytics });
  const chartData = {
    labels: Object.keys(data?.tokensByStatus ?? {}),
    datasets: [{ label: "Tokens", data: Object.values(data?.tokensByStatus ?? {}), backgroundColor: "#14b8a6" }]
  };

  return (
    <div>
      <PageHeader
        title="Admin Analytics Dashboard"
        description="Operational monitoring across offices, counters, and active queues."
        action={<div className="flex flex-wrap gap-3"><Button component={Link} to="/admin/services" variant="contained">Manage Services</Button><Button component={Link} to="/display-board" variant="outlined">Display Board</Button></div>}
      />
      <Grid container spacing={3} className="mb-6">
        <Grid size={{ xs: 12, md: 3 }}><StatCard title="Citizens" value={data?.totalCitizens ?? 0} /></Grid>
        <Grid size={{ xs: 12, md: 3 }}><StatCard title="Staff" value={data?.totalStaff ?? 0} /></Grid>
        <Grid size={{ xs: 12, md: 3 }}><StatCard title="Active Queues" value={data?.activeQueues ?? 0} /></Grid>
        <Grid size={{ xs: 12, md: 3 }}><StatCard title="Waiting Tokens" value={data?.waitingTokens ?? 0} /></Grid>
      </Grid>
      <Paper className="surface-card rounded-[32px] p-6">
        <Bar data={chartData} />
      </Paper>
    </div>
  );
}
