import assert from 'node:assert/strict'
import { test } from 'node:test'
import { calculatorKeyboardKey, calculatorReducer, initialCalculatorState, type CalculatorState } from '../src/lib/calculator'

const run = (keys: string[], state: CalculatorState = initialCalculatorState) => keys.reduce(calculatorReducer, state)

for (const [keys, result] of [
  [['2', '+', '3', '×', '4', '='], '20'],
  [['0', '.', '1', '+', '0', '.', '2', '='], '0.3'],
  [['1', '.', '.', '5', '+', '2', '='], '3.5'],
  [['8', '+', '−', '2', '='], '6'],
  [['0', '−', '3', '='], '-3'],
  [['2', '+', '3', '=', '='], '5'],
  [['9', '⌫'], '0'],
  [['8', '+', '3', 'AC', '2', '='], '2'],
  [['4', '+', '2', '=', '.', '5'], '0.5'],
  [['1', '÷', '3', '=', '×', '3', '='], '0.999999999999'],
] as [string[], string][]) {
  test(`immediate arithmetic: ${keys.join(' ')} → ${result}`, () => {
    const state = run(keys)
    assert.equal(state.display, result)
    assert.equal(state.error, null)
  })
}

for (const errorSequence of [['1', '÷', '0', '='], ['1', '÷', '0', '+']]) {
  test(`every error-recovery key after ${errorSequence.join(' ')}`, () => {
    const error = run(errorSequence)
    assert.equal(error.error, 'divide-by-zero')
    assert.equal(error.previous, null)
    assert.equal(error.operation, null)
    for (const key of ['+', '−', '×', '÷', '=']) assert.deepEqual(run([key], error), error)
    for (const digit of '0123456789') {
      const state = run([digit], error)
      assert.equal(state.display, digit)
      assert.equal(state.error, null)
    }
    assert.equal(run(['.', '5', '+', '2', '='], error).display, '2.5')
    for (const key of ['⌫', 'AC']) assert.deepEqual(run([key], error), initialCalculatorState)
    assert.equal(run(['+', '2', '='], error).display, '2')
  })
}

test('overflow is an error state with the same recovery rules', () => {
  const state = run(['×', '9', '='], { ...initialCalculatorState, display: '1e308', fresh: true })
  assert.equal(state.error, 'overflow')
  assert.equal(run(['.', '5'], state).display, '0.5')
  const nearLimit = run(['+', '0', '='], { ...initialCalculatorState, display: String(Number.MAX_VALUE), fresh: true })
  assert.equal(nearLimit.error, null)
  assert.ok(Number.isFinite(Number(nearLimit.display)))
})

test('entry length is bounded and result backspace cannot corrupt scientific notation', () => {
  assert.equal(run(Array(100).fill('9')).display.length, 15)
  assert.equal(run(['⌫'], { ...initialCalculatorState, display: '1e+24', fresh: true }).display, '0')
})

test('keyboard aliases match buttons and unsupported keys are ignored', () => {
  assert.equal(calculatorKeyboardKey('/'), '÷')
  assert.equal(calculatorKeyboardKey('*'), '×')
  assert.equal(calculatorKeyboardKey('-'), '−')
  assert.equal(calculatorKeyboardKey('Enter'), '=')
  assert.equal(calculatorKeyboardKey('Escape'), 'AC')
  assert.equal(calculatorKeyboardKey('Backspace'), '⌫')
  assert.equal(calculatorKeyboardKey('a'), null)
  assert.deepEqual(run(['invalid']), initialCalculatorState)
})

test('mixed repeated inputs never create NaN or retain an operation after error', () => {
  const keys = ['0', '1', '2', '9', '.', '+', '−', '×', '÷', '=', '⌫', 'AC']
  let seed = 73
  let state = initialCalculatorState
  for (let i = 0; i < 12000; i++) {
    seed = (seed * 1664525 + 1013904223) >>> 0
    state = calculatorReducer(Object.freeze(state), keys[seed % keys.length])
    assert.ok(Number.isFinite(Number(state.display)))
    assert.ok(state.previous === null || Number.isFinite(state.previous))
    if (state.error) {
      assert.equal(state.previous, null)
      assert.equal(state.operation, null)
    }
  }
})
