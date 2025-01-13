<template>
  <div>
    <h1>Technical Experience</h1>
    <h2>I have a wide variety of technical experience and am always looking to learn new things.  My recent
      focus is primarily on the frontend, however I have also worked on backend and in database development
      and would be happy to return to a fullstack role if the opportunity arose.
    </h2>
    <div class="background">
      <div class="technologies">
        <ul><div class="title">My Experience Includes</div>
          <li>Frontend development</li>
          <li>Fullstack development</li>
          <li>Database development</li>
          <li>SaaS</li>
          <li>Agile Development</li>
          <li>PoS Services</li>
          <li>Microservices</li>
          <li>RESTful APIs</li>
        </ul>
      </div>
      <div class="technologies">
        <ul><div class="title">Technologies I have used Professionally</div>
        <li>TypeScript</li>
        <li>JavaScript</li>
        <li>Vue / Pinia</li>
        <li>Vitest</li>
        <li>React / Redux</li>
        <li>Jest</li>
        <li>HTML</li>
        <li>CSS / SCSS</li>
        <li>Git</li>
        <li>Node.js</li>
        <li>PostgresSQL</li>
        <li>SQL Server</li>
        <li>jQuery</li>
        <li>Java</li>
        </ul>
      </div>
      <div class="technologies">
        <ul><div class="title">Technologies I am Learning or used in Personal Projects</div>
          <li>Nuxt</li>
          <li>Next</li>
          <li>Mongodb</li>
          <li>Python</li>
        </ul>
      </div>
    </div>
  </div>
  <h1>Work Experience</h1>
  <p>* Please see Resume, this will be updated soon...</p>
  <h3>For now, feel free to checkout out my Github account which has the code for this site.
    You can find the code here: <a target="_blank" href="https://github.com/jarmbrust/website1">Github</a>.</h3>
</template>

<style lang="scss" scoped>
@use '@/assets/_variables.scss';

.background {
  display: flex;
  gap: 10px;
  justify-content: center;
  @media (min-width: variables.$device-width) {
    flex-direction: row;
  }
  @media (max-width: variables.$device-width) {
    flex-direction: column;
  }
  .technologies {
    background-color: rgb(198, 237, 247);
    color: #111;
    gap: 3px;
    padding: 10px;
    width: 275px;
    border: 2px solid #ccc;
    border-radius: 10px;
    list-style: none;
    @media (max-width: variables.$device-width) {
      min-height: 350px;
    }
    ul {
      .title {
        font-size: 20px;
        font-weight: bold;
        height: 100px;
        border-bottom: 1px solid #111;
        width: 100%;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      list-style: none;
      text-align: center;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      li {
        font-size: 16px;
        font-weight: normal;
      }
    }
  }
}
</style>
