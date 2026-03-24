import { Alert, Button, FormControlLabel, MenuItem, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import PageHeader from "../../components/PageHeader";
import TokenStatusCard from "../../components/TokenStatusCard";
import { queueService } from "../../services/queueService";

export default function JoinQueuePage() {
  const { data: catalog } = useQuery({ queryKey: ["catalog"], queryFn: queueService.catalog });
  const [form, setForm] = useState({
    officeId: "",
    departmentId: "",
    serviceId: "",
    priorityType: "NORMAL",
    paymentMethod: "UPI",
    paymentReference: ""
  });
  const mutation = useMutation({ mutationFn: queueService.joinQueue });

  const offices = catalog?.offices ?? [];
  const departments = useMemo(() => (catalog?.departments ?? []).filter((item) => item.office?.id === Number(form.officeId)), [catalog, form.officeId]);
  const services = useMemo(() => (catalog?.services ?? []).filter((item) => item.department?.id === Number(form.departmentId)), [catalog, form.departmentId]);
  const selectedService = services.find((item) => item.id === Number(form.serviceId));
  const serviceFee = Number(selectedService?.feeAmount ?? 0);
  const paymentMethods = catalog?.paymentMethods ?? ["UPI", "CREDIT_CARD", "DEBIT_CARD", "NET_BANKING", "WALLET"];

  const submit = async (e) => {
    e.preventDefault();
    mutation.mutate({
      ...form,
      officeId: Number(form.officeId),
      departmentId: Number(form.departmentId),
      serviceId: Number(form.serviceId),
      paymentMethod: serviceFee > 0 ? form.paymentMethod : null,
      paymentReference: serviceFee > 0 ? form.paymentReference : null
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <div>
        <PageHeader title="Join Queue" description="Select office, department, service, and queue priority." />
        {mutation.isError ? <Alert severity="error">{mutation.error.response?.data?.message || "Failed to join queue"}</Alert> : null}
        <Paper className="surface-card rounded-[32px] p-6">
          <form className="grid gap-4" onSubmit={submit}>
            <TextField select label="Office" value={form.officeId} onChange={(e) => setForm({ ...form, officeId: e.target.value, departmentId: "", serviceId: "" })}>
              {offices.map((office) => <MenuItem key={office.id} value={office.id}>{office.name}</MenuItem>)}
            </TextField>
            <TextField select label="Department" value={form.departmentId} onChange={(e) => setForm({ ...form, departmentId: e.target.value, serviceId: "" })}>
              {departments.map((department) => <MenuItem key={department.id} value={department.id}>{department.name}</MenuItem>)}
            </TextField>
            <TextField select label="Service" value={form.serviceId} onChange={(e) => setForm({ ...form, serviceId: e.target.value })}>
              {services.map((service) => <MenuItem key={service.id} value={service.id}>{service.name}</MenuItem>)}
            </TextField>
            <Paper variant="outlined" className="rounded-2xl p-4" sx={{ background: "var(--accent-soft)", borderColor: "var(--hero-outline)" }}>
              <Typography variant="subtitle1" fontWeight={700}>Token Fee</Typography>
              <Typography color="text.secondary">
                {selectedService ? `Rs. ${serviceFee.toFixed(2)} will be collected before token generation.` : "Select a service to view the fee."}
              </Typography>
            </Paper>
            <div>
              <Typography variant="subtitle1" className="mb-2">Priority</Typography>
              <RadioGroup row value={form.priorityType} onChange={(e) => setForm({ ...form, priorityType: e.target.value })}>
                <FormControlLabel value="NORMAL" control={<Radio />} label="Normal" />
                <FormControlLabel value="SENIOR_CITIZEN" control={<Radio />} label="Senior Citizen" />
                <FormControlLabel value="PERSON_WITH_DISABILITY" control={<Radio />} label="PWD" />
                <FormControlLabel value="EMERGENCY" control={<Radio />} label="Emergency" />
              </RadioGroup>
            </div>
            {serviceFee > 0 ? (
              <>
                <TextField select label="Payment Method" value={form.paymentMethod} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}>
                  {paymentMethods.map((method) => <MenuItem key={method} value={method}>{method.replaceAll("_", " ")}</MenuItem>)}
                </TextField>
                <TextField
                  label="Payment Reference"
                  placeholder="UPI ref / gateway ref / card txn ref"
                  value={form.paymentReference}
                  onChange={(e) => setForm({ ...form, paymentReference: e.target.value })}
                />
              </>
            ) : null}
            <Button type="submit" variant="contained">Generate Token</Button>
          </form>
        </Paper>
      </div>
      <div>
        <Typography variant="h6" className="mb-4">Latest Token</Typography>
        {mutation.data ? <TokenStatusCard token={mutation.data} /> : <Paper className="surface-card rounded-[28px] p-6">Your generated token will appear here.</Paper>}
      </div>
    </div>
  );
}
