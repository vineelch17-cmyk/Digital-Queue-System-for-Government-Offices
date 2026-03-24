import { Box, Typography } from "@mui/material";

export default function PageHeader({ title, description, action }) {
  return (
    <Box className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <Typography className="section-label">CONTROL PANEL</Typography>
        <Typography variant="h4" fontWeight={800}>{title}</Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 720 }}>{description}</Typography>
      </div>
      {action}
    </Box>
  );
}
