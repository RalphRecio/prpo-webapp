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

    isRequired?: boolean;
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
    isRequired,
}: SelectFieldProps) {
    return (
        <div className={`flex-1 ${customClass || ''}`}>
            <Label htmlFor={id} className="mb-1 block font-bold text-gray-800">
                {label}
                {isRequired && <span className="text-sm text-red-500"> * </span>}
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
