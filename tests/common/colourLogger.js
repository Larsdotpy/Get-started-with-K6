function colourLogger(response) {
    let status = response.status;

    if (status >= 500 && status < 599) {
        console.error(colours.bg.red, colours.fg.white, '------ start error log ------', colours.reset,
            `\n request:\n ${JSON.stringify(response.request)}\n\n respons:\n ${JSON.stringify(response)}\n`,
            colours.bg.red, colours.fg.white, '------ end error log ------', colours.reset
        );
        return;
    }

    if (status >= 400 && status < 499) {
        console.warn(colours.bg.yellow, colours.fg.black, `------ start warn log ------`, colours.reset,
            `\n request:\n ${JSON.stringify(response.request)}\n\n respons:\n ${JSON.stringify(response)}\n`,
            colours.bg.yellow, colours.fg.black, `------ end warn log ------`, colours.reset
        );
        return;
    }

    if (status >= 100 && status < 199) {
        console.info(colours.bg.cyan, colours.fg.white, '------ start info log ------', colours.reset,
            `\n request:\n ${JSON.stringify(response.request)}\n\n respons:\n ${JSON.stringify(response)}\n`,
            colours.bg.cyan, colours.fg.white, '------ end info log ------', colours.reset
        );
        return;
    }

    console.debug(`Response body: ${response.body}`)
}

const colours = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",

    fg: {
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
        gray: "\x1b[90m",
        crimson: "\x1b[38m" // Scarlet
    },
    bg: {
        black: "\x1b[40m",
        red: "\x1b[41m",
        green: "\x1b[42m",
        yellow: "\x1b[43m",
        blue: "\x1b[44m",
        magenta: "\x1b[45m",
        cyan: "\x1b[46m",
        white: "\x1b[47m",
        gray: "\x1b[100m",
        crimson: "\x1b[48m"
    }
};

export {colourLogger};