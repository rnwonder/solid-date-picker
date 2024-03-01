import { YearSelector, YearSelectorProps } from "./YearSelector";

export interface YearSelectorExportProps extends Omit<YearSelectorProps, "type"> {}

const YearSelectorExport = (props: YearSelectorExportProps) => {
  return <YearSelector {...props} />;
};

export default YearSelectorExport;
