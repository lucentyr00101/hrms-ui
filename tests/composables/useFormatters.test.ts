import { describe, it, expect } from 'vitest'
import { useFormatters } from '~/composables/useFormatters'

describe('useFormatters', () => {
  const formatters = useFormatters()

  describe('formatDate', () => {
    it('formats date in short format', () => {
      const result = formatters.formatDate('2024-01-15')
      expect(result).toContain('Jan')
      expect(result).toContain('15')
      expect(result).toContain('2024')
    })

    it('formats date in long format', () => {
      const result = formatters.formatDate('2024-01-15', 'long')
      expect(result).toContain('January')
      expect(result).toContain('15')
      expect(result).toContain('2024')
    })

    it('handles Date objects', () => {
      const date = new Date('2024-01-15')
      const result = formatters.formatDate(date)
      expect(result).toContain('2024')
    })
  })

  describe('formatCurrency', () => {
    it('formats USD currency by default', () => {
      const result = formatters.formatCurrency(1234.56)
      expect(result).toContain('$')
      expect(result).toContain('1,234.56')
    })

    it('formats with custom currency', () => {
      const result = formatters.formatCurrency(1234.56, 'EUR')
      expect(result).toContain('1,234.56')
    })
  })

  describe('formatPhone', () => {
    it('formats 10-digit phone number', () => {
      const result = formatters.formatPhone('5551234567')
      expect(result).toBe('(555) 123-4567')
    })

    it('handles already formatted numbers', () => {
      const result = formatters.formatPhone('(555) 123-4567')
      expect(result).toBe('(555) 123-4567')
    })

    it('returns original if not 10 digits', () => {
      const result = formatters.formatPhone('123')
      expect(result).toBe('123')
    })
  })

  describe('formatName', () => {
    it('combines first and last name', () => {
      const result = formatters.formatName('John', 'Doe')
      expect(result).toBe('John Doe')
    })
  })

  describe('formatInitials', () => {
    it('creates initials from first and last name', () => {
      const result = formatters.formatInitials('John', 'Doe')
      expect(result).toBe('JD')
    })

    it('uppercases initials', () => {
      const result = formatters.formatInitials('john', 'doe')
      expect(result).toBe('JD')
    })
  })

  describe('formatFileSize', () => {
    it('formats bytes', () => {
      const result = formatters.formatFileSize(500)
      expect(result).toBe('500 Bytes')
    })

    it('formats kilobytes', () => {
      const result = formatters.formatFileSize(1024)
      expect(result).toBe('1 KB')
    })

    it('formats megabytes', () => {
      const result = formatters.formatFileSize(1048576)
      expect(result).toBe('1 MB')
    })

    it('handles zero bytes', () => {
      const result = formatters.formatFileSize(0)
      expect(result).toBe('0 Bytes')
    })
  })

  describe('truncate', () => {
    it('truncates long text', () => {
      const result = formatters.truncate('This is a long text', 10)
      expect(result).toBe('This is a ...')
    })

    it('does not truncate short text', () => {
      const result = formatters.truncate('Short', 10)
      expect(result).toBe('Short')
    })

    it('uses custom suffix', () => {
      const result = formatters.truncate('This is a long text', 10, '---')
      expect(result).toBe('This is a ---')
    })
  })
})
