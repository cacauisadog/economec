import AddNewTransactionDialog from "@/components/add-new-transaction-dialog";
import TransactionDataTable from "@/components/transaction-data-table";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  function openAddTransactionDialog() {
    setIsDialogOpen(true);
  }
  return (
    <div>
      <Button onClick={openAddTransactionDialog}>Adicionar transação</Button>
      <AddNewTransactionDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
      <TransactionDataTable />
    </div>
  );
}
