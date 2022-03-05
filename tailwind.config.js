module.exports = {
    content: [],
    theme: {
        extend: {},
    },
    plugins: [
        require('daisyui'),
    ],
    daisyui: {
        themes: [
            'light',
            'dark',
            'bubmlebee',
        ],
        styled: true,
        base: true,
        utils: true,
        logs: true,
        rtl: false,
    },
}