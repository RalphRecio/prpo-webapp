import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { Pen, Plus, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Swal from 'sweetalert2';

interface DataTableProps extends React.ComponentProps<'div'> {
    variant?: 'header' | 'sidebar';
    items: Item[];
    setItems: React.Dispatch<React.SetStateAction<Item[]>>;
    locations: Location[];
}

type Item = {
    id: number;
    lot_code: string;
    barcode: string;
    item_code: string;
    item_description: string;
    mfg_date: string;
    shelf_exp_date: string;
    exp_date: string;
    quantity: number | null;
    uom: string;
    stockType: string;
    origin: string;
    packing: string;
    tlOrderQty: string;
    consignmentBufferQty: string;
    location?: string;
    location_id: number | null;
    remarks?: string;
};

type Location = {
    id: number;
    name: string;
};

export function DataTablePicking({ variant = 'header', items, setItems, locations, ...props }: DataTableProps) {
    const [newItem, setNewItem] = useState<Item>({
        id: 0,
        lot_code: '',
        barcode: '',
        item_code: '',
        item_description: '',
        mfg_date: '',
        shelf_exp_date: '',
        exp_date: '',
        quantity: null,
        uom: '',
        stockType: '',
        origin: '',
        packing: '',
        tlOrderQty: '',
        consignmentBufferQty: '',
        location: '',
        location_id: 0,
        remarks: '',
    });

    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [quantity, setQuantity] = useState<number>();
    const [alert, setAlert] = useState<{ type: 'default' | 'destructive'; title: string; description: string } | null>(null); // Alert state

    const [location, setLocation] = useState<number>();

    useEffect(() => {
        if (isModalOpen) {
            setNewItem({
                id: 0,
                lot_code: '',
                barcode: '',
                item_code: '',
                item_description: '',
                mfg_date: '',
                shelf_exp_date: '',
                exp_date: '',
                quantity: null,
                uom: '',
                stockType: '',
                origin: '',
                packing: '',
                tlOrderQty: '',
                consignmentBufferQty: '',
                location: '',
                location_id: 0,
                remarks: '',
            });
            setQuantity(0);
        }
        setAlert(null);
    }, [isModalOpen]);

    const handleRemoveItem = (item_code: string) => {
        setItems(items.filter((item) => item.item_code !== item_code));
    };

    const handleAddItem = () => {
        setIsModalOpen(true);
    };

    const handleEditItem = (item: Item) => {
        setNewItem(item);
        setIsModalOpen(true);
    };

    const checkIfAllocated = async () => {
        try {
            const payload = {
                product_id: newItem.id,
                location_id: newItem.location_id,
                lot_code: newItem.lot_code,
                quantity: quantity,
            };

            const response = await axios.post('/inventory/check-if-alocated', payload);

            setAlert({
                type: 'default',
                title: 'Success',
                description: response.data.message || 'Sufficient inventory is available.',
            });

            return true;
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Failed to delete item.',
            });
            // Handle error response
            if (error.response && error.response.data) {
                setAlert({
                    type: 'destructive',
                    title: 'Validation Error',
                    description: error.response.data.message || 'An error occurred while checking allocation.',
                });
            } else {
                setAlert({
                    type: 'destructive',
                    title: 'Error',
                    description: 'An unexpected error occurred.',
                });
            }

            return false; // Indicate failure
        }
    };

    const handleSaveItem = async () => {
        const { barcode, item_code, item_description, uom, packing } = newItem;

        const newErrors: { [key: string]: boolean } = {};
        if (!barcode) newErrors.barcode = true;
        if (!item_code) newErrors.item_code = true;
        if (!item_description) newErrors.item_description = true;
        if (!quantity) newErrors.quantity = true;
        if (!uom) newErrors.uom = true;
        if (!packing) newErrors.packing = true;
        if (!location) newErrors.location = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const isAllocatedValid = await checkIfAllocated();
        if (!isAllocatedValid) {
            return;
        }

        const selectedLocation = locations.find((loc) => loc.id === location);

        const existingItemIndex = items.findIndex((item) => item.id === newItem.id);
        if (existingItemIndex !== -1) {
            const updatedItems = [...items];
            updatedItems[existingItemIndex] = {
                ...newItem,
                quantity: quantity,
                location: selectedLocation ? selectedLocation.name : '',
                location_id: selectedLocation ? selectedLocation.id : null,
            };
            setItems(updatedItems);
        } else {
            setItems([
                ...items,
                {
                    ...newItem,
                    quantity: quantity,
                    location: selectedLocation ? selectedLocation.name : '',
                    location_id: selectedLocation ? selectedLocation.id : null,
                },
            ]);
        }

        setNewItem({
            id: 0,
            lot_code: '',
            barcode: '',
            item_code: '',
            item_description: '',
            mfg_date: '',
            shelf_exp_date: '',
            exp_date: '',
            quantity: null,
            uom: '',
            stockType: '',
            origin: '',
            packing: '',
            tlOrderQty: '',
            consignmentBufferQty: '',
            location: '',
            location_id: 0,
            remarks: '',
        });
        setErrors({});
        setIsModalOpen(false);
    };

    const handleNewItemChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = event.target;

        if (name === 'quantity') {
            console.log(value);
            console.log(newItem.quantity);
            // Handle numeric inputs
            setNewItem({ ...newItem, [name]: parseInt(value) || null });
        } else {
            // Handle other inputs
            setNewItem({ ...newItem, [name]: value });
        }

        setErrors({ ...errors, [name]: false });
    };

    const [filteredProducts, setFilteredProducts] = useState<Item[]>([]);
    const [searchProduct, setSearchProduct] = useState<string>('');
    const [barcode, setBarcode] = useState<string>('');
    const handleSearchProducts = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const response = await axios.get(`/inbound/product-by-name/${searchProduct}`);

            const products = response.data;

            if (products.length > 0) {
                setFilteredProducts(products); // Store the products in the state
            } else {
                setFilteredProducts([]); // Clear the table if no products are found
            }
        }
    };

    const handleBarcodeKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            try {
                const response = await axios.get(`/inventory/get-product/${barcode}`);
                const data = response.data;
                setNewItem({
                    id: data.id,
                    lot_code: data.lot_code,
                    barcode: data.barcode,
                    item_code: data.item_code,
                    item_description: data.item_description,
                    mfg_date: data.mfg_date,
                    shelf_exp_date: data.shelf_exp_date,
                    exp_date: data.exp_date,
                    quantity: data.quantity,
                    uom: data.uom,
                    stockType: '',
                    origin: '',
                    packing: data.packing,
                    tlOrderQty: '',
                    consignmentBufferQty: '',
                    location: data.location_name,
                    location_id: data.location_id, // Include location
                    remarks: '', // Include remarks
                });
            } catch (error: any) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.response?.data?.message || 'Failed to delete item.',
                });
            }
        }
    };

    return (
        <div className="relative overflow-x-auto" {...props}>
            <div className="mb-4 flex justify-end pr-4">
                <Button onClick={handleAddItem}>
                    <Plus />
                    Add Item
                </Button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 transition-opacity duration-300 ease-in-out">
                    <div
                        className={`m-transform w-full overflow-x-auto rounded bg-white p-4 shadow-lg transition-transform duration-1000 ease-in-out lg:w-[40%] ${
                            isModalOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                        }`}
                    >
                        <h2 className="mb-4 text-lg font-bold">Allocation</h2>
                        <div className="max-h-[85vh] overflow-y-auto p-2">
                            {/* Added scrollable container */}
                            <div className="mb-4 flex items-center space-x-4">
                                <div className="flex-1">
                                    <Label htmlFor="barcode" className={`mb-2 block font-bold text-gray-800`}>
                                        Barcode or Product Code
                                    </Label>
                                    <Input
                                        type="text"
                                        name="barcode"
                                        placeholder="Barcode"
                                        value={barcode}
                                        onChange={(e) => {
                                            setBarcode(e.target.value);
                                        }}
                                        onKeyDown={handleBarcodeKeyPress}
                                        className={`w-full border p-2 ${errors.barcode ? 'border-red-500' : 'border-gray-300'} rounded`}
                                    />
                                </div>
                                <div className="mt-4 flex items-end">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button>Find by Name</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogTitle>Receive</DialogTitle>
                                            <DialogDescription className="overflow-x-auto">
                                                <div className="overflow-x-auto">
                                                    <div className="mb-4">
                                                        <Input
                                                            type="text"
                                                            placeholder="Search for a product"
                                                            value={searchProduct}
                                                            onChange={(e) => setSearchProduct(e.target.value)}
                                                            onKeyDown={handleSearchProducts} // Update the search term
                                                            className="w-full rounded border p-2"
                                                        />
                                                    </div>
                                                    <div className="w-full overflow-x-auto">
                                                        <table className="min-w-full text-left text-sm text-gray-500">
                                                            <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
                                                                <tr>
                                                                    <th scope="col" className="px-6 py-3">
                                                                        Barcode
                                                                    </th>
                                                                    <th scope="col" className="px-6 py-3">
                                                                        Product Code
                                                                    </th>
                                                                    <th scope="col" className="px-6 py-3">
                                                                        Product Name
                                                                    </th>
                                                                    <th scope="col" className="px-6 py-3">
                                                                        Action
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {filteredProducts.length > 0 ? (
                                                                    filteredProducts.map((product, index) => (
                                                                        <tr key={index} className="border-b bg-white hover:bg-gray-50">
                                                                            <td className="px-6 py-4">{product.barcode}</td>
                                                                            <td className="px-6 py-4">{product.item_code}</td>
                                                                            <td className="px-6 py-4">{product.item_description}</td>
                                                                            <td className="px-6 py-4">
                                                                                <DialogClose asChild>
                                                                                    <Button
                                                                                        onClick={() => handleSelectProduct(product)} // Call the function on click
                                                                                    >
                                                                                        Select
                                                                                    </Button>
                                                                                </DialogClose>
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                ) : (
                                                                    <tr>
                                                                        <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                                                                            No products found
                                                                        </td>
                                                                    </tr>
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </DialogDescription>
                                            <DialogFooter className="gap-2">
                                                <DialogClose asChild>
                                                    <Button variant="secondary">Cancel</Button>
                                                </DialogClose>

                                                <DialogClose asChild>
                                                    <Button asChild>
                                                        {/* <button type="submit" onClick={handleReceive}>
                                                            Confirm
                                                        </button> */}
                                                    </Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                            <div className="mb-4 grid gap-2 lg:grid-cols-2">
                                <div>
                                    <Label htmlFor="item_code" className={`mb-2 block text-xs font-bold text-gray-500`}>
                                        Product Code
                                    </Label>
                                    <Label className={`block w-full rounded border p-2 ${errors.item_code ? 'border-red-500' : 'border-gray-300'}`}>
                                        {newItem.item_code || '-'}
                                    </Label>
                                </div>

                                <div>
                                    <Label htmlFor="item_description" className={`mb-2 block text-xs font-bold text-gray-500`}>
                                        Product Name
                                    </Label>
                                    <Label
                                        className={`block w-full rounded border p-2 ${errors.item_description ? 'border-red-500' : 'border-gray-300'}`}
                                    >
                                        {newItem.item_description || '-'}
                                    </Label>
                                </div>

                                <div>
                                    <Label htmlFor="uom" className={`mb-2 block text-xs font-bold text-gray-500`}>
                                        UOM
                                    </Label>
                                    <Label className={`block w-full rounded border p-2 ${errors.uom ? 'border-red-500' : 'border-gray-300'}`}>
                                        {newItem.uom || '-'}
                                    </Label>
                                </div>

                                <div>
                                    <Label htmlFor="packing" className={`mb-2 block text-xs font-bold text-gray-500`}>
                                        Packaging
                                    </Label>
                                    <Label className={`block w-full rounded border p-2 ${errors.packing ? 'border-red-500' : 'border-gray-300'}`}>
                                        {newItem.packing || '-'}
                                    </Label>
                                </div>
                            </div>
                            <hr className="my-4" />
                            <div className="grid gap-2 lg:grid-cols-3">
                                <div>
                                    <div>
                                        <Label htmlFor="location" className={`mb-2 block font-bold text-gray-800`}>
                                            Location :<span className="text-sm text-red-400"> Current Location : {newItem.location}</span>
                                        </Label>
                                        {/* <Label class`Name={`block w-full rounded border p-2 ${errors.packing ? 'border-red-500' : 'border-gray-300'}`}>
                                            {newItem.location || '-'}
                                        </Label> */}
                                        <Select
                                            id="location"
                                            placeholder="Select Location"
                                            isClearable
                                            options={locations.map((location) => ({
                                                value: location.id,
                                                label: location.name,
                                            }))}
                                            onChange={(selectedOption) => {
                                                setLocation(
                                                    selectedOption
                                                        ? locations.find((location) => location.id === selectedOption.value)?.id
                                                        : undefined,
                                                );
                                                setErrors({ ...errors, supplier: false }); // Clear error on change
                                            }}
                                            styles={{
                                                control: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    borderColor: errors.location ? 'red' : baseStyles.borderColor,
                                                }),
                                            }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="exp_date" className={`mb-2 block font-bold text-gray-800`}>
                                        Lot Code
                                    </Label>
                                    <Label className="block w-full rounded border p-2">{newItem.lot_code || '-'}</Label>
                                </div>
                                <div>
                                    <Label htmlFor="exp_date" className={`mb-2 block font-bold text-gray-800`}>
                                        Quantity
                                    </Label>
                                    <Input
                                        type="number"
                                        name="quantity"
                                        placeholder="Quantity"
                                        value={quantity ?? ''}
                                        onChange={(e) => {
                                            const inputQuantity = e.target.value ? parseFloat(e.target.value) : undefined;

                                            // Validate that the input quantity does not exceed newItem.quantity
                                            // if (inputQuantity && inputQuantity > (newItem.quantity || 0)) {
                                            //     setAlert({
                                            //         type: 'destructive',
                                            //         title: 'Validation Error',
                                            //         description: `Quantity cannot exceed the available inventory. Remaining quantity: ${newItem.quantity || 0}`,
                                            //     });
                                            //     return; // Prevent updating the state if validation fails
                                            // }

                                            setQuantity(inputQuantity);
                                        }}
                                        className={`w-full border p-2 ${errors.quantity ? 'border-red-500' : 'border-gray-300'} rounded`}
                                    />
                                </div>
                            </div>
                            <div className="my-4 grid gap-2 lg:grid-cols-3">
                                <div>
                                    <Label htmlFor="mfg_date" className={`mb-2 block font-bold text-gray-800`}>
                                        Manufacturing Date
                                    </Label>
                                    <Label className={`block w-full rounded border p-2 ${errors.packing ? 'border-red-500' : 'border-gray-300'}`}>
                                        {newItem.mfg_date || '-'}
                                    </Label>
                                </div>

                                <div>
                                    <Label htmlFor="exp_date" className={`mb-2 block font-bold text-gray-800`}>
                                        Shelf Expiry Date
                                    </Label>
                                    <Label className={`block w-full rounded border p-2 ${errors.packing ? 'border-red-500' : 'border-gray-300'}`}>
                                        {newItem.shelf_exp_date || '-'}
                                    </Label>
                                </div>

                                <div>
                                    <Label htmlFor="exp_date" className={`mb-2 block font-bold text-gray-800`}>
                                        Expiry Date
                                    </Label>
                                    <Label className={`block w-full rounded border p-2 ${errors.packing ? 'border-red-500' : 'border-gray-300'}`}>
                                        {newItem.exp_date || '-'}
                                    </Label>
                                </div>
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="remarks" className={`mb-2 block font-bold text-gray-800`}>
                                    Remarks
                                </Label>
                                <Textarea
                                    rows={5}
                                    id="remarks"
                                    name="remarks"
                                    value={newItem.remarks || ''}
                                    onChange={(e) => setNewItem({ ...newItem, remarks: e.target.value })}
                                    className={`w-full border p-2 ${errors.remarks ? 'border-red-500' : 'border-gray-300'} rounded`}
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-4">
                            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleSaveItem}>Save</Button>
                        </div>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                    <thead className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                        <tr className="sm:hidden md:table-row">
                            <th scope="col" className="px-6 py-3">
                                Barcode
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product Code
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Packaging
                            </th>
                            <th scope="col" className="px-6 py-3">
                                UOM
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Lot Code
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Quantity
                            </th>
                            <th scope="col" className="px-6 py-3">
                                MFG. Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Exp. Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Shelf Exp Date
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Location
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Remarks
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length === 0 ? (
                            <tr>
                                <td colSpan={15} className="px-6 py-4 text-center text-gray-500">
                                    Enter products
                                </td>
                            </tr>
                        ) : (
                            items.map((item, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                                >
                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white">
                                        {item.barcode}
                                    </th>
                                    <td className="px-6 py-4">{item.item_code}</td>
                                    <td className="px-6 py-4">{item.item_description}</td>
                                    <td className="px-6 py-4">{item.packing}</td>
                                    <td className="px-6 py-4">{item.uom}</td>
                                    <td className="px-6 py-4">{item.lot_code}</td>
                                    <td className="px-6 py-4">{item.quantity}</td>

                                    <td className="px-6 py-4">{item.mfg_date || '-'}</td>
                                    <td className="px-6 py-4">{item.exp_date || '-'}</td>
                                    <td className="px-6 py-4">{item.shelf_exp_date || '-'}</td>
                                    <td className="px-6 py-4">{item.location || '-'}</td>
                                    <td className="px-6 py-4">{item.remarks || '-'}</td>
                                    <td className="flex space-x-2 px-6 py-4">
                                        <>
                                            <Button variant="outline" onClick={() => handleEditItem(item)}>
                                                <Pen /> Edit
                                            </Button>
                                            <Button variant="destructive" onClick={() => handleRemoveItem(item.item_code)}>
                                                <Trash /> Remove
                                            </Button>
                                        </>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
