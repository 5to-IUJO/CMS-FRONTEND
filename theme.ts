import { extendTheme } from "@chakra-ui/react";

const config = {
    initialColorMode: "system",
    useSystemColorMode: true,
}

const theme = extendTheme({
    config,
    colors: {
        darkBlue: {
            100: "#2196f3",
            400: "#1C243C",
            700: "#212738"
        },
        cyan : {
            300: '#1C7987',
            400: "#1F93A5"
        },
        black: {
            400: "#0C0A08",
            300: "#141925"
        },
        white: {
            400: "#F8F8F8",
            500:"#e0e0e0"
        },
        gray: {
            400: "#584D4B"
        }
    },
    styles: {
        global: (props: any) => ({
          "html, body": {
            color: props.colorMode === "dark" ? "white.500" : "black.400",
            bg: props.colorMode === "dark" ? "black.300" : "white.500",
            fontSize: { xl: '16px'}
          },
        }),
     },
})

export default theme;