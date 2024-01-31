import { YearSelector, YearSelectorProps } from "./YearSelector";

interface Props extends Omit<YearSelectorProps, "type"> {}

const YearSelectorExport = (props: Props) => {
  return <YearSelector {...props} />;
};

export default YearSelectorExport;
