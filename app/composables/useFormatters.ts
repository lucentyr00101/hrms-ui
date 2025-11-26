export const useFormatters = () => {
  const formatDate = (date: string | Date, format: 'short' | 'long' | 'full' = 'short'): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    
    const optionsMap: Record<'short' | 'long' | 'full', Intl.DateTimeFormatOptions> = {
      short: { year: 'numeric', month: 'short', day: 'numeric' },
      long: { year: 'numeric', month: 'long', day: 'numeric' },
      full: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    }
    const options = optionsMap[format]

    return new Intl.DateTimeFormat('en-US', options).format(dateObj)
  }

  const formatCurrency = (amount: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(amount)
  }

  const formatPhone = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '')
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`
    }
    
    return phone
  }

  const formatName = (firstName: string, lastName: string): string => {
    return `${firstName} ${lastName}`
  }

  const formatInitials = (firstName: string, lastName: string): string => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
  }

  const truncate = (text: string, length: number, suffix: string = '...'): string => {
    if (text.length <= length) return text
    return text.substring(0, length) + suffix
  }

  return {
    formatDate,
    formatCurrency,
    formatPhone,
    formatName,
    formatInitials,
    formatFileSize,
    truncate
  }
}
