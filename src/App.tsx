import { useState } from 'react';
import { MultiSelectDropdown } from "./components/MultiSelectDropdown";
import './App.scss';

function App() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleMultiSelectChange = (selected: string[]) => {
      setSelectedItems(selected);
  };

  return (
    <div className="App">
        <div>
            <MultiSelectDropdown options={['Option 1', 'Option 2', 'Option 3']} onChange={handleMultiSelectChange} />
            <p>Selected Items: {selectedItems.join(', ')}</p>
        </div>
    </div>
  );
}

export default App;
