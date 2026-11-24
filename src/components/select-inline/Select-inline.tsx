import "./select-inline.styles.scss";
import type { ISelectInline } from "./select-inline.interface";

const SelectInline = ({ label = "Modelo", options = [], ...rest }: ISelectInline) => {
  return (
    <div className="select-inline">
      <label className="select-inline__label">
        {label}
        <select aria-label={label} defaultValue={options[0]?.value} {...rest}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default SelectInline;
