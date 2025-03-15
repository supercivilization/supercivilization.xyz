import React from "react"
// This file provides compatibility helpers for React 19 features

import { use as reactUse } from "react"

// Type-safe wrapper for the React 19 'use' hook
export function use<T>(promise: Promise<T>): T {
  return reactUse(promise)
}

// Helper for working with useActionState (React 19 replacement for useFormState)
export function createActionStateWrapper<T, S>(action: (state: S, formData: FormData) => Promise<T>, initialState: S) {
  return {
    action,
    initialState,
  }
}

// Helper for working with async data in Server Components
export async function withAsyncData<T, P>(
  Component: React.ComponentType<P & { data: T }>,
  dataFetcher: () => Promise<T>,
): Promise<React.ComponentType<P>> {
  const fetchedData = await dataFetcher()
  const WrappedComponent = (props: P) => React.createElement(Component, { ...props, data: fetchedData })
  return WrappedComponent
}

