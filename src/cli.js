#!/usr/bin/env node

const {statistics, broken} = require('./stats.js');
const mdlinks = require('./index.js');


// Grab provided args.
const [,, ... args] = process.argv;

if((args).length === 1){
    mdlinks(args[0], {validate: false})
    .then((res) => console.log(res.map((obj) => {
        return `file: ${obj.file} \nhref: ${obj.href} \ntext: ${obj.text}`;
    }).join('\n')))
    .catch((err) => console.log((err)));
}

if(args.length === 2){
    switch (args[1]) {
        case '--validate':
            mdlinks(args[0], {validate: true})
            .then((res) => console.log(res.map((obj) => {
                if((obj.text).length > 50){
                    return newText = (obj.text).slice(0, 50);
                }
                return `file: ${obj.file} \nhref: ${obj.href} \nmessage: ${obj.message} \nstatus: ${obj.status} \ntext: ${obj.text}`;
            }).join('\n')))
            .catch((err) => console.log((err)));
            break;
    
        case '--stats':
            mdlinks(args[0], {validate: true})
            .then(res => 
                console.log(statistics(res)))
            .catch((err) => console.log((err)));
            break;

        case '--help':
            const help = `a`
            console.log(help);
            break;
        default:
            console.log('El comando no es válido.');
    }
}

if(args.length === 3){
    if(args[1] === '--stats' && args[2]==='--validate' || args[1] === '--validate' && args[2]==='--stats'){
        mdlinks(args[0], {validate: true})
        .then(res =>
            console.log(statistics(res)+broken(res)))
        .catch((err) => console.log((err)));
    }else{
        console.log('El comando no es válido.')
    }
}