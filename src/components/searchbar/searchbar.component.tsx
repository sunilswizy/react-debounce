import { useRef, useState, type ChangeEvent, type KeyboardEvent, useCallback } from "react";
import AutoComplete from "../autocomplete/autocomplete.component";
import { debounce, throttle } from "../../utils/uitls";

const SearchBar = () => {
    const [search, setSearch] = useState('');
    const [data, setData] = useState<any[]>([]);
    const [showAutoComplete, setShowAutoComplete] = useState(true); 
    const [selectedIdx, setSelectedIdx] = useState(-1);
    // const debounce = useRef<number | null>(null); 
    const debounceInstance = useCallback(debounce(fetchData, 500), []);
    const throttleInstance = useCallback(throttle(fetchData, 500), [])

    const handleSuggestionClick = (suggestion: string) => {
        setSearch(suggestion);
        setShowAutoComplete(false)
    };

    async function fetchData(search: string){
        const url = `https://dummyjson.com/products/search?q=${search}`;
        const response = await fetch(url);
        const data = await response.json();
        setData(data.products);
        setShowAutoComplete(true);
        setSelectedIdx(-1)
    };

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        throttleInstance(e.target.value);

        // if(debounce.current) {
        //     clearTimeout(debounce.current)
        //     debounce.current = null;
        // };

        // debounce.current = setTimeout(async () => {
        //     const url = `https://dummyjson.com/products/search?q=${e.target.value}`;
        //     const response = await fetch(url);
        //     const data = await response.json();
        //     setData(data.products);
        //     setShowAutoComplete(true);
        //     setSelectedIdx(-1)
        // }, 500)
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'ArrowDown') {
            if(selectedIdx === data.length - 1) {
                return setSelectedIdx(0);
            }

            setSelectedIdx(selectedIdx + 1);
        };

        if(e.key === 'ArrowUp') {
            if(selectedIdx === 0) {
                return setSelectedIdx(data.length - 1)
            }

            setSelectedIdx(selectedIdx - 1);
        };
        
        if(e.key == 'Enter') {
            handleSuggestionClick(data[selectedIdx].title)
        }
    }

    return <div>
        <input
          type="text" 
          placeholder='search here'
          value={search}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
        />

        {
            showAutoComplete && <AutoComplete autoCompleteData={data} handleClick={handleSuggestionClick} selectedIdx={selectedIdx} />
        }
    </div>
};

export default SearchBar;