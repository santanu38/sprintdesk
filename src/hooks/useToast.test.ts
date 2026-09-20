import { describe, it, expect, beforeEach } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useToast } from "./useToast"
import { useToastStore } from "../store/toastStore"

describe("useToast", () => {
  beforeEach(() => {
    useToastStore.setState({ toasts: [] })
  })

  it("adds a success toast", () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.success("Task created!")
    })

    const toasts = useToastStore.getState().toasts
    expect(toasts).toHaveLength(1)
    expect(toasts[0]!.message).toBe("Task created!")
    expect(toasts[0]!.type).toBe("success")
  })

  it("adds an error toast", () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.error("Something failed")
    })

    const toasts = useToastStore.getState().toasts
    expect(toasts[0]!.type).toBe("error")
  })

  it("adds multiple toasts with unique ids", () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.info("First")
      result.current.info("Second")
    })

    const toasts = useToastStore.getState().toasts
    expect(toasts).toHaveLength(2)
    expect(toasts[0]!.id).not.toBe(toasts[1]!.id)
  })
})