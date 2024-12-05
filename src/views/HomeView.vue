<template>
  <main>
    <Transition appear name="fade1" mode="out-in">
      <h1>Welcome to my website!</h1>
    </Transition>
    <Transition appear name="fade2" mode="out-in">
      <p>This was created to serve as a gateway to all things James!</p>
    </Transition>
    <Transition appear name="fade3" mode="out-in">
      <p>Under construction. Stay tuned for future updates!</p>
    </Transition>
    <Transition appear name="fade4" mode="out-in">
      <p>...And don't mind the transitions, they are a bit silly.</p>
    </Transition>
  </main>
</template>

<style lang="scss" scoped>
.fade1-enter-from,
.fade2-enter-from,
.fade3-enter-from {
  opacity: 0;
  transform: translateY(-500px);
}
.fade4-enter-from {
  opacity: 0;
  transform: translateX(-1000px);
}

.fade1-enter-active {
  transition: all 0.5s ease-out;
}
.fade2-enter-active {
  transition: all 1.0s ease-out;
}
.fade3-enter-active {
  transition: all 1.5s ease-out;
}
.fade4-enter-active {
  transition: all 2.0s ease-out;
}

.fade1-enter-to,
.fade2-enter-to,
.fade3-enter-to,
.fade4-enter-to {
  opacity: 1;
}
</style>
