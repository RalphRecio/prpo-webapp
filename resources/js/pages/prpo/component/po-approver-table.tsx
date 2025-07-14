import { DialogAlert } from '@/components/dialogAlert';
import { PoApproverList } from '@/types';
import { useAuthId } from '@/util/util';

import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';
import Swal from 'sweetalert2';

interface PoApproverTableProps extends React.ComponentProps<'div'> {
    PurchaseOrderId?: number;
    PoApproverList?: PoApproverList[];
    preparedBy?: string;
    datePrepared?: string | null;
}

export default function PoApproverTable({ PurchaseOrderId, PoApproverList, preparedBy, datePrepared }: PoApproverTableProps) {
    const handleApprove = async (approverLevel: any) => {
        try {
            await axios.post('/prpo/purchase-order/approve/' + PurchaseOrderId, {
                approver_level: approverLevel,
            });

            Swal.fire('Success!', 'Your purchase order has been submitted.', 'success').then(() => {
                Inertia.reload();
            });
        } catch (error) {
            console.error(error);
            Swal.fire('Error!', 'An error occurred while approving the purchase order.', 'error');
        }
    };
    const handleDisapprove = async (approverItem: any, remarks: string) => {
        try {
            await axios.post('/prpo/purchase-order/disapprove/' + PurchaseOrderId, {
                ...approverItem,
                remarks,
            });
            Swal.fire('Success!', 'Purchase Order has been disapproved.', 'success');
            Inertia.reload();
        } catch (error) {
            console.error(error);
            Swal.fire('Error!', 'An error occurred while disapproving the purchase order.', 'error');
        }
    };

    return (
        <div className="flex w-full gap-4 rounded bg-white">
            <table className="min-w-full divide-y divide-gray-200 rounded text-sm text-gray-500">
                <thead className="text-center">
                    <tr>
                        <th className="px-4 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">Prepared By</th>
                        <th className="px-4 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">Reviewed By</th>
                        <th className="px-4 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">Approved By</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>
                        <td className="w-1/3 justify-center px-4 py-2 text-center align-top">
                            <div className="flex flex-col items-center">
                                <span className="font-bold">{preparedBy}</span>
                                <span className="text-xs text-gray-500">{datePrepared}</span>
                            </div>
                        </td>

                        {PoApproverList?.map((approverItem: any) => (
                            <td className="px-4 py-2 align-top" key={approverItem.id}>
                                <div className="space-y-1">
                                    <div className="flex flex-col text-center">
                                        {approverItem.is_approve == 1 ? (
                                            <>
                                                <span className="text-sm font-semibold text-green-700">Approved {approverItem.approval_date}</span>
                                                <span className="text-xs text-gray-700 italic">System Generated</span>
                                            </>
                                        ) : approverItem.is_approve == 2 ? (
                                            <>
                                                <span className="text-sm font-semibold text-red-700">Disapproved {approverItem.approval_date}</span>
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

                                {approverItem.approver_id == useAuthId() && approverItem.is_send_count == 1 && approverItem.is_approve == 0 && (
                                    <div className="flex flex-row items-center justify-center text-center">
                                        <DialogAlert
                                            buttonName="Approve"
                                            title="Approve Purchase Order"
                                            remarkFields={false}
                                            handleSubmit={(remarks) => {
                                                handleApprove(approverItem.approver_level);
                                            }}
                                        />
                                        <DialogAlert
                                            buttonName="Disapprove"
                                            title="Disapprove Purchase Order"
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
    );
}
