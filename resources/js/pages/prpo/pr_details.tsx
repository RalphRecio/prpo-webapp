import { DataTable } from '@/components/app-datatable';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, SharedData } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { formatWithCommas } from '../../util/util';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Purchase Requisition',
        href: '/prpo/purchase-request',
    },
];
type Classification = {
    id: number;
    name: string;
    it_related: number;
};

type Approver = {
    id: number;
    approver_level: number | string;
    is_approve: number;
    remarks?: string;
    approve_date: string;
    approver?: {
        user_id?: number | string;
        job_title?: string;
        approver_name?: string;
    };
};

type PrDetails = {
    id: number;
    pr_no: string;
    date_issue: string;
    date_needed: string;
    prod_end_user: string;
    classification_id: number;
    remarks: string;
    purchase_requisition_items: any[];
    status: string;
    is_it_related: number;
    is_approve_it_manager: number;
    is_approve_im_supervisor: number;
    im_supervisor_id: number;
    approvers_list: Approver[];
    classification: {
        id: number;
        name: string;
    };
    immediate_head?: {
        fname: string;
        mname: string;
        lname: string;
    };
    is_finance_verified?: string;
    budgeted?: number;
    budget_amount?: string | number;
    is_approve1_unbudgeted: string | number;
    is_approve2_unbudgeted: string | number;
};

type User = {
    id: number;
    fname: string;
    mname: string;
    last_name: string;
    bu_id: number;
    dept_id: number;
    business_unit: BusinessUnit;
    department: Department;
    immediate_head: {
        fname: String;
        lname: string;
        mname: string;
    };
};
export default function PrDetails() {
    const { prDetails, classification } = usePage<{
        prDetails: PrDetails;
        classification: Classification[];
    }>().props;

    type BusinessUnit = { name: string };
    type Department = { name: string };

    const path = window.location.pathname;
    const segments = path.split('/');
    const id = segments[segments.length - 1];

    const page = usePage<SharedData & { auth: { user: User } }>();
    const { auth } = page.props;

    const today = new Date().toISOString().split('T')[0];

    const [selectedCurrency, setSelectedCurrency] = useState('PHP'); // default currency

    const [selectedBudget, setSelectedBudget] = useState<string | undefined>(undefined);
    const [selectedOpexCapex, setSelectedOpexCapex] = useState<string | undefined>(undefined);
    const [remarksFinance, setRemarksFinance] = useState<string>('');
    const [budgetedAmount, setBudgetedAmount] = useState<string>('');
    const [supplierName, setSupplierName] = useState<string>('');
    const [actualAmount, setActualAmount] = useState<string>('');

    const [alert, setAlert] = useState<{ type: 'default' | 'destructive'; title: string; description: string } | null>(null);
    const [errors, setErrors] = useState({
        pr_no: false,
        date_needed: false,
        prod_end_user: false,
        classification_id: false,
    });

    //fields
    const [prNo, setPrNo] = useState<string>('');
    const [dateIssue, setDateIssue] = useState<string>(today);
    const [dateNeeded, setDateNeeded] = useState<string>('');
    const [productEndUser, setProductEndUser] = useState<string>('');
    const [classificationName, setClassificationName] = useState<string>('');
    const [remarks, setRemarks] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [itRelated, setItRelated] = useState<number>(0);
    const [items, setItems] = useState<any[]>([]);

    const classificationOptions = classification.map((classItem) => ({
        value: classItem.id,
        label: classItem.name,
        it_related: classItem.it_related,
    }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axios.post('/prpo/purchase-request/approve/' + id);
            Inertia.visit('/prpo/purchase-request');
        } catch (error) {
            // alert('Error saving data.');
        }
    };

    const handleApprove = async (approverLevel: any) => {
        try {
            await axios.post('/prpo/purchase-request/approve/' + id, {
                approver_level: approverLevel,
            });
            Inertia.visit('/prpo/pending_approval');
        } catch (error) {
            // alert('Error saving data.');
        }
    };

    const handleApproveUnbugeted = async () => {
        try {
            await axios.post('/prpo/purchase-request/approve-unbudget/' + id);
            Inertia.visit('/prpo/pending_approval');
        } catch (error) {
            // alert('Error saving data.');
        }
    };

    const handleApproveOverbudget = async () => {
        try {
            await axios.post('/prpo/purchase-request/approve-overbudget/' + id);
            Inertia.visit('/prpo/pending_approval');
        } catch (error) {
            // alert('Error saving data.');
        }
    };

    const handleVerify = async () => {
        try {
            await axios.post('/prpo/purchase-request/verify-finance/' + id, {
                budgeted: selectedBudget,
                currency: selectedCurrency,
                budget_amount: budgetedAmount,
                isCapexOpex: selectedOpexCapex,
                remarks: remarksFinance,
                bu_head: prDetails.bu.bu_head.id,
            });
            Inertia.visit('/prpo/pending_approval');
        } catch (error) {
            // alert('Error saving data.');
        }
    };

    const handleVerifyProcurement = async () => {
        try {
            await axios.post('/prpo/purchase-request/verify-procurement/' + id, {
                suppplier_name: supplierName,
                actual_amount: actualAmount,
                procurement_remarks: remarksFinance,
                bu_head: prDetails.bu.bu_head.id,
            });
            Inertia.visit('/prpo/pending_approval');
        } catch (error) {
            // alert('Error saving data.');
        }
    };

    // Add this useEffect to fill fields when prDetails is provided
    useEffect(() => {
        if (prDetails) {
            setPrNo(prDetails.pr_no || '');
            setDateIssue(prDetails.date_issue || today);
            setDateNeeded(prDetails.date_needed || '');
            setProductEndUser(prDetails.prod_end_user || '');

            setClassificationName(prDetails.classification.name);
            setRemarks(prDetails.remarks || '');
            setStatus(prDetails.status || '');
            setItems(prDetails.purchase_requisition_items);
            setItRelated(
                prDetails.classification_id
                    ? (classificationOptions.find((option) => option.value === Number(prDetails.classification_id))?.it_related ?? 0)
                    : 0,
            );

            setBudgetedAmount(prDetails.budget_amount || '0');
            setSelectedBudget(prDetails.budgeted ? String(prDetails.budgeted) : undefined);
            setSelectedOpexCapex(prDetails.isCapexOpex);
            setRemarksFinance(prDetails.finance_remarks || '');

            // setBudgetedAmount(prDetails.budgeted_amount || '0');
            console.log('PR Details:', prDetails);
            // If items structure is known, you can setItems here as well
        }
    }, [prDetails]);

    const options = [
        { value: 1, label: 'Option 1' },
        { value: 2, label: 'Option 2' },
    ];

    return (
        <div className="flex h-screen flex-col">
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Purchase Request" />
                <div className="flex flex-1 flex-col gap-4 px-4">
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
                                    value={`${prDetails.requestor.fname} ${prDetails.requestor.mname} ${prDetails.requestor.lname}`}
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
                                <Label htmlFor="date_needed" className="mb-1 block font-bold text-gray-500">
                                    Date Needed
                                </Label>
                                <Input
                                    id="date_needed"
                                    type="date"
                                    name="date_needed"
                                    className="w-full rounded-sm shadow-none"
                                    value={dateNeeded}
                                    onChange={(e) => {
                                        setDateNeeded(e.target.value);
                                        setErrors({ ...errors, date_needed: false });
                                    }}
                                    readOnly
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
                                    value={prDetails.bu.name}
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
                                    value={prDetails.department.name}
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
                                    readOnly
                                />
                            </div>

                            {/* Classification */}
                            <div className="flex-1">
                                <Label
                                    htmlFor="classification_id"
                                    className={`mb-1 block font-bold text-gray-500 ${errors.classification_id ? 'text-red-500' : ''}`}
                                >
                                    Classification
                                </Label>
                                <Input
                                    id="prod_end_user"
                                    type="text"
                                    name="prod_end_user"
                                    className="w-full rounded-sm shadow-none"
                                    value={classificationName ?? ''}
                                    placeholder="Product End User"
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full rounded bg-white shadow">
                        <DataTable items={items} setItems={setItems} showAddRow={false}></DataTable>
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
                                readOnly
                            />
                        </div>
                    </div>
                    {/* IT MANAGER AND IM HEAD */}
                    <div className="flex w-full gap-4 rounded bg-white shadow">
                        <table className="min-w-full divide-y divide-gray-200 rounded shadow">
                            <thead className="bg-gray-100">
                                <tr>
                                    {prDetails.approvers_list?.some((approverItem: any) => Number(approverItem.approver_level) == 1) && (
                                        <th className="px-4 py-2 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase">
                                            For IT Related Request
                                        </th>
                                    )}
                                    <th className="px-4 py-2 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase">
                                        Requestor Immediate Head
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200 bg-white">
                                <tr className="hover:bg-gray-50">
                                    {prDetails.approvers_list
                                        ?.filter(
                                            (approverItem: any) =>
                                                Number(approverItem.approver_level) === 1 || Number(approverItem.approver_level) === 2,
                                        )
                                        .map((approverItem: any) => (
                                            <td className="px-4 py-2 align-top" key={approverItem.id}>
                                                <div className="space-y-1">
                                                    <div className="flex justify-between">
                                                        <span className="font-semibold text-gray-700">Name:</span>
                                                        <span>
                                                            {approverItem.approver
                                                                ? `${approverItem.approver.nname || ''} ${approverItem.approver.fname || ''} ${approverItem.approver.lname || ''}`.trim() ||
                                                                  'N/A'
                                                                : 'N/A'}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="font-semibold text-gray-700">Status:</span>
                                                        <span className="text-sm font-bold">
                                                            {approverItem.is_approve == 1 ? `Approved ${approverItem.approval_date}` : 'Pending'}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="font-semibold text-gray-700">Remarks:</span>
                                                        <span>{approverItem.remarks || ''}</span>
                                                    </div>
                                                </div>

                                                {approverItem.approver_id == auth.user.id && approverItem.is_approve == 0 && (
                                                    <div className="flex flex-col gap-2 md:flex-row md:items-center">
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <Button type="submit" disabled={!prNo || !dateNeeded || !productEndUser}>
                                                                    Approve
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent className="z-99999">
                                                                <DialogTitle>Purchase Request</DialogTitle>
                                                                <DialogDescription>
                                                                    Are you sure you want to approve this purchase request ?
                                                                </DialogDescription>
                                                                <DialogFooter className="gap-2">
                                                                    <DialogClose asChild>
                                                                        <Button variant="secondary">Cancel</Button>
                                                                    </DialogClose>
                                                                    <DialogClose asChild>
                                                                        <Button asChild>
                                                                            <button
                                                                                type="submit"
                                                                                onClick={() => handleApprove(approverItem.approver_level)}
                                                                            >
                                                                                Confirm
                                                                            </button>
                                                                        </Button>
                                                                    </DialogClose>
                                                                </DialogFooter>
                                                            </DialogContent>
                                                        </Dialog>
                                                    </div>
                                                )}
                                            </td>
                                        ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* 
                    {/* FINANCE VERIFICATION */}
                    {/* prDetails.approvers_list?.some((approver: any) => Number(approver.approver_level) === 3)  */}
                    {prDetails.is_approve_im_supervisor == 1 && (
                        <div className="flex w-full gap-4 rounded bg-white shadow">
                            <table className="min-w-full divide-y divide-gray-200 rounded shadow">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <td className="bg-gray-200 bg-lime-500 p-2 text-center text-lg font-bold text-white" colSpan={3}>
                                            Finance Verification
                                        </td>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr className="hover:bg-gray-50">
                                        <td className="w-1/3 px-4 py-2 align-top">
                                            <span className="mb-1 block text-xs font-semibold tracking-wider text-gray-700 uppercase">
                                                Budgeted or Unbudgeted
                                            </span>
                                            <Select
                                                value={selectedBudget}
                                                onValueChange={(value) => {
                                                    setSelectedBudget(value);
                                                    if (value === '0') {
                                                        setBudgetedAmount('0');
                                                    }
                                                }}
                                                disabled={
                                                    !prDetails.approvers_list?.some(
                                                        (approver: any) => String(approver.approver_id) === String(auth.user.id),
                                                    )
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Budget Status" />
                                                </SelectTrigger>
                                                <SelectContent className="z-99999">
                                                    <SelectItem value="1">Budget</SelectItem>
                                                    <SelectItem value="0">Unbudgeted</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </td>

                                        <td className="w-1/3 px-4 py-2 align-top">
                                            <span className="mb-1 block text-xs font-semibold tracking-wider text-gray-700 uppercase">
                                                Budgeted Amount
                                            </span>

                                            <div className="flex items-center gap-2">
                                                {/* Currency Selector */}
                                                <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                                                    <SelectTrigger className="w-24">
                                                        <SelectValue placeholder="Currency" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="PHP">PHP</SelectItem>
                                                        <SelectItem value="USD">USD</SelectItem>
                                                        <SelectItem value="EUR">EUR</SelectItem>
                                                        <SelectItem value="JPY">JPY</SelectItem>
                                                        {/* Add more currencies as needed */}
                                                    </SelectContent>
                                                </Select>

                                                {/* Amount Input */}
                                                <Input
                                                    id="budget_amount"
                                                    type="currency"
                                                    name="budget_amount"
                                                    className="rounded-sm shadow-none"
                                                    value={selectedBudget === '0' ? '0' : formatWithCommas(budgetedAmount)}
                                                    placeholder="Amount"
                                                    onChange={(e) => setBudgetedAmount(e.target.value)}
                                                    disabled={
                                                        selectedBudget === '0' ||
                                                        !prDetails.approvers_list?.some(
                                                            (approver: any) => String(approver.approver_id) === String(auth.user.id),
                                                        )
                                                    }
                                                />
                                            </div>
                                        </td>

                                        <td className="w-1/3 px-4 py-2 align-top">
                                            <span className="mb-1 block text-xs font-semibold tracking-wider text-gray-700 uppercase">
                                                OPEX or CAPEX
                                            </span>
                                            <Select
                                                value={selectedOpexCapex}
                                                onValueChange={(value) => setSelectedOpexCapex(value)}
                                                disabled={
                                                    !prDetails.approvers_list?.some(
                                                        (approver: any) => String(approver.approver_id) === String(auth.user.id),
                                                    )
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Budget Type" />
                                                </SelectTrigger>
                                                <SelectContent className="z-99999">
                                                    <SelectItem value="opex">OPEX</SelectItem>
                                                    <SelectItem value="capex">CAPEX</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-4">
                                            <span className="text-sm text-gray-800">Verified By : </span>
                                            <span className="text-sm font-bold text-gray-800">
                                                {prDetails.approvers_list?.find((approver: any) => Number(approver.approver_level) === 3)
                                                    ?.approval_date || ''}
                                            </span>
                                            <br />
                                            <span className="mt-2 block font-semibold text-gray-700">
                                                {(() => {
                                                    const approver = prDetails.approvers_list?.find(
                                                        (approver: any) => Number(approver.approver_level) === 3,
                                                    )?.approver;
                                                    return approver
                                                        ? `${approver.fname || ''} ${approver.mname || ''} ${approver.lname || ''}`.trim()
                                                        : '';
                                                })()}
                                            </span>
                                        </td>
                                        <td colSpan={2} className="w-1/3 px-4 py-2 align-top">
                                            <span className="mb-1 block text-xs font-semibold tracking-wider text-gray-700 uppercase">Remarks</span>{' '}
                                            <Textarea
                                                id="remarks"
                                                name="remarks"
                                                className="rounded-sm shadow-none"
                                                value={remarksFinance}
                                                placeholder="Remarks"
                                                onChange={(e) => {
                                                    setRemarksFinance(e.target.value);
                                                }}
                                                disabled={
                                                    !prDetails.approvers_list?.some(
                                                        (approver: any) => String(approver.approver_id) === String(auth.user.id),
                                                    )
                                                }
                                            />
                                        </td>
                                    </tr>

                                    {prDetails.approvers_list?.some((approver: any) => String(approver?.approver_id) === String(auth.user.id)) &&
                                        prDetails.is_finance_verified !== '1' && (
                                            <tr>
                                                <td colSpan={3} className="p-4 text-center">
                                                    <div className="flex flex-col items-center gap-2 md:flex-row md:justify-center">
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <Button
                                                                    type="submit"
                                                                    disabled={
                                                                        !selectedBudget ||
                                                                        !selectedOpexCapex ||
                                                                        (selectedBudget !== '0' && !budgetedAmount)
                                                                    }
                                                                >
                                                                    Verify
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent className="z-99999">
                                                                <DialogTitle>Purchase Request</DialogTitle>
                                                                <DialogDescription>
                                                                    Are you sure you want to verify this purchase request ?
                                                                </DialogDescription>
                                                                <DialogFooter className="gap-2">
                                                                    <DialogClose asChild>
                                                                        <Button variant="secondary">Cancel</Button>
                                                                    </DialogClose>
                                                                    <DialogClose asChild>
                                                                        <Button asChild>
                                                                            <button type="submit" onClick={() => handleVerify()}>
                                                                                Confirm
                                                                            </button>
                                                                        </Button>
                                                                    </DialogClose>
                                                                </DialogFooter>
                                                            </DialogContent>
                                                        </Dialog>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {/* UNBUGEDTED APPROVING */}
                    {prDetails.is_finance_verified == '1' && prDetails.budgeted == '0' && (
                        <div className="flex w-full gap-4 rounded bg-white p-4 shadow">
                            <table className="min-w-full divide-y divide-gray-200 rounded shadow">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <td className="bg-gray-200 p-4 text-center text-lg font-bold" colSpan={2}>
                                            Unbugeted Approver
                                        </td>
                                    </tr>
                                </thead>
                                {/* {JSON.stringify(prDetails.approvers_list?.filter((approver: any) => Number(approver.approver_level) === 5))} */}
                                <tbody className="divide-y divide-gray-200">
                                    <tr className="hover:bg-gray-50">
                                        {prDetails.approvers_list
                                            ?.filter((approver: any) => Number(approver.approver_level) === 5)
                                            .map((approver: any) => (
                                                <td className="w-1/2 px-4 py-2 align-top">
                                                    <div className="space-y-1" key={approver.id}>
                                                        <div className="flex justify-between">
                                                            <span className="font-semibold text-gray-700">Name:</span>
                                                            <span>
                                                                {approver.approver?.fname || ''} {approver.approver?.mname || ''}{' '}
                                                                {approver.approver?.lname || ''}
                                                            </span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="font-semibold text-gray-700">Status:</span>
                                                            <span>{approver.is_approve == 1 ? 'Approved' : 'Pending'}</span>
                                                        </div>
                                                    </div>
                                                    {approver.approver_id == auth.user.id && approver.is_approve == 0 && (
                                                        <div className="flex flex-col gap-2 md:flex-row md:items-center">
                                                            <Dialog>
                                                                <DialogTrigger asChild>
                                                                    <Button type="submit" disabled={!prNo || !dateNeeded || !productEndUser}>
                                                                        Approve
                                                                    </Button>
                                                                </DialogTrigger>
                                                                <DialogContent className="z-99999">
                                                                    <DialogTitle>Purchase Request</DialogTitle>
                                                                    <DialogDescription>
                                                                        Are you sure you want to approve this purchase request ?
                                                                    </DialogDescription>
                                                                    <DialogFooter className="gap-2">
                                                                        <DialogClose asChild>
                                                                            <Button variant="secondary">Cancel</Button>
                                                                        </DialogClose>
                                                                        <DialogClose asChild>
                                                                            <Button asChild>
                                                                                <button type="submit" onClick={() => handleApproveUnbugeted()}>
                                                                                    Confirm
                                                                                </button>
                                                                            </Button>
                                                                        </DialogClose>
                                                                    </DialogFooter>
                                                                </DialogContent>
                                                            </Dialog>
                                                        </div>
                                                    )}
                                                </td>
                                            ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                    {/* PROCUREMENT */}
                    {prDetails.approvers_list?.some((approver: any) => Number(approver.approver_level) === 4) && (
                        <div className="flex w-full gap-4 rounded bg-white shadow">
                            <table className="min-w-full divide-y divide-gray-200 rounded shadow">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <td className="bg-sky-500 p-4 text-center text-lg font-bold text-white" colSpan={2}>
                                            Procurement Verification
                                        </td>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr className="hover:bg-gray-50">
                                        <td className="w-1/2 px-4 py-2 align-top">
                                            <span className="text-left text-xs font-semibold tracking-wider text-gray-700 uppercase">
                                                {' '}
                                                Suppplier Name
                                            </span>
                                            <Input
                                                id="supplier_name"
                                                type="text"
                                                name="supplier_name"
                                                className="rounded-sm shadow-none"
                                                value={supplierName}
                                                placeholder="Budgeted Amount"
                                                onChange={(e) => setSupplierName(e.target.value)}
                                                disabled={
                                                    !prDetails.approvers_list?.some(
                                                        (approver: any) =>
                                                            Number(approver.approver_level) === 4 &&
                                                            String(approver?.approver_id) === String(auth.user.id),
                                                    )
                                                }
                                            />
                                        </td>
                                        <td className="w-1/2 px-4 py-2 align-top">
                                            <span className="text-left text-xs font-semibold tracking-wider text-gray-700 uppercase">
                                                {' '}
                                                Actual Amount
                                            </span>
                                            <Input
                                                id="actual_amount"
                                                type="number"
                                                name="actual_amount"
                                                className="rounded-sm shadow-none"
                                                value={actualAmount}
                                                placeholder="Budgeted Amount"
                                                onChange={(e) => setActualAmount(e.target.value)}
                                                disabled={
                                                    !prDetails.approvers_list?.some(
                                                        (approver: any) =>
                                                            Number(approver.approver_level) === 4 &&
                                                            String(approver?.approver_id) === String(auth.user.id),
                                                    )
                                                }
                                            />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="w-1/2 px-4 py-2 align-top">
                                            <span className="text-left text-xs font-semibold tracking-wider text-gray-700 uppercase">
                                                Over Budget By
                                            </span>
                                            <span className="rounded-sm shadow-none">
                                                <Input
                                                    value={(() => {
                                                        const budget = parseFloat(budgetedAmount || '0');
                                                        const actual = parseFloat(actualAmount || '0');
                                                        const diff = budget - actual;
                                                        return diff.toLocaleString('en-US', { style: 'currency', currency: 'PHP' });
                                                    })()}
                                                    disabled={
                                                        !prDetails.approvers_list?.some(
                                                            (approver: any) =>
                                                                Number(approver.approver_level) === 4 &&
                                                                String(approver?.approver_id) === String(auth.user.id),
                                                        )
                                                    }
                                                />
                                            </span>
                                        </td>

                                        <td className="w-1/2 px-4 py-2 align-top">
                                            <span className="text-left text-xs font-semibold tracking-wider text-gray-700 uppercase">Attachment</span>
                                            <Input
                                                id="attachment"
                                                type="file"
                                                name="budget_amount"
                                                className="rounded-sm shadow-none"
                                                placeholder="Budgeted Amount"
                                            />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="p-4">
                                            <span>
                                                Verified By :{' '}
                                                {prDetails.approvers_list?.find((approver: any) => Number(approver.approver_level) === 4)
                                                    ?.approve_date || ''}
                                            </span>
                                            <br />
                                            <span className="mt-2 block font-semibold text-gray-700">
                                                {(() => {
                                                    const approver = prDetails.approvers_list?.find(
                                                        (approver: any) => Number(approver.approver_level) === 4,
                                                    )?.approver;
                                                    return approver
                                                        ? `${approver.fname || ''} ${approver.mname || ''} ${approver.lname || ''}`.trim()
                                                        : '';
                                                })()}
                                            </span>
                                        </td>
                                        <td>
                                            {' '}
                                            <Textarea
                                                id="remarks"
                                                name="remarks"
                                                className="rounded-sm shadow-none"
                                                value={remarksFinance}
                                                placeholder="Remarks"
                                                onChange={(e) => {
                                                    setRemarksFinance(e.target.value);
                                                }}
                                                disabled={
                                                    !prDetails.approvers_list?.some(
                                                        (approver: any) =>
                                                            Number(approver.approver_level) === 4 &&
                                                            String(approver.approver?.user_id) === String(auth.user.id),
                                                    )
                                                }
                                            />
                                        </td>
                                    </tr>

                                    {prDetails.approvers_list?.some(
                                        (approver: any) =>
                                            Number(approver.approver_level) === 4 && String(approver?.approver_id) === String(auth.user.id),
                                    ) &&
                                        ((prDetails.budgeted == 0 &&
                                            prDetails.is_approve1_unbudgeted == 1 &&
                                            prDetails.is_approve2_unbudgeted == 1) ||
                                            prDetails.budgeted == 1) && (
                                            <tr>
                                                <td colSpan={2} className="p-4 text-center">
                                                    <div className="flex flex-col items-center gap-2 md:flex-row md:justify-center">
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <Button type="submit" disabled={!supplierName || !actualAmount}>
                                                                    Verify
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent className="z-99999">
                                                                <DialogTitle>Purchase Request</DialogTitle>
                                                                <DialogDescription>
                                                                    Are you sure you want to verify this purchase request ?
                                                                </DialogDescription>
                                                                <DialogFooter className="gap-2">
                                                                    <DialogClose asChild>
                                                                        <Button variant="secondary">Cancel</Button>
                                                                    </DialogClose>
                                                                    <DialogClose asChild>
                                                                        <Button asChild>
                                                                            <button type="submit" onClick={() => handleVerifyProcurement()}>
                                                                                Confirm
                                                                            </button>
                                                                        </Button>
                                                                    </DialogClose>
                                                                </DialogFooter>
                                                            </DialogContent>
                                                        </Dialog>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {/* OVERBUDGET APPROVING */}
                    {prDetails.is_procurement_verified == '1' && (
                        <div className="flex w-full gap-4 rounded bg-white shadow">
                            <table className="min-w-full divide-y divide-gray-200 rounded shadow">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <td className="bg-gray-200 p-4 text-center text-lg font-bold" colSpan={2}>
                                            Over budget Approver
                                        </td>
                                    </tr>
                                </thead>
                                {/* {JSON.stringify(prDetails.approvers_list?.filter((approver: any) => Number(approver.approver_level) === 5))} */}
                                <tbody className="divide-y divide-gray-200">
                                    <tr className="hover:bg-gray-50">
                                        {prDetails.approvers_list
                                            ?.filter((approver: any) => Number(approver.approver_level) === 6)
                                            .map((approver: any) => (
                                                <td className="w-1/2 px-4 py-2 align-top">
                                                    <div className="space-y-1" key={approver.id}>
                                                        <div className="flex justify-between">
                                                            <span className="font-semibold text-gray-700">Name:</span>
                                                            <span>
                                                                {approver.approver?.fname || ''} {approver.approver?.mname || ''}{' '}
                                                                {approver.approver?.lname || ''}
                                                            </span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="font-semibold text-gray-700">Status:</span>
                                                            <span>{approver.is_approve == 1 ? 'Approved' : 'Pending'}</span>
                                                        </div>
                                                    </div>
                                                    {approver.approver_id == auth.user.id && approver.is_approve == 0 && (
                                                        <div className="flex flex-col gap-2 md:flex-row md:items-center">
                                                            <Dialog>
                                                                <DialogTrigger asChild>
                                                                    <Button type="submit" disabled={!prNo || !dateNeeded || !productEndUser}>
                                                                        Approve
                                                                    </Button>
                                                                </DialogTrigger>
                                                                <DialogContent className="z-99999">
                                                                    <DialogTitle>Purchase Request</DialogTitle>
                                                                    <DialogDescription>
                                                                        Are you sure you want to approve this purchase request ?
                                                                    </DialogDescription>
                                                                    <DialogFooter className="gap-2">
                                                                        <DialogClose asChild>
                                                                            <Button variant="secondary">Cancel</Button>
                                                                        </DialogClose>
                                                                        <DialogClose asChild>
                                                                            <Button asChild>
                                                                                <button type="submit" onClick={() => handleApproveOverbudget()}>
                                                                                    Confirm
                                                                                </button>
                                                                            </Button>
                                                                        </DialogClose>
                                                                    </DialogFooter>
                                                                </DialogContent>
                                                            </Dialog>
                                                        </div>
                                                    )}
                                                </td>
                                            ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </AppLayout>
        </div>
    );
}
