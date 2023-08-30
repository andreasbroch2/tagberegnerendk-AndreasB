'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
  posthog.init("phc_AVtfq7Tpl76X5VWwBe9Ykj5aoRuYhUCWbymCOeA5VJz", {
    api_host: "https://eu.posthog.com"
  })
}

export default function PHProvider({ children }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}