export interface ISelectOption {
  label: string;
  value: string;
}

export interface ISelectInline extends React.ComponentProps<"select"> {
  label?: string;
  options: ISelectOption[];
}
