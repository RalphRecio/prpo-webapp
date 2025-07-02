import { TextAreaField, TextField } from '@/components/custom/textField';
import { PurchaseRequisition } from '@/types';
import { useAuthBusinessUnit, useAuthDepartment, useAuthFullname } from '@/util/util';

interface PrFormProps {
    PurchaseRequisition: PurchaseRequisition;
}

export default function PrDetailsForm({ PurchaseRequisition }: PrFormProps) {
    const today = new Date().toISOString().split('T')[0];

    return (
        <>
            <div className="mt-2 flex w-full justify-end gap-4 rounded border bg-white px-6 py-4 shadow">
                <TextField
                    label="PR No"
                    id="pr_no"
                    type="text"
                    name="pr_no"
                    value={PurchaseRequisition.pr_no ?? null}
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
                        value={PurchaseRequisition.date_issue}
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
                <div className="flex w-full gap-4">
                    <TextField
                        label="Date Needed"
                        id="date_needed"
                        type="text"
                        name="date_needed"
                        value={PurchaseRequisition.date_needed}
                        placeholder="--Auto Generated--"
                        customClass="max-w-2xs"
                        min={new Date().toISOString().split('T')[0]}
                        isReadOnly={true}
                    />
                    <TextField
                        label="Product End User"
                        id="product_end_user"
                        type="text"
                        name="product_end_user"
                        value={PurchaseRequisition.prod_end_user}
                        placeholder="Product End User"
                        customClass="max-w-2xs"
                        isReadOnly={true}
                    />

                    <TextField
                        label="Classification"
                        id="classification"
                        type="text"
                        name="classification"
                        value={PurchaseRequisition.classification.name}
                        placeholder="Classification"
                        customClass="max-w-2xs"
                        isReadOnly={true}
                    />
                </div>
            </div>

            <div className="flex w-full gap-4 rounded bg-white p-4 shadow">
                <TextAreaField
                    label="Remarks"
                    id="remarks"
                    name="remarks"
                    value={PurchaseRequisition.remarks}
                    placeholder="Enter Remarks"
                    isReadOnly={true}
                />
            </div>
        </>
    );
}
