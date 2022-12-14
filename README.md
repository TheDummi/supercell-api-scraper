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
	tokens:{
		ClashOfClans: "Your API token",
		ClashRoyale: "Your API token",
		Brawl Stars: "Your API token"
	}
})
```

Get your API tokens for each game on the following sites.

> - [Clash of Clans](https://developer.clashofclans.com/#/)
> - [Clash Royale](https://developer.clashroyale.com/#/)
> - [Brawl Stars](https://developer.brawlstars.com/#/)

## Methods

### Player

These are methods all to do with players.

#### findPlayer

```js
import { Player } from "supercell-api-scraper";

await Player.findPlayer("#Y99CCLC0R");
```

This will return an array with all the player objects with the same tag. In this object you can find the following:

```json
[
	{
		"name": "TheDummi",
		"tag": "#Y99CCLC0R",
		"game": "ClashOfClans",
		"formattedGame": "Clash of Clans"
	}
]
```

#### fetchChief

```js
import { Player } from "supercell-api-scraper";

await Player.fetchChief("#Y99CCLC0R");
```

This will return an object with everything the Clash of Clans API provides. Before giving you the data I have made some modifications to the data and categorized it more.

#### fetchKing

```js
import { Player } from "supercell-api-scraper";

await Player.fetchKing("#2ULY0CUPY");
```

This will return an object with everything the Clash Royale API provides.

#### fetchBrawler

This will return an object with everything the Brawl Stars API provides.

```js
import { Player } from "supercell-api-scraper";

await Player.fetchBrawler("#QYGG9LL");
```

## Notes

- compatible with typescript and javascript
- requires esm
