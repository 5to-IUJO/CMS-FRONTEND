
import { Box } from "@chakra-ui/react";
import "./globals.css";
import { Providers } from "./providers";
import { Suspense } from "react";
import Loading from "./loading";
import 'atropos/css'


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="es">

      <body  >
        <Box
          fontFamily={"NeutraTextTF-Book"}
        >

          <Providers>
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
          </Providers>

        </Box>

      </body>
    </html>
  );
}
