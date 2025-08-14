<!-- # Los Pueblos Magicos De Mexico (The Magical Towns of Mexico) Draft

Ever visited Mexico or thought about visiting? If you are like a lot of people (including my younger self), when you think of Mexico, Cancun or Tijuana may come to mind. Mexico has a rich and colorful history with various climates and terrains. The Pueblos Magicos are Magical towns located all over Mexico. I've created an API that will show you the true beauty of Mexico and hopefully encourage you to visit one (or many) of these Pueblos! I hope you enjoy and happy exploring!

**Link to project:** TBD

![app in action gif](/public/imgs/Pueblos.gif)

**Version 2: Map added using Mapbox API**

![app in action gif](/public/imgs/mapPopUp.gif)

**Version 3: Cleaned up CSS + mobile responsive**

![app in action gif](/public/imgs/pueblosV3.gif)

## How It's Made:

**Tech used:** React, Typescript, Next.js, Supabase, Mapbox, couldinary

I created the API sourcing photos and articles from https://en.wikipedia.org/ and https://www.flickr.com/explore mainly.

## Optimizations

Eventually I would love to add more information to each town. I would love to have routes set up to show all the available ways to reach these towns. While the airport listed on the page is only one way of getting there, there are various methods of reaching these towns. Also, I would love to showcase more photos of these towns that are provided by the community. The image sizing and CSS will always be an ongoing project. (Are you really ever done with the CSS and making it look "just right"?). Eventually I will move from EJS to React in order to render the photo components of the feed instead of a full page reload. I will implement Google Oauth in the near future to make signing up even easier.

## Lessons Learned:

Where do I begin...

I was motivated to build this website for the love I have for Mexico. Oftentimes, people who are not familiar with the country have these impressions of Mexico based on what they see on TV or hear in the media. I found it difficult to find new places to visit in Mexico without having background knowledge of where to go. My hope for the website is to allow users' curiosity to guide their next adventure. I hope that people can see the beauty of Mexico and feel the urge to come visit and explore.

On the technical side, I did get a better feel for the MVC model. I had to create a couple of new interfaces and make sure that the frontend was communicating with the backend. The database does have a user model and post (pueblos) model that need to communicate with each other (for the profile page and booked marked pueblos). -->
<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a id="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
    <img src="axolotlPlane.png" alt="axoltl flying a plane" width="80" height="80">
  </a>

  <h3 align="center">Querido Pueblo</h3>

  <p align="center">
    Every place tells a story. Whether it’s found in cobblestone streets, the endless alleys, the homemade food and winding markets or the people hanging out in the town square. My hope is that this site will inspire you to plan that trip you’ve been holding off on, pack your bags, and add the next chapter to your story…
    <br />
    <br />
    <br />
    <!-- <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a> -->
    &middot;
    <a href="https://github.com/Salgado3/Pueblos_next_js/issues/new?template=bug_report.md">Report Bug</a>
    &middot;
    <a href="https://github.com/Salgado3/Pueblos_next_js/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Creating this site to highlight the small towns that often go underrepresented. The towns that near all the big cities, but often times are hard to find because there is not a centralized directory to locate them.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Next][Next.js]][Next-url]
- [![React][React.js]][React-url]
- [![Supabase][Supabase]][Supabase-url]
- [![Typescript][Typescript]][Typescript-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Roadmap

- [ ] Create things to do for each town (0/132)
- [ ] Add Additional Pueblos
- [ ] Multi-language Support
  - [ ] Spanish

See the [open issues](https://github.com/Salgado3/Pueblos_next_js/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

<!-- Your Name - [@your_twitter](https://twitter.com/your_username) - email@example.com -->

<!-- Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name) -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [Tabler Icons](https://tabler.io/icons)
- [Mantine.dev](https://mantine.dev/)
- I created the API sourcing photos and articles from https://en.wikipedia.org/ and https://www.flickr.com/explore.
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Supabase]: https://img.icons8.com/?size=100&id=sH0rW2TvYdr9&format=png&color=000000
[Supabase-url]: https://supabase.com/
[Typescript]: https://img.icons8.com/?size=100&id=HcQEdKCkXUs3&format=png&color=000000
[Typescript-url]: https://www.typescriptlang.org/
