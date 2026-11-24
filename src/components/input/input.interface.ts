import type SelectInline from "../select-inline/Select-inline";

export interface IInput extends React.ComponentProps<"textarea"> {
  selectInline?: React.ReactElement<typeof SelectInline>;
}
