import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface DialogAlertProps {
    buttonName?: string;
    title?: string;
    handleSubmit: () => void;
    loading?: boolean;
    isDisabled?: boolean;
}

export function DialogAlert({ buttonName, title, handleSubmit, loading, isDisabled = false }: DialogAlertProps) {
    // const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <div className="flex flex-col items-center justify-center gap-4 p-4">
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button type="submit" disabled={isDisabled}>
                            {/* <Save className="mr-1 h-4 w-4" /> */}
                            {buttonName || 'Submit'}
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="z-99999">
                        <DialogTitle>{title || 'Purchase Request'}</DialogTitle>
                        <DialogDescription>Are you sure you want to proceed?</DialogDescription>
                        <DialogFooter className="gap-2">
                            <DialogClose asChild>
                                <Button variant="secondary">Cancel</Button>
                            </DialogClose>

                            <DialogClose asChild>
                                <Button asChild>
                                    <button
                                        type="submit"
                                        onClick={() => {
                                            handleSubmit();
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
