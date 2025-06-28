import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PurchaseRequisition } from '@/types';

interface ApproverFinanceTableProps {
    purchaseRequisition: PurchaseRequisition;
}

export default function ApproverFinanceTable({ purchaseRequisition }: ApproverFinanceTableProps) {
    return (
        <>
            {/* purchaseRequisition.approvers_list?.some((approver: any) => Number(approver.approver_level) === 3)  */}
            {purchaseRequisition.is_approve_im_supervisor == 1 && (
                <div className="flex w-full gap-4 rounded bg-white shadow">
                    <table className="min-w-full divide-y divide-gray-200 rounded shadow">
                        <thead className="bg-gray-100">
                            <tr>
                                <td className="bg-gray-200 bg-lime-500 p-2 text-center text-lg font-bold text-white" colSpan={3}>
                                    Finance Verification
                                </td>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            <tr className="hover:bg-gray-50">
                                <td className="w-1/3 px-4 py-2 align-top">
                                    <span className="mb-1 block text-xs font-semibold tracking-wider text-gray-700 uppercase">
                                        Budgeted or Unbudgeted
                                    </span>
                                    <Select
                                        value={selectedBudget}
                                        onValueChange={(value) => {
                                            setSelectedBudget(value);
                                            if (value === '0') {
                                                setBudgetedAmount('0');
                                            }
                                        }}
                                        disabled={
                                            !purchaseRequisition.approvers_list?.some(
                                                (approver: any) => String(approver.approver_id) === String(auth.user.id),
                                            )
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Budget Status" />
                                        </SelectTrigger>
                                        <SelectContent className="z-99999">
                                            <SelectItem value="1">Budget</SelectItem>
                                            <SelectItem value="0">Unbudgeted</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </td>

                                <td className="w-1/3 px-4 py-2 align-top">
                                    <span className="mb-1 block text-xs font-semibold tracking-wider text-gray-700 uppercase">Budgeted Amount</span>

                                    <div className="flex items-center gap-2">
                                        <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                                            <SelectTrigger className="w-24">
                                                <SelectValue placeholder="Currency" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="PHP">PHP</SelectItem>
                                                <SelectItem value="USD">USD</SelectItem>
                                                <SelectItem value="EUR">EUR</SelectItem>
                                                <SelectItem value="JPY">JPY</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <Input
                                            id="budget_amount"
                                            type="currency"
                                            name="budget_amount"
                                            className="rounded-sm shadow-none"
                                            value={selectedBudget === '0' ? '0' : formatWithCommas(budgetedAmount)}
                                            placeholder="Amount"
                                            onChange={(e) => setBudgetedAmount(e.target.value)}
                                            disabled={
                                                selectedBudget === '0' ||
                                                !purchaseRequisition.approvers_list?.some(
                                                    (approver: any) => String(approver.approver_id) === String(auth.user.id),
                                                )
                                            }
                                        />
                                    </div>
                                </td>

                                <td className="w-1/3 px-4 py-2 align-top">
                                    <span className="mb-1 block text-xs font-semibold tracking-wider text-gray-700 uppercase">OPEX or CAPEX</span>
                                    <Select
                                        value={selectedOpexCapex}
                                        onValueChange={(value) => setSelectedOpexCapex(value)}
                                        disabled={
                                            !purchaseRequisition.approvers_list?.some(
                                                (approver: any) => String(approver.approver_id) === String(auth.user.id),
                                            )
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Budget Type" />
                                        </SelectTrigger>
                                        <SelectContent className="z-99999">
                                            <SelectItem value="opex">OPEX</SelectItem>
                                            <SelectItem value="capex">CAPEX</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </td>
                            </tr>
                            <tr>
                                <td className="p-4">
                                    <span className="text-sm text-gray-800">Verified By : </span>
                                    <span className="text-sm font-bold text-gray-800">
                                        {purchaseRequisition.approvers_list?.find((approver: any) => Number(approver.approver_level) === 3)
                                            ?.approval_date || ''}
                                    </span>
                                    <br />
                                    <span className="mt-2 block font-semibold text-gray-700">
                                        {(() => {
                                            const approver = purchaseRequisition.approvers_list?.find(
                                                (approver: any) => Number(approver.approver_level) === 3,
                                            )?.approver;
                                            return approver ? `${approver.fname || ''} ${approver.mname || ''} ${approver.lname || ''}`.trim() : '';
                                        })()}
                                    </span>
                                </td>
                                <td colSpan={2} className="w-1/3 px-4 py-2 align-top">
                                    <span className="mb-1 block text-xs font-semibold tracking-wider text-gray-700 uppercase">Remarks</span>{' '}
                                    <Textarea
                                        id="remarks"
                                        name="remarks"
                                        className="rounded-sm shadow-none"
                                        value={remarksFinance}
                                        placeholder="Remarks"
                                        onChange={(e) => {
                                            setRemarksFinance(e.target.value);
                                        }}
                                        disabled={
                                            !purchaseRequisition.approvers_list?.some(
                                                (approver: any) => String(approver.approver_id) === String(auth.user.id),
                                            )
                                        }
                                    />
                                </td>
                            </tr>

                            {purchaseRequisition.approvers_list?.some((approver: any) => String(approver?.approver_id) === String(auth.user.id)) &&
                                purchaseRequisition.is_finance_verified !== '1' && (
                                    <tr>
                                        <td colSpan={3} className="p-4 text-center">
                                            <div className="flex flex-col items-center gap-2 md:flex-row md:justify-center">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            type="submit"
                                                            disabled={
                                                                !selectedBudget || !selectedOpexCapex || (selectedBudget !== '0' && !budgetedAmount)
                                                            }
                                                        >
                                                            Verify
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="z-99999">
                                                        <DialogTitle>Purchase Request</DialogTitle>
                                                        <DialogDescription>Are you sure you want to verify this purchase request ?</DialogDescription>
                                                        <DialogFooter className="gap-2">
                                                            <DialogClose asChild>
                                                                <Button variant="secondary">Cancel</Button>
                                                            </DialogClose>
                                                            <DialogClose asChild>
                                                                <Button asChild>
                                                                    <button type="submit" onClick={() => handleVerify()}>
                                                                        Confirm
                                                                    </button>
                                                                </Button>
                                                            </DialogClose>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}
