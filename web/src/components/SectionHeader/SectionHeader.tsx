import { cn } from 'src/lib/utils'
import { Skeleton } from '../ui/skeleton'

interface ISectionHeaderProps {
  title?: string | JSX.Element
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
      {title ? <h3 className="text-xl">{title}</h3> : <Skeleton className='h-8' />}
      {title ?
      <p className="mx-4 mb-3 text-sm leading-5 sm:text-base">{subtitle}</p> : <><Skeleton className='h-4 mt-2 mb-2' /><Skeleton className='h-4 mb-2' /><Skeleton className='h-4' /></>
    }
    </header>
  )
}

export default SectionHeader
