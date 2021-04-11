import {
  mapGetters
} from "vuex"

export const PlayListMixin = {
  computed: {
    ...mapGetters(["playList"])
  },
  watch: {
    playList(newValue) {
      this.handlePlayList(newValue)
    }
  },
  activated() {
    this.handlePlayList(this.playList)
  },
  mounted() {
    this.handlePlayList(this.playList)
  },
  methods: {
    handlePlayList() {
      throw new Error("mixin引入,但handlePlayList方法未实现")
    }
  }
}