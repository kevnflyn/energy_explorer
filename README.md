## Energy Explorer
Born out of the Energy Hackday 2022 in Aarau, Energy Explorer was created to
solve the following energy challenge:

"Currently, results from energy scenarios are presented in research papers or
individual webpages. This makes it close to impossible for policy makers to get
the full picture and understand the features of the net-zero Switzerland. How
can policy-makers take decisions based on model-driven energy scenarios?"

Energy Explorer aims to let policy makers compare those same scenarios using
those same models, but in one place. One tool to rule them all.


## Badges
[Sheild coming soon...](https://shields.io/category/build)

## Visuals
GIF demo coming soon...

## Installation
You will need to install dependencies for the backend and frontend.

To get started open up the terminal at the top level of your project.
Running ```li``` should show _package.json_ in the same directory.

You will need to [install docker](https://docs.docker.com/get-docker/) to build,
containerise and run the back-end project locally.

For the frontend, you will need to [install node and npm](https://nodejs.org/en/download/).
After installing node and npm, go back to the terminal and run ```npm install```.
This will install all the npm dependencies referenced in the package.json file.

## Usage
To run the project you will need to run two parts of the application: the
backend services part and the frontend UI part.

1. Build the docker image. Open the terminal at the top-level of this project.
2. Run ```docker compose up``` to start the backend application.
3. Run ```npm run dev``` to start the frontend application.

## Roadmap
To be discussed and solidified.
Until November 2022, we would like to add new features to help policymakers with
the help of our main stakeholders and brainchild creator Adriana Carpucci.

## Contributing
Pull requests are welcome. However conventions and styles that have been setup
already must be respected throughout your development cycle:

1. Follow the spec for [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).
2. Keep PRs small and digestable (chaining PRs is acceptable).
3. Update tests to prevent bugs creeping in.
4. Create and update documentation.

## Authors
Adriana Marcucci, Stephane Bisinger and Robert Stanton

## License
[MIT](https://choosealicense.com/licenses/mit/)
