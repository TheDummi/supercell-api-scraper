export default class SupercellError {
	public declare readonly name;
	public declare readonly message;

	constructor(message?: string) {
		this.name = 'SupercellError';

		this.message = message || 'Error';
	}
}
