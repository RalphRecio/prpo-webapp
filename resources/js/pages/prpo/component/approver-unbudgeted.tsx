import { DialogAlert } from '@/components/dialogAlert';
import { PurchaseRequisition } from '@/types';
import { useAuthId } from '@/util/util';
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';
import Swal from 'sweetalert2';

interface ApproverFinanceTableProps {
    purchaseRequisition: PurchaseRequisition;
}

export default function ApproverUnbudgeted({ purchaseRequisition }: ApproverFinanceTableProps) {
    const handleApproveUnbugeted = async () => {
        try {
            await axios.post('/prpo/purchase-request/approve-unbudget/' + purchaseRequisition.id);

            Swal.fire('Success!', 'Purchase request reviewed.', 'success').then(() => {
                Inertia.reload(); // Rerender the component with updated data
            });
        } catch (error) {
            // alert('Error saving data.');
        }
    };

    return (
        <>
            {Number(purchaseRequisition.is_finance_verified) === 1 && Number(purchaseRequisition.budgeted) === 0 && (
                <table className="min-w-full divide-y divide-gray-200 rounded shadow">
                    <thead className="bg-gray-100">
                        <tr>
                            <td className="bg-gray-200 p-4 text-center text-lg font-bold" colSpan={2}>
                                Unbugeted Approver
                            </td>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50">
                            {purchaseRequisition.approvers_list
                                ?.filter((approver: any) => Number(approver.approver_level) === 6 || Number(approver.approver_level) === 5)
                                .map((approver: any) => (
                                    <td key={approver.id} className="w-1/2 px-4 py-2 align-top">
                                        <div className="flex flex-col text-center">
                                            {approver.is_approve == 1 ? (
                                                <>
                                                    <span className="text-sm text-gray-800">Approve {approver.approval_date}</span>
                                                    <span className="text-xs text-gray-700 italic">System Generated</span>
                                                </>
                                            ) : (
                                                <span className="text-sm text-gray-800">Pending</span>
                                            )}
                                            <span className="font-bold">
                                                {approver.approver?.fname || ''} {approver.approver?.mname || ''} {approver.approver?.lname || ''}
                                            </span>
                                        </div>

                                        {approver.approver_id == useAuthId() &&
                                            approver.is_approve == 0 &&
                                            // Show only for Approver Level 5 if is_approve1_unbudgeted == 0
                                            ((Number(approver.approver_level) === 5 && purchaseRequisition.is_approve1_unbudgeted == 0) ||
                                                (Number(approver.approver_level) === 6 &&
                                                    purchaseRequisition.is_approve1_unbudgeted == 1 &&
                                                    purchaseRequisition.is_approve2_unbudgeted == 0)) && (
                                                <div className="flex flex-col text-center">
                                                    <DialogAlert
                                                        buttonName="Approve"
                                                        title="Approve Purchase Request"
                                                        handleSubmit={() => {
                                                            handleApproveUnbugeted();
                                                        }}
                                                    />
                                                </div>
                                            )}
                                    </td>
                                ))}
                        </tr>
                    </tbody>
                </table>
            )}
        </>
    );
}
