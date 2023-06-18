import clsx from "clsx";
import {
  Component,
  createEffect,
  createSignal,
  Accessor,
  Setter,
  For,
  Index,
} from "solid-js";
import style from "./TimeSJ.module.scss";
import {
  ITimeMeridiem,
  ITimePickerFormat,
  ITimeView,
} from "../../interface/general";
import {
  convert12HourTo24Hour,
  convert24HourTo12Hour,
  getAmPm,
  leadingZeros,
} from "../../utils/time";
import { Button } from "../Button";

interface ITimeSJProps {
  close?: () => void;
  setTime: Setter<ITimePickerFormat>;
  time: Accessor<ITimePickerFormat>;
}

export const TimeSJ: Component<ITimeSJProps> = (props) => {
  const [hour, setHour] = createSignal(
    convert24HourTo12Hour(props.time()?.hour ?? 0) + ""
  );
  const [minute, setMinute] = createSignal(props.time().minute + "");
  const [second, setSecond] = createSignal(props.time().second + "");
  const [meridiem, setMeridiem] = createSignal<ITimeMeridiem>(
    getAmPm(props.time().hour ?? 0)
  );
  const [mouseDown, setMouseDown] = createSignal(false);
  const [isPicking, setIsPicking] = createSignal(false);
  const [view, setView] = createSignal<ITimeView>("hour");
  const [onTouch, setOnTouch] = createSignal(false);
  const [inputRef, setInputRef] = createSignal<HTMLInputElement | null>(null);

  const hours = Array.from(Array(12).keys(), (v) => v + 1);
  const minutes = Array.from(Array(60).keys(), (v) =>
    v + 1 === 60 ? 0 : v + 1
  );

  createEffect(() => {
    if (!inputRef()) return;
    if (!view()) return;
    inputRef()?.focus();
  });

  createEffect(() => {
    console.log("isPicking", isPicking());
    if (!isPicking()) return;
    if (mouseDown()) return;
    if (onTouch()) {
      setOnTouch(false);
      setIsPicking(false);
      return;
    }
    handleNext();
    setIsPicking(false);
  });

  createEffect(() => {
    props.setTime((prev) => ({
      ...prev,
      hour: convert12HourTo24Hour(Number(hour()), meridiem()),
      minute: Number(minute()),
      second: Number(second()),
    }));
  });

  const handleChange = (num: number, type: ITimeView) => {
    props.setTime((prev) => ({
      ...prev,
      [type]: num,
    }));
  };

  const handlePointerEnter = (value: number, e: any, type: ITimeView) => {
    console.log("handlePointerEnter");
    const handleMouseDown = () => {
      console.log("handleMouseDown");
      if (!mouseDown()) {
        setMouseDown(true);
      }
      if (!isPicking()) {
        setIsPicking(true);
      }
    };

    if (e.pressure > 0 && type === "hour") {
      setHour(value + "");
      handleMouseDown();
    }
    if (e.pressure > 0 && type === "minute") {
      setMinute(value + "");
      handleMouseDown();
    }
    if (e.pressure > 0 && type === "second") {
      setSecond(value + "");
      handleMouseDown();
    }
  };

  const handlePrev = () => {
    if (view() === "second") {
      setView("minute");
      return;
    }
    if (view() === "minute") {
      setView("hour");
    }
  };

  const handleNext = () => {
    if (view() === "hour") {
      setView("minute");
      return;
    }
    if (view() === "minute") {
      setView("second");
    }
  };

  const handleClick = (value: number, type: ITimeView) => {
    if (type === "hour") {
      setHour(`${value}`);
    }
    if (type === "minute") {
      setMinute(`${value}`);
      return;
    }
    if (type === "second") {
      setSecond(`${value}`);
    }
    handleNext();
  };

  const handleChangeMeridiem = (meridiem: ITimeMeridiem) => {
    handleChange(convert12HourTo24Hour(Number(hour()), meridiem), "hour");
    setMeridiem(meridiem);
  };

  return (
    <div class={style["circle-time-picker-container"]}>
      <div class={style["circle-time-top"]}>
        <div class={style["circle-time-top-left"]}>
          <span>
            {view() === "hour" ? "HH" : view() === "minute" ? "MM" : "SS"}
          </span>
          {/*<NumberInputSJ*/}
          {/*  value={*/}
          {/*    view() === "hour"*/}
          {/*      ? hour()*/}
          {/*      : view() === "minute"*/}
          {/*      ? minute()*/}
          {/*      : second()*/}
          {/*  }*/}
          {/*  setValue={*/}
          {/*    view() === "hour"*/}
          {/*      ? setHour*/}
          {/*      : view() === "minute"*/}
          {/*      ? setMinute*/}
          {/*      : setSecond*/}
          {/*  }*/}
          {/*  numberRangeStart={0}*/}
          {/*  numberRangeEnd={view() === "hour" ? 12 : 59}*/}
          {/*  containerClass={style["circle-time-input-container"]}*/}
          {/*  inputClass={style["circle-time-input"]}*/}
          {/*  onEnterClick={(e: any) => {*/}
          {/*    handleNext();*/}
          {/*  }}*/}
          {/*  removeIcon*/}
          {/*  removeBorder*/}
          {/*  ref={setInputRef}*/}
          {/*/>*/}
          11
        </div>

        <div class={style["circle-time-navigate"]}>
          <button
            onClick={handlePrev}
            class={clsx(style["circle-time-prev"], style["circle-time-button"])}
            disabled={view() === "hour"}
          >
            <i class="ph ph-caret-left"></i>
          </button>
          <button
            disabled={view() === "second"}
            onClick={handleNext}
            class={clsx(style["circle-time-next"], style["circle-time-button"])}
          >
            <i class="ph ph-caret-right"></i>
          </button>
        </div>
      </div>

      <div
        class={clsx(
          style["circle-time-picker"],
          { [style[`circle-hour-${hour()}`]]: view() === "hour" },
          { [style[`circle-minute-${Number(minute())}`]]: view() === "minute" },
          { [style[`circle-second-${Number(second())}`]]: view() === "second" }
        )}
      >
        {view() === "hour" && (
          <For each={hours}>
            {(hh, index) => (
              <span
                data-index={index() + "hour"}
                class={clsx(style[`clock-${hh}`], style["clock-opts"])}
                onPointerEnter={(e: any) => handlePointerEnter(hh, e, "hour")}
                onPointerDown={() => setMouseDown(true)}
                onPointerUp={() => setMouseDown(false)}
                onMouseUp={() => setMouseDown(false)}
                onClick={() => handleClick(hh, "hour")}
                onPointerCancel={() => setMouseDown(false)}
                onTouchStart={() => setOnTouch(true)}
              >
                {hh}
              </span>
            )}
          </For>
        )}

        {view() === "minute" && (
          <For each={minutes}>
            {(mm, index) => (
              <span
                data-index={index() + "minute"}
                class={clsx(
                  style[`minutes-${Number(mm)}`],
                  style[`minutes-opts`]
                )}
                onPointerEnter={(e: any) => handlePointerEnter(mm, e, "minute")}
                onPointerUp={() => setMouseDown(false)}
                onMouseUp={() => setMouseDown(false)}
                onClick={() => handleClick(mm, "minute")}
                onPointerCancel={() => setMouseDown(false)}
                onTouchStart={() => setOnTouch(true)}
              >
                <span
                  style={{ "pointer-events": mm % 5 === 0 ? "none" : "auto" }}
                >
                  {mm % 5 === 0 ? leadingZeros(mm) : "."}
                </span>
                {mm % 5 === 0 ? (
                  <span
                    class={"text-white"}
                    style={{
                      color: Number(minute()) === mm ? "#297eaf" : "white",
                    }}
                  >
                    .
                  </span>
                ) : (
                  ""
                )}
              </span>
            )}
          </For>
        )}

        {view() === "second" && (
          <For each={minutes}>
            {(mm, index) => (
              <span
                data-index={index() + "second"}
                class={clsx(
                  style[`minutes-${Number(mm)}`],
                  style[`minutes-opts`]
                )}
                onPointerEnter={(e: any) => handlePointerEnter(mm, e, "second")}
                onPointerUp={() => setMouseDown(false)}
                onMouseUp={() => setMouseDown(false)}
                onClick={() => handleClick(mm, "second")}
                onPointerCancel={() => setMouseDown(false)}
                onTouchStart={() => setOnTouch(true)}
              >
                {mm % 5 === 0 ? leadingZeros(mm) : "."}
              </span>
            )}
          </For>
        )}

        <span class={style["clock-line"]}></span>
        <span class={style["clock-center"]}></span>
      </div>

      <div class={style["circle-time-bottom"]}>
        <Button
          // type={meridiem() === "AM" ? "primary" : "secondary"}
          // id="time-am-button"
          // onClick={() => handleChangeMeridiem("AM")}
          class={style["circle-time-button"]}
        >
          AM
        </Button>
        <Button
          // type={meridiem() === "PM" ? "primary" : "secondary"}
          // id="time-pm-button"
          // onClick={() => handleChangeMeridiem("PM")}
          class={style["circle-time-button"]}
        >
          PM
        </Button>
      </div>

      <div class={style["time-set"]}>
        {leadingZeros(Number(hour()))}:{leadingZeros(Number(minute()))}:
        {leadingZeros(Number(second()))}
      </div>
    </div>
  );
};
