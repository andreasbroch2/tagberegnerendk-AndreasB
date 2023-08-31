import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import cookieCutter from 'cookie-cutter'


if (typeof window !== 'undefined') {
  const flags = cookieCutter.get('bootstrapData')

  let bootstrapData = {}
  if (flags) {
    console.log("flags", flags)
    bootstrapData = JSON.parse(flags)
  }
  console.log("bootstrapData", bootstrapData)

  posthog.init("phc_AVtfq7Tpl76X5VWwBe9Ykj5aoRuYhUCWbymCOeA5VJz", {
    api_host: "https://eu.posthog.com",
    bootstrap: bootstrapData
  })
}

export default function PHProvider({ children }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}