Vue.prototype.$nextMark = {value: "X"};

var eventHub = new Vue();

Vue.component('square', {
  data: function (){
    return {
      name: ''
    }
  },
  methods: {
    mark: function (event) {
//      name = 'X'
      console.log(this.$nextMark.value);
      if (this.name == '') {
        this.name = this.$nextMark.value
        if(this.$nextMark.value == 'X') {
          this.$nextMark.value = 'O'
        } else {
          this.$nextMark.value = 'X'
        }
      }
      eventHub.$emit('nextMark', { value: this.$nextMark.value })
      console.log(this.$nextMark.value);
    }
  },
  template: `<div v-on:click="mark" v-on:change="bus.$emit('change', this.$nextMark.value)" >{{ this.name }}</div>`
});

Vue.component('status', {
  data: function () {
    return {
      name: {value: this.$nextMark.value}
    }
  },
  mounted() {
    eventHub.$on('nextMark', (data) => {
        this.name.value = data.value;
    });
  },
  computed: {
    $status: {
      get: function () { return this.$nextMark.value },
      set: function (newStatus) { this.$nextMark.value = newStatus; }
    }
  },
  methods: {
    onNextMarkChange: function (event) {

      this.$status = this.$nextMark.value;
    }
  },
  template: `<div class="status" v-bind="name">Next player: {{ name.value }}</div>`
})
