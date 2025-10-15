import AddNewTransactionDialog from "@/components/add-new-transaction-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  function openAddTransactionDialog() {
    setIsDialogOpen(true);
  }
  return (
    <div>
      <h1>oi</h1>
      <Button onClick={openAddTransactionDialog}>Adicionar transação</Button>
      <AddNewTransactionDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
}
