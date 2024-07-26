import { useState, useRef, ChangeEvent, KeyboardEvent, FC } from 'react';
import { useClickAway } from "../utils/hooks/useClickAway";
import './MultiSelectDropdown.scss';

interface MultiSelectDropdownProps {
    options: string[];
    onChange: (selected: string[]) => void;
}

const MultiSelectDropdown: FC<MultiSelectDropdownProps> = ({ options, onChange }) => {
    const [dropdownOptions, setDropdownOptions] = useState<string[]>(options);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    useClickAway(dropdownRef, () => setIsDropdownOpen(false));

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            if (!dropdownOptions.includes(inputValue)) {
                setDropdownOptions([...dropdownOptions, inputValue]);
            }
            setSelectedItems([...selectedItems, inputValue]);
            onChange([...selectedItems, inputValue]);
            setInputValue('');
        }
    };

    const toggleSelect = (item: string) => {
        if (selectedItems.includes(item)) {
            const newSelectedItems = selectedItems.filter(i => i !== item);
            setSelectedItems(newSelectedItems);
            onChange(newSelectedItems);
        } else {
            const newSelectedItems = [...selectedItems, item];
            setSelectedItems(newSelectedItems);
            onChange(newSelectedItems);
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="multi-select-dropdown" ref={dropdownRef}>
            <div className="selected-items" onClick={toggleDropdown}>
                {selectedItems.map(item => (
                    <span key={item} className="selected-item">
            {item}
          </span>
                ))}
            </div>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Type to add..."
                onClick={toggleDropdown}
            />
            {isDropdownOpen && (
                <div className="dropdown-options">
                    {dropdownOptions.map(option => (
                        <div
                            key={option}
                            className={`dropdown-option ${selectedItems.includes(option) ? 'selected' : ''}`}
                            onClick={() => toggleSelect(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export { MultiSelectDropdown };
