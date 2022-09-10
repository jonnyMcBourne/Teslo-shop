// middleware.ts
import { NextFetchEvent, NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { NextCookies } from 'next/dist/server/web/spec-extension/cookies'
import * as jose from 'jose';

export async function middleware(request: NextRequest, ev: NextFetchEvent) {
    
    const  cookies = request.cookies 
    const previousPage = request.nextUrl.pathname;
    const token = cookies.get('token')
    let isValidToken = false;
    if(!token){
        return NextResponse.redirect( new URL(`/auth/login?p=${previousPage}`,request.url) );
    }   
    try {
       const id = await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_SEED))
        isValidToken = true  
    } catch (error) {
        console.log('ERROR',error);
        return NextResponse.redirect( new URL(`/auth/login?p=${previousPage}`,request.url) );
    }
    if(!isValidToken){
        return NextResponse.redirect( new URL(`/auth/login?p=${previousPage}`,request.url) );
    }
    NextResponse.next()

}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/checkout/:path*'   ,
}