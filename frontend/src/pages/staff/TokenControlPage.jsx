import { Button, Paper, Stack, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PageHeader from "../../components/PageHeader";
import { useAuth } from "../../context/AuthContext";
import { staffService } from "../../services/staffService";

export default function TokenControlPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: waiting = [] } = useQuery({
    queryKey: ["waitingUsers"],
    queryFn: staffService.waitingUsers,
    enabled: Boolean(user && ["ROLE_STAFF", "ROLE_ADMIN"].includes(user.role)),
    retry: false
  });
  const nextMutation = useMutation({ mutationFn: staffService.nextToken, onSuccess: () => queryClient.invalidateQueries({ queryKey: ["waitingUsers"] }) });
  const completeMutation = useMutation({ mutationFn: staffService.completeToken, onSuccess: () => queryClient.invalidateQueries({ queryKey: ["waitingUsers"] }) });
  const skipMutation = useMutation({ mutationFn: staffService.skipToken, onSuccess: () => queryClient.invalidateQueries({ queryKey: ["waitingUsers"] }) });
  const recallMutation = useMutation({ mutationFn: staffService.recallToken, onSuccess: () => queryClient.invalidateQueries({ queryKey: ["waitingUsers"] }) });
  const current = waiting.find((item) => item.status === "CALLED") || waiting[0];

  return (
    <div>
      <PageHeader title="Token Control Panel" description="Call next, skip, recall, and complete tokens." />
      <Paper className="surface-card rounded-3xl p-6">
        <Stack spacing={3}>
          <Typography sx={{ color: "var(--soft-text)" }}>
            {waiting[0]
              ? `Current queue: ${waiting[0].officeName} | ${waiting[0].departmentName}`
              : "No tokens are visible for this staff login right now."}
          </Typography>
          <Typography variant="h5">{current ? current.tokenNumber : "No active token"}</Typography>
          <div className="flex flex-wrap gap-3">
            <Button variant="contained" onClick={() => nextMutation.mutate()}>Call Next</Button>
            <Button variant="outlined" disabled={!current} onClick={() => skipMutation.mutate(current.tokenId)}>Skip</Button>
            <Button variant="outlined" disabled={!current} onClick={() => recallMutation.mutate(current.tokenId)}>Recall</Button>
            <Button color="success" variant="contained" disabled={!current} onClick={() => completeMutation.mutate(current.tokenId)}>Complete</Button>
          </div>
        </Stack>
      </Paper>
    </div>
  );
}
