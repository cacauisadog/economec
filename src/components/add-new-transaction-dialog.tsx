import AddNewTransactionForm from "@/components/add-new-transaction-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type AddNewTransactionDialogProps = {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddNewTransactionDialog({
  open,
  onOpenChange,
}: AddNewTransactionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nova transação</DialogTitle>
          <DialogDescription>
            Insira os dados da sua transação.
          </DialogDescription>
          <AddNewTransactionForm className="py-4" />
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit">Adicionar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
