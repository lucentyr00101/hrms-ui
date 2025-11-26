import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EmptyState from '~/components/ui/EmptyState.vue'

describe('EmptyState', () => {
  const createWrapper = (props = {}, slots = {}) => {
    return mount(EmptyState, {
      props: {
        icon: 'i-material-symbols:info',
        title: 'No Data',
        description: 'There is no data to display',
        ...props
      },
      slots,
      global: {
        stubs: {
          UIcon: { template: '<div></div>', props: ['name'] }
        }
      }
    })
  }

  it('renders correctly with required props', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('h3').text()).toBe('No Data')
    expect(wrapper.find('p').text()).toBe('There is no data to display')
  })

  it('renders actions slot content', () => {
    const wrapper = createWrapper({}, {
      actions: '<button>Test Action</button>'
    })
    expect(wrapper.html()).toContain('Test Action')
  })

  it('applies correct CSS classes for styling', () => {
    const wrapper = createWrapper()
    const container = wrapper.find('div')
    expect(container.classes()).toContain('flex')
    expect(container.classes()).toContain('flex-col')
    expect(container.classes()).toContain('items-center')
  })

  it('renders with custom title', () => {
    const wrapper = createWrapper({ title: 'Custom Title' })
    expect(wrapper.text()).toContain('Custom Title')
  })
})
