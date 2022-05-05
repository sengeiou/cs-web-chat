<template>
  <div class="member-message-container">
    <div class="member-time">{{getTime(timestamp)}}</div>
    <div class="content-text">{{content}}</div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "MemberMessage",
  props: {
    content: String,
    timestamp: Number
  },
  methods: {
    getTime(timestamp) {
      return moment(timestamp*1000).format('HH:mm');
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/global.scss";
.member-message-container {
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  justify-content: flex-end;
  margin-bottom: 20px;
  .member-time {
    font-size: 14px;
    margin-right: 8px;
    color: #888888;
  }
  .content-text {
    color: white;
    padding: 6px 10px;
    border-radius: 10px;
    position: relative;
    margin-right: 5px;
    margin-left: 80px;
    order: -1;
    background-color: $primary;
    font-weight: 500;
    &::before {
      border-left: 10px solid $primary;
      right: -8px;
      content: "";
      position: absolute;
      top: 9px;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
    }
  }
}
</style>