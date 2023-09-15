import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import cookieCutter from 'cookie-cutter'

if (typeof window !== 'undefined') {
  const flags = cookieCutter.get('bootstrapData')

  let bootstrapData = {}
  if (flags) {
    bootstrapData = JSON.parse(flags)
  }

  posthog.init("phc_AVtfq7Tpl76X5VWwBe9Ykj5aoRuYhUCWbymCOeA5VJz", {
    api_host: "https://eu.posthog.com",
    bootstrap: bootstrapData
  })
}

export default function PHProvider({ children }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}