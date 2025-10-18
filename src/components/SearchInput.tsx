import { TextInput } from '@mantine/core';

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const SearchInput = ({ placeholder = 'Search...', value, onChange }: SearchInputProps) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange?.(event.currentTarget.value)}
    />
  );
};
