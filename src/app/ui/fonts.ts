import { DM_Serif_Display } from 'next/font/google';
import { Roboto } from 'next/font/google';
import { PT_Sans } from 'next/font/google';
 
export const dmserif = DM_Serif_Display({
    weight: ['400'],
    subsets: ['latin'],
  });
export const roboto = Roboto({
    weight: ['400', '700'],
    subsets: ['latin'],
  });

  export const ptsans = PT_Sans({
    weight: ['400'],
    subsets: ['latin'],
  });
