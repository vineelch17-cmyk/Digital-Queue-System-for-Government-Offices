import { Button, Chip, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { queueService } from "../services/queueService";

export default function HomePage() {
  const { data: catalog } = useQuery({ queryKey: ["home-catalog"], queryFn: queueService.catalog });
  const officeCount = catalog?.offices?.length ?? 0;
  const departmentCount = catalog?.departments?.length ?? 0;
  const serviceCount = catalog?.services?.length ?? 0;
  const featuredServices = (catalog?.services ?? []).slice(0, 6);

  return (
    <div className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr] lg:items-stretch">
        <Paper className="hero-frame rounded-[40px] p-8 md:p-10">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <Chip label="Digital First" sx={{ bgcolor: "var(--accent-soft)", color: "var(--accent)" }} />
              <Chip label="Citizen Friendly" sx={{ bgcolor: "var(--panel-bg)", border: "1px solid var(--panel-border)" }} />
              <Chip label="Realtime Operations" sx={{ bgcolor: "var(--panel-bg)", border: "1px solid var(--panel-border)" }} />
            </div>
            <Typography className="section-label">GOVERNMENT SERVICE EXPERIENCE PLATFORM</Typography>
            <Typography variant="h2">Digital queueing for high-volume public offices</Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 760 }}>
              Replace crowded waiting halls with a modern service flow for citizens, staff, and administrators. Manage tokens, service payments, live display boards, and counter operations from one connected system.
            </Typography>
            <div className="flex flex-wrap gap-4">
              <Button component={Link} to="/register" variant="contained" size="large">Get Started</Button>
              <Button component={Link} to="/login" variant="outlined" size="large">Open Portal</Button>
              <Button component={Link} to="/display-board" variant="text" size="large">Watch Live Queue</Button>
            </div>
          </div>
        </Paper>

        <Paper className="surface-card rounded-[36px] p-8">
          <Typography className="section-label">LIVE FOOTPRINT</Typography>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="overline" color="text.secondary">Offices</Typography>
              <Typography variant="h3" fontWeight={800}>{officeCount}</Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="overline" color="text.secondary">Departments</Typography>
              <Typography variant="h3" fontWeight={800}>{departmentCount}</Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="overline" color="text.secondary">Services</Typography>
              <Typography variant="h3" fontWeight={800}>{serviceCount}</Typography>
            </Grid>
          </Grid>
          <div className="mt-6 grid gap-4">
            {[
              "Realtime queue board and automated updates",
              "Priority tokens with payment-aware issue flow",
              "Counter dashboards for staff operations",
              "Role-based management and analytics"
            ].map((item) => (
              <div key={item} className="rounded-[22px] border p-4" style={{ borderColor: "var(--panel-border)" }}>
                <Typography fontWeight={700}>{item}</Typography>
              </div>
            ))}
          </div>
        </Paper>
      </div>

      <div>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <Typography className="section-label">SERVICE CATALOG</Typography>
            <Typography variant="h4" fontWeight={800}>Popular public services</Typography>
          </div>
          <Button component={Link} to="/register" variant="outlined">Join a Queue</Button>
        </div>
        <Grid container spacing={3}>
          {featuredServices.map((service) => (
            <Grid key={service.id} size={{ xs: 12, md: 6, xl: 4 }}>
              <Paper className="surface-card rounded-[28px] p-6">
                <Typography variant="h6" fontWeight={700}>{service.name}</Typography>
                <Typography color="text.secondary" className="mt-2">{service.description}</Typography>
                <div className="mt-4 flex items-center justify-between">
                  <Typography sx={{ color: "var(--accent)", fontWeight: 700 }}>Fee: Rs. {service.feeAmount}</Typography>
                  <Typography color="text.secondary">{service.avgServiceTimeMinutes} mins</Typography>
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
