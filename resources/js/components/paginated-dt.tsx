import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Modal from '@/components/ui/modal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Link } from '@inertiajs/react';
import axios from 'axios';
import { Edit, PlusCircleIcon, RefreshCcw, Search, Trash } from 'lucide-react';
import { useState } from 'react';
// import Select from 'react-select';
import Swal from 'sweetalert2';

type Item = {};

type Action =
    | {
          type: 'button';
          label: string;
          variant: 'default' | 'link' | 'destructive' | 'outline' | 'secondary' | 'ghost';
          onClick: (item: any) => void;
          icon?: React.ReactNode;
      }
    | {
          type: 'link';
          label: string;
          href: string;
          icon?: React.ReactNode;
      };

export type PaginatedDtProps = {
    items: Item[];
    data: { data: Item[]; current_page: number; last_page: number };
    canAdd?: boolean;
    canDelete?: boolean;
    canEdit?: boolean;
    checkBox?: boolean;
    inputableCol?: Array<{ label: string; name: string; type: string; options?: Array<{ label: string; value: string }> }>;
    columnNames: string[];
    filterColumns?: string[];
    hiddenColumns?: number[];
    actions?: ((item: Item) => Action[]) | Action[];
    headerActions?: React.ReactNode;
    handlePageChange: (page: number) => void;
    renderCell?: (column: number, value: any, row: any) => React.ReactNode;
    fetchData: (page: number, search: string, filter?: any, sortColumn?: string, sortDirection?: 'asc' | 'desc') => void;
    isDateColumn?: (col: string, idx: number) => boolean;
    [key: string]: any;
    loading?: boolean;
};

export function PaginatedDt({
    columnNames,
    canAdd,
    canDelete,
    canEdit,
    checkBox = true,
    inputableCol = [{ label: '', name: '', type: '' }],
    filterColumns = [],
    hiddenColumns = [],
    actions,
    items,
    handlePageChange,
    data,
    renderCell,
    fetchData,
    isDateColumn,
    loading = true,
    headerActions,
    ...props
}: PaginatedDtProps) {
    // Define a type for filter value: can be string or an object for date filters
    type FilterValue =
        | string
        | {
              column: string;
              value?: string;
              from?: string;
              to?: string;
          };

    // Parse filter params from URL or props
    const queryParams = new URLSearchParams(window.location.search);
    const initialFilters = filterColumns.map((col, idx) => {
        const from = queryParams.get(`${col}_from`) || '';
        const to = queryParams.get(`${col}_to`) || '';
        const value = queryParams.get(col) || '';
        if (isDateColumn && isDateColumn(col, idx)) {
            return { column: col, from, to };
        }
        return { column: col, value };
    });

    const [filters, setFilters] = useState(initialFilters);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    // Handle filter change for each column
    const handleFilterChange = (index: number, value: any) => {
        const updated = [...filters];
        updated[index] = value;
        setFilters(updated);
    };

    // Apply filters (you can adjust this to send all filters to fetchData)
    const handleApply = () => {
        // Example: send all filters as an object or string
        fetchData(1, '', filters);
    };

    const handleClear = () => {
        // Reset filters state
        const clearedFilters = filterColumns.map((col, idx) =>
            isDateColumn && isDateColumn(col, idx) ? { column: col, from: '', to: '' } : { column: col, value: '' },
        );
        setFilters(clearedFilters);

        // Clear filters in the URL by calling fetchData with empty filters and search
        fetchData(1, '', clearedFilters);

        // Optionally, also clear the search term if you want
        // setSearchTerm('');
    };

    // Parse query parameters from the URL for initial search value
    const initialSearch = queryParams.get('search') || '';
    const [searchTerm, setSearchTerm] = useState(initialSearch);

    // Sorting state
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

    // Sorting handler
    const handleSort = (col: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortColumn === col) {
            direction = sortDirection === 'asc' ? 'desc' : 'asc';
        }
        setSortColumn(col);
        setSortDirection(direction);
        fetchData(1, searchTerm, filters, col, direction);
    };

    // Function to open modal (optionally with data)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState<any>({});

    const openModal = (data = {}) => {
        setModalData(data);
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        try {
            const endpoint = window.location.pathname;
            const response = await axios.post(endpoint, modalData);
            if (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Data created successfully!',
                    timer: 2000,
                    showConfirmButton: false,
                    customClass: {
                        popup: 'z-index: 99999',
                    },
                });
                setIsModalOpen(false);
                // Optionally refresh data here
                fetchData(1, searchTerm, filters);
            }
        } catch (error: any) {
            setErrors(error.response.data.errors);
            // console.log();
        }
    };

    const handleUpdate = async () => {
        const endpoint = `${window.location.pathname}`;
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, update it!',
        });
        if (confirm.isConfirmed) {
            try {
                await axios.put(endpoint, modalData);
                Swal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    text: 'The item has been updated.',
                    timer: 1500,
                    showConfirmButton: false,
                });

                setIsModalOpen(false);
                fetchData(1, searchTerm, filters); // Refresh data
            } catch (error: any) {
                setErrors(error.response.data.errors);
            }
        }
    };

    const handleDelete = async (item: any) => {
        const endpoint = `${window.location.pathname}/${item.id}`;
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirm.isConfirmed) {
            try {
                await axios.delete(endpoint);
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'The item has been deleted.',
                    timer: 1500,
                    showConfirmButton: false,
                });
                fetchData(1, searchTerm, filters); // Refresh data
            } catch (error: any) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.response?.data?.message || 'Failed to delete item.',
                });
            }
        }
    };

    const handleDelChecked = async () => {
        const endpoint = `${window.location.pathname}/delete-checked`;
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirm.isConfirmed) {
            try {
                await axios.post(endpoint, { data: selectedRows });
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'The item has been deleted.',
                    timer: 1500,
                    showConfirmButton: false,
                });
                fetchData(1, searchTerm, filters); // Refresh data
            } catch (error: any) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.response?.data?.message || 'Failed to delete item.',
                });
            }
        }
    };

    const handleEdit = (item: any) => {
        setModalData(item); // Populate modal with the item's data
        setIsModalOpen(true); // Open the modal
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const totalPages = data.last_page;
        const currentPage = data.current_page;
        const maxPageNumbers = 5;
        const halfMaxPageNumbers = Math.floor(maxPageNumbers / 2);

        let startPage = Math.max(1, currentPage - halfMaxPageNumbers);
        let endPage = Math.min(totalPages, currentPage + halfMaxPageNumbers);

        if (currentPage <= halfMaxPageNumbers) {
            endPage = Math.min(totalPages, maxPageNumbers);
        } else if (currentPage + halfMaxPageNumbers >= totalPages) {
            startPage = Math.max(1, totalPages - maxPageNumbers + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`mx-1 rounded-md border px-3 py-1 ${currentPage === i ? 'bg-gray-300' : 'bg-white'} text-sm font-medium text-gray-700 hover:bg-gray-50`}
                >
                    {i}
                </button>,
            );
        }

        if (endPage < totalPages) {
            pageNumbers.push(
                <span key="ellipsis" className="mx-1 text-sm font-medium text-gray-700">
                    ...
                </span>,
            );
            pageNumbers.push(
                <button
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    className={`mx-1 rounded-md border px-3 py-1 ${currentPage === totalPages ? 'bg-gray-300' : 'bg-white'} text-sm font-medium text-gray-700 hover:bg-gray-50`}
                >
                    {totalPages}
                </button>,
            );
        }

        return pageNumbers;
    };

    return (
        <div className="relative m-4" {...props}>
            <Modal isOpen={isModalOpen} title="Details" onClose={() => setIsModalOpen(false)} onSave={modalData.id ? handleUpdate : handleSave}>
                <div className="mb-4">
                    <div className="grid gap-5 lg:grid-cols-2">
                        {/* {JSON.stringify(errors)} */}
                        {inputableCol.map((col: any) => (
                            <div key={col.name}>
                                <Label htmlFor={col.name} className="mb-2 block font-bold text-gray-800">
                                    {col.label}
                                </Label>{' '}
                                {errors[col.name] && <span className="text-sm text-red-600">{errors[col.name]}</span>}
                                {col.type === 'select' ? (
                                    <Select
                                        value={modalData[col.name] || ''}
                                        onValueChange={(selectedValue) => {
                                            setModalData({ ...modalData, [col.name]: selectedValue });
                                            setErrors({ ...errors, [col.name]: false });
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent className="z-99999">
                                            {col.options.map((opt: any) => (
                                                <SelectItem key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                ) : (
                                    // <Select
                                    //     id={col.name}
                                    //     placeholder={col.label}
                                    //     isClearable
                                    //     options={col.options.map((item: any) => ({
                                    //         value: item.value,
                                    //         label: item.label,
                                    //     }))}
                                    //     value={col.options.find((option: any) => option.value == modalData[col.name]) || null}
                                    //     onChange={(selectedOption) => {
                                    //         setModalData({ ...modalData, [col.name]: selectedOption ? selectedOption.value : '' });
                                    //         setErrors({ ...errors, [col.name]: false }); // Clear error on change
                                    //     }}
                                    //     styles={{
                                    //         control: (baseStyles, state) => ({
                                    //             ...baseStyles,
                                    //             borderColor: errors[col.name] ? 'red' : baseStyles.borderColor,
                                    //         }),
                                    //     }}
                                    // />
                                    <Input
                                        type={col.type}
                                        name={col.name}
                                        placeholder={col.name}
                                        value={modalData[col.name] || ''}
                                        onChange={(e) => setModalData({ ...modalData, [col.name]: e.target.value })}
                                        className={`${errors[col.name] ? 'border-red-500' : 'border-gray-300'} w-full rounded border p-2`}
                                        autoComplete="new-password"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                {/* Add your Save/Submit button here */}
            </Modal>
            <div className="mb-2 flex flex-col">
                {filterColumns.length > 0 && (
                    <div className="mb-2 flex flex-row items-end gap-2 border-b border-gray-100 pb-2">
                        {filterColumns.map((col, idx) => {
                            const dateCol = isDateColumn ? isDateColumn(col, idx) : false;

                            return (
                                <div className="flex flex-col" key={col}>
                                    <Label htmlFor={`filter-${idx}`} className="text-sm font-bold text-gray-600">
                                        {col}
                                    </Label>
                                    {dateCol ? (
                                        <div className="flex gap-1">
                                            <Input
                                                id={`filter-${idx}-from`}
                                                type="date"
                                                placeholder="From"
                                                value={filters[idx]?.from || ''}
                                                onChange={(e) =>
                                                    handleFilterChange(idx, {
                                                        ...filters[idx],
                                                        from: e.target.value,
                                                        column: filterColumns[idx],
                                                    })
                                                }
                                                className="border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground focus-visible:border-ring focus-visible:ring-ring/50 block h-9 min-w-0 rounded-md border bg-transparent px-1 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm"
                                            />
                                            <Input
                                                id={`filter-${idx}-to`}
                                                type="date"
                                                placeholder="To"
                                                value={filters[idx]?.to || ''}
                                                onChange={(e) =>
                                                    handleFilterChange(idx, {
                                                        ...filters[idx],
                                                        to: e.target.value,
                                                        column: filterColumns[idx],
                                                    })
                                                }
                                                className="border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground focus-visible:border-ring focus-visible:ring-ring/50 block h-9 min-w-0 rounded-md border bg-transparent px-1 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm"
                                            />
                                        </div>
                                    ) : (
                                        <Input
                                            id={`filter-${idx}`}
                                            type="text"
                                            placeholder={`Filter ${col}`}
                                            value={filters[idx]?.value || ''}
                                            onChange={(e) =>
                                                handleFilterChange(idx, {
                                                    column: filterColumns[idx],
                                                    value: e.target.value,
                                                })
                                            }
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleApply();
                                                }
                                            }}
                                            className="border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground focus-visible:border-ring focus-visible:ring-ring/50 block h-9 min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm"
                                        />
                                    )}
                                </div>
                            );
                        })}
                        <div className="flex flex-row items-end gap-2">
                            <button
                                type="button"
                                onClick={handleApply}
                                className="h-9 rounded bg-blue-600 px-4 text-white transition hover:bg-blue-700"
                            >
                                Apply
                            </button>
                            <button
                                type="button"
                                onClick={handleClear}
                                className="h-9 rounded bg-gray-300 px-4 text-gray-800 transition hover:bg-gray-400"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                )}

                <div className="flex w-full flex-row items-center justify-between">
                    <div className="flex flex-row gap-1">
                        <Button title="Refresh" onClick={() => fetchData(data.current_page, searchTerm, filters)}>
                            <RefreshCcw />
                        </Button>
                        {/* <Button title="Export to Excel">
                            <FileSpreadsheet />
                        </Button> */}
                        {canAdd && (
                            <Button onClick={() => openModal({})} title="Create User" className="bg-blue-600 text-white hover:bg-blue-700">
                                <PlusCircleIcon /> Create
                            </Button>
                        )}
                        {canDelete && (
                            <Button
                                onClick={handleDelChecked}
                                title="Create User"
                                className="bg-blue-600 text-white hover:bg-blue-700"
                                disabled={selectedRows.length === 0}
                            >
                                <Trash /> Delete
                            </Button>
                        )}
                        {headerActions}
                    </div>
                    <div className="flex w-full max-w-md flex-row items-center md:w-auto md:min-w-[350px]">
                        <Input
                            type="text"
                            placeholder="Search across all columns"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    fetchData(1, searchTerm, filters); // <-- Use parent function and pass filters if needed
                                }
                            }}
                            className="border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground focus-visible:border-ring focus-visible:ring-ring/50 block h-9 w-full min-w-0 rounded-l-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm"
                            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                        />
                        <button
                            type="button"
                            onClick={() => fetchData(1, searchTerm, filters)} // <-- Use parent function and pass filters if needed
                            className="flex h-9 items-center justify-center rounded-r-md border border-l-0 bg-blue-600 px-4 py-1.5 text-white transition hover:bg-blue-700"
                            style={{ minWidth: '44px', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                        >
                            <Search />
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr className="font-bold">
                                {checkBox && (
                                    <th className="pl-2 text-center">
                                        <input
                                            type="checkbox"
                                            checked={items.length > 0 && selectedRows.length === items.length}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedRows(items.map((item: any) => item.id));
                                                } else {
                                                    setSelectedRows([]);
                                                }
                                            }}
                                            className="focus:ring-slate-750 h-4 w-4 border-gray-300 accent-slate-800 focus:ring-1"
                                        />
                                    </th>
                                )}
                                {columnNames.map((column, index) =>
                                    hiddenColumns.includes(index) ? null : (
                                        <th
                                            key={column}
                                            className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase select-none"
                                            onClick={() => handleSort(column)}
                                        >
                                            <span className="flex items-center gap-1">
                                                {column.toUpperCase()}
                                                {sortColumn === column && <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>}
                                            </span>
                                        </th>
                                    ),
                                )}
                                {((actions && (typeof actions === 'function' || actions.length > 0)) || canDelete || canEdit) && (
                                    <th
                                        className="bg-gray-100 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                        style={{ position: 'sticky', right: 0, zIndex: 2 }}
                                    >
                                        Actions
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {items.length > 0 ? (
                                items.map((item: any, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {checkBox && (
                                            <td className="pl-2 text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRows.includes(item.id)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelectedRows([...selectedRows, item.id]);
                                                        } else {
                                                            setSelectedRows(selectedRows.filter((id) => id !== item.id));
                                                        }
                                                    }}
                                                    className="h-4 w-4 rounded border-gray-950 accent-slate-900 focus:border-gray-950 focus:ring-3 focus:ring-slate-500"
                                                />
                                            </td>
                                        )}
                                        {Object.values(item).map((value, colIndex) =>
                                            hiddenColumns.includes(colIndex) ? null : (
                                                <td key={colIndex} className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                                    {renderCell ? (
                                                        renderCell(colIndex, value, item) // Use custom render function if provided
                                                    ) : typeof value === 'object' && value !== null ? (
                                                        <span>{JSON.stringify(value)}1</span> // Handle nested objects
                                                    ) : (
                                                        <span>{String(value || '-')}</span>
                                                    )}
                                                </td>
                                            ),
                                        )}
                                        {(((actions && typeof actions === 'function' ? actions(item) : actions) ?? []).length > 0 ||
                                            canDelete ||
                                            canEdit) && (
                                            <td
                                                className="bg-white px-6 py-4 text-sm whitespace-nowrap text-gray-500"
                                                style={{ position: 'sticky', right: 0, zIndex: 1 }}
                                            >
                                                {(typeof actions === 'function' ? actions(item) : actions)?.map((action, actionIndex) => {
                                                    if (action.type === 'link') {
                                                        return (
                                                            <Link
                                                                key={actionIndex}
                                                                href={action.href}
                                                                className="mx-1 inline-flex items-center rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                                                            >
                                                                {action.icon && <span className="mr-2">{action.icon}</span>}
                                                                <span>{action.label}</span>
                                                            </Link>
                                                        );
                                                    } else {
                                                        return (
                                                            <Button
                                                                key={actionIndex}
                                                                onClick={() => action.onClick(item)}
                                                                variant={action.variant || 'default'}
                                                                className="mx-1"
                                                            >
                                                                {action.icon && <span className="mr-2">{action.icon}</span>}
                                                                <span>{action.label}</span>
                                                            </Button>
                                                        );
                                                    }
                                                })}

                                                {canEdit && (
                                                    <Button onClick={() => handleEdit(item)} variant="default" className="mx-1">
                                                        <Edit />
                                                        <span>Edit</span>
                                                    </Button>
                                                )}

                                                {canDelete && (
                                                    <Button onClick={() => handleDelete(item)} variant="destructive" className="mx-1">
                                                        <Trash />
                                                        <span>Delete</span>
                                                    </Button>
                                                )}
                                            </td>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={columnNames.length + ((actions?.length ?? 0) > 0 ? 1 : 0)}
                                        className="px-6 py-4 text-center text-sm text-gray-500"
                                    >
                                        No transactions found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* <div className="m-4 flex items-center justify-end">
                    <button
                        onClick={() => handlePageChange(data.current_page - 1)}
                        disabled={data.current_page === 1}
                        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Previous
                    </button>
                    <div className="mx-2 flex">{renderPageNumbers()}</div>
                    <button
                        onClick={() => handlePageChange(data.current_page + 1)}
                        disabled={data.current_page === data.last_page}
                        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Next
                    </button>
                </div> */}
            </div>

            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-black/50" style={{ backdropFilter: 'blur(2px)' }}>
                    <div className="flex flex-col items-center">
                        <svg className="mb-4 h-12 w-12 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                        <span className="text-lg font-semibold text-white">Loading...</span>
                    </div>
                </div>
            )}
        </div>
    );
}
