import { TablePo } from '@/components/table-po';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, PurchaseRequisition, SharedData, User, Vendor } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Save } from 'lucide-react';
import { useState } from 'react';
import Select from 'react-select';
import PoApproverTable from './component/po-approver-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Purchase Order',
        href: '/prpo/purchase-request',
    },
];

export default function PurchaseOrder() {
    const { vendorList, purchaseRequest } = usePage<{
        purchaseRequest: PurchaseRequisition;
        vendorList: Vendor[];
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

    const [vendorContactPerson, setvendorContactPerson] = useState<string>('');
    const [vendorAddress, setVendorAddress] = useState<string>('');
    const [vendorEmailAddress, setVendorEmailAddress] = useState<string>('');
    const [vendorTelNo, setVendorTelNo] = useState<string>('');

    const [vendorDetails, setVendorDetails] = useState<Vendor>();
    // const [vendorAddress, setVendorAddress] = useState<string>('');
    // const [vendorAddress, setVendorAddress] = useState<string>('');

    const [shipVia, setShipVia] = useState<string | undefined>(undefined);
    const [shipViaDetails, setShipViaDetails] = useState<any>(null);

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

        const payload = {};

        try {
            const response = await axios.post('/prpo/purchase-request', payload);
            Inertia.visit('/prpo/purchase-request');
        } catch (error) {}
    };

    const [vendorId, setVendorId] = useState<number>();
    const vendorOptions = vendorList.map((vendor) => ({
        value: vendor.id,
        label: vendor.supplier_name,

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

    return (
        <div className="flex h-screen flex-col">
            <AppLayout breadcrumbs={breadcrumbs}>
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
                            <Label htmlFor="pr_no" className="mb-1 block font-bold text-gray-800">
                                PO No.
                            </Label>
                            <Input
                                id="pr_no"
                                type="text"
                                name="pr_no"
                                className="w-full rounded-sm shadow-none"
                                value={prNo}
                                placeholder="--Auto Generated--"
                                readOnly
                            />
                        </div>
                        <div className="max-w-sm flex-1">
                            <Label htmlFor="pr_no" className="mb-1 block font-bold text-gray-800">
                                PR No.
                            </Label>
                            <Input
                                id="pr_no"
                                type="text"
                                name="pr_no"
                                className="w-full rounded-sm shadow-none"
                                value={purchaseRequest.pr_no}
                                placeholder="--Auto Generated--"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="rounded border bg-white p-4 shadow">
                        <div className="flex w-full gap-4">
                            <div className="flex-1">
                                <Label htmlFor="bu_id" className="mb-1 block font-bold text-gray-800">
                                    Buyer:
                                </Label>
                                <Input
                                    id="bu_id"
                                    type="text"
                                    name="bu_id"
                                    className="w-full rounded-sm shadow-none"
                                    value={`${auth.user.fname} ${auth.user.mname} ${auth.user.lname}`}
                                    readOnly
                                />
                            </div>

                            <div className="flex-1">
                                <Label htmlFor="department_id" className="mb-1 block font-bold text-gray-800">
                                    Confirming To:
                                </Label>
                                <Input
                                    id="department_id"
                                    type="text"
                                    name="department_id"
                                    className="w-full rounded-sm shadow-none"
                                    value={purchaseRequest.bu.name}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>

                    <div className="rounded border bg-white p-4 shadow">
                        <div className="mb-4 flex w-full gap-4">
                            <div className="flex-1">
                                <Label htmlFor="requestor_id" className="mb-1 block font-bold text-gray-800">
                                    Vendor Contact Person
                                </Label>
                                <Input
                                    id="requestor_id"
                                    type="text"
                                    name="requestor_id"
                                    className="w-full rounded-sm shadow-none"
                                    value={vendorDetails?.contact_person}
                                    placeholder="Name of Requestor"
                                    readOnly
                                />
                            </div>
                            <div className="flex-1">
                                <Label htmlFor="date_issue" className="mb-1 block font-bold text-gray-800">
                                    Vendor Email Address
                                </Label>
                                <Input
                                    id="requestor_id"
                                    type="text"
                                    name="requestor_id"
                                    className="w-full rounded-sm shadow-none"
                                    value={vendorEmailAddress}
                                    readOnly
                                />
                            </div>
                            <div className="flex-1">
                                <Label
                                    htmlFor="date_needed"
                                    className={`mb-1 block font-bold text-gray-800 ${errors.date_needed ? 'text-red-500' : ''}`}
                                >
                                    Vendor Tel. No.:
                                </Label>
                                <Input
                                    id="requestor_id"
                                    type="text"
                                    name="requestor_id"
                                    className="w-full rounded-sm shadow-none"
                                    value={vendorTelNo}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="flex w-full gap-4">
                            <div className="flex-1">
                                <Label htmlFor="requestor_id" className="mb-1 block font-bold text-gray-800">
                                    Vendor Name
                                </Label>

                                <Select
                                    id="classification_id"
                                    placeholder="Select Classification"
                                    isClearable
                                    options={vendorOptions}
                                    value={vendorOptions.find((option) => option.value === vendorId) || null}
                                    onChange={(selectedOption: any) => {
                                        setVendorId(selectedOption ? selectedOption.value : undefined);
                                        setVendorDetails(selectedOption);
                                        // setErrors({ ...errors, classification_id: false });
                                    }}
                                />

                                <Textarea className="mt-2" value={vendorDetails?.address} readOnly />
                            </div>

                            <div className="flex-1">
                                <Label htmlFor="requestor_id" className="mb-1 mb-2 block font-bold text-gray-800">
                                    Ship To
                                </Label>
                                <Input className="mb-2" value={purchaseRequest.bu.name}></Input>
                                <Textarea
                                    value={
                                        purchaseRequest.bu_id == 1 ? 'Paseo de Sta. Rosa, Greenfield City, Sta. Rosa, Laguna Philippines 4026' : ''
                                    }
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>

                    <div className="rounded border bg-white p-4 shadow">
                        <div className="mt-4 flex w-full gap-4">
                            <div className="flex-1">
                                <Label
                                    htmlFor="date_needed"
                                    className={`mb-1 block font-bold text-gray-800 ${errors.date_needed ? 'text-red-500' : ''}`}
                                >
                                    Ship Via:
                                </Label>
                                <Select
                                    // id="ship_via"
                                    placeholder="Select Shipping Method"
                                    isClearable
                                    options={shipViaOptions}
                                    value={shipViaOptions.find((opt) => opt.value === shipVia) || null}
                                    onChange={(opt: any) => {
                                        setShipVia(opt?.value);
                                        setShipViaDetails(opt);
                                        // setErrors({ ...errors, ship_via: false });
                                    }}
                                />
                            </div>
                            <div className="flex-1">
                                <Label
                                    htmlFor="classification_id"
                                    className={`mb-1 block font-bold text-gray-800 ${errors.classification_id ? 'text-red-500' : ''}`}
                                >
                                    Freight:
                                </Label>
                                <Select
                                    id="ship_via"
                                    placeholder="Select Shipping Method"
                                    isClearable
                                    options={freightOptions}
                                    value={freightOptions.find((opt) => opt.value === shipVia) || null}
                                    onChange={(opt: any) => {
                                        setFreight(opt?.value);
                                        setFreightDetails(opt);
                                        // setErrors({ ...errors, ship_via: false });
                                    }}
                                />
                            </div>

                            <div className="flex-1">
                                <Label
                                    htmlFor="date_needed"
                                    className={`mb-1 block font-bold text-gray-800 ${errors.date_needed ? 'text-red-500' : ''}`}
                                >
                                    Terms:
                                </Label>
                                <Input
                                    id="date_needed"
                                    type="text"
                                    name="date_needed"
                                    className={`w-full rounded-sm shadow-none ${errors.date_needed ? 'border-red-500' : ''}`}
                                    value={dateNeeded}
                                    onChange={(e) => {
                                        setDateNeeded(e.target.value);
                                        setErrors({ ...errors, date_needed: false });
                                    }}
                                />
                            </div>
                        </div>

                        <div className="mt-4 flex-1">
                            <Label htmlFor="remarks" className="mb-1 block font-bold text-gray-800">
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

                    <div className="rounded bg-white shadow">
                        <TablePo items={items} setItems={setItems} showAddRow={true} />
                    </div>

                    <PoApproverTable itRelated={itRelated} />

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
