import { cn } from 'src/lib/utils'

interface ISectionHeaderProps {
  title: string | JSX.Element
  subtitle?: string
  className?: string
  /**
   * Because this is sometimes used on a page with no padding, we sometimes need to add it back
   */
  withPadding?: boolean
}

const SectionHeader = ({
  title,
  subtitle,
  className,
  withPadding,
}: ISectionHeaderProps) => {
  return (
    <header
      id="section-header"
      className={cn('mx-2 mt-5', withPadding && 'px-5 sm:px-6', className)}
    >
      <h3 className="text-xl">{title}</h3>
      <p className="mx-4 mb-3 text-sm leading-5 sm:text-base">{subtitle}</p>
    </header>
  )
}

export default SectionHeader
