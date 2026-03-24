import { Paper, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "../../components/PageHeader";
import TokenStatusCard from "../../components/TokenStatusCard";
import { useAuth } from "../../context/AuthContext";
import { staffService } from "../../services/staffService";

export default function QueueMonitorPage() {
  const { user } = useAuth();
  const { data: waiting = [] } = useQuery({
    queryKey: ["waitingUsers"],
    queryFn: staffService.waitingUsers,
    enabled: Boolean(user && ["ROLE_STAFF", "ROLE_ADMIN"].includes(user.role)),
    retry: false
  });

  return (
    <div>
      <PageHeader title="Queue Monitor" description="Observe waiting and called tokens for the current department queue." />
      <Stack spacing={3}>
        {waiting.map((token) => <TokenStatusCard key={token.tokenId} token={token} />)}
        {!waiting.length ? (
          <Paper className="surface-card rounded-3xl p-6">
            <Typography variant="h6">No active queue items</Typography>
            <Typography sx={{ color: "var(--soft-text)" }}>
              This staff login is not seeing any active tokens right now. If you joined a token under Secunderabad MeeSeva, use `staff.mee@govqueue.com`.
            </Typography>
          </Paper>
        ) : null}
      </Stack>
    </div>
  );
}
