import { useCallback, useMemo, useState } from 'react';

export type FieldValidator = (value: string) => string | null;

export const createInitialErrors = <T extends string>(
  validators: Record<T, FieldValidator>
): Record<T, string | null> => {
  const result = {} as Record<T, string | null>;

  for (const key in validators) {
    result[key] = null;
  }

  return result;
};

export const useFormValidation = <T extends string>(
  initialValues: Record<T, string>,
  validators: Record<T, FieldValidator>
) => {
  const [values, setValues] = useState<Record<T, string>>(initialValues);
  const [errors, setErrors] = useState<Record<T, string | null>>(() =>
    createInitialErrors(validators)
  );

  const isValid = useMemo(() => {
    for (const field of Object.keys(validators) as T[]) {
      if (validators[field](values[field])) return false;
    }
    return true;
  }, [values, validators]);

  const setValue = useCallback(
    (field: T, value: string) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      const validate = validators[field];
      setErrors((prev) => {
        if (!prev[field]) return prev;
        const error = validate(value);
        return { ...prev, [field]: error };
      });
    },
    [validators]
  );

  const handleBlur = useCallback(
    (field: T) => () => {
      const validate = validators[field];
      setErrors((prev) => ({ ...prev, [field]: validate(values[field]) }));
    },
    [values, validators]
  );

  const validateAll = useCallback((): boolean => {
    const nextErrors = {} as Record<T, string | null>;
    let isValid = true;
    for (const field of Object.keys(validators) as T[]) {
      const error = validators[field](values[field]);
      nextErrors[field] = error;
      if (error) isValid = false;
    }
    setErrors(nextErrors);
    return isValid;
  }, [values, validators]);

  const getFieldProps = useCallback(
    (field: T) => ({
      value: values[field],
      onChange: (value: string) => setValue(field, value),
      onBlur: handleBlur(field),
      error: !!errors[field],
      errorMessage: errors[field],
    }),
    [values, errors, setValue, handleBlur]
  );

  return { values, errors, isValid, setValue, handleBlur, validateAll, getFieldProps };
};
