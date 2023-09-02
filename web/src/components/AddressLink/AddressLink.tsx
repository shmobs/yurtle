interface IAddressLinkProps {
  text: string
  /**
   * The default map search string is the `text` prop, but you can override it here.
   */
  searchStr?: string
  className?: string
}

const AddressLink = ({ text, searchStr, className }: IAddressLinkProps) => {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={`https://maps.apple.com/?q=${searchStr || text}`}
      className={className}
    >
      {text}
    </a>
  )
}

export default AddressLink
