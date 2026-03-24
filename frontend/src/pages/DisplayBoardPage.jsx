import { MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { queueService } from "../services/queueService";

export default function DisplayBoardPage() {
  const [officeId, setOfficeId] = useState("");
  const { data: catalog } = useQuery({ queryKey: ["catalog"], queryFn: queueService.catalog });
  const { data: rows = [] } = useQuery({
    queryKey: ["display-board", officeId],
    queryFn: () => queueService.getDisplayBoard(officeId || null),
    retry: false,
    refetchInterval: 10000
  });

  return (
    <div>
      <Typography variant="h3" fontWeight={800} className="mb-6 text-center">Queue Display Board</Typography>
      <div className="mx-auto mb-6 max-w-sm">
        <TextField select fullWidth label="Filter by office" value={officeId} onChange={(e) => setOfficeId(e.target.value)}>
          <MenuItem value="">All Offices</MenuItem>
          {(catalog?.offices ?? []).map((office) => <MenuItem key={office.id} value={office.id}>{office.name}</MenuItem>)}
        </TextField>
      </div>
      <Stack spacing={3}>
        {rows.map((row) => (
          <Paper key={row.queueId} className="surface-card rounded-3xl p-6">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <Typography variant="h5">{row.officeName}</Typography>
                <Typography color="text.secondary">{row.departmentName} | {row.serviceName}</Typography>
              </div>
              <Typography sx={{ color: "var(--accent)", fontWeight: 700 }}>Waiting: {row.waitingCount}</Typography>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Typography variant="overline" color="text.secondary">Current Token</Typography>
                <Typography variant="h3">{row.currentToken || "--"}</Typography>
                <Typography color="text.secondary">{row.currentCounter || "Counter pending"} | {row.currentStatus}</Typography>
              </div>
              <div>
                <Typography variant="overline" color="text.secondary">Next Up</Typography>
                <div className="flex flex-wrap gap-2">
                  {(row.nextTokens ?? []).map((token) => (
                    <Paper key={token} className="rounded-2xl px-3 py-2" sx={{ background: "var(--soft-surface)", border: "1px solid var(--panel-border)" }}>
                      <Typography>{token}</Typography>
                    </Paper>
                  ))}
                  {!row.nextTokens?.length ? <Typography color="text.secondary">No waiting tokens</Typography> : null}
                </div>
              </div>
            </div>
          </Paper>
        ))}
      </Stack>
    </div>
  );
}
