<template>
  <main>
    <Transition appear name="fade1" mode="out-in">
      <h1>Welcome to my website!</h1>
    </Transition>
    <Transition appear name="fade2" mode="out-in">
      <p>This site is a work in progress and will be updated relatively consistently as time permits.</p>
    </Transition>
    <Transition appear name="fade3" mode="out-in">
      <div>
        <p>To see some of the pages you will need to login with the password I provided in my resume (if you ventured upon this site by means of the link printed in my resume).</p>
        <p>If you came across this site via another means, feel free to contact me and I can help you out.</p>
      </div>
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
// not using this one for now
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
