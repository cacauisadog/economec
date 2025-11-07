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
      <DialogContent
        className="top-0 left-0 h-[calc(100dvh)] w-full max-w-full translate-x-0 translate-y-0 rounded-none border-0 p-6 sm:top-[50%] sm:left-[50%] sm:h-auto sm:max-w-[425px] sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-lg sm:border"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Nova transação</DialogTitle>
          <DialogDescription>
            Insira os dados da sua transação
          </DialogDescription>
        </DialogHeader>
        <AddNewTransactionForm
          className="flex-1 overflow-y-auto py-4"
          formId="add-transaction-form"
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit" form="add-transaction-form">
            Adicionar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
