<template>
  <div class="about">
    <div class="about-me">
      <div class="about-text">
        <h1>About Me</h1>
        <p>My name is James, and I live in Colorado with my loving wife and our 2 dogs, 3 cats,
          and a small assortment of other critters.</p>
        <p>My career is in software development, with a background in frontend, backend, and database development.
          I have a Bachelor of Science in Computer Science from the University Iowa, and a Bachelor of
          Arts in History from St. John's University.</p>
        <p>My hobbies include writing, sketching, pottery, TTRPGs, 4X and rpg computer games, and I enjoy watching
          (sometimes really bad) scifi and fantasy movies.
          Readings of mine include science fiction, fantasy, and non-fiction history or science/programming books.</p>
      </div>
      <div>
        <img class="pic-of-me" src="../assets/james_armbrust.png" alt="James Armbrust" />
      </div>
    </div>
    <div class="mst3k">
      <p class="mst3k-text">If you are curious about the URL of this site, it is in part a homage to the TV
        show Mystery Science Theater 3000 (MST3k for short). It is a show where the characters make fun of
        really bad movies under the pretense of being trapped in a science
        experiment while in a space station orbiting... The moon I think?
        Regardless, I used to watch that show all the time with my mother as a child back in Minnesota,
        and still have a fondness for it today.</p>
        <div>
          <img class="mst3k-image" src="../assets/mst3k_image1.jpg" alt="mystery science theater 3000 symbol" />
        </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/_variables.scss';

.about {
  display: flex;
  flex-direction: column;
  @media (min-width: variables.$device-width) {
    .about-me {
      display: flex;
      .about-text {
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: left;
      }
      img.pic-of-me {
        justify-content: right;
        height: 200px;
        margin: 20px 10px;
      }
    }
  }
  @media (max-width: variables.$device-width) {
    img.pic-of-me {
      height: 300px;
    }
  }
  @media (min-width: variables.$device-width) {
    .mst3k {
      display: flex;
      .mst3k-text {
        justify-content: right;
        margin: 20px 10px;
      }
      img.mst3k-image {
        justify-content: left;
        height: 200px;
        width: 200px;
        margin: 20px 10px;
        border-radius: 10px;
      }
    }
  }
  @media (max-width: variables.$device-width) {
    img.mst3k-image {
      height: 300px;
      border-radius: 10px;
    }
  }
}
</style>
