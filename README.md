# webfoto-webcomponent 

This is the webcomponent of the project "Webfoto".

https://user-images.githubusercontent.com/33126163/129527900-d0bcbfe7-8fcf-4743-a627-e141fa412e94.mp4

## The project

The "Webfoto" project's purpose is to put some cameras, that take a photo every a certain amount of time, in some hotels, so that a web component can show the timeline of the view of that hotel in the hotel's website.

## The web component

This is the web component, thought to be imported and used by any web developer, without depending on a frontend framework (such as Vue.js, Angular, Svelte or React) or serving system (Node.js server, Php server, ...). By importing the needed script, the developer can just use this component as if it was an HTML tag. The component relates to a webfoto-api in order to retrieve the photos and shows them with many functionalities.

Some functionalities are:
* Display a logo of the hotel with a link
* Being able to copy the link of the current displayed photo
* Change photo by using the "date controller" (in which you can see the current photo's date and change it)
* Move directly to the most recent photo
* Have a timelapse, whose behaviour can be customized

## How to use it

The web component just needs that its script is included in the header (or in the footer) of the html page. Because it is written with Vue.js 2, you also need to include the vue.js library.

The properties of the web component are:
* __name__: It is mandatory and it is the name of the hotel (must match the one in the webfoto-api)
* __api-url__: It is mandatory and it must point to the root of the webfoto-api.
* __width__: The default is `auto` and sets the width of the web component. Note that if only **width** or **height** is specified, the one that is not specified is set so that the image is not warped.
* __height__: The default is `auto` and sets the width of the web component. Note that if only **width** or **height** is specified, the one that is not specified is set so that the image is not warped.
* __spinner-color__: The default is `green` and it sets the color of the spinner displayed during images fetching.
* __logo-src__: The default is `undefined` and it sets the image of the displayed hotel's logo. If not set, no logo is displayed.
* __logo-href__: The default is `undefined` and it sets the link of the displayed logo. If not set, the logo is not a link.
* __logo-width__: The default is `150px` and it sets the width of the displayed logo.

### Example:

```html
<web-foto name="myhotel" api-url="https://api.mywebfoto.it/api" width="50%"></web-foto>
```

## How was it made

The web component was made with `Vue.js`. Usually, frameworks made for web components such as `lit` are used, but because the job was needed in a short amount of time, the developer used the framework that he knew better. In addition, the vue library's weight is negligible compared to the one of just a photo that is to be displayed.

The structure of the code is the same of a Vue.js site, but the `build` script in `package.json` is changed so that it creates a webcomponent. It also uses a `library` to allow webcomponent support.

### Prepare developement or deployment

1. Install nodejs
2. Clone this repo and move to the root folder
3. Install the packages with `npm install`

### Start developement server

1. Execute `npm run serve`
2. Go to `http://localhost:8080`

### Deploy the web component

1. Execute `npm run build`
2. The `dist` folder with the webcomponent is created
 
