import { useState } from "react";
import AddNewTransactionDialog from "@/components/add-new-transaction-dialog";
import { Button } from "@/components/ui/button";

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function openAddNewTransactionDialog() {
    setIsDialogOpen(true);
  }

  return (
    <>
      <h1 className="text-2xl text-green-200">Economec</h1>
      <Button onClick={openAddNewTransactionDialog}>
        Adicionar nova transação
      </Button>
      <AddNewTransactionDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
}

export default App;
