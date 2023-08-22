import type {
  QueryResolvers,
  MutationResolvers,
  BusinessRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const businesses: QueryResolvers['businesses'] = () => {
  return db.business.findMany()
}

export const business: QueryResolvers['business'] = ({ id }) => {
  return db.business.findUnique({
    where: { id },
  })
}

export const createBusiness: MutationResolvers['createBusiness'] = ({
  input,
}) => {
  return db.business.create({
    data: input,
  })
}

export const updateBusiness: MutationResolvers['updateBusiness'] = ({
  id,
  input,
}) => {
  return db.business.update({
    data: input,
    where: { id },
  })
}

export const deleteBusiness: MutationResolvers['deleteBusiness'] = ({ id }) => {
  return db.business.delete({
    where: { id },
  })
}

export const Business: BusinessRelationResolvers = {
  locations: (_obj, { root }) => {
    return db.business.findUnique({ where: { id: root?.id } }).locations()
  },
}
