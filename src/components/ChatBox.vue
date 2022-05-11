<template>
  <div class="chat-box-container">
    <Header />
    <div v-if="noStaff" class="no-staff"><span>客服人員忙線中，請稍等</span></div>
    <div id="chat-box-body" class="chat-box-body">
      <div v-for="(msg,idx) in messages" :key="idx">
        <div style="margin-bottom: 16px;">
          <SystemMessage v-if="msg.messageType === 'System'" :content="msg.content" />
          <MemberMessage
              v-else-if="msg.messageType === 'Member'"
              :content="msg.content"
              :timestamp="msg.timestamp"
          />
          <StaffMessage
              v-else
              :name="msg.senderName"
              :content="msg.content"
              :timestamp="msg.timestamp"
          />
        </div>
      </div>
    </div>
    <Footer />
    <ScoreDialog ref="ScoreDialog" />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StaffMessage from "@/components/StaffMessage";
import MemberMessage from "@/components/MemberMessage";
import SystemMessage from "@/components/SystemMessage";
import {mapGetters} from "vuex";
import ScoreDialog from "@/components/ScoreDialog";

export default {
  name: "ChatBox",
  components: {ScoreDialog, SystemMessage, MemberMessage, Header, Footer, StaffMessage},
  computed: {
    ...mapGetters({
      roomId: 'ws/roomId',
      messages: 'ws/messages',
      noStaff: 'ws/noStaff',
    })
  },
  mounted() {
    this.scrollToBottom()
  },
  updated:function(){
    this.scrollToBottom();
  },
  methods:{
    isNull(value) {
      return value == null || typeof (value) == 'undefined';
    },
    scrollToBottom () {
      this.$nextTick(() => {
        let ele = document.getElementById('chat-box-body');
        if(!this.isNull(ele)){
          ele.scrollTop = ele.scrollHeight;
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.chat-box-container {
  width: 450px;
  margin: auto;
  background-color: #f4f5f6;
  border-radius: 10px;
  box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.3);
  position: relative;
  .no-staff {
    position: absolute;
    text-align: center;
    background-color: #FB7A70;
    color: white;
    font-weight: bold;
    border-radius: 0 0 20px 20px;
    padding: 8px 20px;
    left: 50%;
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
  }
  .chat-box-body {
    height: 380px;
    margin: 12px 0 20px 20px;
    padding-right: 15px;
    overflow-y: scroll;
    .message-content {
      display: block;
      margin: 20px;
      color: Black;
      font-weight: bold;
    }
  }
}
</style>