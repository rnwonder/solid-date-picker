export const DatePickerWeek = (props) => {
    return (<div class={`
    calendar-row
    grid
    grid-cols-7
    my-2
    text-sm
    text-red-500
    px-4
    
  `} data-calendar-row={true} 
    //@ts-ignore
    role={"composite"}>
      {props.children}
    </div>);
};
