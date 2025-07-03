import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface TextFieldProps {
    id: string;
    label: string;
    name: string;
    type?: string;
    value?: string | number;
    placeholder?: string;
    isReadOnly?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    customClass?: string;
    [key: string]: any; // Allow any other prop

    isRequired?: boolean;
}

export function TextField({ label, id, name, type, value, placeholder, customClass, isReadOnly, onChange, isRequired, ...rest }: TextFieldProps) {
    return (
        <div className={`flex-1 ${customClass}`}>
            <Label htmlFor={id} className="mb-1 block text-xs font-bold text-gray-500">
                {label}
                {isRequired && <span className="text-sm text-red-500"> * </span>}
            </Label>
            <Input
                id={id}
                type={type}
                name={name}
                className={`w-full rounded-sm text-sm shadow-none ${customClass}`}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                readOnly={isReadOnly}
                {...rest} // Spread any additional props here
            />
        </div>
    );
}

export function TextAreaField({ label, id, name, value, placeholder, customClass, isReadOnly, onChange, isRequired, ...rest }: TextFieldProps) {
    return (
        <div className={`flex-1 ${customClass}`}>
            <Label htmlFor={id} className="mb-1 block text-xs font-bold text-gray-500">
                {label}
                {isRequired && <span className="text-sm text-red-500"> * </span>}
            </Label>
            <Textarea
                id={id}
                name={name}
                className={`rounded-sm shadow-none ${customClass}`}
                value={value}
                placeholder={placeholder}
                readOnly={isReadOnly}
                onChange={onChange}
                {...rest} // Spread any additional props here
            />
        </div>
    );
}

export function TextDetails({ label, value }: { label: string; value: string | number | undefined }) {
    return (
        <div className="flex flex-col space-y-1">
            <label htmlFor="pr_no" className="text-xs font-medium text-gray-500">
                {label}
            </label>
            <span className="text-black-800 text-sm">{value}</span>
        </div>
    );
}
