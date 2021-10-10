#!/bin/sh

heroku container:push web -a csgo-market-app
heroku container:release web -a csgo-market-app
heroku open -a csgo-market-app