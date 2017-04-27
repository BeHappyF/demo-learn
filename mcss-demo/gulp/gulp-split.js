'use strict';

const fs = require('fs');
const path = require('path');
const gutil = require('gulp-util');
const File = gutil.File;
const PluginError = gutil.PluginError;
const through2 = require('through2');

module.exports = function (opts) {
    opts = Object.assign({
        joiner: '-',
    }, opts);

    return through2.obj(function (file, enc, cb) {
        if (file.isNull())
            return cb();
        if (file.isStream())
            throw new PluginError('gulp-split', 'Streaming not supported');

        const dirname = path.dirname(file.path);
        const extname = path.extname(file.path);
        const basename = path.basename(file.path, extname);

        let pos = file.contents.length/2>>0;
        while (pos < file.contents.length) {
            if (file.contents.slice(pos, pos + 5) + '' === '}\n.m-') {
                pos += 2;
                break;
            }
            pos++;
        }

        this.push(new File({
            cwd: file.cwd,
            base: file.base,
            path: `${dirname}/${basename}${opts.joiner}1${extname}`,
            contents: file.contents.slice(0, pos),
        }))
        this.push(new File({
            cwd: file.cwd,
            base: file.base,
            path: `${dirname}/${basename}${opts.joiner}2${extname}`,
            contents: file.contents.slice(pos, file.contents.length),
        }))

        cb();
    });
}
