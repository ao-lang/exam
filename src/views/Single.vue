<template>
  <div >
    <!-- 答题区域 -->
    <Quiz @on-finish="finish" v-if="!isDone" />

    <!-- 成绩 -->
    <Score :answers="questions" :qlist="qlist" v-else />
  </div>
</template>

<script>
import Quiz from "../components/Quiz";
import Score from "../components/Score";
export default {
name: 'App',
  components: {
    Quiz,
    Score
  },
  data() {
    return {
      isDone: false,
      questions:new Map(),
      qlist:[]
    }
  },
  methods: {
    finish: function(q,l) {
      this.isDone = true;
      this.questions=q,
      this.qlist=l
      // 其他
      // 
    }
  },
 

}
</script>