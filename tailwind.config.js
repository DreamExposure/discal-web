const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,md,mdx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './lib/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                'discord-blurple': '#7289da',
                'discord-greyple': '#99AAB5',
                'discord-dark-but-not-black': '#2C2F33',
                'discord-not-quite-black': '#23272A',

                'discal-blue': '#5566C2',
                'discal-dark-blue': '#161B3C',
                'discal-red': '#EF0813',
                'discal-dark-red': '#9E050D',
                'discal-orange': '#e89600',
                'discal-green': '#08B67F',
                'discal-light-grey': '#CCCCCC',
                'discal-dark-grey': '#3C3D41',
                'discal-not-black': '#242428',


                'google': `#EA4335`,
                'google-mauve': '#DBADFF',
                'google-tangerine': '#FF887C',
                'google-dandelion': '#FBD75B',
                'google-mac-and-cheese': '#FFB878',
                'google-turquoise': '#46D6DB',
                'google-mercury': '#E1E1E1',
                'google-blue': '#5484ED',
                'google-green': '#51B749',
                'google-red': '#DC2127',
            },
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
            animation: {
                'spin-slow': 'spin 3s linear infinite',
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
