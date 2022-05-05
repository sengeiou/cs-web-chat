import httpRequest from '@/utils/http'

export const apiUpdateRoomScore = (data) => {
	return httpRequest({
		url: '/member/room/score',
		method: 'POST',
		data
	})
}