import { useStore } from "vuex";
import {getSID} from "@/utils/storage";
import { ElMessage } from 'element-plus'

const wsUrl = process.env.VUE_APP_API_URL;
let socket = null;

export const connectSocket = () => {
	const sid = getSID()
	socket = new WebSocket(wsUrl+"?type=2&sid="+sid);
	const store = useStore();
	socket.onopen = function() {
		console.log("websocket connected!!");
	};
	socket.onmessage = function(msg) {
		store.commit("ws/APPEND_MESSAGE", JSON.parse(msg.data ?? {}));
	};
	socket.onerror = function() {
		ElMessage({
			message: '連線失敗',
			type: 'error',
		})
	};
	socket.onclose = function () {
		console.log("websocket closed!!");
	}
};

export const sendSocketMessage = msg => {
	if (1 === socket.readyState) socket.send(JSON.stringify(msg));
};