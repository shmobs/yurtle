import { FindBusinessQuery } from 'types/graphql'

interface IBusinessProps {
  business: FindBusinessQuery['business']
}
const Business = ({ business }: IBusinessProps) => {
  return (
    <div className="h-full w-full">
      <h2 className="header-secondary">{business.name}</h2>
      <p className="description">
        {business.description}
      </p>
      <h3 className='header-tertiary'>Locations</h3>
      <div>{JSON.stringify(business.locations)}</div>
    </div>
  )
}

export default Business
