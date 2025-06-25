import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { type Location, TransactionItem } from '@/types';
import axios from 'axios';
import { Pen, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

interface DataTableProps extends React.ComponentProps<'div'> {
    variant?: 'header' | 'sidebar';
    items: TransactionItem[];
    setItems: React.Dispatch<React.SetStateAction<TransactionItem[]>>;
    locations: Location[];
}

export function DataTablePutaway({ variant = 'header', items, locations, ...props }: DataTableProps) {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredItems, setFilteredItems] = useState<TransactionItem[]>(items); // State for filtered items
    const [putAwayItem, setPutAwayItem] = useState<TransactionItem>();

    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalPutawayOpen, setIsModalPutawayOpen] = useState(false);

    const transaction_id = window.location.pathname.split('/').pop(); // Get the last part of the URL
    const [location, setLocation] = useState<number>();
    const [quantity, setQuantity] = useState<string>();
    const [remarks, setRemarks] = useState<string>('');

    const [alert, setAlert] = useState<{ type: 'default' | 'destructive'; title: string; description: string } | null>(null); // Alert state

    const handleSearch = () => {
        const filtered = items.filter((item) => item.barcode.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredItems(filtered);
    };

    const handleSearchKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    useEffect(() => {
        setFilteredItems(items);
    }, [items]);

    const handlePutAway = (transaction: TransactionItem) => {
        setPutAwayItem(transaction);
        setIsModalPutawayOpen(true);
    };

    const handleSavePutaway = async () => {
        const newErrors: { [key: string]: boolean } = {};

        if (!quantity) newErrors.quantity = true;
        if (!location) newErrors.location = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        if (Number(quantity) > Number(putAwayItem?.quantity || 0)) {
            setAlert({
                type: 'destructive',
                title: 'Validation Error',
                description: `The entered quantity (${quantity}) exceeds the available quantity (${putAwayItem?.quantity}).`,
            });
            return; // Stop further execution
        }

        const payload = {
            transaction_id,
            trnsc_item_id: putAwayItem?.id,
            product_id: putAwayItem?.product_id,
            lot_code: putAwayItem?.lot_code,
            to_location_id: location,
            quantity: quantity,
            remarks: remarks,
            movement_type: 'Putaway',
            mfg_date: putAwayItem?.mfg_date,
            exp_date: putAwayItem?.exp_date,
            shelf_exp_date: putAwayItem?.shelf_exp_date,
        };

        const response = await axios.post('/inventory/putaway', payload);

        if (response) {
            setIsModalPutawayOpen(false);
            setPutAwayItem(undefined);
            setQuantity('');
            setRemarks('');
            setLocation(undefined);

            window.location.reload();
        }
    };

    return (
        <div className="relative overflow-x-auto" {...props}>
            {/* MODAL FOR PUT AWAY */}
            {isModalPutawayOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 transition-opacity duration-300 ease-in-out">
                    <div
                        className={`m-transform w-full overflow-x-auto rounded bg-white p-4 shadow-lg transition-transform duration-1000 ease-in-out lg:w-[40%] ${
                            isModalPutawayOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                        }`}
                    >
                        <h2 className="mb-4 text-lg font-bold">Putaway</h2>
                        <div className="max-h-[85vh] overflow-y-auto p-2">
                            {' '}
                            {alert && (
                                <Alert variant={alert.type} className="tex-bold">
                                    {' '}
                                    {/* Add green text */}
                                    <AlertTitle>{alert.title}</AlertTitle>
                                    <AlertDescription>{alert.description}</AlertDescription>
                                </Alert>
                            )}
                            {/* Added scrollable container */}
                            <div className="mb-4">
                                <Label htmlFor="barcode" className={`mb-2 block font-bold text-gray-800`}>
                                    Barcode
                                </Label>
                                <Input
                                    type="text"
                                    name="barcode"
                                    placeholder="Barcode"
                                    value={putAwayItem?.products.barcode || ''}
                                    className={`w-full border p-2 ${errors.barcode ? 'border-red-500' : 'border-gray-300'} rounded`}
                                    readOnly
                                />
                            </div>
                            <div className="grid gap-2 lg:grid-cols-2">
                                <div>
                                    <Label htmlFor="item_code" className={`mb-2 block text-xs font-bold text-gray-500`}>
                                        Product Code
                                    </Label>
                                    <Label className={`block w-full rounded border p-2 ${errors.item_code ? 'border-red-500' : 'border-gray-300'}`}>
                                        {putAwayItem?.products.item_code || '-'}
                                    </Label>
                                </div>

                                <div>
                                    <Label htmlFor="item_description" className={`mb-2 block text-xs font-bold text-gray-500`}>
                                        Product Name
                                    </Label>
                                    <Label
                                        className={`block w-full rounded border p-2 ${errors.item_description ? 'border-red-500' : 'border-gray-300'}`}
                                    >
                                        {putAwayItem?.products.item_description || '-'}
                                    </Label>
                                </div>

                                <div>
                                    <Label htmlFor="uom" className={`mb-2 block text-xs font-bold text-gray-500`}>
                                        UOM
                                    </Label>
                                    <Label className={`block w-full rounded border p-2 ${errors.uom ? 'border-red-500' : 'border-gray-300'}`}>
                                        {putAwayItem?.products.uom || '-'}
                                    </Label>
                                </div>

                                <div>
                                    <Label htmlFor="packing" className={`mb-2 block text-xs font-bold text-gray-500`}>
                                        Packaging
                                    </Label>
                                    <Label className={`block w-full rounded border p-2 ${errors.packing ? 'border-red-500' : 'border-gray-300'}`}>
                                        {putAwayItem?.products.packing || '-'}
                                    </Label>
                                </div>
                            </div>
                            <hr className="my-4" />
                            <div className="grid gap-2 lg:grid-cols-2">
                                <div>
                                    <Label htmlFor="location" className={`mb-2 block font-bold text-gray-800`}>
                                        Location :{' '}
                                        <span className="text-sm text-red-400">
                                            Current Location : {putAwayItem?.latest_location_movement?.to_location?.name}
                                        </span>
                                    </Label>
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
                                                selectedOption ? locations.find((location) => location.id === selectedOption.value)?.id : undefined,
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

                                <div>
                                    <Label htmlFor="exp_date" className={`mb-2 block font-bold text-gray-800`}>
                                        Quantity
                                    </Label>
                                    <Input
                                        type="number"
                                        name="quanttity"
                                        placeholder="Enter Quantity"
                                        value={quantity}
                                        onChange={(e) => {
                                            setQuantity(e.target.value);
                                            setErrors({ ...errors, quantity: false });
                                        }}
                                        className={`w-full border p-2 ${errors.quantity ? 'border-red-500' : 'border-gray-300'} rounded`}
                                    />
                                </div>
                            </div>
                            <hr className="my-4" />
                            <div className="my-4 grid gap-2 lg:grid-cols-3">
                                <div>
                                    <Label htmlFor="mfg_date" className={`mb-2 block font-bold text-gray-800`}>
                                        Manufacturing Date
                                    </Label>
                                    <Label className="block w-full rounded border p-2">{putAwayItem?.mfg_date}</Label>
                                </div>

                                <div>
                                    <Label htmlFor="exp_date" className={`mb-2 block font-bold text-gray-800`}>
                                        Shelf Expiry Date
                                    </Label>
                                    <Label className="block w-full rounded border p-2">{putAwayItem?.shelf_exp_date}</Label>
                                </div>

                                <div>
                                    <Label htmlFor="exp_date" className={`mb-2 block font-bold text-gray-800`}>
                                        Expiry Date
                                    </Label>
                                    <Label className="block w-full rounded border p-2">{putAwayItem?.exp_date}</Label>
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
                                    value={remarks}
                                    onChange={(e) => {
                                        setRemarks(e.target.value);
                                        setErrors({ ...errors, remarks: false }); // Clear error on change
                                    }}
                                    className={`w-full border p-2 ${errors.remarks ? 'border-red-500' : 'border-gray-300'} rounded`}
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-4">
                            <Button variant="outline" onClick={() => setIsModalPutawayOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleSavePutaway}>Putaway</Button>
                        </div>
                    </div>
                </div>
            )}

            <div className="mb-4 flex items-center justify-end">
                <div className="flex space-x-2">
                    <Input
                        type="text"
                        placeholder="Search by Barcode"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Update the search term
                        onKeyDown={handleSearchKeyPress} // Trigger search on Enter key press
                        className="w-full max-w-sm rounded border p-2"
                    />
                    <Button onClick={handleSearch} className="px-4 py-2 text-white">
                        <Search />
                    </Button>
                </div>
            </div>

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
                            <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>
                                Mfg / Shelf / Exp
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Quantity
                            </th>

                            <th scope="col" className="px-6 py-3">
                                UOM
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Packaging
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Location
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.length === 0 ? (
                            <tr>
                                <td colSpan={15} className="px-6 py-4 text-center text-gray-500">
                                    Enter products
                                </td>
                            </tr>
                        ) : (
                            filteredItems.map((item, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                                >
                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white">
                                        {item.products.barcode}
                                    </th>
                                    <td className="px-6 py-4">{item.products.item_code}</td>
                                    <td className="px-6 py-4">{item.products.item_description}</td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <strong>Mfg. Date:</strong> {item.mfg_date}
                                        </div>
                                        <div>
                                            <strong>Shelf. Date:</strong> {item.shelf_exp_date}
                                        </div>
                                        <div>
                                            <strong>Exp. Date:</strong> {item.exp_date}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{item.quantity ?? '-'}</td>
                                    <td className="px-6 py-4">{item.products.uom}</td>
                                    <td className="px-6 py-4">{item.products.packing}</td>

                                    <td className="px-6 py-4">{item.location.name}</td>
                                    <td className="flex space-x-2 px-6 py-4">
                                        <Button
                                            variant="outline"
                                            onClick={() => handlePutAway(item)}
                                            disabled={item.is_putaway == 1} // Disable if both trans_status is "completed" and item has a location
                                        >
                                            <Pen /> Put Away
                                        </Button>
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
