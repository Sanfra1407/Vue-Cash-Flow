<template>
  <transition name="fade">
    <div :class="['notification', notificationClass]" v-if="isVisible">
      <button v-if="closeTriggerIsVisible" class="delete" @click="closeNotification"></button>
      <span>{{ message }}</span>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    closeTriggerIsVisible: {
      type: Boolean,
      required: false,
      default: true
    },
    isVisible: {
      type: Boolean,
      required: false,
      default: true
    },
    message: {
      type: String,
      required: true
    },
    closeNotification: {
      type: Function,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: 'is-success',
    }
  },
  computed: {
    notificationClass() {
      return this.type === 'danger' ? 'is-danger' : 'is-success';
    }
  }
}
</script>

<style lang="scss" scoped>
.notification {
  right: 15px;
  bottom: 15px;
  position: fixed;
}

.fade-enter {
  opacity: 0;

  &-active {
    transition: all .5s;
  }
}

.fade-leave{
  &-active {
    transition: all .5s;
  }

  &-to {
    right: -500px;
  }
}
</style>
