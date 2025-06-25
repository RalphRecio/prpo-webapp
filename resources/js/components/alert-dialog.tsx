import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { HandCoins } from 'lucide-react';

type ReceiveDialogProps = {
    disabled?: boolean;
    onConfirm: () => void;
    isLoading?: boolean;
    triggerText?: string;
    title?: string;
    description?: string;
};

export function ReceiveDialog({
    disabled,
    onConfirm,
    isLoading,
    triggerText,
    title,
    description = 'Are you sure you want to proceed with receiving this transaction?',
}: ReceiveDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button disabled={disabled}>
                    <HandCoins className="mr-2 h-4 w-4" />
                    {triggerText}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
                <DialogFooter className="gap-2">
                    <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button asChild>
                            <button type="submit" onClick={onConfirm} disabled={isLoading}>
                                {isLoading ? 'Processing...' : 'Confirm'}
                            </button>
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
