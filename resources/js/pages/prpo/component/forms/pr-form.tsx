import { SelectField } from '@/components/custom/selectField';
import { TextAreaField, TextField } from '@/components/custom/textField';
import { Classification, PurchaseRequisition } from '@/types';
import { useAuthBusinessUnit, useAuthDepartment, useAuthFullname } from '@/util/util';

interface PrFormProps {
    purchaseRequestDetails: PurchaseRequisition;
    handlePurchaseRequestFieldChange: (field: string, value: any) => void;

    classification: Classification[];
}

export default function PrForm({ purchaseRequestDetails, handlePurchaseRequestFieldChange, classification }: PrFormProps) {
    const today = new Date().toISOString().split('T')[0];

    const classificationOption = classification.map((option) => ({
        label: option.name,
        value: option.id,
        is_it_related: option.it_related,
    }));

    return (
        <>
            <div className="mt-2 flex w-full justify-end gap-4 rounded border bg-white px-6 py-4 shadow">
                <TextField
                    label="PR No"
                    id="pr_no"
                    type="text"
                    name="pr_no"
                    value={''}
                    isReadOnly={true}
                    placeholder="--Auto Generated--"
                    customClass="max-w-2xs font-bold"
                />
            </div>

            <div className="rounded border bg-white p-4 shadow">
                <div className="flex w-full gap-4">
                    <TextField
                        label="Name of Requestor"
                        id="name_of_requestor"
                        type="text"
                        name="name_of_requestor"
                        value={useAuthFullname()}
                        isReadOnly={true}
                        placeholder="--Auto Generated--"
                        customClass="max-w-2xs font-bold"
                    />

                    <TextField
                        label="Date Issue"
                        id="date_issue"
                        type="text"
                        name="date_issue"
                        value={today}
                        isReadOnly={true}
                        placeholder="--Auto Generated--"
                        customClass="max-w-2xs font-bold"
                    />

                    <TextField
                        label="Business Unit"
                        id="business_unit"
                        type="text"
                        name="business_unit"
                        value={useAuthBusinessUnit()}
                        isReadOnly={true}
                        customClass="max-w-2xs font-bold"
                    />

                    <TextField
                        label="Department"
                        id="department"
                        type="text"
                        name="department"
                        value={useAuthDepartment()}
                        isReadOnly={true}
                        customClass="max-w-2xs font-bold"
                    />
                </div>
            </div>

            <div className="rounded border bg-white p-4 shadow">
                <div className="mt-4 flex w-full gap-4">
                    <TextField
                        label="Date Needed"
                        id="date_needed"
                        type="date"
                        name="date_needed"
                        value={purchaseRequestDetails.date_needed}
                        placeholder="--Auto Generated--"
                        customClass="max-w-2xs"
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => handlePurchaseRequestFieldChange('date_needed', e.target.value)}
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
                    />
                </div>
            </div>

            <div className="flex w-full gap-4 rounded bg-white p-4 shadow">
                <TextAreaField
                    label="Remarks"
                    id="remarks"
                    name="remarks"
                    value={purchaseRequestDetails.remarks}
                    placeholder="Enter Remarks"
                    customClass="mt-4"
                    onChange={(e) => {
                        handlePurchaseRequestFieldChange('remarks', e.target.value);
                    }}
                />
            </div>
        </>
    );
}
