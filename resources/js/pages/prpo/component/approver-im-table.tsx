import { DialogAlert } from '@/components/dialogAlert';
import { PurchaseRequisition } from '@/types';
import { useAuthId } from '@/util/util';
import axios from 'axios';

interface ApproverIMTableProps {
    purchaseRequisition: PurchaseRequisition;
}

export default function ApproverIMTable({ purchaseRequisition }: ApproverIMTableProps) {
    const handleApprove = async (approverLevel: any) => {
        try {
            await axios.post('/prpo/purchase-request/approve/' + purchaseRequisition.id, {
                approver_level: approverLevel,
            });
            // Inertia.visit('/prpo/pending_approval');
        } catch (error) {
            // alert('Error saving data.');
        }
    };

    return (
        <>
            <div className="flex w-full gap-4 rounded bg-white shadow">
                <table className="min-w-full divide-y divide-gray-200 rounded shadow">
                    <thead className="bg-gray-100">
                        <tr>
                            {purchaseRequisition.approvers_list?.some((approverItem: any) => Number(approverItem.approver_level) == 1) && (
                                <th className="px-4 py-2 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase">
                                    For IT Related Request
                                </th>
                            )}
                            <th className="px-4 py-2 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase">
                                Requestor Immediate Head
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 bg-white">
                        <tr className="hover:bg-gray-50">
                            {purchaseRequisition.approvers_list
                                ?.filter(
                                    (approverItem: any) => Number(approverItem.approver_level) === 1 || Number(approverItem.approver_level) === 2,
                                )
                                .map((approverItem: any) => (
                                    <td className="px-4 py-2 align-top" key={approverItem.id}>
                                        <div className="space-y-1">
                                            <div className="flex justify-between">
                                                <span className="font-semibold text-gray-700">Name:</span>
                                                <span>
                                                    {approverItem.approver
                                                        ? `${approverItem.approver.nname || ''} ${approverItem.approver.fname || ''} ${approverItem.approver.lname || ''}`.trim() ||
                                                          'N/A'
                                                        : 'N/A'}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-semibold text-gray-700">Status:</span>
                                                <span className="text-sm font-bold">
                                                    {approverItem.is_approve == 1 ? `Approved ${approverItem.approval_date}` : 'Pending'}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-semibold text-gray-700">Remarks:</span>
                                                <span>{approverItem.remarks || ''}</span>
                                            </div>
                                        </div>

                                        {approverItem.approver_id == useAuthId() && approverItem.is_approve == 0 && (
                                            <DialogAlert
                                                buttonName="Approve"
                                                title="Approve Purchase Request"
                                                handleSubmit={() => {
                                                    handleApprove(approverItem.approver_level);
                                                }}
                                            />
                                        )}
                                    </td>
                                ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}
