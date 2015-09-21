'use strict';

import exists from '../exists';
import plugin from '../plugin';
import parser from 'postcss-selector-parser';

let targets = ['firefox 2'];

function analyse (ctx, rule) {
    return selectors => {
        selectors.each(selector => {
            if (
                exists(selector, 0, 'body') &&
                exists(selector, 1, ':empty') &&
                exists(selector, 2, ' ') &&
                selector.at(3)
            ) {
                ctx.push(rule, `Bad selector: ${selector}`);
            }
        });
    };
}

export default plugin(targets, ['rule'], function (rule) {
    if (rule.selector) {
        parser(analyse(this, rule)).process(rule.selector);
    }
});
