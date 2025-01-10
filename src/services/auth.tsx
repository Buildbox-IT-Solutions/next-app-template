import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import { EQueryKeys } from '~/enums/query'
import type { IUser } from '~/interfaces/auth'
import { api } from './api'

export function useGetUser(): UseQueryResult<IUser, unknown> {
	return useQuery({
		queryKey: [EQueryKeys.USER],
		queryFn: async () => {
			const data = await api.get<IUser>(
				'https://api.github.com/users/leonardowlopes',
			)

			return data
		},
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	})
}
