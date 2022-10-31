export function statusCodes(status: { message: string }) {
	if (!status.message) return { online: true, info: "Service available" };
	else if (status.message.includes("403"))
		return { online: false, info: "Service access denied" };
	else if (status.message.includes("404"))
		return { online: false, info: "Service not found" };
	else if (status.message.includes("429"))
		return { online: false, info: "Service ratelimited" };
	else if (status.message.includes("503"))
		return { online: false, info: "Service under maintenance" };
	else return { online: false, info: "Service unreachable" };
}
