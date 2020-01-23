#!/usr/bin/env node

import loadUserConfig from "./userConfig";
import userPackageScripts from "./userPackageScripts";
import {loadRulesFromRuleConfig} from "./loadRules";
import execute from "./execute";

const userConfig = loadUserConfig();
const scripts = userPackageScripts(userConfig.ignoreScripts);
const rules = loadRulesFromRuleConfig(userConfig.strict, userConfig.rules, userConfig.customRules);
const issues = execute(rules, scripts);

if (issues.length > 0) {
	// eslint-disable-next-line no-process-exit
	process.exit(1);
}
