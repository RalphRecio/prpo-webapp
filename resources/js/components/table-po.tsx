import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { Plus, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

interface DataTableProps extends React.ComponentProps<'div'> {
    variant?: 'header' | 'sidebar';
    items: Item[];
    setItems: React.Dispatch<React.SetStateAction<Item[]>>;
    showAddRow: boolean;
}

type Item = {
    id: number;
    lineNo: number;
    quantity?: string;
    unit_of_measrurement?: string;
    ite_description?: string;
    unit_price?: string;
    extended_price?: string;
};

export function TablePo({ variant = 'header', items, setItems, showAddRow, ...props }: DataTableProps) {
    const [itemDescription, setItemDescription] = useState<string | null>(null);
    const [itemDescriptionText, setItemDescriptionText] = useState<string>('');

    const [newRow, setNewRow] = useState({
        quantity: '',
        unit_of_measrurement: '',
        ite_description: '',
        unit_price: '',
        extended_price: '',
    });
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editRow, setEditRow] = useState({
        quantity: '',
        unit_of_measrurement: '',
        ite_description: '',
        unit_price: '',
        extended_price: '',
    });

    const handleNewRowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewRow({ ...newRow, [name]: value });
    };
    const [no, setNo] = useState<number>(0);
    const handleAddRow = () => {
        if (!newRow.quantity || !newRow.unit_of_measrurement || !newRow.unit_price || !newRow.extended_price) return;

        // lineNo = lineNo++;

        setItems([...items, { ...newRow, id: Date.now(), lineNo: items.length + 1, ite_description: itemDescriptionText }]);
        setNewRow({
            quantity: '',
            unit_of_measrurement: '',
            ite_description: '',
            unit_price: '',
            extended_price: '',
        });
    };

    const handleDeleteRow = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleEditRowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditRow({ ...editRow, [name]: value });
    };

    const handleSaveEdit = (index: number) => {
        const updatedItems = [...items];
        updatedItems[index] = { ...editRow, id: items[index].id };
        setItems(updatedItems);
        setEditIndex(null);
    };

    const handleCancelEdit = () => {
        setEditIndex(null);
    };

    const path = window.location.pathname;
    const segments = path.split('/');
    const id = segments[segments.length - 1];

    const [prItemsOptions, setPrItemOption] = useState<
        [
            {
                value: string;
                label: string;
                description: string;
            },
        ]
    >();

    const [prItem, setPrItem] = useState<any>(undefined);
    const [PrItemDetails, setPrItemDetails] = useState<any>(null);

    const getPrItems = async () => {
        try {
            const res = await axios.get('/prpo/purchase-order/pr-items/' + id);

            const options = res.data.map((item: any) => ({
                value: item.id,
                label: item.item_name ?? `Item ${item.id}`,
                description: item.description,
            }));

            setPrItemOption(options); // assuming this state is an array
        } catch (error) {
            console.error('Error fetching PR items:', error);
        }
    };

    useEffect(() => {
        getPrItems();
        setItemDescriptionText(prItem?.description || '');
    }, [prItem]);

    return (
        <div className="border" {...props}>
            {/* {JSON.stringify(prItem)} */}
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-900 uppercase">Line</th>
                        <th className="px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-900 uppercase">Quantity</th>
                        <th className="px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-900 uppercase">Unit of Measure</th>
                        <th className="px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-900 uppercase">Item Description</th>
                        <th className="px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-900 uppercase">Unit Price</th>
                        <th className="px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-900 uppercase">Extended Price</th>
                        {showAddRow && <th className="px-4 py-2 text-center text-xs font-medium tracking-wider text-gray-900 uppercase">Actions</th>}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white text-sm text-gray-500">
                    {/* Inline input row for adding */}
                    {showAddRow && (
                        <tr className="hover:bg-gray-50">
                            <td></td>
                            <td className="px-4 py-2">
                                <input
                                    name="quantity"
                                    type="number"
                                    value={newRow.quantity}
                                    onChange={handleNewRowChange}
                                    className="w-full rounded border px-2 py-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    placeholder="Quantity"
                                />
                            </td>
                            <td className="px-4 py-2">
                                <input
                                    name="unit_of_measrurement"
                                    value={newRow.unit_of_measrurement}
                                    onChange={handleNewRowChange}
                                    className="w-full rounded border px-2 py-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    placeholder="UOM"
                                />
                            </td>
                            <td className="px-4 py-2">
                                <Select
                                    id="item_description"
                                    placeholder="Select Item"
                                    isClearable
                                    options={prItemsOptions}
                                    value={prItemsOptions?.find((option) => option.value === itemDescription) || null}
                                    onChange={(selectedOption) => {
                                        setItemDescription(selectedOption?.value || null);
                                        setPrItem(selectedOption || null);
                                    }}
                                />
                                <Textarea value={itemDescriptionText} onChange={(e) => setItemDescriptionText(e.target.value)} className="mt-1" />
                            </td>
                            <td className="px-4 py-2">
                                <input
                                    name="unit_price"
                                    value={newRow.unit_price}
                                    onChange={handleNewRowChange}
                                    className="w-full rounded border px-2 py-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    placeholder="Status"
                                />
                            </td>
                            <td className="px-4 py-2">
                                <input
                                    name="extended_price"
                                    value={newRow.extended_price}
                                    onChange={handleNewRowChange}
                                    className="w-full rounded border px-2 py-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    placeholder="Status"
                                />
                            </td>
                            <td className="px-4 py-2 text-center">
                                <Button onClick={handleAddRow} type="button" variant="outline" size="sm">
                                    <Plus />
                                </Button>
                            </td>
                        </tr>
                    )}
                    {/* Existing items */}
                    {items.map((item, index) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 font-bold">{item.lineNo}</td>
                            <td className="px-4 py-2">{item.quantity}</td>
                            <td className="px-4 py-2">{item.unit_of_measrurement}</td>
                            <td className="px-4 py-2">{item.ite_description}</td>
                            <td className="px-4 py-2">{item.unit_price}</td>
                            <td className="px-4 py-2">{item.extended_price}</td>
                            {showAddRow && (
                                <td className="px-4 py-2 text-center">
                                    <div className="flex justify-center gap-2">
                                        <Button onClick={() => handleDeleteRow(index)} type="button" size="sm" variant="default">
                                            <Trash />
                                        </Button>
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
