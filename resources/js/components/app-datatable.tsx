import { Button } from '@/components/ui/button';
import { PurchaseRequisitionItem } from '@/types';
import { Pen, Plus, Trash } from 'lucide-react';
import React, { useState } from 'react';

interface DataTableProps extends React.ComponentProps<'div'> {
    variant?: 'header' | 'sidebar';
    items: PurchaseRequisitionItem[];
    setItems?: React.Dispatch<React.SetStateAction<Item[]>>;
    showAddRow?: boolean;
}

type Item = {
    id: number;
    pr_id?: string;
    qty_in_figures?: string;
    uom?: string;
    description?: string;
    status?: string;
};

export function DataTable({ variant = 'header', items, setItems, showAddRow, ...props }: DataTableProps) {
    const [newRow, setNewRow] = useState({
        pr_id: '',
        qty_in_figures: '',
        uom: '',
        description: '',
        status: '',
    });
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editRow, setEditRow] = useState({
        pr_id: '',
        qty_in_figures: '',
        uom: '',
        description: '',
        status: '',
    });

    const handleNewRowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewRow({ ...newRow, [name]: value });
    };

    const handleAddRow = () => {
        if (!newRow.qty_in_figures || !newRow.uom || !newRow.description) return;
        setItems([...items, { ...newRow, id: Date.now() }]);
        setNewRow({
            pr_id: '',
            qty_in_figures: '',
            uom: '',
            description: '',
            status: '',
        });
    };

    const handleDeleteRow = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleEditClick = (index: number) => {
        setEditIndex(index);
        const item = items[index];
        setEditRow({
            pr_id: item.pr_id ?? '',
            qty_in_figures: item.qty_in_figures ?? '',
            uom: item.uom ?? '',
            description: item.description ?? '',
            status: item.status ?? '',
        });
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

    return (
        <div className="w-full rounded border bg-white shadow">
            <div className="relative overflow-x-auto" {...props}>
                <div className="">
                    <table className="min-w-full divide-y divide-gray-200 text-gray-900">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium tracking-wider uppercase">#</th> {/* Row number header */}
                                <th className="px-4 py-2 text-left text-xs font-medium tracking-wider uppercase">Quantity</th>
                                <th className="px-4 py-2 text-left text-xs font-medium tracking-wider uppercase">UOM</th>
                                <th className="px-4 py-2 text-left text-xs font-medium tracking-wider uppercase">Description</th>
                                <th className="px-4 py-2 text-left text-xs font-medium tracking-wider uppercase">Status</th>
                                {showAddRow && (
                                    <th className="px-4 py-2 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">Actions</th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white text-sm text-gray-500">
                            {/* Inline input row for adding */}
                            {showAddRow && (
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-2"></td> {/* Empty cell for row number in add row */}
                                    <td className="px-4 py-2">
                                        <input
                                            name="qty_in_figures"
                                            type="number"
                                            value={newRow.qty_in_figures}
                                            onChange={handleNewRowChange}
                                            className="w-full rounded border px-2 py-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                            placeholder="Quantity"
                                        />
                                    </td>
                                    <td className="px-4 py-2">
                                        <input
                                            name="uom"
                                            value={newRow.uom}
                                            onChange={handleNewRowChange}
                                            className="w-full rounded border px-2 py-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                            placeholder="UOM"
                                        />
                                    </td>
                                    <td className="px-4 py-2">
                                        <input
                                            name="description"
                                            value={newRow.description}
                                            onChange={handleNewRowChange}
                                            className="w-full rounded border px-2 py-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                            placeholder="Description"
                                        />
                                    </td>
                                    <td className="px-4 py-2">
                                        <input
                                            name="status"
                                            value={newRow.status}
                                            onChange={handleNewRowChange}
                                            className="w-full rounded border px-2 py-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                            placeholder="Status"
                                        />
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        <Button onClick={handleAddRow} type="button" variant="outline" size="sm">
                                            <Plus /> Add
                                        </Button>
                                    </td>
                                </tr>
                            )}
                            {/* Existing items */}
                            {items.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    {editIndex === index ? (
                                        <>
                                            <td className="px-4 py-2">{index + 1}</td> {/* Row number */}
                                            <td className="px-4 py-2">
                                                <input
                                                    name="qty_in_figures"
                                                    value={editRow.qty_in_figures}
                                                    onChange={handleEditRowChange}
                                                    className="w-full rounded border px-2 py-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                                />
                                            </td>
                                            <td className="px-4 py-2">
                                                <input
                                                    name="uom"
                                                    value={editRow.uom}
                                                    onChange={handleEditRowChange}
                                                    className="w-full rounded border px-2 py-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                                />
                                            </td>
                                            <td className="px-4 py-2">
                                                <input
                                                    name="description"
                                                    value={editRow.description}
                                                    onChange={handleEditRowChange}
                                                    className="w-full rounded border px-2 py-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                                />
                                            </td>
                                            <td className="px-4 py-2">
                                                <input
                                                    name="status"
                                                    value={editRow.status}
                                                    onChange={handleEditRowChange}
                                                    className="w-full rounded border px-2 py-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                                />
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                <div className="flex justify-center gap-2">
                                                    <Button onClick={() => handleSaveEdit(index)} type="button" size="sm" variant="default">
                                                        Save
                                                    </Button>
                                                    <Button onClick={handleCancelEdit} type="button" size="sm" variant="default">
                                                        Cancel
                                                    </Button>
                                                </div>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="px-4 py-2">{index + 1}</td> {/* Row number */}
                                            <td className="px-4 py-2">{item.qty_in_figures}</td>
                                            <td className="px-4 py-2">{item.uom}</td>
                                            <td className="px-4 py-2">{item.description}</td>
                                            <td className="px-4 py-2">{item.status}</td>
                                            {showAddRow && (
                                                <td className="px-4 py-2 text-center">
                                                    <div className="flex justify-center gap-2">
                                                        <Button onClick={() => handleEditClick(index)} type="button" size="sm" variant="outline">
                                                            <Pen />
                                                        </Button>
                                                        <Button onClick={() => handleDeleteRow(index)} type="button" size="sm" variant="default">
                                                            <Trash />
                                                        </Button>
                                                    </div>
                                                </td>
                                            )}
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
