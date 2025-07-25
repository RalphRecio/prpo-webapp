import { DialogAlert } from '@/components/dialogAlert';
import { PurchaseRequisition } from '@/types';
import { useAuthId } from '@/util/util';
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';
import Swal from 'sweetalert2';

interface ApproverOverbudgetProps {
    purchaseRequisition: PurchaseRequisition;
}
export default function ApproverOverbudget({ purchaseRequisition }: ApproverOverbudgetProps) {
    const handleApproveOverbuget = async () => {
        try {
            await axios.post('/prpo/purchase-request/approve-overbudget/' + purchaseRequisition.id);

            Swal.fire('Success!', 'Purchase request reviewed.', 'success').then(() => {
                Inertia.reload(); // Rerender the component with updated data
            });
        } catch (error) {
            Swal.fire('Error!', 'There was an error submitting your purchase request.', 'error');
        }
    };

    const handleDisapproveOverbudget = async (approver: any, remarks: string) => {
        try {
            await axios.post('/prpo/purchase-request/disapprove/' + purchaseRequisition.id, {
                ...approver,
                remarks: remarks,
            });

            Swal.fire('Success!', 'Purchase request disapproved.', 'success').then(() => {
                Inertia.reload(); // Rerender the component with updated data
            });
        } catch (error) {
            Swal.fire('Error!', 'There was an error submitting your purchase request.', 'error');
        }
    };

    return (
        <>
            {/* OVERBUDGET APPROVING */}
            {Number(purchaseRequisition.is_procurement_verified) == 1 && Number(purchaseRequisition.is_overbudget) == 1 && (
                <div className="flex w-full gap-4 rounded bg-white shadow">
                    <table className="min-w-full divide-y divide-gray-200 rounded shadow">
                        <thead className="bg-gray-100">
                            <tr>
                                <td className="bg-gray-200 p-4 text-center text-lg font-bold" colSpan={2}>
                                    Over budget Approver
                                </td>
                            </tr>
                        </thead>
                        {/* {JSON.stringify(purchaseRequisition.approvers_list?.filter((approver: any) => Number(approver.approver_level) === 5))} */}
                        <tbody className="divide-y divide-gray-200">
                            <tr className="hover:bg-gray-50">
                                {purchaseRequisition.approvers_list
                                    ?.filter((approver: any) => Number(approver.approver_level) === 7 || Number(approver.approver_level) === 8)
                                    .map((approver: any) => (
                                        <td className="w-1/2 px-4 py-2 align-top">
                                            <div className="flex flex-col text-center">
                                                {approver.is_approve == 1 ? (
                                                    <>
                                                        <span className="text-sm font-semibold text-green-700">
                                                            Approved {approver.approval_date}
                                                        </span>
                                                        <span className="text-xs text-gray-700 italic">System Generated</span>
                                                    </>
                                                ) : approver.is_approve == 2 ? (
                                                    <>
                                                        <span className="text-sm font-semibold text-red-700">
                                                            Disapproved {approver.approval_date}
                                                        </span>
                                                        <span className="text-xs text-gray-700 italic">System Generated</span>
                                                    </>
                                                ) : (
                                                    <span className="text-sm text-gray-800">Pending</span>
                                                )}
                                                <span className="font-bold">
                                                    {approver.approver?.fname || ''} {approver.approver?.mname || ''} {approver.approver?.lname || ''}
                                                </span>

                                                {approver.remarks && approver.remarks.length > 0 && (
                                                    <p className="rounded p-2 text-sm text-gray-500 text-gray-600">
                                                        Remarks:
                                                        {approver.remarks || 'no remarks'}
                                                    </p>
                                                )}
                                            </div>

                                            {approver.approver_id == useAuthId() && approver.is_approve == 0 && (
                                                <div className="flex flex-row items-center justify-center text-center">
                                                    <DialogAlert
                                                        buttonName="Approve"
                                                        title="Approve Purchase Request"
                                                        remarkFields={false}
                                                        handleSubmit={() => {
                                                            handleApproveOverbuget();
                                                        }}
                                                    />
                                                    <DialogAlert
                                                        buttonName="Disapprove"
                                                        title="Disapprove Purchase Request"
                                                        handleSubmit={(remarks) => {
                                                            handleDisapproveOverbudget(approver, remarks);
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
            )}
        </>
    );
}
