import { Component, type ErrorInfo, type ReactNode } from 'react'
import { ErrorState } from '@/widgets/ErrorState'

type ErrorBoundaryProps = {
  children: ReactNode
  titleAs?: 'h1' | 'h2'
  className?: string
  /** Changing this (e.g. the route pathname) clears a caught error automatically. */
  resetKey?: unknown
}

type ErrorBoundaryState = { error: Error | null }

/** Catches render errors in the wrapped subtree and shows the delivery-themed error state instead of a blank screen. */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (this.state.error && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ error: null })
    }
  }

  render() {
    if (this.state.error) {
      return (
        <ErrorState
          titleAs={this.props.titleAs}
          className={this.props.className}
          onRetry={() => this.setState({ error: null })}
        />
      )
    }
    return this.props.children
  }
}
