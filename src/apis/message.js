import httpRequest from '@/utils/http'

export const apiGetMessageList = () => {
	return httpRequest({
		url: '/room-messages/member',
		method: 'GET'
	})
}