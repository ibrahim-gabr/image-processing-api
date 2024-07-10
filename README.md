### Scripts
- Install: ```npm install```
- Build: ```npm run build```
- Lint: ```npm run lint```
- Prettify: ```npm run format```
- Run unit tests: ```npm run test```
- Start server: ```npm run start```

### Usage
  the app will be default start at port 3000 if you woud like to change it 
create .env file at the root of the project and declare your port liek so ```PORT=4444```
#### Brief instructions

- Install: ```npm install```
- Build: ```npm run build```
- Start server: ```npm run start```
- go to http://localhost:3000 (replace 3000 here with your specified port number ) and choose the initial image from the list of available images.
Then you can resize the image by entering the desired width and height in pixels.

#### Endpoint to list available images
http://localhost:3000/api/v1/images/list

#### Example
http://localhost:3000/api/v1/images/list
Will display a list of available image names.

#### Endpoint to resize images
http://localhost:3000/api/v1/images

Expected query arguments are:
- _filename_: Available filenames are:
   - encenadaport
   - fjord
   - icelandwaterfall
   - palmtunnel
   - santamonica
- _width_: numerical pixel value
- _height_: numerical pixel value

#### Example
http://localhost:3000/api/images?filename=fjord&width=200&height=200
Will scale the fjord image to 200 by 200 pixels and store the resulting image.
On subsequent calls will serve the resized image instead of resizing the
original again.

