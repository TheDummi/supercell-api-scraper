# supercell-api-scraper

An easy to use supercell api scraper with custom outputs and extra info.

## Install

```node
npm i supercell-api-scraper
```

## Setup

**IMPORTANT NOTICE**: this scraper does not come with api tokens, as they are IP specific, get your own tokens from the developer pages of each game!

```js
import SupercellHandler from 'supercell-api-scraper';

new SupercellHandler({
    ClashOfClans: "Your API token",
    ClashRoyale: "Your API token",
    Brawl Stars: "Your API token"
})
```

## Methods

### Player

These are methods all to do with players.

#### validatePlayerTag

```js
import { Player } from "supercell-api-scraper";

await Player.validatePlayerTag("#Y99CCLC0R");
```

This will return an object only containing 3 elements:

```json
{
	"name": "TheDummi",
	"tag": "#Y99CCLC0R",
	"game": "ClashOfClans"
}
```

#### fetchChief

```js
import { Player } from "supercell-api-scraper";

await Player.fetchChief("#Y99CCLC0R");
```

This will return an object with everything the Clash of Clans api provides. Before giving you the data I have made some modifications to the data and categorized it more.
The main entries are:

```json
    "profile":{},
    "homeVillage":{}
    "builderBase":{},
    "clan":{},
    "currentSeason":{},
    "units":{},
    "achievements":{}
```

## Notes

- compatible with typescript and javascript
- requires esm
