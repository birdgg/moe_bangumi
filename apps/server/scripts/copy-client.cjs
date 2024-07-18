const fs = require("fs");
const path = require("path");

const source = path.join(process.cwd(), "../web/out");
const destination = path.join(process.cwd(), "client");

function copyClient() {
	fs.cp(source, destination, { recursive: true }, (err) => {
		if (err) console.log(err);
		console.log(`client copied to ${destination}`);
	});
}

copyClient();
