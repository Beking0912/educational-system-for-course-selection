<template>
  <div id="studentInfo">
    <div class="name">{{$store.state.teacherName}}</div>
    <div class="identity">
      <span>教师</span>
    </div>
    <div class="account">教师编号：{{$store.state.teacherID}}</div>
    <div class="account">院系：{{$store.state.department}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang='scss' scoped>
#studentInfo {
  width: 299px;
  background: #1d2b36;
  color: white;
  padding: 20px;
  box-sizing: border-box;
  border-bottom: 2px solid #121f28;
  .name {
    background-color: #6C6FC0;
    width: 150px;
    height: 150px;
    border-radius: 150px;
    line-height: 120px;
    text-align: center;
    margin: 0 auto;
    font-size: 1.5rem;
    margin-bottom: 20px;
    // border: 5px solid white;
    box-shadow: 0 5px 20px rgba(0,0,0,0.8);
  }
  .identity {
    text-align: center;
    position: relative;
    top: -80px;
    span {
      text-align: center;
      font-size: 14px;
      display: inline;
      padding: 3px 10px;
      border-radius: 10px;
      font-weight: bold;
    }
  }
  .account {
    color: rgba(211, 211, 211, 0.664);
    font-size: 16px;
    text-align: center;
    margin-bottom: 10px;
  }
}
</style>
