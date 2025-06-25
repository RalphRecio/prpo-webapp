import { DataTable } from '@/components/app-datatable';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Classification, SharedData, User } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Save } from 'lucide-react';
import { useState } from 'react';
import Select from 'react-select';
import ApproverTable from './component/approver-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Purchase Requisition',
        href: '/prpo/purchase-request',
    },
];

export default function CreatePr() {
    const { classification } = usePage<{
        classification: Classification[];
    }>().props;

    const page = usePage<SharedData & { auth: { user: User } }>();
    const { auth } = page.props;

    const today = new Date().toISOString().split('T')[0];

    const [errors, setErrors] = useState({
        // pr_no: false,
        date_needed: false,
        prod_end_user: false,
        classification_id: false,
    });

    //fields
    const [prNo, setPrNo] = useState<string>('');
    const [dateIssue, setDateIssue] = useState<string>(today);
    const [dateNeeded, setDateNeeded] = useState<string>('');
    const [productEndUser, setProductEndUser] = useState<string>('');
    const [classificationId, setClassificationId] = useState<number>();
    const [remarks, setRemarks] = useState<string>('');
    const [status, setStatus] = useState<string>('');

    const [itRelated, setItRelated] = useState<number>(0);
    const [items, setItems] = useState<any[]>([]);

    const [loading, setLoading] = useState<boolean>();

    const classificationOptions = classification.map((classItem) => ({
        value: classItem.id,
        label: classItem.name,
        it_related: classItem.it_related,
    }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = {
            // pr_no: !prNo,
            date_needed: !dateNeeded,
            prod_end_user: !productEndUser,
            classification_id: !classificationId,
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some(Boolean)) {
            return;
        }

        setLoading(true);

        const payload = {
            pr_no: prNo,
            requestor_id: auth.user.id,
            date_issue: dateIssue,
            date_needed: dateNeeded,
            bu_id: auth.user.bu_id,
            department_id: auth.user.dept_id,
            prod_end_user: productEndUser,
            classification_id: classificationId,
            is_it_related: itRelated,
            im_supervisor_id: auth.user.immediate_head_id,
            remarks,
            items: items,
        };

        try {
            const response = await axios.post('/prpo/purchase-request', payload);
            Inertia.visit('/prpo/purchase-request');
        } catch (error) {}
    };

    return (
        <div className="flex h-screen flex-col">
            <AppLayout breadcrumbs={breadcrumbs}>
                {/* {JSON.stringify(auth.user)} */}
                <Head title="Create PR" />
                <div className="flex h-full flex-1 flex-col gap-4 px-4">
                    <div className="mt-2 flex w-full justify-end gap-4 rounded border bg-white px-6 py-4 shadow">
                        <div className="flex-1 justify-start">
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
                        </div>
                        <div className="max-w-sm flex-1">
                            <Label htmlFor="pr_no" className={`mb-1 block font-bold text-gray-500 ${errors.pr_no ? 'text-red-500' : ''}`}>
                                PR No.
                            </Label>
                            <Input
                                id="pr_no"
                                type="text"
                                name="pr_no"
                                className="w-full rounded-sm shadow-none"
                                value={prNo}
                                placeholder="--Auto Generated--"
                                onChange={(e) => {
                                    setPrNo(e.target.value);
                                    setErrors((prev) => ({ ...prev, pr_no: false }));
                                }}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="rounded border bg-white p-4 shadow">
                        <div className="flex w-full gap-4">
                            <div className="flex-1">
                                <Label htmlFor="requestor_id" className="mb-1 block font-bold text-gray-500">
                                    Name of Requestor
                                </Label>
                                <Input
                                    id="requestor_id"
                                    type="text"
                                    name="requestor_id"
                                    className="w-full rounded-sm shadow-none"
                                    value={`${auth.user.fname} ${auth.user.mname ?? ''} ${auth.user.lname}`}
                                    placeholder="Name of Requestor"
                                    readOnly
                                />
                            </div>

                            <div className="flex-1">
                                <Label htmlFor="date_issue" className="mb-1 block font-bold text-gray-500">
                                    Date Issue
                                </Label>
                                <Input
                                    id="date_issue"
                                    type="date"
                                    name="date_issue"
                                    className="w-full rounded-sm shadow-none"
                                    value={dateIssue}
                                    readOnly
                                />
                            </div>

                            <div className="flex-1">
                                <Label
                                    htmlFor="date_needed"
                                    className={`mb-1 block font-bold text-gray-500 ${errors.date_needed ? 'text-red-500' : ''}`}
                                >
                                    Date Needed
                                </Label>
                                <Input
                                    id="date_needed"
                                    type="date"
                                    name="date_needed"
                                    className={`w-full rounded-sm shadow-none ${errors.date_needed ? 'border-red-500' : ''}`}
                                    value={dateNeeded}
                                    min={new Date().toISOString().split('T')[0]} // disables past dates
                                    onChange={(e) => {
                                        setDateNeeded(e.target.value);
                                        setErrors({ ...errors, date_needed: false });
                                    }}
                                />
                            </div>
                        </div>
                        <div className="mt-4 flex w-full gap-4">
                            <div className="flex-1">
                                <Label htmlFor="bu_id" className="mb-1 block font-bold text-gray-500">
                                    Business Unit
                                </Label>
                                <Input
                                    id="bu_id"
                                    type="text"
                                    name="bu_id"
                                    className="w-full rounded-sm shadow-none"
                                    value={auth.user.business_unit.name}
                                    readOnly
                                />
                            </div>

                            <div className="flex-1">
                                <Label htmlFor="department_id" className="mb-1 block font-bold text-gray-500">
                                    Department
                                </Label>
                                <Input
                                    id="department_id"
                                    type="text"
                                    name="department_id"
                                    className="w-full rounded-sm shadow-none"
                                    value={auth.user.department.name}
                                    readOnly
                                />
                            </div>
                            <div className="flex-1">
                                <Label
                                    htmlFor="prod_end_user"
                                    className={`mb-1 block font-bold text-gray-500 ${errors.prod_end_user ? 'text-red-500' : ''}`}
                                >
                                    Product End User
                                </Label>
                                <Input
                                    id="prod_end_user"
                                    type="text"
                                    name="prod_end_user"
                                    className={`w-full rounded-sm shadow-none ${errors.prod_end_user ? 'border-red-500' : ''}`}
                                    value={productEndUser ?? ''}
                                    placeholder="Product End User"
                                    onChange={(e) => {
                                        setProductEndUser(e.target.value);
                                        setErrors({ ...errors, prod_end_user: false });
                                    }}
                                />
                            </div>

                            <div className="flex-1">
                                <Label
                                    htmlFor="classification_id"
                                    className={`mb-1 block font-bold text-gray-500 ${errors.classification_id ? 'text-red-500' : ''}`}
                                >
                                    Classification
                                </Label>
                                <Select
                                    id="classification_id"
                                    placeholder="Select Classification"
                                    isClearable
                                    options={classificationOptions}
                                    value={classificationOptions.find((option) => option.value === classificationId) || null}
                                    onChange={(selectedOption) => {
                                        setClassificationId(selectedOption ? selectedOption.value : undefined);
                                        setItRelated(selectedOption?.it_related ?? 0);
                                        setErrors({ ...errors, classification_id: false });
                                    }}
                                    styles={{
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            borderColor: errors.classification_id ? 'red' : '',
                                        }),
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-full rounded bg-white shadow">
                        <DataTable items={items} setItems={setItems} showAddRow={true}></DataTable>
                    </div>
                    <div className="flex w-full gap-4 rounded bg-white p-4 shadow">
                        <div className="flex-1">
                            <Label htmlFor="remarks" className="mb-1 block font-bold text-gray-500">
                                Remarks
                            </Label>
                            <Textarea
                                id="remarks"
                                name="remarks"
                                className="rounded-sm shadow-none"
                                value={remarks}
                                placeholder="Remarks"
                                onChange={(e) => {
                                    setRemarks(e.target.value);
                                }}
                            />
                        </div>
                    </div>

                    <ApproverTable itRelated={itRelated} />

                    <div className="flex flex-col items-center justify-center gap-4 p-4">
                        <div className="flex flex-col gap-2 md:flex-row md:items-center">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button type="submit" disabled={!dateNeeded || !productEndUser || !classificationId}>
                                        <Save className="mr-1 h-4 w-4" />
                                        Submit
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="z-99999">
                                    <DialogTitle>Purchase Request</DialogTitle>
                                    <DialogDescription>Are you sure you want to proceed?</DialogDescription>
                                    <DialogFooter className="gap-2">
                                        <DialogClose asChild>
                                            <Button variant="secondary">Cancel</Button>
                                        </DialogClose>

                                        <DialogClose asChild>
                                            <Button asChild>
                                                <button type="submit" onClick={handleSubmit}>
                                                    {loading ? 'Please wait.' : 'Confirm'}
                                                </button>
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </AppLayout>
        </div>
    );
}
