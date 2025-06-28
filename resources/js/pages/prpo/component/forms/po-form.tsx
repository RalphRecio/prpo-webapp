import { PurchaseOrder, PurchaseRequisition, Vendor } from '@/types';
import { useAuthFullname } from '@/util/util';

import { SelectField } from '@/components/custom/selectField';
import { TextAreaField, TextField } from '@/components/custom/textField';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useEffect } from 'react';

interface PoFormProps extends React.ComponentProps<'div'> {
    purchaseRequest: PurchaseRequisition;
    vendorList: Vendor[];
    purchaseOrderDetails: PurchaseOrder | undefined;
    setPurchaseOrderDetails: (order: PurchaseOrder) => void;
}

export default function PoForm({ purchaseRequest, vendorList, purchaseOrderDetails, setPurchaseOrderDetails }: PoFormProps) {
    const authFullname = useAuthFullname();

    const vendorOptions = vendorList.map((vendor) => ({
        value: vendor.id,
        label: vendor.supplier_name,

        email: vendor.email,
        address: vendor.address,
        contact_person: vendor.contact_person,
        contact_number: vendor.contact_number,
    }));

    const shipViaOptions = [
        { value: 'land', label: 'Land' },
        { value: 'sea', label: 'Sea' },
        { value: 'air', label: 'Air' },
    ];

    const freightOptions = [
        { value: 'air freight', label: 'Air Freight' },
        { value: 'land freight', label: 'Land Freight' },
        { value: 'ocean freight', label: 'Ocean Freight' },
        { value: 'rail freight', label: 'Rail Freight' },
    ];

    function handlePurchaseOrderFieldChange(fieldOrFields: keyof PurchaseOrder | Partial<PurchaseOrder>, value?: any) {
        if (!purchaseOrderDetails) return;

        if (typeof fieldOrFields === 'object') {
            setPurchaseOrderDetails({
                ...purchaseOrderDetails,
                ...fieldOrFields,
            });
        } else {
            setPurchaseOrderDetails({
                ...purchaseOrderDetails,
                [fieldOrFields]: value,
            });
        }
    }

    useEffect(() => {
        if (purchaseOrderDetails) {
            setPurchaseOrderDetails({
                ...purchaseOrderDetails,
                pr_id: purchaseRequest.id,
                buyer: authFullname,
                confirming_to: purchaseRequest.bu.name,
            });
        }
    }, [authFullname]);

    return (
        <>
            <div className="mt-2 flex w-full justify-end gap-4 rounded border bg-white px-6 py-4 shadow">
                {/* <div className="flex-1 justify-start">
                    <img
                        src={
                            auth.user.bu_id == 1
                                ? `${window.location.origin}/storage/suhay_logo.png`
                                : auth.user.bu_id == 2
                                  ? `${window.location.origin}/storage/alibata_logo.png`
                                  : ''
                        }
                        alt=""
                        style={{ width: '150px', objectFit: 'contain' }}
                    />
                </div> */}
                <TextField
                    label="PO No"
                    id="po_no"
                    type="text"
                    name="po_no"
                    value={''}
                    isReadOnly={true}
                    placeholder="--Auto Generated--"
                    customClass="max-w-2xs"
                />
                <TextField
                    label="PR No"
                    id="pr_no"
                    type="text"
                    name="pr_no"
                    value={purchaseRequest.pr_no}
                    isReadOnly={true}
                    placeholder="--Auto Generated--"
                    customClass="max-w-2xs"
                />
            </div>
            <div className="rounded border bg-white p-4 shadow">
                <div className="flex w-full gap-4">
                    <TextField
                        label="Buyer"
                        id="buyer"
                        type="text"
                        name="buyer"
                        value={useAuthFullname()}
                        customClass=" font-bold"
                        placeholder="--Auto Generated--"
                        isReadOnly={true}
                    />

                    <TextField
                        label="Confirming To"
                        id="confirming_to"
                        type="text"
                        name="confirming_to"
                        value={purchaseRequest.bu.name}
                        placeholder="Confirming to"
                        customClass=" font-bold"
                        isReadOnly={true}
                    />
                </div>
            </div>
            <div className="rounded border bg-white p-4 shadow">
                <div className="flex w-full gap-4">
                    <div className="flex-1">
                        <SelectField
                            id="vendor"
                            label="Vendor"
                            name="vendor"
                            value={purchaseOrderDetails?.vendor_id}
                            options={vendorOptions}
                            placeholder="Select a vendor"
                            onChange={(selected) => {
                                handlePurchaseOrderFieldChange({
                                    vendor_id: selected.value,
                                    vendor_name: selected.label,
                                    vendor_address: selected.address,
                                    vendor_contact_person: selected.contact_person,
                                    vendor_email_address: selected.email,
                                    vendor_tel_no: selected.contact_number,
                                });
                            }}
                        />
                        <Textarea
                            className="mt-2"
                            value={purchaseOrderDetails?.vendor_address || ''}
                            onChange={(e) => handlePurchaseOrderFieldChange('vendor_address', e.target.value)}
                        />
                    </div>

                    <div className="flex-1">
                        <Label htmlFor="requestor_id" className="mb-1 mb-2 block font-bold text-gray-800">
                            Ship To
                        </Label>
                        <Input className="mb-2" value={purchaseRequest.bu.name} readOnly />
                        <Textarea
                            value={purchaseRequest.bu_id == 1 ? 'Paseo de Sta. Rosa, Greenfield City, Sta. Rosa, Laguna Philippines 4026' : ''}
                            readOnly
                        />
                    </div>
                </div>
                <div className="mt-4 flex w-full gap-4">
                    <TextField
                        label="Vendor Contact Person"
                        id="vendor_contact_person"
                        type="text"
                        name="vendor_contact_person"
                        value={purchaseOrderDetails?.vendor_contact_person || ''}
                        placeholder="Vendor Contact Person"
                        onChange={(e) => handlePurchaseOrderFieldChange('vendor_contact_person', e.target.value)}
                    />

                    <TextField
                        label="Vendor Email Address"
                        id="vendor_email_address"
                        type="text"
                        name="vendor_email_address"
                        value={purchaseOrderDetails?.vendor_email_address || ''}
                        placeholder="Vendor Email Address"
                        onChange={(e) => handlePurchaseOrderFieldChange('vendor_email_address', e.target.value)}
                    />

                    <TextField
                        label="Vendor Tel. No."
                        id="vendor_tel_no"
                        type="text"
                        name="vendor_tel_no"
                        value={purchaseOrderDetails?.vendor_tel_no || ''}
                        placeholder="Vendor Tel. No."
                        onChange={(e) => handlePurchaseOrderFieldChange('vendor_tel_no', e.target.value)}
                    />
                </div>
            </div>

            <div className="rounded border bg-white p-4 shadow">
                <div className="mt-4 flex w-full gap-4">
                    <SelectField
                        id="ship_via"
                        label="Ship Via"
                        name="ship_via"
                        value={purchaseOrderDetails?.ship_via || ''}
                        options={shipViaOptions}
                        placeholder="Ship Via"
                        onChange={(selected) => handlePurchaseOrderFieldChange('ship_via', selected ? selected.value : '')}
                    />
                    <SelectField
                        id="freight"
                        label="Freight"
                        name="freight"
                        value={purchaseOrderDetails?.freight || ''}
                        options={freightOptions}
                        placeholder="Freight"
                        onChange={(selected) => handlePurchaseOrderFieldChange('freight', selected ? selected.value : '')}
                    />

                    <TextField
                        label="Terms"
                        id="term"
                        type="text"
                        name="term"
                        value={purchaseOrderDetails?.terms || ''}
                        placeholder="Enter Terms"
                        onChange={(e) => handlePurchaseOrderFieldChange('terms', e.target.value)}
                    />
                </div>

                <TextAreaField
                    label="Remarks"
                    id="remarks"
                    name="remarks"
                    value={purchaseOrderDetails?.remarks || ''}
                    placeholder="Enter Remarks"
                    customClass="mt-4"
                    onChange={(e) => handlePurchaseOrderFieldChange('remarks', e.target.value)}
                />
            </div>
        </>
    );
}
