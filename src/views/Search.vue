<template>
  <div>
    <div class="container">
      <div class="jumbotron">
        <h1 class="display-3"  @click="add">查找题目结果</h1>
        <hr class="my-2" />
      </div>
      <div class="card">
        <div 
        v-for="(item, index) in str" :key="index"
        class="card-body">
          <h1 class="display-3 text-left">
            {{ item.title }}
          </h1>
          <div >
            <hr class="my-4" />
            <div class="row mt-2 pt-2" v-for="a in item.ans" :key="a">
              <div class="form-check">
                <label class="form-check-label">
                  <span class="badge badge-pill badge-primary">{{
                    String(Object.keys(a))
                  }}</span>
                  {{ String(Object.values(a)) }}
                </label>
              </div>
            </div>
                <p class="text-center">正确答案：{{item.right}}</p>
            </div>  
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["str"]),
  },
  methods: {
    add: function () {},
  },
  mounted() {
    console.log(this.str);
  },
};
</script>