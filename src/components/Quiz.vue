<template>
  <div class="container">
    <!-- 进度条 -->
    <!-- 组件的高内聚 -->
    <ProgressBar :value="progress" />

    <!-- 题目 -->
    <!-- 注册自定义事件的监听器 -->
    <Question :list="questionList" @on-answer="addAnswer" @on-submit="sendAnswers" />
  </div>
</template>
 
<script>
import ProgressBar from "./ProgressBar.vue";
import Question from "./Question.vue";


// shift + alt + f
export default {
  name: "Quiz",
  components: {
    ProgressBar,
    Question,
  },
  data() {
    return {
      answers: new Map(),
      answersSize: 0, // 计数器，获得 Map 的大小
      questionList: [
        {
          id: 1,
          title: "最好的编程语言？",
          items: ["PHP", "C", "JS", "Java", "Go"],
          answer: "A",
        },
        {
          id: 2,
          title: "最流行的数据库？",
          items: ["DB2", "Oracle", "MongDB", "MySQL"],
          answer: "D",
        },
        {
          id: 3,
          title: "最高级的数据库？",
          items: ["Redis", "MySQL", "PostgreSQL", "MongDB"],
          answer: "C",
        },
        {
          id: 4,
          title: "市值最高的公司",
          items: ["微软", "亚马逊", "苹果", "中国建行"],
          answer: "B",
        },
        {
          id: 5,
          title: "最好的 Web 前端框架",
          items: ["Angular", "Vue", "React", "jQuery"],
          answer: "B",
        },
      ],
    };
  },
  methods: {
    sendAnswers: function () {
      // 抛出一个自定义的事件
      this.$emit("on-finish",this.answers,this.questionList);
    },
    addAnswer: function (id, answer) {
      this.answers.set(id, answer);
      // console.log(this.answers);
      this.answersSize = this.answers.size;
    },
  },
  computed: {
    // 更新进度条
    progress: function () {
      return (this.answersSize / this.questionList.length) * 100;
    },
  },
};
</script>