import { Alert, Button, MenuItem, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import PageHeader from "../../components/PageHeader";
import { feedbackService } from "../../services/feedbackService";
import { queueService } from "../../services/queueService";

export default function FeedbackPage() {
  const { data: tokens = [] } = useQuery({ queryKey: ["myTokens"], queryFn: queueService.getMyTokens });
  const [form, setForm] = useState({ tokenId: "", rating: 5, comments: "" });
  const mutation = useMutation({ mutationFn: feedbackService.submit });

  return (
    <div>
      <PageHeader title="Feedback" description="Submit service ratings and comments for completed visits." />
      {mutation.isSuccess ? <Alert severity="success" className="mb-4">Feedback submitted.</Alert> : null}
      <Paper className="surface-card max-w-2xl rounded-3xl p-6">
        <form className="grid gap-4" onSubmit={(e) => { e.preventDefault(); mutation.mutate({ ...form, tokenId: Number(form.tokenId), rating: Number(form.rating) }); }}>
          <TextField select label="Token" value={form.tokenId} onChange={(e) => setForm({ ...form, tokenId: e.target.value })}>
            {tokens.map((token) => <MenuItem key={token.tokenId} value={token.tokenId}>{token.tokenNumber}</MenuItem>)}
          </TextField>
          <TextField select label="Rating" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })}>
            {[1, 2, 3, 4, 5].map((rate) => <MenuItem key={rate} value={rate}>{rate}</MenuItem>)}
          </TextField>
          <TextField multiline rows={4} label="Comments" value={form.comments} onChange={(e) => setForm({ ...form, comments: e.target.value })} />
          <Button type="submit" variant="contained">Submit Feedback</Button>
        </form>
      </Paper>
    </div>
  );
}
