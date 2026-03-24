import { Button, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import TokenStatusCard from "../../components/TokenStatusCard";
import { queueService } from "../../services/queueService";

export default function CitizenDashboard() {
  const { data: tokens = [] } = useQuery({ queryKey: ["myTokens"], queryFn: queueService.getMyTokens });
  const { data: catalog } = useQuery({ queryKey: ["citizen-catalog"], queryFn: queueService.catalog });
  const activeToken = tokens.find((token) => ["WAITING", "CALLED", "SKIPPED"].includes(token.status));
  const offices = catalog?.offices?.length ?? 0;
  const services = catalog?.services?.length ?? 0;

  return (
    <div>
      <PageHeader
        title="Citizen Portal"
        description="Join a queue, watch your token move in real time, and submit service feedback."
        action={<div className="flex flex-wrap gap-3"><Button component={Link} to="/citizen/join" variant="contained">Join Queue</Button><Button component={Link} to="/notifications" variant="outlined">Notifications</Button></div>}
      />
      <Grid container spacing={3} className="mb-6">
        <Grid size={{ xs: 12, md: 4 }}><StatCard title="Total Tokens" value={tokens.length} subtitle="Your complete history" /></Grid>
        <Grid size={{ xs: 12, md: 4 }}><StatCard title="Active Tokens" value={tokens.filter((t) => t.status === "WAITING").length} subtitle="Currently waiting" /></Grid>
        <Grid size={{ xs: 12, md: 4 }}><StatCard title="Completed" value={tokens.filter((t) => t.status === "COMPLETED").length} subtitle="Services delivered" /></Grid>
      </Grid>
      <Grid container spacing={3} className="mb-6">
        <Grid size={{ xs: 12, md: 6 }}><StatCard title="Available Offices" value={offices} subtitle="Live public service locations" /></Grid>
        <Grid size={{ xs: 12, md: 6 }}><StatCard title="Available Services" value={services} subtitle="Expanded service catalog" /></Grid>
      </Grid>
      {activeToken ? (
        <TokenStatusCard token={activeToken} />
      ) : (
        <Paper className="glass-panel rounded-3xl p-8">
          <Typography variant="h6">No active token</Typography>
          <Typography color="text.secondary">Create a new token to start tracking your queue position.</Typography>
        </Paper>
      )}
    </div>
  );
}
