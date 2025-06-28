import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, PurchaseRequisition, SharedData } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import ApproverIMTable from './component/approver-im-table';
import PrDetailsForm from './component/forms/pr-details-form';

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
export default function purchaseRequisition() {
    const { purchaseRequisition, classification } = usePage<{
        purchaseRequisition: PurchaseRequisition;
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

    // const handleVerify = async () => {
    //     try {
    //         await axios.post('/prpo/purchase-request/verify-finance/' + id, {
    //             budgeted: selectedBudget,
    //             currency: selectedCurrency,
    //             budget_amount: budgetedAmount,
    //             isCapexOpex: selectedOpexCapex,
    //             remarks: remarksFinance,
    //             bu_head: purchaseRequisition.bu.bu_head.id,
    //         });
    //         Inertia.visit('/prpo/pending_approval');
    //     } catch (error) {
    //         // alert('Error saving data.');
    //     }
    // };

    const handleVerifyProcurement = async () => {
        try {
            await axios.post('/prpo/purchase-request/verify-procurement/' + id, {
                suppplier_name: supplierName,
                actual_amount: actualAmount,
                procurement_remarks: remarksFinance,
                bu_head: purchaseRequisition.bu.bu_head.id,
            });
            Inertia.visit('/prpo/pending_approval');
        } catch (error) {
            // alert('Error saving data.');
        }
    };

    // Add this useEffect to fill fields when purchaseRequisition is provided
    // useEffect(() => {
    //     if (purchaseRequisition) {
    //         setPrNo(purchaseRequisition.pr_no || '');
    //         setDateIssue(purchaseRequisition.date_issue || today);
    //         setDateNeeded(purchaseRequisition.date_needed || '');
    //         setProductEndUser(purchaseRequisition.prod_end_user || '');

    //         setClassificationName(purchaseRequisition.classification.name);
    //         setRemarks(purchaseRequisition.remarks || '');
    //         setStatus(purchaseRequisition.status || '');
    //         setItems(purchaseRequisition.purchase_requisition_items);
    //         setItRelated(
    //             purchaseRequisition.classification_id
    //                 ? (classificationOptions.find((option) => option.value === Number(purchaseRequisition.classification_id))?.it_related ?? 0)
    //                 : 0,
    //         );

    //         setBudgetedAmount(purchaseRequisition.budget_amount || '0');
    //         setSelectedBudget(purchaseRequisition.budgeted ? String(purchaseRequisition.budgeted) : undefined);
    //         setSelectedOpexCapex(purchaseRequisition.isCapexOpex);
    //         setRemarksFinance(purchaseRequisition.finance_remarks || '');

    //         // setBudgetedAmount(purchaseRequisition.budgeted_amount || '0');
    //         console.log('PR Details:', purchaseRequisition);
    //         // If items structure is known, you can setItems here as well
    //     }
    // }, [purchaseRequisition]);

    const options = [
        { value: 1, label: 'Option 1' },
        { value: 2, label: 'Option 2' },
    ];

    return (
        <div className="flex h-screen flex-col">
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Purchase Request" />
                <div className="mx-auto flex h-full max-w-[900px] flex-1 flex-col gap-4 px-4">
                    <PrDetailsForm PurchaseRequisition={purchaseRequisition} />
                    <ApproverIMTable purchaseRequisition={purchaseRequisition} />
                </div>
            </AppLayout>
        </div>
    );
}
