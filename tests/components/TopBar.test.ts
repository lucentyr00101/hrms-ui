import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TopBar from '~/components/TopBar.vue'

vi.mock('#app', () => ({
  navigateTo: vi.fn(),
  useCookie: vi.fn(() => ({ value: 'mock-token' }))
}))

describe('TopBar', () => {
  const createWrapper = () => {
    return mount(TopBar, {
      global: {
        stubs: {
          UButton: { template: '<button><slot /></button>', props: ['variant', 'size', 'icon'] },
          UInput: { template: '<input />', props: ['placeholder', 'size', 'icon'] },
          UAvatar: { template: '<div><slot /></div>', props: ['alt', 'size', 'icon'] }
        }
      }
    })
  }

  it('renders correctly', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('header').exists()).toBe(true)
  })

  it('emits toggle-sidebar when menu button is clicked', async () => {
    const wrapper = createWrapper()
    const buttons = wrapper.findAll('button')
    await buttons[0].trigger('click')
    expect(wrapper.emitted('toggleSidebar')).toBeTruthy()
  })

  it('displays user information', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('Admin User')
  })

  it('renders with proper structure', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('header').exists()).toBe(true)
    expect(wrapper.findAll('div').length).toBeGreaterThan(0)
  })
})
