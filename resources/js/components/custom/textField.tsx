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
}

export function TextField({ label, id, name, type, value, placeholder, customClass, isReadOnly, onChange, ...rest }: TextFieldProps) {
    return (
        <div className={`flex-1 ${customClass}`}>
            <Label htmlFor={id} className="mb-1 block font-bold text-gray-800">
                {label}
            </Label>
            <Input
                id={id}
                type={type}
                name={name}
                className={`w-full rounded-sm shadow-none ${customClass}`}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                readOnly={isReadOnly}
                {...rest} // Spread any additional props here
            />
        </div>
    );
}

export function TextAreaField({ label, id, name, value, placeholder, customClass, isReadOnly, onChange, ...rest }: TextFieldProps) {
    return (
        <div className={`flex-1 ${customClass}`}>
            <Label htmlFor={id} className="mb-1 block font-bold text-gray-800">
                {label}
            </Label>
            <Textarea
                id={id}
                name={name}
                className="rounded-sm shadow-none"
                value={value}
                placeholder={placeholder}
                readOnly={isReadOnly}
                onChange={onChange}
                {...rest} // Spread any additional props here
            />
        </div>
    );
}
