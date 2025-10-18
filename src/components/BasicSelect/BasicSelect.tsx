import { Combobox, Input, InputBase, useCombobox } from '@mantine/core';
import classNames from 'classnames';
import { IconCheck, IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import type { BasicSelectProps } from '@/types';
import styles from './BasicSelect.module.sass';

export function BasicSelect({
  value,
  options,
  leftSection,
  onChange,
  placeholder,
  buttonProps,
  label,
  required,
  error,
  color,
  withShadow = false,
  wrapperClassName,
  ...comboboxProps
}: BasicSelectProps) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  return (
    <Input.Wrapper
      label={label}
      required={required}
      error={error}
      className={wrapperClassName}
      classNames={{ error: styles.error }}
    >
      <Combobox
        classNames={{ dropdown: styles.comboboxWrap }}
        store={combobox}
        onOptionSubmit={(val) => {
          onChange(val);
          combobox.closeDropdown();
        }}
        {...comboboxProps}
      >
        <Combobox.Target>
          <InputBase
            component="button"
            type="button"
            pointer
            color={color}
            classNames={{
              input: classNames(styles.input, {
                [styles.shadow]: withShadow,
                [styles.inputError]: Boolean(error),
              }),
            }}
            leftSection={leftSection || null}
            rightSection={
              combobox.dropdownOpened ? (
                <IconChevronUp className={styles.comboboxIcon} size={24} />
              ) : (
                <IconChevronDown className={styles.comboboxIcon} size={24} />
              )
            }
            onClick={() => combobox.toggleDropdown()}
            {...buttonProps}
          >
            {options.find((opt) => opt.value === value)?.label || (
              <Input.Placeholder className={styles.placeholder}>
                {placeholder || 'Select'}
              </Input.Placeholder>
            )}
          </InputBase>
        </Combobox.Target>
        <Combobox.Dropdown>
          <Combobox.Options>
            {options.map(({ value: optValue, label, leftSection }) => (
              <Combobox.Option value={optValue} key={optValue} active={optValue === value} className={styles.option}>
                {leftSection}
                <span>{label}</span>
                {optValue === value && <IconCheck size={16} className={styles.checkmark} />}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </Input.Wrapper>
  );
}
