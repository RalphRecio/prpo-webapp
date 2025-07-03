import { TextAreaField, TextDetails } from '@/components/custom/textField';
import { PurchaseRequisition } from '@/types';
import { useAuthFullname } from '@/util/util';
import { Info } from 'lucide-react';

interface PrFormProps {
    PurchaseRequisition: PurchaseRequisition;
}

export default function PrDetailsForm({ PurchaseRequisition }: PrFormProps) {
    const today = new Date().toISOString().split('T')[0];

    return (
        <>
            <div className="mt-2 flex w-full flex-col space-y-6 rounded bg-white px-6 py-4">
                <span className="text-md flex items-center gap-2 font-semibold text-blue-500">
                    <Info className="h-4 w-4" />
                    Purchase Requisition Info
                </span>
                <div className="flex w-full justify-between">
                    <div className="flex flex-1 flex-col space-y-4">
                        <TextDetails label="Name of Requestor" value={useAuthFullname()} />
                        <TextDetails label="Date Issue" value={PurchaseRequisition.date_issue} />
                        <TextDetails label="Date Needed" value={PurchaseRequisition.date_needed} />
                        <TextDetails label="Product End User" value={PurchaseRequisition.prod_end_user} />
                    </div>
                    <div className="flex flex-1 flex-col space-y-4">
                        <TextDetails label="Business Unit" value={PurchaseRequisition.bu.name} />
                        <TextDetails label="Department" value={PurchaseRequisition.department.name} />
                        <TextDetails label="Classification" value={PurchaseRequisition.classification.name} />
                    </div>
                    <div className="flex flex-1 flex-col space-y-4 font-semibold">
                        <TextDetails label="PR No." value={PurchaseRequisition.pr_no} />
                    </div>
                </div>

                <div className="flex w-full bg-white">
                    <TextAreaField
                        label="Remarks/Justification"
                        id="remarks"
                        name="remarks"
                        value={PurchaseRequisition.remarks}
                        placeholder="Enter Remarks"
                        customClass="border-none p-0"
                        isReadOnly={true}
                    />
                </div>
            </div>
        </>
    );
}
