/** @format */

import SupercellClient from "../dist/main.js";
import config from "./config.js";

config.config = {
  debug: true,
};

const supercell = new SupercellClient(config);

// const clan = await supercell.ClashOfClans.clans.capitalRaidSeasons('2Y8U8GR02');
// const player = await supercell.ClashOfClans.players.get('#Y99CCLC0R');
const player = await supercell.ClashRoyale.players.get("#Y99CCLC0R");

console.log(player);
