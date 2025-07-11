import { SelectField } from '@/components/custom/selectField';
import { TextAreaField, TextDetails, TextField } from '@/components/custom/textField';
import { Classification, PurchaseRequisition } from '@/types';
import { useAuthBusinessUnit, useAuthDepartment, useAuthFullname } from '@/util/util';
import { Info } from 'lucide-react';

interface PrFormProps {
    purchaseRequestDetails: PurchaseRequisition;
    handlePurchaseRequestFieldChange: (field: string, value: any) => void;
    errors: any;
    classification: Classification[];
}

export default function PrForm({ purchaseRequestDetails, errors, handlePurchaseRequestFieldChange, classification }: PrFormProps) {
    const today = (() => {
        const d = new Date();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        const yyyy = d.getFullYear();
        return `${mm}/${dd}/${yyyy}`;
    })();

    const classificationOption = classification.map((option) => ({
        label: option.name,
        value: option.id,
        is_it_related: option.it_related,
    }));

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
                        <TextDetails label="Date Issue" value={today} />
                    </div>
                    <div className="flex flex-1 flex-col space-y-4">
                        <TextDetails label="Business Unit" value={useAuthBusinessUnit()} />
                        <TextDetails label="Department" value={useAuthDepartment()} />
                    </div>
                </div>
            </div>
            <div className="mt-2 flex w-full flex-col space-y-6 rounded bg-white px-6 py-4">
                <span className="flex items-center gap-2 text-sm font-semibold text-gray-500">Enter Details</span>
                <div className="flex w-full gap-4">
                    <TextField
                        label="Date Needed"
                        id="date_needed"
                        type="date"
                        name="date_needed"
                        value={purchaseRequestDetails.date_needed}
                        placeholder="--Auto Generated--"
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => handlePurchaseRequestFieldChange('date_needed', e.target.value)}
                        isRequired
                        customClass="max-w-2xs"
                        isError={errors.date_needed}
                    />

                    <TextField
                        label="Product End User"
                        id="product_end_user"
                        type="text"
                        name="product_end_user"
                        value={purchaseRequestDetails.prod_end_user}
                        placeholder="Product End User"
                        customClass="max-w-2xs"
                        onChange={(e) => {
                            handlePurchaseRequestFieldChange('prod_end_user', e.target.value);
                        }}
                        isRequired
                        isError={errors.prod_end_user}
                    />
                    <SelectField
                        id="classification"
                        label="Classification"
                        name="classification"
                        value={purchaseRequestDetails.classification_id}
                        options={classificationOption}
                        placeholder="Select a classification"
                        onChange={(selected) => {
                            handlePurchaseRequestFieldChange('classification_id', selected ? selected.value : '');
                            handlePurchaseRequestFieldChange('is_it_related', selected ? selected.is_it_related : '');
                        }}
                        isRequired
                        isError={errors.classification_id}
                    />
                </div>
            </div>

            <div className="flex w-full gap-4 rounded bg-white p-4">
                <TextAreaField
                    label="Remarks/Justification"
                    id="remarks"
                    name="remarks"
                    value={purchaseRequestDetails.remarks}
                    placeholder="Enter Remarks"
                    onChange={(e) => {
                        handlePurchaseRequestFieldChange('remarks', e.target.value);
                    }}
                    isRequired
                    isError={errors.remarks}
                />
            </div>
        </>
    );
}
