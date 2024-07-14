import { ConsoleLogger, Injectable } from "@nestjs/common";
import { Level, LoggerOptions, pino } from "pino";
import { LOG_FILE } from "./logger.constant";

const transport: LoggerOptions["transport"] = {
	targets: [
		{
			level: "debug",
			target: "pino-pretty",
			options: { colorize: true, levelFirst: true },
		},
		{
			level: "info",
			target: "pino/file",
			options: {
				destination: LOG_FILE,
				mkdir: true,
			},
		},
	],
};

@Injectable()
export class Logger extends ConsoleLogger {
	ignoreContext = [
		"NestApplication",
		"NestFactory",
		"InstanceLoader",
		"RouterExplorer",
		"RoutesResolver",
	];
	pinoLogger = pino({
		level: "debug",
		base: undefined,
		transport,
	});

	verbose(message: any, ...optionalParams: any[]) {
		this.call("trace", message, ...optionalParams);
	}

	debug(message: any, ...optionalParams: any[]) {
		this.call("debug", message, ...optionalParams);
	}

	log(message: any, ...optionalParams: any[]) {
		this.call("info", message, ...optionalParams);
	}

	warn(message: any, ...optionalParams: any[]) {
		this.call("warn", message, ...optionalParams);
	}

	error(message: any, ...optionalParams: any[]) {
		this.call("error", message, ...optionalParams);
	}

	fatal(message: any, ...optionalParams: any[]) {
		this.call("fatal", message, ...optionalParams);
	}

	private call(level: Level, message: any, ...optionalParams: any[]) {
		const objArg: Record<string, any> = {};

		// optionalParams contains extra params passed to logger
		// context name is the last item
		let params: any[] = [];
		if (optionalParams.length !== 0) {
			objArg.context = optionalParams[optionalParams.length - 1];
			params = optionalParams.slice(0, -1);
		}

		if (this.ignoreContext.includes(objArg.context)) {
			return;
		}

		if (typeof message === "object") {
			if (message instanceof Error) {
				objArg.err = message;
			} else {
				Object.assign(objArg, message);
			}
			this.pinoLogger[level](objArg, ...params);
		} else if (this.isWrongExceptionsHandlerContract(level, message, params)) {
			objArg.err = new Error(message);
			objArg.err.stack = params[0];
			this.pinoLogger[level](objArg);
		} else {
			this.pinoLogger[level](objArg, message, ...params);
		}
	}

	private isWrongExceptionsHandlerContract(
		level: Level,
		message: any,
		params: any[],
	): params is [string] {
		return (
			level === "error" &&
			typeof message === "string" &&
			params.length === 1 &&
			typeof params[0] === "string" &&
			/\n\s*at /.test(params[0])
		);
	}
}
