import { useState } from 'react';
import { MultiSelectDropdown } from "./components/MultiSelectDropDown/MultiSelectDropdown";
import { MockOptions } from "./constants/Mocks/mockOptions";
import './App.scss';

function App() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleMultiSelectChange = (selected: string[]) => {
      setSelectedItems(selected);
  };

  return (
    <div className="App">
        <div>
            <strong>Selected Items: {selectedItems.join(', ')}</strong>
        </div>
        <div>
            <MultiSelectDropdown options={MockOptions} onChange={handleMultiSelectChange} />
        </div>
    </div>
  );
}

export default App;
