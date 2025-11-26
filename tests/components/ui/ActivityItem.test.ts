import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ActivityItem from '~/components/ui/ActivityItem.vue'

describe('ActivityItem', () => {
  const defaultProps = {
    title: 'Test Activity',
    description: 'Test description',
    status: 'Completed',
    statusColor: 'success' as const
  }

  const createWrapper = (props = {}) => {
    return mount(ActivityItem, {
      props: { ...defaultProps, ...props },
      global: {
        stubs: {
          UIcon: { template: '<div></div>' },
          UBadge: { template: '<span><slot /></span>', props: ['color', 'label', 'size'] }
        }
      }
    })
  }

  it('renders title correctly', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('Test Activity')
  })

  it('renders description correctly', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('Test description')
  })

  it('has correct styling classes', () => {
    const wrapper = createWrapper()
    const container = wrapper.find('div')
    expect(container.classes()).toContain('flex')
    expect(container.classes()).toContain('items-center')
    expect(container.classes()).toContain('justify-between')
  })

  it('renders with different status colors', () => {
    const wrapper = createWrapper({ statusColor: 'error' })
    expect(wrapper.exists()).toBe(true)
  })
})
