import { Card, CardContent, Typography } from "@mui/material";

export default function StatCard({ title, value, subtitle }) {
  return (
    <Card className="surface-card" sx={{ borderRadius: 7 }}>
      <CardContent>
        <Typography sx={{ color: "var(--accent)" }} variant="overline">{title}</Typography>
        <Typography variant="h4" fontWeight={800} sx={{ mt: 0.5 }}>{value}</Typography>
        {subtitle ? <Typography color="text.secondary" sx={{ mt: 0.75 }}>{subtitle}</Typography> : null}
      </CardContent>
    </Card>
  );
}
