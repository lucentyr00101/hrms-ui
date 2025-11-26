import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import QuickActionCard from '~/components/ui/QuickActionCard.vue'

describe('QuickActionCard', () => {
  const defaultProps = {
    to: '/test',
    title: 'Test Card',
    description: 'Test description',
    icon: 'i-material-symbols:test',
    gradient: 'from-blue-500 to-purple-500'
  }

  const createWrapper = (props = {}) => {
    return mount(QuickActionCard, {
      props: { ...defaultProps, ...props },
      global: {
        stubs: {
          NuxtLink: {
            template: '<a :to="to"><slot /></a>',
            props: ['to']
          },
          UIcon: { template: '<div></div>', props: ['name'] }
        }
      }
    })
  }

  it('renders with correct title and description', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('Test Card')
    expect(wrapper.text()).toContain('Test description')
  })

  it('applies gradient class', () => {
    const wrapper = createWrapper()
    expect(wrapper.html()).toContain('from-blue-500')
    expect(wrapper.html()).toContain('to-purple-500')
  })

  it('has hover effects classes', () => {
    const wrapper = createWrapper()
    expect(wrapper.html()).toContain('hover:shadow-lg')
    expect(wrapper.html()).toContain('group-hover:scale-110')
  })

  it('renders with custom gradient', () => {
    const wrapper = createWrapper({ gradient: 'from-red-500 to-yellow-500' })
    expect(wrapper.html()).toContain('from-red-500')
    expect(wrapper.html()).toContain('to-yellow-500')
  })
})
