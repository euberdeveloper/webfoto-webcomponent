# webfoto-webcomponent

This is the webcomponent of the project "Webfoto".

https://user-images.githubusercontent.com/33126163/134882153-8f02807b-11a7-4d6f-9e7b-12da96f36866.mp4

## The project

The "Webfoto" project's purpose is to put some cameras, that take a photo every a certain amount of time, in some hotels, so that a web component can show the timeline of the view of that hotel in the hotel's website.

## The web component

This is the web component, thought to be imported and used by any web developer, without depending on a frontend framework (such as Vue.js, Angular, Svelte or React) or serving system (Node.js server, Php server, ...). By importing the needed script, the developer can just use this component as if it was an HTML tag. The component relates to a webfoto-api in order to retrieve the photos and shows them with many functionalities.

Some functionalities are:
* Display a logo of the hotel with a link
* Be able to share the current displayed
* Change photo by using the "date controller" (in which you can see the current photo's date and change it)
* Move directly to the most recent photo
* Have a timelapse
* Connect a youtube stream to the component

## How to use it

The web component just needs that its script is included in the header (or in the footer) of the html page. Because it is written with Vue.js 2, you also need to include the vue.js library.

| Property                 | Type    | Required           | Default   | Description                                                                                                                                                                                                                                                                                                                               |
|----------------------|---------|--------------------|-----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name                 | string  | :heavy_check_mark: | undefined | It is the name of the hotel (must match the one in the webfoto-api)                                                                                                                                                                                                                                                                       |
| api-url              | string  | :heavy_check_mark: | undefined | It must point to the root of the webfoto-api                                                                                                                                                                                                                                                                                              |
| images-url           | string  | :heavy_check_mark: | undefined | It must point to the url of the static directory containing the served images                                                                                                                                                                                                                                                             |
| width                | string  | :white_check_mark: | auto      | Sets the width of the web component. Note that if only **width** or **height** is specified, the one that is not specified is set so that the image is not warped                                                                                                                                                                         |
| height               | string  | :white_check_mark: | auto      | Sets the height of the web component. Note that if only  **width** or  **height** is specified, the one that is not specified is set so that the image is not warped                                                                                                                                                                      |
| show-spinner         | boolean | :white_check_mark: | false     | Determines if a spinner is shown while an image is getting loaded. Note: it appears only if it is taking more than 250ms.                                                                                                                                                                                                                 |
| spinner-color        | string  | :white_check_mark: | green     | Sets the color of the spinner displayed during images fetching                                                                                                                                                                                                                                                                            |
| logo-src             | string  | :white_check_mark: | undefined | Sets the image of the displayed hotel's logo. If not set, no logo is displayed                                                                                                                                                                                                                                                            |
| logo-href            | string  | :white_check_mark: | undefined | Sets the link of the displayed logo. If not set, the logo is not a link                                                                                                                                                                                                                                                                   |
| logo-width           | string  | :white_check_mark: | 150px     | Sets the width of the displayed logo                                                                                                                                                                                                                                                                                                      |
| logo-with-mobile     | string  | :white_check_mark: | 70px      | Sets the width of the displayed logo on mobile displays (max width 720px)                                                                                                                                                                                                                                                                 |
| min-zindex           | number  | :white_check_mark: | -1        | It is used to fix a problem that was faced about the z-index property. To swap the image, it usually sets `z-index: -1` to the displayed one ant `z-index: 0` to the image that will fade. By setting `min-zindex: x`, the displayed image will have `z-index: x` while the faded image (and all the controls) will have `z-index: x + 1` |
| legacy-time-lapse    | boolean | :white_check_mark: | false     | It determines if the legacy timelapse (a red control with play/pause button and inputs to decide how big each step is) instead of the default one (the one with the slider)                                                                                                                                                               |
| time-lapse-max-items | number  | :white_check_mark: | 200       | Because the default timelapse's slider can not support thousands of images, they are selected with a regular gap between them. This property says how many images are kept.                                                                                                                                                               |
| time-lapse-interval | number  | :white_check_mark: | 1500       | The interval in milliseconds between two time-lapsed images.                                                                                                                                                               |
| youtube-id           | string  | :white_check_mark: | undefined | The id of a youtube video that ideally is a live stream of the camera. If set, there will be a button to show it instead of the images.                                                                                                                                                                                                   |

### Example:

```html
<web-foto name="myhotel" api-url="https://api.mywebfoto.it/api" images-url="https://api.mywebfoto.it/albums" width="50%"></web-foto>
```

Note: remember to include both the `vue.js` script and the webcomponent script. For instance:

```html
<script src="https://unpkg.com/vue"></script>
<script src="https:/link-to-webcomponent/web-foto.min.js"></script>
```

## How was it made

The web component was made with `Vue 2`. Usually, frameworks made for web components such as `lit` are used, but because the job was needed in a short amount of time, the developer used the framework that he knew better. In addition, the vue library's weight is negligible compared to the one of just a photo that is to be displayed.

The structure of the code is the same of a Vue.js site, but the `build` script in `package.json` is changed so that it creates a webcomponent. It also uses a `library` to allow webcomponent support.

Some libraries has also been used:
* `clipboard-copy` to copy the link (deprecated) of the current photo to the clipbord
* `dayjs` to handle dates
* `share-api-polyfill` to allow the sharing of the current photo even to older browsers
* `vue-slider-component` for the timelapse's slider
* `vue-spinner` for the spinner
* `webpack-obfuscator` to better obfuscate the generated javascript code

Note also that being a webcomponent, there were some limitations of what could be done. For instance, the most difficult task, was fixing the `vue-slider-component` css code, that was manually changed by putting a `<style>` script with `::v-deep`.

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

## Automatic deploy

The deploy is actually automatically handled through a **github action**.

The github action:
1. Starts an ubuntu docker container
2. Adds nodejs
3. Installs the dependencies
4. Builds the webcomponent
5. Compresses the webcomponent
6. Gets the package.json version
7. Pulishes a new release with that version and with the compressed webcomponent

## Were are the static files that I just have to serve?

Every automatic deploy creates a **[new release](https://github.com/Dev-digitalgarda/webfoto-webcomponent/releases)**. In that release, there is attached a compressed (.tar.gz) file containing the static assets that are to be **staticaly served as they are**.
 
## How should I contribute

Whoever will contribute and work on this code:

1. Should install locally **nodejs**
2. Clone the project and checkout on the **dev branch**
3. Know how to work with a **Vue.js** project
4. Test locally the changes with **npm run serve**
5. Push the code **on dev**
6. Only when you want a new release to be published, you should **update the version in package.json and merge the dev branch into main**
