import { TextAreaField, TextField } from '@/components/custom/textField';
import { DialogAlert } from '@/components/dialogAlert';
import { Input } from '@/components/ui/input';
import { PurchaseRequisition } from '@/types';
import { useAuthId } from '@/util/util';

import { ApproverStamp } from './approver-stamp';

import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';
import Swal from 'sweetalert2';

import { useState } from 'react';

interface ApproverProcurementProps {
    purchaseRequisition: PurchaseRequisition;
    handlePurchaseRequestFieldChange: (field: string, value: any) => void;
}

export default function ApproverProcurement({ purchaseRequisition, handlePurchaseRequestFieldChange }: ApproverProcurementProps) {
    // Define budgetedAmount and actualAmount from purchaseRequisition or set default values
    const budgetedAmount = purchaseRequisition.budget_amount ?? '0';
    const actualAmount = purchaseRequisition.actual_amount ?? '0';

    const [submitting, setSubmitting] = useState(false);

    const handleVerifyProcurement = async () => {
        if (submitting) return; // Prevent double trigger
        setSubmitting(true);
        try {
            const payload = {
                supplier_name: purchaseRequisition.supplier_name,
                actual_amount: purchaseRequisition.actual_amount,
                procurement_remarks: purchaseRequisition.remarks,
                bu_head: purchaseRequisition.bu_id,
            };
            await axios.post('/prpo/purchase-request/verify-procurement/' + purchaseRequisition.id, payload);

            Swal.fire('Success!', 'Purchase request approved.', 'success').then(() => {
                Inertia.reload(); // Rerender the component with updated data
            });
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            {purchaseRequisition.approvers_list?.some((approver: any) => Number(approver.approver_level) === 4) && (
                <div className="flex w-full gap-4 rounded bg-white shadow">
                    <table className="min-w-full divide-y divide-gray-200 rounded shadow">
                        <thead className="bg-gray-100">
                            <tr>
                                <td className="bg-sky-500 p-4 text-center text-lg font-bold text-white" colSpan={2}>
                                    Procurement Verification
                                </td>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            <tr className="hover:bg-gray-50">
                                <td className="w-1/2 px-4 py-2 align-top">
                                    <TextField
                                        label="Supplier Name"
                                        id="supplier_name"
                                        type="text"
                                        name="supplier_name"
                                        value={purchaseRequisition.supplier_name ?? undefined}
                                        placeholder="Supplier Name"
                                        isReadOnly={
                                            !purchaseRequisition.approvers_list?.some(
                                                (approver: any) =>
                                                    Number(approver.approver_level) === 4 && Number(approver?.approver_id) === Number(useAuthId()),
                                            )
                                        }
                                        onChange={(e) => handlePurchaseRequestFieldChange('supplier_name', e.target.value)}
                                        disabled={
                                            !purchaseRequisition.approvers_list?.some(
                                                (approver: any) =>
                                                    Number(approver.approver_id) === Number(useAuthId()) &&
                                                    Number(purchaseRequisition.is_procurement_verified) !== 1, // not already approved
                                            )
                                        }
                                    />
                                </td>
                                <td className="w-1/2 px-4 py-2 align-top">
                                    <TextField
                                        label="Actual Amount"
                                        id="actual_amount"
                                        type="text"
                                        name="actual_amount"
                                        value={purchaseRequisition.actual_amount ?? undefined}
                                        placeholder="Actual Amount"
                                        isReadOnly={
                                            !purchaseRequisition.approvers_list?.some(
                                                (approver: any) =>
                                                    Number(approver.approver_level) === 4 && Number(approver?.approver_id) === Number(useAuthId()),
                                            )
                                        }
                                        onChange={(e) => handlePurchaseRequestFieldChange('actual_amount', e.target.value)}
                                        disabled={
                                            !purchaseRequisition.approvers_list?.some(
                                                (approver: any) =>
                                                    Number(approver.approver_id) === Number(useAuthId()) &&
                                                    Number(purchaseRequisition.is_procurement_verified) !== 1, // not already approved
                                            )
                                        }
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td className="w-1/2 px-4 py-2 align-top">
                                    <span className="text-left text-xs font-semibold tracking-wider text-gray-700 uppercase">Over Budget By</span>
                                    <span className="rounded-sm shadow-none">
                                        {(() => {
                                            const budget = parseFloat(String(budgetedAmount || '0'));
                                            const actual = parseFloat(String(actualAmount || '0'));
                                            const diff = budget - actual;
                                            const overBudgetValue =
                                                diff < 0
                                                    ? Math.abs(diff).toLocaleString('en-US', {
                                                          style: 'currency',
                                                          currency: purchaseRequisition.currency,
                                                      })
                                                    : (0).toLocaleString('en-US', {
                                                          style: 'currency',
                                                          currency: purchaseRequisition.currency,
                                                      });

                                            return (
                                                <Input
                                                    value={overBudgetValue}
                                                    readOnly
                                                    disabled={
                                                        !purchaseRequisition.approvers_list?.some(
                                                            (approver: any) =>
                                                                Number(approver.approver_id) === Number(useAuthId()) &&
                                                                Number(purchaseRequisition.is_procurement_verified) !== 1,
                                                        )
                                                    }
                                                />
                                            );
                                        })()}
                                    </span>
                                </td>

                                <td className="w-1/2 px-4 py-2 align-top">
                                    <span className="text-left text-xs font-semibold tracking-wider text-gray-700 uppercase">Attachment</span>
                                    <Input
                                        id="attachment"
                                        type="file"
                                        name="budget_amount"
                                        className="rounded-sm shadow-none"
                                        placeholder="Budgeted Amount"
                                        readOnly
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td className="p-4">
                                    <ApproverStamp approverLevel={4} purchaseRequisition={purchaseRequisition} />
                                </td>
                                <td>
                                    {' '}
                                    <TextAreaField
                                        label="Remarks"
                                        id="remarks"
                                        name="remarks"
                                        value={purchaseRequisition.remarks}
                                        placeholder="Enter Remarks"
                                        customClass="mt-4"
                                        onChange={(e) => {
                                            handlePurchaseRequestFieldChange('remarks', e.target.value);
                                        }}
                                        isReadOnly={
                                            !purchaseRequisition.approvers_list?.some(
                                                (approver: any) =>
                                                    Number(approver.approver_id) === Number(useAuthId()) &&
                                                    Number(purchaseRequisition.is_procurement_verified) !== 1, // not already approved
                                            )
                                        }
                                    />
                                </td>
                            </tr>

                            {purchaseRequisition.approvers_list?.some(
                                (approver: any) =>
                                    Number(approver.approver_level) === 4 &&
                                    Number(purchaseRequisition.is_procurement_verified) === 0 &&
                                    String(approver?.approver_id) === String(useAuthId()),
                            ) &&
                                ((purchaseRequisition.budgeted == 0 &&
                                    purchaseRequisition.is_approve1_unbudgeted == 1 &&
                                    purchaseRequisition.is_approve2_unbudgeted == 1) ||
                                    purchaseRequisition.budgeted == 1) && (
                                    <tr>
                                        <td colSpan={2} className="text-center">
                                            <div className="flex flex-col items-center gap-2 md:flex-row md:justify-center">
                                                <DialogAlert
                                                    buttonName="Verify"
                                                    title="Purchase Request"
                                                    remarkFields={false}
                                                    handleSubmit={() => {
                                                        handleVerifyProcurement();
                                                    }}
                                                    isDisabled={!purchaseRequisition.supplier_name || !purchaseRequisition.actual_amount}
                                                />
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
