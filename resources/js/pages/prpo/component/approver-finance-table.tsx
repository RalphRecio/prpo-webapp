import { DialogAlert } from '@/components/dialogAlert';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { PurchaseRequisition } from '@/types';
import { formatWithCommas, useAuthId } from '@/util/util';
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import { ApproverStamp } from './approver-stamp';

interface ApproverFinanceTableProps {
    purchaseRequisition: PurchaseRequisition;
    handlePurchaseRequestFieldChange: (field: string, value: any) => void;
}

export default function ApproverFinanceTable({ purchaseRequisition, handlePurchaseRequestFieldChange }: ApproverFinanceTableProps) {
    const [selectedCurrency, setSelectedCurrency] = useState('PHP');

    useEffect(() => {
        handlePurchaseRequestFieldChange('currency', 'PHP');
        handlePurchaseRequestFieldChange('budgeted', '1');
        handlePurchaseRequestFieldChange('isCapexOpex', 'opex');
    }, []);

    const handleVerify = async () => {
        try {
            const payload = {
                budgeted: purchaseRequisition.budgeted,
                currency: purchaseRequisition.currency,
                budget_amount: purchaseRequisition.budget_amount,
                isCapexOpex: purchaseRequisition.isCapexOpex,
                remarks: purchaseRequisition.remarks,
                bu_head: purchaseRequisition.bu_id,
            };

            await axios.post('/prpo/purchase-request/verify-finance/' + purchaseRequisition.id, payload);

            Swal.fire('Success!', 'Purchase request reviewed.', 'success').then(() => {
                Inertia.reload(); // Rerender the component with updated data
            });
        } catch (error) {
            // alert('Error saving data.');
        }
    };

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
                                        value={String(purchaseRequisition.budgeted)}
                                        onValueChange={(value) => {
                                            handlePurchaseRequestFieldChange('budgeted', value);
                                            if (value === '0') {
                                                handlePurchaseRequestFieldChange('budget_amount', '0.00');
                                            }
                                        }}
                                        disabled={
                                            !purchaseRequisition.approvers_list?.some(
                                                (approver: any) =>
                                                    Number(approver.approver_id) === Number(useAuthId()) &&
                                                    Number(purchaseRequisition.is_finance_verified) !== 1, // not already approved
                                            )
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Budget Status" />
                                        </SelectTrigger>
                                        <SelectContent className="z-99999">
                                            <SelectItem value="1">Budgeted</SelectItem>
                                            <SelectItem value="0">Unbudgeted</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </td>

                                <td className="w-1/3 px-4 py-2 align-top">
                                    <span className="mb-1 block text-xs font-semibold tracking-wider text-gray-700 uppercase">Budgeted Amount</span>

                                    <div className="flex items-center gap-2">
                                        <Select
                                            value={purchaseRequisition.currency || 'PHP'}
                                            onValueChange={(value) => handlePurchaseRequestFieldChange('currency', value)}
                                            disabled={
                                                !purchaseRequisition.approvers_list?.some(
                                                    (approver: any) =>
                                                        Number(approver.approver_id) === Number(useAuthId()) &&
                                                        Number(purchaseRequisition.is_finance_verified) !== 1, // not already approved
                                                )
                                            }
                                        >
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
                                            value={
                                                String(purchaseRequisition.budget_amount) === '0'
                                                    ? '0'
                                                    : formatWithCommas(String(purchaseRequisition.budget_amount ?? ''))
                                            }
                                            placeholder="Amount"
                                            onChange={(e) => handlePurchaseRequestFieldChange('budget_amount', e.target.value)}
                                            disabled={
                                                !purchaseRequisition.approvers_list?.some(
                                                    (approver: any) =>
                                                        Number(approver.approver_id) === Number(useAuthId()) &&
                                                        Number(purchaseRequisition.is_finance_verified) !== 1, // not already approved
                                                )
                                            }
                                            onKeyDown={(e) => {
                                                if (
                                                    !(
                                                        (e.key >= '0' && e.key <= '9') ||
                                                        [
                                                            'Backspace',
                                                            'Delete',
                                                            'Tab',
                                                            'Escape',
                                                            'Enter',
                                                            'ArrowLeft',
                                                            'ArrowRight',
                                                            'Home',
                                                            'End',
                                                        ].includes(e.key)
                                                    )
                                                ) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        />
                                    </div>
                                </td>

                                <td className="w-1/3 px-4 py-2 align-top">
                                    <span className="mb-1 block text-xs font-semibold tracking-wider text-gray-700 uppercase">OPEX or CAPEX</span>
                                    <Select
                                        value={String(purchaseRequisition.isCapexOpex)}
                                        onValueChange={(value) => handlePurchaseRequestFieldChange('isCapexOpex', value)}
                                        disabled={
                                            !purchaseRequisition.approvers_list?.some(
                                                (approver: any) =>
                                                    Number(approver.approver_id) === Number(useAuthId()) &&
                                                    Number(purchaseRequisition.is_finance_verified) !== 1, // not already approved
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
                                    <ApproverStamp approverLevel={3} purchaseRequisition={purchaseRequisition} />
                                </td>
                                <td colSpan={2} className="w-1/3 px-4 py-2 align-top">
                                    <span className="mb-1 block text-xs font-semibold tracking-wider text-gray-700 uppercase">Remarks</span>{' '}
                                    <Textarea
                                        id="remarks"
                                        name="remarks"
                                        className="rounded-sm shadow-none"
                                        value={purchaseRequisition.remarks}
                                        placeholder="Remarks"
                                        onChange={(e) => {
                                            handlePurchaseRequestFieldChange('remarks', e.target.value);
                                        }}
                                        disabled={
                                            !purchaseRequisition.approvers_list?.some(
                                                (approver: any) =>
                                                    Number(approver.approver_id) === Number(useAuthId()) &&
                                                    Number(purchaseRequisition.is_finance_verified) !== 1, // not already approved
                                            )
                                        }
                                    />
                                </td>
                            </tr>

                            {purchaseRequisition.approvers_list?.some((approver: any) => Number(approver?.approver_id) === Number(useAuthId())) &&
                                Number(purchaseRequisition.is_finance_verified) !== 1 && (
                                    <tr>
                                        <td colSpan={3} className="text-center">
                                            <DialogAlert
                                                buttonName="Approve"
                                                title="Approve Purchase Request"
                                                handleSubmit={() => {
                                                    handleVerify();
                                                }}
                                                isDisabled={
                                                    !purchaseRequisition.budgeted ||
                                                    !purchaseRequisition.currency ||
                                                    !purchaseRequisition.budget_amount ||
                                                    !purchaseRequisition.isCapexOpex
                                                }
                                            />
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
