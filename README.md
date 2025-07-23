# Los Pueblos Magicos De Mexico (The Magical Towns of Mexico) Draft

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

On the technical side, I did get a better feel for the MVC model. I had to create a couple of new interfaces and make sure that the frontend was communicating with the backend. The database does have a user model and post (pueblos) model that need to communicate with each other (for the profile page and booked marked pueblos).
