import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the default styles

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
  className?: string;
}

// Define the custom input component with forwardRef
const CustomInput = React.forwardRef<HTMLButtonElement, CustomInputProps>(
  ({ value, onClick, className }, ref) => (
    <button
      type="button"
      className={`text-gray-800 text-base w-full border border-gray-300 p-2 rounded-md ${className}`}
      onClick={onClick}
      ref={ref}
    >
      {value || 'Select a date'}
    </button>
  )
);

// Add a display name for easier debugging
CustomInput.displayName = 'CustomInput';

interface CustomDatePickerProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  dateFormat?: string;
  placeholderText?: string;
  className?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  selectedDate,
  onDateChange,
  dateFormat = 'yyyy/MM/dd',
  placeholderText = 'Select date',
  className,
}) => {
  return (
    <div style={{ display: 'block' }}> 
    <DatePicker
      selected={selectedDate}
      onChange={onDateChange}
      dateFormat={dateFormat}
      placeholderText={placeholderText}
      customInput={<CustomInput className={className} />}
    />
    </div>
  );
};

export default CustomDatePicker;
