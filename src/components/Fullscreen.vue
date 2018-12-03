<template>
  <section
    class="bg-white w-full h-full absolute pin-l pin-t"
    :class="activeOpen ? 'open' : 'closed'"
  >
    <div class="content">
      <h1>This is a Fullscreen modal</h1>
    </div>
    <a
      href
      class="absolute w-2 h-2 pin-r pin-t m-4 leading-none text-black hover:text-green"
      @click.prevent="closeDialog"
    >
      <font-awesome-icon :icon="closeIcon"/>
    </a>
  </section>
</template>


<script>
const ESC_KEY = 27
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export default {
  name: 'Fullscreen',

  components: {
    FontAwesomeIcon
  },

  inheritAttrs: false,

  props: {
    /**
     * Whether the Fullscreen should be open or closed
     */
    open: {
      type: Boolean,
      default: false
    },
    /**
     * If true, pressing the ESC key will close the Fullscreen
     */
    closeOnEsc: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      activeOpen: !!this.open,
      closeIcon: faTimes
    }
  },

  watch: {
    open(open) {
      if (open) {
        this.openDialog()
        this.focusContent()
      } else {
        this.closeDialog()
      }
    }
  },

  mounted() {
    document.addEventListener('keydown', this.handleEsc, true)
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.handleEsc, true)
  },

  methods: {
    handleEsc(event) {
      if (this.closeOnEsc && event.keyCode === ESC_KEY && this.activeOpen) {
        event.preventDefault()
        this.closeDialog()
      }
    },

    openDialog() {
      this.activeOpen = true
      this.$emit('open')
    },

    closeDialog() {
      this.activeOpen = false
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
// .open {
//   visibility: visible;
//   opacity: 1;
// }
// .closed {
//   visibility: hidden;
//   opacity: 0;
// }
</style>