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
            400: "#1F93A5"
        },
        black: {
            400: "#0C0A08"
        },
        white: {
            400: "#F8F8F8"
        },
        gray: {
            400: "#584D4B"
        }
    },
    styles: {
        global: (props: any) => ({
          "html, body": {
            color: props.colorMode === "dark" ? "white.400" : "black.400",
            bg: props.colorMode === "dark" ? "darkBlue.700" : "white.400",
            fontSize: { xl: '16px'}
          },
        }),
     },
})

export default theme;