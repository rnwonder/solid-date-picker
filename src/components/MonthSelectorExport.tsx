import { MonthSelector, MonthSelectorProps } from "./MonthSelector";

export interface MonthSelectorExportProps extends Omit<MonthSelectorProps, "type"> {}

const MonthSelectorExport = (props: MonthSelectorExportProps) => {
  return <MonthSelector {...props} />;
};

export default MonthSelectorExport;
