import { cn } from 'src/lib/utils'

interface ISectionHeaderProps {
  title: string
  subtitle?: string
  className?: string
}

const SectionHeader = ({ title, subtitle, className }: ISectionHeaderProps) => {
  return (
    <header id="section-header" className={cn('mx-2 mt-5', className)}>
      <h3 className="text-xl">{title}</h3>
      <p className="mx-4 mb-3 text-sm leading-5 sm:text-base">{subtitle}</p>
    </header>
  )
}

export default SectionHeader
