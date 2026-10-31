import Tooltip from 'rc-tooltip';

interface Props {
  children: React.ReactNode;
  label: string;
  onClick: () => void
  isSelected?: boolean;
}

const IconButton: React.FC<Props> = ({ children, label, onClick, isSelected }) => {
  return (
    <Tooltip placement='right' overlay={<span>{label}</span>}>
      <button
        type="button"
        aria-label={label}
        aria-pressed={isSelected}
        onClick={onClick}
        className={`icon-button ${isSelected ? "tab-selected" : ""}`}
      >
        {children}
      </button>
    </Tooltip>
  );
};

export default IconButton;
