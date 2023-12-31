# Bikes on map (Oslo bysykkel) project

This is a technical assignment received from Oslo Origo. The task is to make use of Oslo City bike API (https://oslobysykkel.no/apne-data/sanntid) to show real-time information regarding their bike placements and condition of their bike parking stations on a map. The assignment is to show a list of all bike stations, how many bikes are currently available as well as how many bikes can be parked there.

## Technologies and frameworks used

This application is written in JS with React and Typescript, bundled with Vite and can be run with a Docker image.

- 🗾 [Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/) has been used to display bikes on a map.
- 🐛 [Playwright](https://playwright.dev/) has been used for e2e testing
- 🧠 [React Query](https://tanstack.com/query/v3/docs/react/overview) is used for fetching and caching data. This provides us a simple way to fetch data with less boilerplate although Redux also was considered.
- 📍 [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) is used to provide better service for the user.
- 🚲 [Oslo City bike API](https://oslobysykkel.no/apne-data/sanntid)

## Installation and setup

Clone the repository by running the following command in your prefered directory.

```bash
git clone https://github.com/miichu/bike-map.git
cd bike-map
```

To run the application locally, run the following command in the root directory of your application

```bash
npm install # Install dependencies
npm run dev # To run dev server

# To build before production
npm run build
```

## Testing

Playwright has been used for e2e testing. To run the tests, make sure you install playwright first with the command in ur terminal: `npx playwright install`.

To run tests

```bash

npm run test # In the terminal
npm run test:ui # With an UI
```

### Run the Docker image

A docker image is a template to run the container. You can build this manually, then run the container afterwards. But to simplify this, we can just run the app with `docker compose up` in the directory with the docker-compose.yml.

```bash
# build and run the app in the container
docker compose up
```

To check your Docker image, execute `docker images`
