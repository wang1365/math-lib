export type Operation = '+' | '−' | '×' | '÷'
export type CalculatorError = 'divide-by-zero' | 'overflow'

export type CalculatorState = {
  display: string
  previous: number | null
  operation: Operation | null
  fresh: boolean
  error: CalculatorError | null
}

export const initialCalculatorState: CalculatorState = {
  display: '0', previous: null, operation: null, fresh: false, error: null,
}

const operations: readonly string[] = ['+', '−', '×', '÷']
const maxInputDigits = 15

function calculate(a: number, b: number, operation: Operation) {
  if (operation === '÷' && b === 0) return 'divide-by-zero' as const
  const value = operation === '+' ? a + b
    : operation === '−' ? a - b
    : operation === '×' ? a * b : a / b
  // Round the stored result as well as its display, so subsequent operations
  // use the number the learner can see. This is not an exact-arithmetic tool.
  if (!Number.isFinite(value)) return 'overflow' as const
  const rounded = Number(value.toPrecision(12))
  return Number.isFinite(rounded) ? rounded : 'overflow' as const
}

function errorState(error: CalculatorError): CalculatorState {
  return { ...initialCalculatorState, error }
}

/** Immediate-execution calculator: each new operator finishes the pending one. */
export function calculatorReducer(state: CalculatorState, key: string): CalculatorState {
  if (key === 'AC') return { ...initialCalculatorState }

  if (state.error) {
    // Never parse a localized error message as a number. Operators and equals
    // leave the error in place; a new number, decimal or backspace recovers.
    if (key === '⌫') return { ...initialCalculatorState }
    if (key === '.' || /^\d$/.test(key)) return calculatorReducer(initialCalculatorState, key)
    return state
  }

  if (/^\d$/.test(key)) {
    if (state.fresh || state.display === '0') return { ...state, display: key, fresh: false }
    if (state.display.replace(/\D/g, '').length >= maxInputDigits) return state
    return { ...state, display: state.display + key }
  }
  if (key === '.') {
    if (state.fresh) return { ...state, display: '0.', fresh: false }
    if (state.display.includes('.')) return state
    return { ...state, display: `${state.display}.` }
  }
  if (key === '⌫') {
    // Results may use scientific notation; deleting its exponent would silently
    // change the value. Backspace on a result starts a clean editable operand.
    const shortened = state.display.slice(0, -1)
    return { ...state, display: state.fresh || !shortened || shortened === '-' ? '0' : shortened, fresh: false }
  }
  if (operations.includes(key)) {
    const operation = key as Operation
    if (state.previous !== null && state.operation && !state.fresh) {
      const result = calculate(state.previous, Number(state.display), state.operation)
      if (typeof result === 'string') return errorState(result)
      return { ...state, display: String(result), previous: result, operation, fresh: true }
    }
    return { ...state, previous: Number(state.display), operation, fresh: true }
  }
  if (key === '=' && state.previous !== null && state.operation) {
    const result = calculate(state.previous, Number(state.display), state.operation)
    if (typeof result === 'string') return errorState(result)
    return { ...initialCalculatorState, display: String(result), fresh: true }
  }
  return state
}

export function calculatorKeyboardKey(key: string): string | null {
  const mapped: Record<string, string> = { Backspace: '⌫', Escape: 'AC', Enter: '=', '*': '×', '/': '÷', '-': '−' }
  const value = mapped[key] || key
  return /^\d$/.test(value) || ['.', ...operations, '=', '⌫', 'AC'].includes(value) ? value : null
}
