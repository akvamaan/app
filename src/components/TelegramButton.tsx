import { Send } from 'lucide-react'

interface TelegramButtonProps {
  href: string
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary'
}

export default function TelegramButton({
  href,
  children,
  className = '',
  variant = 'primary',
}: TelegramButtonProps) {
  const base =
    variant === 'primary'
      ? 'btn-primary'
      : 'glass-card glass-thick px-8 py-5 text-base font-medium inline-flex items-center gap-3 transition-all hover:border-white/20'

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${className}`}
    >
      <Send size={20} style={{ color: 'var(--accent-gold)' }} />
      <span>{children}</span>
    </a>
  )
}
