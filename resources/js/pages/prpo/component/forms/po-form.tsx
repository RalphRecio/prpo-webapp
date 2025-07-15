import { PurchaseOrder, PurchaseRequisition, Vendor } from '@/types';
import { useAuthFullname } from '@/util/util';

import { SelectField } from '@/components/custom/selectField';
import { TextAreaField, TextDetails, TextField } from '@/components/custom/textField';
import { useEffect, useState } from 'react';

import Modal from '@/components/ui/modal';
import PrItems from '../pr-items';

interface PoFormProps extends React.ComponentProps<'div'> {
    purchaseRequest: PurchaseRequisition;
    vendorList: Vendor[];
    purchaseOrderDetails: PurchaseOrder | undefined;
    errors: any;
    setPurchaseOrderDetails: (order: PurchaseOrder) => void;
}

export default function PoForm({ purchaseRequest, vendorList, purchaseOrderDetails, setPurchaseOrderDetails, errors }: PoFormProps) {
    const authFullname = useAuthFullname();

    const [isModalOpen, setIsModalOpen] = useState(false);

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
                ship_to: purchaseRequest.bu.name,
                ship_to_address: purchaseRequest.bu_id == 1 ? 'Paseo de Sta. Rosa, Greenfield City, Sta. Rosa, Laguna Philippines 4026' : '',
            });
        }
    }, [authFullname]);

    return (
        <>
            <div className="mt-2 flex w-full flex-col space-y-6 rounded bg-white px-6 py-4">
                <span className="text-md flex items-center gap-2 font-semibold text-blue-500">
                    {/* <Info className="h-4 w-4" /> */}
                    Purchase Order Info
                </span>
                <div className="flex w-full justify-between">
                    <div className="flex flex-1 flex-col space-y-4">
                        <TextDetails label="Buyer" value={useAuthFullname()} />
                        <TextDetails label="Confirming To" value={purchaseRequest.bu.name} />
                    </div>
                    <div className="flex flex-1 flex-col space-y-4">
                        <TextDetails label="Ship To" value={purchaseRequest.bu.name} />
                        <TextDetails
                            label="Address"
                            value={(() => {
                                switch (Number(purchaseRequest.bu_id)) {
                                    case 1:
                                        return 'Paseo de Sta. Rosa, Greenfield City, Sta. Rosa, Laguna Philippines 4026';
                                    case 2:
                                        return 'KKM Address';
                                    case 3:
                                        return 'Alibata Address';
                                    default:
                                        return '';
                                }
                            })()}
                        />
                    </div>
                    <div className="flex flex-1 flex-col space-y-4 font-semibold">
                        <TextDetails
                            customClass="transition-colors duration-150 hover:text-blue-600 text-blue-800"
                            label="PR No."
                            value={purchaseRequest.pr_no}
                            onClick={() => setIsModalOpen(true)}
                        />
                    </div>
                </div>
            </div>

            <div className="rounded bg-white p-4">
                <span className="flex items-center gap-2 text-sm font-semibold text-gray-500">Enter Details</span>
                <div className="flex w-full gap-4">
                    <div className="w-1/2">
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
                            isError={errors.vendor_id}
                        />
                    </div>
                    <div className="w-1/2">
                        <TextAreaField
                            label="Vendor Address"
                            id="vendor_address"
                            name="vendor_address"
                            value={purchaseOrderDetails?.vendor_address || ''}
                            placeholder="Enter Vendor Address"
                            onChange={(e) => handlePurchaseOrderFieldChange('vendor_address', e.target.value)}
                            isError={errors.vendor_address}
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
                        isError={errors.vendor_contact_person}
                    />

                    <TextField
                        label="Vendor Email Address"
                        id="vendor_email_address"
                        type="text"
                        name="vendor_email_address"
                        value={purchaseOrderDetails?.vendor_email_address || ''}
                        placeholder="Vendor Email Address"
                        onChange={(e) => handlePurchaseOrderFieldChange('vendor_email_address', e.target.value)}
                        isError={errors.vendor_email_address}
                    />

                    <TextField
                        label="Vendor Tel. No."
                        id="vendor_tel_no"
                        type="text"
                        name="vendor_tel_no"
                        value={purchaseOrderDetails?.vendor_tel_no || ''}
                        placeholder="Vendor Tel. No."
                        onChange={(e) => handlePurchaseOrderFieldChange('vendor_tel_no', e.target.value)}
                        isError={errors.vendor_tel_no}
                    />
                </div>
            </div>

            <div className="rounded bg-white p-4">
                <div className="mt-4 flex w-full gap-4">
                    <SelectField
                        id="ship_via"
                        label="Ship Via"
                        name="ship_via"
                        value={purchaseOrderDetails?.ship_via || ''}
                        options={shipViaOptions}
                        placeholder="Ship Via"
                        onChange={(selected) => handlePurchaseOrderFieldChange('ship_via', selected ? selected.value : '')}
                        isError={errors.ship_via}
                    />
                    <SelectField
                        id="freight"
                        label="Freight"
                        name="freight"
                        value={purchaseOrderDetails?.freight || ''}
                        options={freightOptions}
                        placeholder="Freight"
                        onChange={(selected) => handlePurchaseOrderFieldChange('freight', selected ? selected.value : '')}
                        isError={errors.freight}
                    />

                    <TextField
                        label="Terms"
                        id="term"
                        type="text"
                        name="term"
                        value={purchaseOrderDetails?.terms || ''}
                        placeholder="Enter Terms"
                        onChange={(e) => handlePurchaseOrderFieldChange('terms', e.target.value)}
                        isError={errors.terms}
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
                    isError={errors.remarks}
                />
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Purchase Order Details">
                <PrItems purchaseRequestItems={purchaseRequest?.purchase_requisition_items} />
            </Modal>
        </>
    );
}
