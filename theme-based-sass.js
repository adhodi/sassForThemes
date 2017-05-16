/**
 * Created by adhodi on 16/05/17.
 */
"use strict";
const file = require('gulp-file');
const sass = require('gulp-sass');
module.exports = {
    applyThemes: (identifier)=> {
        const file = require('gulp-file');
        let map = new Map();
        let pathSuf = "./public/modules/styles/sass/";
        let dirs = fs.readdirSync(pathSuf);
        dirs.forEach(rootfile => {
            let currPath = pathSuf + rootfile + '/';
            let pathKey = currPath + rootfile + ".scss"; //assumption
            map.set(pathKey, []);
            let files = fs.readdirSync(currPath);
            files.forEach(file => {
                if (rootfile === file.replace('.scss', '')) {

                } else {
                    map.get(pathKey).push(currPath + file);
                }
            });
        });
        let itr = map.keys();
        let currVal = null;
        let key;
        for (currVal of itr) {
            key = currVal;
            let pattern = /(?=_).*(?=Config)/;
            let filePath = key;
            let fileName = /(?=[^/]*$).*(?=.scss)/.exec(filePath)[0];
            let dest = 'public/modules/styles/css/' + fileName;
            let modFileOrig = fs.readFileSync(filePath);
            let configs = map.get(filePath);
            for (let i = 0; i < configs.length; i++) {
                let name = pattern.exec(configs[i])[0];
                let modFile = modFileOrig.toString().replace('$configFilePath', configs[i]);
                file(fileName + name + '.css', modFile, {src: true})
                    .pipe(sass())
                    .pipe(gulp.dest(dest))
            }
        }
    }
};