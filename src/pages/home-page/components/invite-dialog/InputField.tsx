import { Input } from '@/components/shadcn/input';
import { Label } from '@/components/shadcn/label';
import { memo } from 'react';

interface InputFieldProps {
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  errorMessage?: string | null;
}

const InputField = ({
  id,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  errorMessage,
}: InputFieldProps): JSX.Element => {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{placeholder}</Label>
      <Input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {errorMessage && (
        <div className="text-xs text-red-500">{errorMessage}</div>
      )}
    </div>
  );
};

export const MemoizedInputField = memo(InputField, (prev, next) => {
  return prev.value === next.value && prev.errorMessage === next.errorMessage;
});
