<template>
  <div class="footer-container">
    <div class="input">
      <div id="input-area" class="input-area" @compositionstart="isComposing = true; this.haveChanged = true;" @compositionend="isComposing = false" @keyup.enter.exact="onEnter">
        <textarea v-model="message.content" placeholder="請輸入訊息..."></textarea>
      </div>
      <div class="send-btn" @click="sendMessage">
        <promotion style="width: 25px; height: 25px; color: white;margin-top: 7px" />
      </div>
    </div>
  </div>
</template>

<script>
import {Promotion} from '@element-plus/icons-vue'
import { sendSocketMessage } from "@/utils/ws";

export default {
  name: "ChatBoxFooter",
  components: {Promotion},
  data() {
    return {
      isComposing: false,
      isOK: true,
      haveChanged: false,
      message: {
        content_type: 2,
        content: ""
      }
    }
  },
  methods: {
    sendMessage() {
      this.message.content = this.message.content.trim()
      this.message.content = this.message.content.replace(/\r\n|\n/g,"");
      if(this.message.content !== "") {
        sendSocketMessage(this.message)
        this.isOK = true
        this.haveChanged = false
      }
      this.message.content = ""
    },
    onEnter() {
      if(this.isComposing === false && this.haveChanged === false && this.isOK === true) {
        this.sendMessage()
      } else {
        this.haveChanged = false
        this.isOK = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/global.scss";
.footer-container {
  width: 100%;
  text-align: center;
  .input {
    position: relative;
    .message-input {
      width: 95%;
      padding-bottom: 15px;
    }
    .input-area {
      width: 100%;
      background-color: white;
      border-radius: 0 0 10px 10px;
      text-align: left;
      padding: 10px;
      textarea {
        border: none;
        width: 100%;
        padding: 10px;
        resize: none;
        height: 150px;
        font-size: 16px;
        letter-spacing: 0.5px;
        &:focus {
          outline: none !important;
        }
      }
    }
    .send-btn {
      position: absolute;
      bottom: 20px;
      right: 20px;
      width: 40px;
      height: 40px;
      background-color: $primary;
      border-radius: 50%;
      &:hover {
        box-shadow: 0 0 6px #666;
      }
    }
  }
}
</style>