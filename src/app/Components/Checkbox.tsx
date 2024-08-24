import { useState } from 'react';

interface CheckboxProps {
  title: string;
  onCheck: (isChecked: boolean, title: string) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ title, onCheck }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    const newCheckedStatus = !isChecked;
    setIsChecked(newCheckedStatus);
    onCheck(newCheckedStatus, title);
  };

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={title}
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="mr-2 h-4 w-4 text-blue-600  border-gray-300 rounded focus:ring-blue-500"
      />
      <label htmlFor={title} className="text-[#737373]">{title}</label>
    </div>
  );
};

export default Checkbox;
