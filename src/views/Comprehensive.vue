<template>
  <div class="about">
    <div class="jumbotron jumbotron-fluid p-1">
      <div class="container">
        <h1 class="display-3">在线考试平台</h1>
        <p class="lead">选择题</p>
      </div>
    </div>
    <div id="app">
      <div class="progress">
        <div
          class="progress-bar progress-bar-striped bg-warning"
          role="progressbar"
          :style="{ width: pwidth + '%' }"
        >
          完成的进度
        </div>
      </div>
      <div class="jumbotron mt-3">
        <div class="container" v-if="finished">
          <div class="row mt-2 pt-2">
            <h1 class="display-3">完成</h1>
          </div>
          <div class="row mt-2 pt-2" v-if="isScore">
            <h2 class="display-4 col-12">得分:{{ total }}</h2>
            <div class="col-12 row mt-2 pt-2">
              <div class="col-6">
                <p>标准答案：</p>
                <span
                  v-for="(a, b) in timu"
                  :key="b"
                  class="badge badge-pill badge-primary col-12"
                  >第{{ b + 1 }}题：{{ a.right }}
                </span>
              </div>
              <div class="col-6">
                <p>你的答案</p>
                <span
                  v-for="(a, b) in ss"
                  :key="b"
                  :class="[
                    'badge',
                    'badge-pill',
                    'col-12',
                    yanse[b] == true ? 'badge-primary' : 'badge-danger',
                  ]"
                  >第{{ b + 1 }}题：{{ a }}</span
                >
              </div>
            </div>
          </div>
          <!--正确答案与用户提交答案的对比-->
          <div class="row mt-2 pt-2" v-else>
            <div class="col-6">
              <button
                type="button"
                @click="up(true)"
                class="btn btn-danger btn-lg btn-block"
              >
                返回
              </button>
            </div>
            <div class="col-6">
              <button
                type="button"
                @click="score"
                class="btn btn-primary btn-lg btn-block"
              >
                提交
              </button>
            </div>
          </div>
        </div>
        <div class="container" v-else>
          <h1 class="display-3 text-left">
            <span class="badge badge-primary">{{ now + 1 }}</span
            >{{ timu[now].title }}
          </h1>
          <div v-if="timu[now].right.length > 1">
            <div class="row mt-2 pt-2">
              <p class="lead">多选题</p>
            </div>
            <hr class="my-4" />
            <div class="row mt-2 pt-2" v-for="a in timu[now].ans" :key="a">
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    v-model="choose"
                    name="right"
                    :value="String(Object.keys(a))"
                  />
                  <span class="badge badge-pill badge-primary">{{
                    String(Object.keys(a))
                  }}</span>
                  {{ String(Object.values(a)) }}
                </label>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="row mt-2 pt-2">
              <p class="lead">单选题</p>
            </div>
            <hr class="my-2" />
            <div class="row mt-2 pt-2" v-for="a in timu[now].ans" :key="a">
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    v-model="choose"
                    name="right"
                    :value="String(Object.keys(a))"
                  />
                  <span class="badge badge-pill badge-primary">{{
                    String(Object.keys(a))
                  }}</span>
                  {{ String(Object.values(a)) }}
                </label>
              </div>
            </div>
          </div>
          <div class="row mt-2 pt-2">
            <div class="col-6">
              <button
                type="button"
                id="btn1"
                @click="up"
                :class="[
                  'btn',
                  'btn-danger',
                  'btn-lg',
                  'btn-block',
                  now === 0 ? 'disabled' : '',
                ]"
              >
                上一题
              </button>
            </div>
            <div class="col-6">
              <button
                type="button"
                id="btn2"
                @click="next"
                class="btn btn-primary btn-lg btn-block"
              >
                下一题
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "./js/jquery-3.3.1.min.js";
import { mapState } from 'vuex';
export default {
  data() {
    return {
      singles: [], //单选题数组
      muls: [], //多选题数组
      timu: [], //题目数组
      now: 0,
      results: new Map(),
      choose: [],
      finished: false,
      isScore: false,
      total: 0,
      //答案结果
      ss: [],
      yanse: [],
    };
  },
  computed: {
    ...mapState(['single','multipart']),
    pwidth() {
      return ((this.now+1) / this.timu.length) * 100;
    },
  },
  watch: {
    //监听choose属性值变化
    choose: function (newval, oldval) {
      if (newval.length > 0) {
        $("#btn2").prop("disabled", false);
      } else {
        $("#btn2").prop("disabled", true);
      }
    },
    now: function (newval, oldval) {
      if (newval > 0) {
        console.log("btn1启用", newval);
        $("#btn1").prop("disabled", false);
      } else {
        $("#btn1").prop("disabled", true);
      }
    },
  },
  methods: {
    next() {
      //记录当前题的答案
      this.results.set(this.now, this.choose);
      this.now++;
      //已做过的题不清空选择
      if (this.results.get(this.now)) {
        this.choose = this.results.get(this.now);
      } else {
        this.choose = [];
      }
      if (this.now === 5) {
        this.finished = true;
      }
    },
    up(isEnd) {
      if (this.now === 0) {
        return;
      }
      if (isEnd) {
        this.finished = false;
      }
      this.now--;
      //获得前一题已选择的答案
      this.choose = this.results.get(this.now);
    },
    score() {
      let count = 0;
      for (let entry of this.results) {
        if (this.timu[entry[0]].right.length === 1) {
          if (this.timu[entry[0]].right === entry[1]) {
            count++;
            this.yanse.push(true);
          } else {
            this.yanse.push(false);
          }
        } else {
          if (this.timu[entry[0]].right.join("") === entry[1].sort().join("")) {
            count++;
            this.yanse.push(true);
          } else {
            this.yanse.push(false);
          }
        }
      }
      this.total = (count / this.timu.length) * 100;
      this.total = this.total.toFixed(2);
      this.isScore = true;
      this.results.forEach((aa) => {
        this.ss.push(aa);
      });
    },
  },
  mounted() {
    this.singles = [...this.single];
    console.log(this.singles);
    this.muls = [...this.multipart];
    //随机抽单选题
    let set = new Set();
    while (set.size < 3) {
      let r = Math.floor(Math.random() * this.singles.length);
      set.add(r);
    }
    for (let s of set) {
      //添加单选题到题目数组
      this.timu.push(this.singles[s]);
    }
    //随机抽多选题
    set = new Set();
    while (set.size < 2) {
      let r = Math.floor(Math.random() * this.muls.length);
      set.add(r);
    }
    for (let s of set) {
      //添加多选题到题目数组
      this.timu.push(this.muls[s]);
    }
  },
};
</script>
