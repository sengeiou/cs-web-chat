<template>
  <div class="chat-box-container">
    <Header />
    <template v-if="notice !== null">
      <el-alert class="alert-section" type="warning" effect="dark">
        <template #title>
          <div class="alert-content">
            <BellFilled />
            <span>{{notice.content}}</span>
          </div>
        </template>
      </el-alert>
    </template>
    <template v-if="noStaff">
      <el-alert class="alert-section" type="error" effect="dark">
        <template #title>
          <div class="alert-content">
            <BellFilled />
            <span>客服人員忙線中，請稍等</span>
          </div>
        </template>
      </el-alert>
    </template>
    <div id="chat-box-body" class="chat-box-body">
      <div v-for="(msg,idx) in messages" :key="idx">
        <div style="margin-bottom: 16px;">
          <SystemMessage v-if="msg.type === 1" :content="msg.content" />
          <MemberMessage
              v-else-if="msg.type === 2"
              :content-type="msg.content_type"
              :content="msg.content"
              :timestamp="msg.timestamp"
          />
          <StaffMessage
              v-else
              :name="msg.sender_name"
              :content-type="msg.content_type"
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
import {apiGetLatestNotice} from "@/apis/notice";
import {BellFilled} from "@element-plus/icons-vue";
import {ElAlert} from "element-plus";

export default {
  name: "ChatBox",
  components: {
    ScoreDialog,
    SystemMessage,
    MemberMessage,
    Header,
    Footer,
    StaffMessage,
    BellFilled,
    ElAlert,
  },
  computed: {
    ...mapGetters({
      roomId: 'ws/roomId',
      messages: 'ws/messages',
      noStaff: 'ws/noStaff',
    })
  },
  data() {
    return {
      notice: null
    }
  },
  mounted() {
    this.scrollToBottom()
    this.fetchNotice()
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
    async fetchNotice() {
      try {
        const { data } = await apiGetLatestNotice()
        this.notice = data
      } catch (err) {
        console.log(err)
      }
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
  .alert-section {
    width: 96%;
    margin: 8px auto;
    border-radius: 8px;
    .alert-content {
      display: flex;
      align-items: center;
      margin-left: -10px;
      svg {
        width: 16px;
        height: 16px;
      }
      span {
        margin-left: 6px;
        font-weight: bold;
      }
    }
  }
  .chat-box-body {
    height: 380px;
    margin: 8px 0 20px 20px;
    padding-right: 15px;
    overflow-y: scroll;
    overflow-x: hidden;
    .message-content {
      display: block;
      margin: 20px;
      color: Black;
      font-weight: bold;
    }
  }
}
</style>