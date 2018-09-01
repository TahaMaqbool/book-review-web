# Book Review Web


## Development server setup for Ubuntu

Install NodeJS using the following steps:

`sudo apt-get update`

`cd ~`

`curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh`

You can inspect the contents of this script with nano (or your preferred text editor):

`nano nodesource_setup.sh`

`sudo bash nodesource_setup.sh`

`sudo apt-get install nodejs`

To check which version of Node.js you have installed after these initial steps, type:

`nodejs -v`

`Output
 v8.10.0
`

`mkdir projects`

`cd projects`

`git clone git@github.com:TahaMaqbool/book-review-web.git`

`cd book-review-web`

To Install project dependencies:

`npm install`

Before running development server. Update `environment.ts` file. Under `production: false,` write 
`token_auth_config: {
 apiBase: 'http://[Your_Server_IP]:3000/api/v1'
 }`


Now run the following command:

`npm start`

Open browser and visit `localhost:4200`
