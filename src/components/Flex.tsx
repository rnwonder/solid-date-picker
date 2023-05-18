import { Component, JSX } from "solid-js";
import { styled } from "solid-styled-components";

interface FlexProps {
  children: JSX.Element;
  justifyContent?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignItems?: "center" | "flex-start" | "flex-end" | "stretch" | "baseline";
  flexDirection?: "row" | "row-reverse" | "column" | "column-reverse";
  flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
  flexShrink?:
    | "inherit"
    | "initial"
    | "revert"
    | "revert-layer"
    | "unset"
    | String;
  flex?: string;
  width?: string;
  height?: string;
  margin?: string;
  className?: string;
  padding?: string;
  columnGap?: string;
  rowGap?: string;
  gap?: string;
  style?: JSX.CSSProperties;
  onClick?: () => void;
}

const StyledFlex = styled("div")<FlexProps>`
  display: flex;
  ${(props) => props.alignItems && `align-items: props.alignItems`};
  ${(props) => props.margin && `margin: props.margin`};
  ${(props) => props.padding && `padding: props.padding`};
  ${(props) => props.gap && `gap: props.gap`};
  ${(props) => props.justifyContent && `justify-content: props.justifyContent`};
  ${(props) => props.flexDirection && `flex-direction: props.flexDirection`};
  ${(props) => props.flexWrap && `flex-wrap: props.flexWrap`};
  ${(props) => props.flex && `flex: props.flex`};
  ${(props) => props.width && `width: props.width`};
  ${(props) => props.height && `height: props.height`};
  ${(props) => props.flexShrink && `flex-shrink" props.flexShrink`};
  ${(props) => props.columnGap && `column-gap: props.columnGap`};
  ${(props) => props.rowGap && `row-gap: props.rowGap`};
`;

const Flex: Component<FlexProps> = (props) => {
  return (
    <StyledFlex
      {...props}
      style={{
        ...props.style,
      }}
      class={props.className}
    >
      {props.children}
    </StyledFlex>
  );
};

export default Flex;
