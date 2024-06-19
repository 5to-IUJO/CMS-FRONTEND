import { NextRequest, NextResponse } from "next/server";
import { obtainToken } from "./helpers/Cookies";
import { isUserEmailVerified, obtainUserData } from "./helpers/Users";
// Especificar Rutas Públicas y Protegidas
const protectedRoutes = ["/dashboard","/Profile-Edit","/adminPanel","/profile","/blogs/edit",];
const publicRoutes = ["/login", "/register", ];
const emailVerifiedRoutes =["/verification-required","/verify-email"]
export default async function middleware(req: NextRequest) {
  	// Verificar si la ruta actual es Publica o Protegida
  	const path = req.nextUrl.pathname;
  	const isProtectedRoute = protectedRoutes.includes(path);
  	const isPublicRoute = publicRoutes.includes(path);
	const isEmailVerifiedRoute = emailVerifiedRoutes.includes(path);

  	// Obtener el Token de Autenticación de las Cookies
  	const token = await obtainToken();
	
	//Validar que su email esté Verificado
	if(token && await isUserEmailVerified() === false && !isEmailVerifiedRoute )
		return NextResponse.redirect(new URL("/verification-required", req.nextUrl));
	
	

  	// Redireccionar al /login si el usuario no está autenticado con un Token o si el Token es incorrecto
  	if ((isProtectedRoute || isEmailVerifiedRoute) &&  (await obtainUserData()).resp === false && !isEmailVerifiedRoute)   {
  		return NextResponse.redirect(new URL("/login", req.nextUrl));
  	} 
  	// Redireccionar al Dashboard si el Usuario ya está autenticado y el Token es Correcto
  	if (
  		(isPublicRoute || isEmailVerifiedRoute) &&
  		await isUserEmailVerified() === true &&
  		!req.nextUrl.pathname.startsWith("/dashboard")
  	) {
  		return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  	}
	
  
  	return NextResponse.next();
}

export const config = {
	  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
