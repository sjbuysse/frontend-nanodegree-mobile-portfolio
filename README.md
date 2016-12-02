How to run the website: 
- Either run the website from within the `dist/` folder with `python -m SimpleHTTPServer 8080` and open up the website on port 8080 of your ip adress. 
Or if you have a working LAMP configuration you can copy the contents of the `dist/` folder to `/var/www/html` and open up the website on your ip adress with port 80. This way is preferable to the SimpleHTTPServer, since now the browser caching configuration in the `.htaccess` file is active. 

How to make changes to the website:
- To edit the website, you make changes in the `src/` folder 
- To add an image to the website, you add it to the `img/ToBeResized/` directory, and add it with a `<img>` tag to the webpage. Grunt will automatically create different sizes of the image and add appropriate `srcset` tags to the webpage.
- Run grunt from the root folder to implement the new changes, and to run optimizations.

These are the things I have done to get a higher PageSpeed Insights ranking:
- First of all, I changed directory organization a bit so that grunt finds everything in the `src/` folder and copies the altered files to the `dist/` folder
- I minimized the css files with `grunt-contrib-cssmin`
- I inlined the critical css with the `grunt-critical task`, and use JS to load the rest of the css file asynchronously
- In the fallback <noscript> tag, I added a media query for the print styles css file.
- Removed google font.
- Added asynchronous google analytics script
- Added a `.htaccess` file to configure browser caching
- Used `grunt-responsive-images` to create different versions of image in sizes, and use `grunt-imagemin` to optimize all those images.
- Added responsive images to webpages using `srcset` and `sizes`
- Downloaded the images of the homepage and added linked the src attribute to the local version to avoid extra external requests.

These are the things I have done to make the app run at 60fps:
- Refactored `updatePositions()` so that It doesn't read out `document.body.scrollTop` every loop, which triggers a layout event and in the end layout trashing.
- Refactored and simplify `changePizzaSizes()`, so that it's not unnessecairily complex and avoid layout trashing
- Replaced `document.querySelectorAll('.mover')` with  `document.getElementsByClassName('.mover')`, because it's more efficient.
- Reduced the amount of pizzas images animating in the background, and added a eventListener for any windowSize changes to create the appropriate amount of animating background pizza images.
- Using translateX() to slide the pizza elements rather than updating style.left on each scroll event.
