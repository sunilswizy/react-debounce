import "./autocomplete.styles.css";

interface Items {
  id: string;
  title: string;
  category: string;
  brand: string;
}

interface AutoCompleteData {
  autoCompleteData: Items[];
  handleClick: (suggestion: string) => void;
  selectedIdx: number
}

const AutoComplete: React.FC<AutoCompleteData> = ({
  autoCompleteData,
  handleClick,
  selectedIdx
}) => {

  return (
    <div className="auto-complete">
      {autoCompleteData.map((each, idx) => {
        return (
          <div
            className={`autocomplete-child ${selectedIdx === idx ? 'selected': ''}`}
            key={each.id}
            onClick={() => handleClick(each.title)}
          >
            {each.title}
          </div>
        );
      })}
    </div>
  );
};

export default AutoComplete;
