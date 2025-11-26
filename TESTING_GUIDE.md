# Testing Guide - HRMS UI

## Overview
This guide explains the testing setup and best practices for the HRMS UI project.

## Test Framework

- **Vitest** - Fast unit test framework
- **Vue Test Utils** - Official testing utility for Vue.js
- **Happy-DOM** - Lightweight DOM implementation
- **V8 Coverage** - Native code coverage

## Running Tests

### Basic Commands

```bash
# Run all tests
bun run test

# Run tests in watch mode
bun test

# Run tests with UI
bun run test:ui

# Generate coverage report
bun run test:coverage
```

### Coverage Thresholds

All refactored code must meet these thresholds:
- **Lines:** 85%
- **Functions:** 85%
- **Branches:** 85%
- **Statements:** 85%

## Test Structure

### File Naming
- Test files should be named `*.test.ts` or `*.spec.ts`
- Place tests next to the file being tested

### Example Structure

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import MyComponent from './MyComponent.vue'

describe('MyComponent', () => {
  it('renders correctly', () => {
    const wrapper = mount(MyComponent, {
      props: { title: 'Test' }
    })
    
    expect(wrapper.text()).toContain('Test')
  })
})
```

## Testing Patterns

### 1. Composables

**Pattern:**
```typescript
import { describe, it, expect } from 'vitest'
import { useMyComposable } from './useMyComposable'

describe('useMyComposable', () => {
  it('initializes with correct defaults', () => {
    const { value } = useMyComposable()
    expect(value.value).toBe(defaultValue)
  })
  
  it('updates value correctly', () => {
    const { value, updateValue } = useMyComposable()
    updateValue('new value')
    expect(value.value).toBe('new value')
  })
})
```

**Best Practices:**
- Test all exported functions
- Test reactive state changes
- Test computed properties
- Mock external dependencies

### 2. Components

**Pattern:**
```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MyButton from './MyButton.vue'

describe('MyButton', () => {
  const createWrapper = (props = {}) => {
    return mount(MyButton, {
      props: {
        label: 'Click me',
        ...props
      },
      global: {
        stubs: {
          UIcon: { template: '<div></div>' }
        }
      }
    })
  }

  it('renders label', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('Click me')
  })

  it('emits click event', async () => {
    const wrapper = createWrapper()
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
```

**Best Practices:**
- Create a wrapper factory function
- Stub Nuxt UI components
- Test props, events, and slots
- Test conditional rendering
- Test user interactions

### 3. Utilities

**Pattern:**
```typescript
import { describe, it, expect } from 'vitest'
import { formatDate, formatCurrency } from './formatters'

describe('formatters', () => {
  describe('formatDate', () => {
    it('formats date correctly', () => {
      const result = formatDate('2024-01-15')
      expect(result).toContain('Jan')
      expect(result).toContain('2024')
    })
  })
  
  describe('formatCurrency', () => {
    it('formats USD by default', () => {
      const result = formatCurrency(1234.56)
      expect(result).toBe('$1,234.56')
    })
  })
})
```

## Stubbing Nuxt UI Components

When testing components that use Nuxt UI, stub them to simplify tests:

```typescript
global: {
  stubs: {
    UButton: { template: '<button><slot /></button>' },
    UInput: { template: '<input />' },
    UIcon: { template: '<div></div>' },
    UCard: { template: '<div><slot /></div>' },
    UBadge: { template: '<span><slot /></span>' },
    UAvatar: { template: '<div><slot /></div>' },
    NuxtLink: { template: '<a><slot /></a>' }
  }
}
```

## Mocking

### Mock Composables

```typescript
vi.mock('./useEmployeeDirectory', () => ({
  useEmployeeDirectory: () => ({
    employees: ref([/* mock data */])
  })
}))
```

### Mock Nuxt Functions

```typescript
vi.mock('#app', () => ({
  navigateTo: vi.fn(),
  useCookie: vi.fn(() => ({ value: 'mock-token' }))
}))
```

## Test Coverage

### Viewing Coverage Reports

After running `bun run test:coverage`, open:
```
./coverage/index.html
```

### Coverage Best Practices

1. **Focus on refactored code** - Aim for 85%+ on new/refactored files
2. **Test critical paths** - Prioritize business logic and user flows
3. **Don't test implementation details** - Test behavior, not internals
4. **Meaningful assertions** - Each test should verify specific behavior

## Common Patterns

### Testing Reactive State

```typescript
it('updates reactive state', () => {
  const { count, increment } = useCounter()
  expect(count.value).toBe(0)
  
  increment()
  expect(count.value).toBe(1)
})
```

### Testing Async Functions

```typescript
it('handles async operations', async () => {
  const { data, fetchData } = useApi()
  
  await fetchData()
  
  expect(data.value).toBeDefined()
})
```

### Testing Event Emissions

```typescript
it('emits events with payload', async () => {
  const wrapper = mount(MyComponent)
  await wrapper.vm.handleClick()
  
  const emitted = wrapper.emitted('update')
  expect(emitted).toBeTruthy()
  expect(emitted[0]).toEqual([expectedPayload])
})
```

### Testing Slots

```typescript
it('renders slot content', () => {
  const wrapper = mount(MyComponent, {
    slots: {
      default: '<div>Slot Content</div>'
    }
  })
  
  expect(wrapper.html()).toContain('Slot Content')
})
```

## Debugging Tests

### Using console.log

```typescript
it('debugs test', () => {
  const wrapper = mount(MyComponent)
  console.log(wrapper.html()) // View rendered HTML
  console.log(wrapper.vm) // View component instance
})
```

### Using Vitest UI

```bash
bun run test:ui
```

This opens an interactive UI where you can:
- See test results in real-time
- Debug failing tests
- View coverage
- Filter tests

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun run test:coverage
      - uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
```

## Best Practices Summary

1. ✅ **Write tests first** when adding new features (TDD)
2. ✅ **Keep tests simple** and focused on one thing
3. ✅ **Use descriptive test names** that explain what is tested
4. ✅ **Arrange-Act-Assert** pattern for test structure
5. ✅ **Mock external dependencies** to isolate units
6. ✅ **Test edge cases** and error conditions
7. ✅ **Maintain high coverage** (85%+) on critical code
8. ✅ **Run tests before committing** code
9. ✅ **Keep tests fast** - avoid unnecessary async operations
10. ✅ **Update tests** when refactoring code

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Vue Test Utils](https://test-utils.vuejs.org/)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Nuxt Testing](https://nuxt.com/docs/getting-started/testing)

## Getting Help

If you encounter issues with tests:
1. Check this guide
2. Review existing test examples in the codebase
3. Check Vitest and Vue Test Utils documentation
4. Ask the team on Slack/Discord

Happy Testing! 🎉
