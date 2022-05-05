import httpRequest from '@/utils/http'

export const apiGetMessageList = () => {
	return httpRequest({
		url: '/member/message/list',
		method: 'GET'
	})
}