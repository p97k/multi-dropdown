import { useState, useRef, FC, ChangeEvent, KeyboardEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useClickAway } from "../../utils/hooks/useClickAway";
import { IMultiSelectDropdownProps } from "./MultiSelectDropDownInterface";
import './MultiSelectDropdown.scss';

const MultiSelectDropdown: FC<IMultiSelectDropdownProps> = ({ options, onChange }) => {
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
            const newOption = inputValue;
            if (!dropdownOptions.includes(newOption)) {
                setDropdownOptions([...dropdownOptions, newOption]);
            }
            setSelectedItems([...selectedItems, newOption]);
            onChange([...selectedItems, newOption]);
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
            <div className="multi-select-dropdown__input-container">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type to add..."
                    onClick={toggleDropdown}
                    className="multi-select-dropdown__input-container__input"
                />
                <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`multi-select-dropdown__input-container__dropdown-icon 
                    ${isDropdownOpen ? 'multi-select-dropdown__input-container__dropdown-icon--rotate' : ''}`}
                />
            </div>
            <div className={`multi-select-dropdown__dropdown-options 
                 ${isDropdownOpen ? 'multi-select-dropdown__dropdown-options--open' : ''}`}
            >
                {dropdownOptions.map(option => (
                    <div
                        key={option}
                        className={`multi-select-dropdown__dropdown-options__dropdown-option 
                        ${selectedItems.includes(option) ? 'multi-select-dropdown__dropdown-options__dropdown-option--selected' : ''}`}
                        onClick={() => toggleSelect(option)}
                    >
                        {option}
                        {selectedItems.includes(option) && (
                            <FontAwesomeIcon
                                icon={faCheck}
                                className="multi-select-dropdown__dropdown-options__dropdown-option__check-icon"
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export { MultiSelectDropdown };
