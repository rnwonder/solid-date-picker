import { MonthSelector, MonthSelectorProps } from "./MonthSelector";

interface Props extends Omit<MonthSelectorProps, "type"> {}

const MonthSelectorExport = (props: Props) => {
  return <MonthSelector {...props} />;
};

export default MonthSelectorExport;
