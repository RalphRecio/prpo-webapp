import { DialogAlert } from '@/components/dialogAlert';
import { PurchaseRequisition } from '@/types';
import { useAuthId } from '@/util/util';
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';
import Swal from 'sweetalert2';

interface ApproverIMTableProps {
    purchaseRequisition: PurchaseRequisition;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

export default function ApproverIMTable({ purchaseRequisition, loading, setLoading }: ApproverIMTableProps) {
    const handleApprove = async (approverLevel: any, remarks: string) => {
        setLoading(true);
        try {
            await axios.post('/prpo/purchase-request/approve/' + purchaseRequisition.id, {
                approver_level: approverLevel,
                remarks,
            });

            Swal.fire('Success!', 'Purchase Request Approved.', 'success').then(() => {
                Inertia.reload();
            });
        } catch (error) {
            console.error(error);
            Swal.fire('Error!', 'Failed to submit your purchase request.', 'error');
        }
    };

    const handleDisapprove = async (approverItem: any, remarks: string) => {
        setLoading(true);
        try {
            await axios.post('/prpo/purchase-request/disapprove/' + purchaseRequisition.id, {
                ...approverItem,
                remarks,
            });
            Swal.fire('Success!', 'Purchase request has been disapproved.', 'success');
            Inertia.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="flex w-full gap-4 rounded bg-white">
                <table className="min-w-full divide-y divide-gray-200 rounded">
                    <thead className="bg-gray-900 p-4 text-white">
                        <tr>
                            {purchaseRequisition.approvers_list?.some((approverItem: any) => Number(approverItem.approver_level) == 1) && (
                                <th className="px-4 py-2 text-center text-xs font-semibold tracking-wider uppercase">For IT Related Request</th>
                            )}
                            <th className="px-4 py-2 text-center text-xs font-semibold tracking-wider uppercase">Requestor Immediate Head</th>
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
                                            <div className="flex flex-col text-center">
                                                {approverItem.is_approve == 1 ? (
                                                    <>
                                                        <span className="text-sm font-semibold text-green-700">
                                                            Approved {approverItem.approval_date}
                                                        </span>
                                                        <span className="text-xs text-gray-700 italic">System Generated</span>
                                                    </>
                                                ) : approverItem.is_approve == 2 ? (
                                                    <>
                                                        <span className="text-sm font-semibold text-red-700">
                                                            Disapproved {approverItem.approval_date}
                                                        </span>
                                                        <span className="text-xs text-gray-700 italic">System Generated</span>
                                                    </>
                                                ) : (
                                                    <span className="text-sm text-gray-800">Pending</span>
                                                )}

                                                <span className="font-bold">
                                                    {approverItem.approver?.fname || ''} {approverItem.approver?.mname || ''}{' '}
                                                    {approverItem.approver?.lname || ''}
                                                </span>
                                            </div>
                                            {approverItem.remarks && approverItem.remarks.length > 0 && (
                                                <p className="rounded border p-2 text-sm text-gray-600 text-red-500">
                                                    {approverItem.remarks || 'no remarks'}
                                                </p>
                                            )}
                                        </div>

                                        {!purchaseRequisition.status?.toLowerCase().includes('disapprove') &&
                                            approverItem.approver_id == useAuthId() &&
                                            approverItem.is_send_count == 1 &&
                                            approverItem.is_approve == 0 && (
                                                <div className="flex flex-row items-center justify-center text-center">
                                                    <DialogAlert
                                                        buttonName="Approve"
                                                        title="Approve Purchase Request"
                                                        remarkFields={false}
                                                        handleSubmit={(remarks) => {
                                                            handleApprove(approverItem.approver_level, remarks);
                                                        }}
                                                    />
                                                    <DialogAlert
                                                        buttonName="Disapprove"
                                                        title="Disapprove Purchase Request"
                                                        handleSubmit={(remarks) => {
                                                            handleDisapprove(approverItem, remarks);
                                                        }}
                                                    />
                                                </div>
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
