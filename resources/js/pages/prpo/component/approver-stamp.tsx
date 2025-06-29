import { PurchaseRequisition } from '@/types';

interface ApproverStampProps {
    purchaseRequisition: PurchaseRequisition;
    approverLevel: number;
}
export function ApproverStamp({ purchaseRequisition, approverLevel }: ApproverStampProps) {
    return (
        <>
            <div className="flex flex-col text-center">
                <span className="text-sm text-gray-800">
                    {purchaseRequisition.approvers_list?.find(
                        (approver: any) => Number(approver.approver_level) === approverLevel && Number(approver.is_approve) === 1,
                    )
                        ? `Verified ${
                              purchaseRequisition.approvers_list.find(
                                  (approver: any) => Number(approver.approver_level) === approverLevel && Number(approver.is_approve) === 1,
                              )?.approval_date
                          }`
                        : ''}
                </span>

                {purchaseRequisition.approvers_list?.find(
                    (approver: any) => Number(approver.approver_level) === approverLevel && Number(approver.is_approve) === 1,
                ) ? (
                    <span className="text-xs text-gray-700 italic">System Generated</span>
                ) : (
                    <span className="text-sm text-gray-700">Pending for Review</span>
                )}

                <span className="font-bold">
                    {(() => {
                        const approver = purchaseRequisition.approvers_list?.find(
                            (approver: any) => Number(approver.approver_level) === approverLevel && Number(approver.is_approve) === 1,
                        )?.approver;
                        return approver ? `${approver.fname || ''} ${approver.mname || ''} ${approver.lname || ''}`.trim() : '';
                    })()}
                </span>
            </div>
        </>
    );
}
