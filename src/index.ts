#!/usr/bin/env node

import loadUserConfig from "./userConfig";
import loadCliConfig from "./cliConfig";
import userPackageScripts from "./userPackageScripts";
import {loadRulesFromRuleConfig} from "./loadRules";
import execute from "./execute";

const userConfig = loadUserConfig();
const cliConfig = loadCliConfig(process.argv);
const config = {...userConfig, ...cliConfig};
const scripts = userPackageScripts(config.ignoreScripts);

const rules = loadRulesFromRuleConfig(
	config.strict,
	config.rules,
	config.customRules
);

const issues = execute(rules, scripts);

if (issues.length > 0) {
	// eslint-disable-next-line no-process-exit
	process.exit(1);
}
