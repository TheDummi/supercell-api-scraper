/**
 * Interface for the fetch API.
 */
export interface Options {
	tag?: string;
	domain?: string;
	subdomain?: string;
	id?: string;
}

/**
 * Interface for the request of the API.
 */
export interface Request {
	url?: string;
	key?: unknown;
}
