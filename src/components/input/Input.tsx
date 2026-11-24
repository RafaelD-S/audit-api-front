import type { IInput } from "./input.interface";
import SendSVG from "../../assets/send.svg";
import LoadingSVG from "../../assets/loading.svg";
import { useLayoutEffect, useRef, type ChangeEvent } from "react";
import "./input.styles.scss";

const Input = ({ selectInline, disabled, ...rest }: IInput) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "0px";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  useLayoutEffect(() => {
    if (textareaRef.current) {
      resizeTextarea(textareaRef.current);
    }
  }, [rest.value]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    resizeTextarea(event.currentTarget);
    rest.onChange?.(event);
  };

  return (
    <div className="input__wrapper">
      <div className="input" aria-disabled={disabled}>
        <textarea
          {...rest}
          name="AI-textarea"
          ref={textareaRef}
          rows={1}
          onChange={handleChange}
          disabled={disabled}
          aria-disabled={disabled}
        />
        <div className="input__actions">
          <div className="input__select">{selectInline}</div>
        </div>
      </div>
      <button type="submit" disabled={disabled} aria-disabled={disabled}>
        <img src={disabled ? LoadingSVG : SendSVG} alt="Send" />
      </button>
    </div>
  );
};

export default Input;
