const fs = require("fs");
const path = require("path");

const cwd = process.cwd();
const source = path.join(cwd, "apps/web/out");
const destination = path.join(cwd, "apps/server/client");

function copyClient() {
	fs.cp(source, destination, { recursive: true, force: true }, (err) => {
		if (err) console.log(err);
		console.log(`client copied to ${destination}`);
	});
}

copyClient();
