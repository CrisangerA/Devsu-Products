import React, { useMemo } from 'react';
import { TouchableOpacity, TextInput as RNTextInput } from 'react-native';
import RNDatePicker from 'react-native-date-picker';

import { TextInput, TextInputProps } from './TextInput';

export interface DatePickerProps extends TextInputProps {
  date?: Date;
  setDate?: (date: Date) => void;
  mode?: 'time' | 'date' | 'datetime';
}

export const DatePicker = React.forwardRef<RNTextInput, DatePickerProps>(
  ({ date, setDate, mode, ...rest }, ref) => {
    const [open, setOpen] = React.useState(false);

    const formatedDate = useMemo(() => {
      if (!date) {
        return '';
      }
      return new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(date || new Date());
    }, [date]);

    return (
      <>
        <TouchableOpacity
          onPress={() => setOpen(true)}
          disabled={rest.editable === false}
        >
          <TextInput
            ref={ref}
            //iconRight="calendar-blank"
            pointerEvents="none"
            value={formatedDate}
            {...rest}
          />
        </TouchableOpacity>
        {open && (
          <RNDatePicker
            modal
            mode={mode}
            open={open}
            date={date || new Date()}
            onConfirm={value => {
              setOpen(false);
              setDate?.(value);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        )}
      </>
    );
  },
);
