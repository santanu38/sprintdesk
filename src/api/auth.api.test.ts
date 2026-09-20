import { describe, it, expect, vi } from "vitest"
import { dummyJsonClient } from "./client"
import { refreshTokenRequest } from "./auth.api"

describe("refreshTokenRequest", () => {
  it("calls the refresh endpoint with the provided refresh token", async () => {
    const mockResponse = {
      data: {
        accessToken: "new-access-token",
        refreshToken: "new-refresh-token",
      },
    }

    vi.spyOn(dummyJsonClient, "post").mockResolvedValue(mockResponse)

    const result = await refreshTokenRequest("some-refresh-token")

    expect(dummyJsonClient.post).toHaveBeenCalledWith("/auth/refresh", {
      refreshToken: "some-refresh-token",
    })
    expect(result.accessToken).toBe("new-access-token")
    expect(result.refreshToken).toBe("new-refresh-token")
  })
})