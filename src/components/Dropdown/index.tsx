import solid, { createSignal } from "solid-js";
import { styled } from "solid-styled-components";
import { CustomPortal } from "../CustomPortal";

const StyledDropdown = styled("div")``;
export const Dropdown = () => {
  const [isShown, setIsShown] = createSignal(false);
  return (
    <div>
      <button onClick={() => setIsShown(true)}>Dropdown</button>
      <CustomPortal setIsShown={setIsShown} isShown={isShown()}>
        <StyledDropdown>
          <div>Dropdown</div>
          <div>Dropdown</div>
          <div>Dropdown</div>
        </StyledDropdown>
      </CustomPortal>
    </div>
  );
};
