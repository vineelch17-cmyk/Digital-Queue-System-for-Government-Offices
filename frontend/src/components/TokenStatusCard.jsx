import { Chip, Paper, Typography } from "@mui/material";

export default function TokenStatusCard({ token }) {
  return (
    <Paper className="surface-card rounded-[28px] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Typography className="section-label">ACTIVE TOKEN</Typography>
          <Typography variant="h5" fontWeight={800}>{token.tokenNumber}</Typography>
          <Typography color="text.secondary">{token.officeName} | {token.departmentName}</Typography>
          <Typography color="text.secondary">{token.serviceName}</Typography>
          <Typography color="text.secondary">
            Fee: Rs. {token.serviceFee ?? 0} {token.paymentMethod ? `| ${token.paymentMethod} | ${token.paymentStatus}` : ""}
          </Typography>
          {token.paymentReference ? <Typography color="text.secondary">Payment Ref: {token.paymentReference}</Typography> : null}
        </div>
        <Chip label={token.status} color={token.status === "CALLED" ? "warning" : "primary"} sx={{ fontWeight: 800 }} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div>
          <Typography variant="caption" color="text.secondary">Queue Position</Typography>
          <Typography variant="h5" fontWeight={700}>{token.queuePosition}</Typography>
        </div>
        <div>
          <Typography variant="caption" color="text.secondary">Waiting Count</Typography>
          <Typography variant="h5" fontWeight={700}>{token.waitingCount}</Typography>
        </div>
        <div className="col-span-2">
          <Typography variant="caption" color="text.secondary">Estimated Wait</Typography>
          <Typography variant="h6" fontWeight={700}>{token.estimatedWaitMinutes ?? 0} mins</Typography>
        </div>
      </div>
    </Paper>
  );
}
