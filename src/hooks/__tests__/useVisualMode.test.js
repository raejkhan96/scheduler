import { renderHook, act } from "@testing-library/react-hooks";
import useVisualMode from "hooks/useVisualMode";

const FIRST = "FIRST";
const SECOND = "SECOND";
const THIRD = "THIRD";

test("useVisualMode should initialize with default value", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));
  // it is expected the current mode to be first
  expect(result.current.mode).toBe(FIRST);
});

test("useVisualMode should transition to another mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));
  //  it is expected we transition to the second mode after the first
  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);
});

test("useVisualMode should return to previous mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  //  transition first to second mode
  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);
  // then to third
  act(() => result.current.transition(THIRD));
  expect(result.current.mode).toBe(THIRD);
  // then back to second
  act(() => result.current.back());
  expect(result.current.mode).toBe(SECOND);
  //  and lastly, verify the mode is back to first
  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);
});

test("useVisualMode should not return to previous mode if already at initial", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));
  // it is expected to still be on the first mode
  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);
});

test("useVisualMode should replace the current mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));
  // transition to second mode
  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);

  // Passing "true" to transition(THIRD, true) says "Transition to THIRD by REPLACING SECOND"
  // transition to the third mode
  act(() => result.current.transition(THIRD, true));
  expect(result.current.mode).toBe(THIRD);

  // transition back to first mode 
  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);
});