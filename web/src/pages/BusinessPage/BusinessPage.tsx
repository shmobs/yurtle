import BusinessCell from 'src/components/BusinessCell'

interface IBusinessPageProps {
  id: string
}

const BusinessPage = ({ id }: IBusinessPageProps) => {
  return <BusinessCell id={id} />
}

export default BusinessPage
