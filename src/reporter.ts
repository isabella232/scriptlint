import chalk from "chalk";

const PREFIX = "𝖘";

type MessageType = "error" | "warning";

type Message = {
	message: string;
	type: MessageType;
};

type MessageBuffer = Array<Message>;

type Values = {
	[key: string]: string;
} | undefined;

const makeMessage = (template: string, values: Values): string => {
	let message = template;

	if (values !== undefined) {
		const pairs = Object.entries(values);

		pairs.forEach(([key, value]) => {
			message = message.replace(`{{${key}}}`, value);
		});
	}

	return message;
};

let stashed: MessageBuffer = [];

const stash = (message: string, type: MessageType): void => {
	stashed.push({
		message, type,
	});
};

export const warning = (template: string, values?: Values): void => {
	const message = makeMessage(template, values);

	stash(message, "warning");
};

export const error = (message: string): void => {
	print("error", message);
};

export const dump = (): number => {
	const problemCount = stashed.length;

	stashed.forEach(({message, type}) => {
		print(type, message);
	});

	stashed = [];

	return problemCount;
};

const print = (type: MessageType, message: string) => {
	switch (type) {
	case "error": {
		console.log(chalk.bold.red(`${PREFIX} [error] ${message}`));
		break;
	}

	case "warning": {
		const notUnderlined = chalk.yellow.bold(`${PREFIX} [${type}]`);
		const underlined = chalk.yellow.underline(message);

		console.log(`${notUnderlined} ${underlined}`);
		break;
	}
	}
};

