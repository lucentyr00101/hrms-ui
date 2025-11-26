import { describe, it, expect } from 'vitest'
import { useModal } from '~/composables/useModal'

describe('useModal', () => {
  it('initializes with isOpen as false', () => {
    const { isOpen } = useModal()
    expect(isOpen.value).toBe(false)
  })

  it('opens the modal', () => {
    const { isOpen, open } = useModal()
    
    open()
    expect(isOpen.value).toBe(true)
  })

  it('closes the modal', () => {
    const { isOpen, open, close } = useModal()
    
    open()
    expect(isOpen.value).toBe(true)
    
    close()
    expect(isOpen.value).toBe(false)
  })

  it('toggles the modal state', () => {
    const { isOpen, toggle } = useModal()
    
    expect(isOpen.value).toBe(false)
    
    toggle()
    expect(isOpen.value).toBe(true)
    
    toggle()
    expect(isOpen.value).toBe(false)
  })

  it('can be opened and closed multiple times', () => {
    const { isOpen, open, close } = useModal()
    
    open()
    expect(isOpen.value).toBe(true)
    
    close()
    expect(isOpen.value).toBe(false)
    
    open()
    expect(isOpen.value).toBe(true)
    
    close()
    expect(isOpen.value).toBe(false)
  })
})
