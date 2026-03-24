import { Button, Paper, Stack, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PageHeader from "../../components/PageHeader";
import { notificationService } from "../../services/notificationService";

export default function NotificationsPage() {
  const queryClient = useQueryClient();
  const { data: notifications = [] } = useQuery({ queryKey: ["notifications"], queryFn: notificationService.list });
  const { data: unread } = useQuery({ queryKey: ["notification-unread"], queryFn: notificationService.unreadCount });
  const markRead = useMutation({
    mutationFn: notificationService.markRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notification-unread"] });
    }
  });
  const markAllRead = useMutation({
    mutationFn: notificationService.markAllRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notification-unread"] });
    }
  });

  return (
    <div>
      <PageHeader
        title="Notifications"
        description={`Realtime token and queue notifications. Unread: ${unread?.unreadCount ?? 0}`}
        action={<Button variant="outlined" onClick={() => markAllRead.mutate()}>Mark All Read</Button>}
      />
      <Stack spacing={3}>
        {!notifications.length ? (
          <Paper className="glass-panel rounded-3xl p-6">
            <Typography variant="h6">No notifications yet</Typography>
            <Typography color="text.secondary">Queue calls, payment updates, and service completion alerts will appear here.</Typography>
          </Paper>
        ) : null}
        {notifications.map((item) => (
          <Paper key={item.id} className="surface-card rounded-[28px] p-5">
            <div className="flex items-start justify-between gap-4">
              <Typography variant="h6">{item.title}</Typography>
              {!item.readFlag ? <Button size="small" onClick={() => markRead.mutate(item.id)}>Mark Read</Button> : null}
            </div>
            <Typography color="text.secondary">{item.message}</Typography>
            <Typography color="text.secondary" className="mt-2">{item.readFlag ? "Read" : "Unread"}</Typography>
          </Paper>
        ))}
      </Stack>
    </div>
  );
}
