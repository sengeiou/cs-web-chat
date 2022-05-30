import {apiGetMessageList} from "@/apis/message";

export const state = {
	roomId: 0,
	message: {},
	messages: [],
	showScoreDialog: false,
	noStaff: false,
};

export const mutations = {
	SET_MESSAGES(state, messages) {
		state.messages = state.messages.concat(messages)
	},
	APPEND_MESSAGE(state, message) {
		if(message.content_type === 4) {
			state.showScoreDialog = true
		} else if (message.content_type === 7) {
			state.noStaff = true
		} else if (message.content_type === 9){
			state.noStaff = false
		} else {
			state.messages.push(message)
		}
	},
	SET_ROOM_ID(state, roomId) {
		state.roomId = roomId;
	},
	SET_SHOW_SCORE_DIALOG(state, result) {
		state.showScoreDialog = result
	},
};

export const actions = {
	getRoomMessageList({ commit }) {
		return new Promise((resolve, reject) => {
			apiGetMessageList()
				.then((response) => {
					commit('SET_MESSAGES', response.data)
					resolve()
				})
				.catch((error) => {
					reject(error)
				})
		})
	},
};

export const getters = {
	roomId: state => state.roomId === 0 ? "" : state.roomId,
	messages: state => state.messages,
	showScoreDialog: state => state.showScoreDialog,
	noStaff: state => state.noStaff,
};

export default {
	state,
	actions,
	mutations,
	getters,
	namespaced: true,
};