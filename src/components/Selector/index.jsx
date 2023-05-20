import { createSignal, For } from "solid-js";
import clsx from "clsx";
import { Popover } from "../Popover";
import { Button } from "../Button";
export const Selector = (props) => {
    const [open, setOpen] = createSignal(false);
    const handleOptionClick = (index, value, fn) => {
        if (props.useValueAsName) {
            props.setOption(Number(value));
        }
        else {
            props.setOption(index);
        }
        fn?.();
    };
    const isSelected = (value, index) => {
        return props.useValueAsName
            ? props.option() === Number(value)
            : props.option() === index();
    };
    return (<Popover zIndex={props.zIndex} onOpen={() => {
            setOpen(true);
            const selectedOption = document.querySelector("[data-selected=true]");
            selectedOption?.scrollIntoView({
                block: "center",
                inline: "center",
            });
        }} onClose={() => setOpen(false)} content={({ close }) => (<div class={`
            selector
            bg-white
            rounded-lg
            drop-shadow-lg
            grid
            ${props.gridTemplateColumnsNo
                ? props.gridTemplateColumnsNo === "3"
                    ? `grid-cols-3`
                    : `grid-cols-4`
                : "grid-cols-4"}
            gap-2
            p-2
            max-h-[10.625rem]
            max-w-[25rem]
            overflow-y-auto
          `} ref={props.ref} 
        //@ts-ignore
        role={"composite"} aria-activedescendant={props.option()} aria-multiselectable={false} aria-readonly={false} aria-disabled={false} data-selector={true}>
          <For each={props.optionsArray}>
            {(value, index) => (<Button class={clsx(`
                  selector-option
                  px-[5px] 
                  text-black 
                  text-sm
                  smallMobile:text-[12px]
                  ${isSelected(value, index)
                    ? "bg-primary text-white hover:bg-primary hover:text-white selector-option-selected"
                    : ""}
                `, props.className)} onClick={() => handleOptionClick(index(), value, close)} data-selected={isSelected(value, index)} data-selector-option={true} aria-selected={isSelected(value, index)} aria-disabled={false} aria-readonly={false} aria-label={value} aria-setsize={props.optionsArray.length} aria-posinset={index() + 1} aria-controls={"selector"} aria-owns={value} {...(props.attributes || {})}>
                {value}
              </Button>)}
          </For>
        </div>)}>
      <Button class={clsx(`
        p-[5px]
        text-black
        text-[15px]
        animate-none
        font-bold
        selector-trigger
      `)} aria-haspopup={true} aria-expanded={open()} data-selector-trigger={true}>
        {props.useValueAsName
            ? props.option()
            : props.optionsArray[props.option()]}
      </Button>
    </Popover>);
};
