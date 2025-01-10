import { formatBytes } from '~/utils/data'
import { env } from '~/utils/env'
import { devLog } from '~/utils/log'

class ApiClient {
	baseUrl: string

	constructor(baseUrl?: string) {
		this.baseUrl = baseUrl || ''
	}

	private async request<T>(
		method: string,
		url: string,
		data?: unknown,
		init: RequestInit = {},
	): Promise<T> {
		const response = await fetch(`${this.baseUrl}${url}`, {
			method,
			headers: {
				'Content-Type': 'application/json',
				...init.headers,
			},
			body: data ? JSON.stringify(data) : undefined,
			...init,
		})

		if (!response.ok) {
			const error = await response.json()

			//TODO: Implement error handling
			// const logInfos = [
			// 	error?.response?.status,
			// 	error?.config?.url,
			// 	message,
			// ]
			// 	.filter(Boolean)
			// 	.join(' - ')

			throw new Error(error.message || 'Something went wrong')
		}

		const responseJson = await response.json()

		const totalBytes = JSON.stringify(responseJson).length

		const logInfos = [
			response.status.toString(),
			url,
			formatBytes(totalBytes > 2 ? totalBytes : 0),
		]
			.filter(Boolean)
			.join(' - ')

		devLog(logInfos)

		return responseJson
	}

	get<T>(url: string, init?: RequestInit) {
		return this.request<T>('GET', url, undefined, init)
	}

	post<T>(url: string, data: unknown, init?: RequestInit) {
		return this.request<T>('POST', url, data, init)
	}

	put<T>(url: string, data: unknown, init?: RequestInit) {
		return this.request<T>('PUT', url, data, init)
	}

	delete<T>(url: string, init?: RequestInit) {
		return this.request<T>('DELETE', url, undefined, init)
	}
}

export const api = new ApiClient(env.BASE_URL)
