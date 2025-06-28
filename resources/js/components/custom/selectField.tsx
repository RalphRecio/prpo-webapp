import { Label } from '@/components/ui/label';
import Select from 'react-select';

interface SelectFieldProps {
    id: string;
    label: string;
    name: string;
    value: any;
    options: any[];
    placeholder?: string;
    customClass?: string;
    isClearable?: boolean;
    isDisabled?: boolean;
    onChange: (selectedOption: any) => void;
}

export function SelectField({
    label,
    id,
    name,
    value,
    options,
    placeholder,
    customClass,
    isClearable = true,
    isDisabled = false,
    onChange,
}: SelectFieldProps) {
    return (
        <div className={`flex-1 ${customClass || ''}`}>
            <Label htmlFor={id} className="mb-1 block font-bold text-gray-800">
                {label}
            </Label>
            <Select
                inputId={id}
                name={name}
                placeholder={placeholder}
                isClearable={isClearable}
                options={options}
                value={options.find((option) => option.value === value) || null}
                onChange={onChange}
                isDisabled={isDisabled}
            />
        </div>
    );
}
