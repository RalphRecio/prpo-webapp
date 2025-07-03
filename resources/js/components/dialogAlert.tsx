import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

interface DialogAlertProps {
    buttonName?: string;
    title?: string;
    handleSubmit: (remarks: string) => void;
    loading?: boolean;
    isDisabled?: boolean;
    remarks?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    remarkFields?: boolean;
    body?: string;
}

export function DialogAlert({
    buttonName,
    title,
    handleSubmit,
    loading,
    isDisabled = false,
    remarks: initialRemarks,
    open: controlledOpen,
    remarkFields = true,
    onOpenChange,
    body,
}: DialogAlertProps) {
    const [remarks, setRemarks] = useState(initialRemarks || '');
    const [open, setOpen] = useState(false);

    // Use controlled open if provided, otherwise use local state
    const isOpen = controlledOpen !== undefined ? controlledOpen : open;
    const handleDialogOpenChange = (val: boolean) => {
        setOpen(val);
        onOpenChange?.(val);
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4 p-2">
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
                <Button type="button" disabled={isDisabled} onClick={() => setOpen(true)}>
                    {buttonName || 'Submit'}
                </Button>
                <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
                    <DialogContent className="z-99999">
                        <DialogTitle>{title || 'Purchase Request'}</DialogTitle>
                        <DialogDescription>
                            <div className="flex flex-col">
                                {body ?? 'Are you sure you want to proceed?'}
                                {remarkFields && (
                                    <>
                                        <span className="mt-2 p-2">Remarks</span>
                                        <Textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Enter remarks here" />
                                    </>
                                )}
                            </div>
                        </DialogDescription>
                        <DialogFooter className="gap-2">
                            <DialogClose asChild>
                                <Button variant="secondary">Cancel</Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button asChild>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            handleSubmit(remarks);
                                        }}
                                    >
                                        {loading ? 'Please wait.' : 'Confirm'}
                                    </button>
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
