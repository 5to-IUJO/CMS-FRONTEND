
import { Box } from "@chakra-ui/react";
import "./globals.css";
import { Providers } from "./providers";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">

      <body className="bg-[#EBEBD3]" >
        <Box
          fontFamily={"NeutraTextTF-Book"}
        >

          <Providers>{children}</Providers>

        </Box>

      </body>
    </html>
  );
}
