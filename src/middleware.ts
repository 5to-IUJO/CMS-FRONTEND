import { NextRequest, NextResponse } from "next/server";
import { obtainToken } from "./helpers/Cookies";
import { obtainUserData } from "./helpers/Users";
// Especificar Rutas Públicas y Protegidas
const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/login", "/register", "/"];

export default async function middleware(req: NextRequest) {
  	// Verificar si la ruta actual es Publica o Protegida
  	const path = req.nextUrl.pathname;
  	const isProtectedRoute = protectedRoutes.includes(path);
  	const isPublicRoute = publicRoutes.includes(path);

  	// Obtener el Token de Autenticación de las Cookies
  	const token = await obtainToken();

  	// Redireccionar al /login si el usuario no está autenticado con un Token o si el Token es incorrecto
  	if (isProtectedRoute && !token && !(await obtainUserData()).resp ) {
  		return NextResponse.redirect(new URL("/login", req.nextUrl));
  	}
  
  	// Redireccionar al Dashboard si el Usuario ya está autenticado y el Token es Correcto
  	if (
  		isPublicRoute &&
  		token &&
  		!req.nextUrl.pathname.startsWith("/dashboard")
  	) {
  		return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  	}
  
  	return NextResponse.next();
}

export const config = {
	  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
