import { z } from 'zod';
import { ClientOptions } from '../types/interfaces.js';
import ClashOfClans from '../models/ClashOfClans.js';
import ClashRoyale from '../models/ClashRoyale.js';
import BrawlStars from '../models/BrawlStars.js';

export default class Client {
	public declare readonly options: ClientOptions;
	public declare readonly ClashOfClans: ClashOfClans;
	public declare readonly ClashRoyale: ClashRoyale;
	public declare readonly BrawlStars: BrawlStars;

	constructor(options: ClientOptions) {
		this.options = z
			.object({
				ClashOfClans: z
					.object({
						token: z.string(),
					})
					.or(z.null())
					.default(null),
				ClashRoyale: z
					.object({
						token: z.string(),
					})
					.or(z.null())
					.default(null),
				BrawlStars: z
					.object({
						token: z.string(),
					})
					.or(z.null())
					.default(null),
				config: z
					.object({
						debug: z.boolean().optional(),
					})
					.optional(),
			})
			.parse(options);

		this.ClashOfClans = new ClashOfClans(this);

		this.ClashRoyale = new ClashRoyale(this);

		this.BrawlStars = new BrawlStars(this);
	}
}
