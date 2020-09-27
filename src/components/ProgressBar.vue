<template>
  <div class="progress">
      <div 
        class="progress-bar progress-bar-striped progress-bar-animated bg-success" 
        role="progressbar"
        :style="styleValue" 
        aria-valuenow="25" 
        aria-valuemin="0" aria-valuemax="100">{{value}}%</div>
  </div>
</template>
 
<script>
export default {
  name: 'ProgressBar',
  props: {
    value: Number
  },
  computed: {
    styleValue: function() {
      return `width: ${this.value}%`;
    }
  }
}
</script>