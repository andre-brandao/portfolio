<script>
   import { Github, Linkedin } from 'lucide-svelte';
</script>

<main>
   <p>
      My name is André de Oliveira Brandão, and I am a dedicated student of Computer Science with a
      background in Software Engineering. Currently, I am in the 5th semester of Computer Science,
      where I have gained a solid foundation in fundamental programming concepts, as well as
      theoretical and practical knowledge. As a complement to my education, I completed an external
      course of 150 hours in SwiftUI, which expanded my experience in user interface development.
      Additionally, I have English communication skills acquired through online interactions and
      during an exchange program in Canada.
   </p>
   <p>
      During my undergraduate studies, I gained experience in various programming languages. I
      primarily used Java, C, and Python in academic projects, developing skills in both functional
      and object-oriented programming. Additionally, I ventured into personal projects, such as
      creating an order and inventory system for my mother's inn using Svelte (a JavaScript
      framework) and Firebase for the backend. I also developed an application using Swift for the
      Hacktruck project. These experiences have equipped me with knowledge in different programming
      paradigms and the ability to quickly learn new languages.
   </p>

   Social Media Links:
   <div class="link">
        GitHub:
       <a href="https://github.com/andre-brandao" target="_blank">
          <Github />
       </a>
   </div>
   <div class="link">
         LinkedIn:
       <a href="https://www.linkedin.com/in/andr%C3%A9-brand%C3%A3o-719684239/" target="_blank">
           <Linkedin />
       </a>
   </div>
</main>



<style>
    main{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        margin-bottom: 2rem;
        margin-inline: 10px;
        /* justify-content: cente; */
        
    }
    p{
        font-size: 1.3rem;
        font-weight: 500;
        text-align: justify;
        margin-inline: 10px;
    }

    .link{
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.3rem;
        font-weight: 500;
        text-align: justify;
        margin-inline: 10px;
    }
</style>
