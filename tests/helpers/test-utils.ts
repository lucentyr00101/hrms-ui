import type { VueWrapper } from '@vue/test-utils'

export const findByTestId = (wrapper: VueWrapper, testId: string) => {
  return wrapper.find(`[data-testid="${testId}"]`)
}

export const findAllByTestId = (wrapper: VueWrapper, testId: string) => {
  return wrapper.findAll(`[data-testid="${testId}"]`)
}

export const waitForAsync = async () => {
  await new Promise(resolve => setTimeout(resolve, 0))
}
