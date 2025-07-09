import { PurchaseOrder } from '@/types';
import { useAuthFullname } from '@/util/util';

import { TextAreaField, TextDetails } from '@/components/custom/textField';
import { Info } from 'lucide-react';

interface PoFormProps extends React.ComponentProps<'div'> {
    purchaseOrder: PurchaseOrder;
}

export default function PoDetailsForm({ purchaseOrder }: PoFormProps) {
    const authFullname = useAuthFullname();

    return (
        <>
            <div className="flex w-full flex-col space-y-6 rounded bg-white px-6 py-4">
                <span className="text-md flex items-center gap-2 font-semibold text-blue-500">
                    <Info className="h-4 w-4" />
                    Purchase Order Info
                </span>
                <div className="flex w-full justify-between">
                    <div className="flex flex-1 flex-col space-y-4">
                        <TextDetails label="Buyer" value={purchaseOrder.buyer} />
                        <TextDetails label="Confirming To" value={purchaseOrder.confirming_to} />
                    </div>
                    <div className="flex flex-1 flex-col space-y-4">
                        <TextDetails label="Ship To" value={purchaseOrder.ship_to} />
                        <TextDetails label="Address" value={purchaseOrder.ship_to_address} />
                    </div>

                    <div className="flex flex-1 flex-col space-y-4 font-semibold">
                        <TextDetails label="PO No." value={purchaseOrder.po_no} />
                        <TextDetails label="PR No." value={purchaseOrder.purchase_request.pr_no} />
                    </div>
                </div>
                <hr />
                <div className="flex w-full justify-between">
                    <div className="flex flex-1 flex-col space-y-4">
                        <TextDetails label="Vendor" value={purchaseOrder.vendors.supplier_name} />
                        <TextDetails label="Vendor Address" value={purchaseOrder.vendor_address} />
                    </div>
                    <div className="flex flex-1 flex-col space-y-4">
                        <TextDetails label="Vendor Contact" value={purchaseOrder.vendor_contact_person} />
                        <TextDetails label="Vendor Email Address" value={purchaseOrder.vendor_email_address} />
                        <TextDetails label="Vendor Tel. No." value={purchaseOrder.vendor_tel_no} />
                    </div>

                    <div className="flex flex-1 flex-col space-y-4">
                        <TextDetails label="Ship Via" value={purchaseOrder.ship_via} />
                        <TextDetails label="Freight" value={purchaseOrder.freight} />
                        <TextDetails label="Terms" value={purchaseOrder.terms} />
                    </div>
                </div>
                <div className="flex w-full bg-white">
                    <TextAreaField
                        label="Remarks/Justification"
                        id="remarks"
                        name="remarks"
                        value={purchaseOrder.remarks}
                        placeholder="Enter Remarks"
                        customClass="border-none p-0"
                        isReadOnly={true}
                    />
                </div>
            </div>
        </>
    );
}
