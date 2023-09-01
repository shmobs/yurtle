interface ISectionHeaderProps {
  title: string
  subtitle?: string
}

const SectionHeader = ({ title, subtitle }: ISectionHeaderProps) => {
  return (
    <header id="section-header" className="mx-2 mt-5">
      <h3 className="text-xl">{title}</h3>
      <p className="mx-4 mb-3 text-sm leading-5 sm:text-base">{subtitle}</p>
    </header>
  )
}

export default SectionHeader
