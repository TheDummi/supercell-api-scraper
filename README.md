��#   s u p e r c e l l - a p i - s c r a p e r 
 
 A n   e a s y   t o   u s e   s u p e r c e l l   a p i   s c r a p e r   w i t h   c u s t o m   o u t p u t s   a n d   e x t r a   i n f o . 
 
 # #   I n s t a l l 
 
 ` ` ` n o d e 
 n p m   i   s u p e r c e l l - a p i - s c r a p e r 
 ` ` ` 
 
 # #   S e t u p 
 
 * * I M P O R T A N T   N O T I C E * * :   t h i s   s c r a p e r   d o e s   n o t   c o m e   w i t h   a p i   t o k e n s ,   a s   t h e y   a r e   I P   s p e c i f i c ,   g e t   y o u r   o w n   t o k e n s   f r o m   t h e   d e v e l o p e r   p a g e s   o f   e a c h   g a m e ! 
 
 ` ` ` j s 
 i m p o r t   S u p e r c e l l H a n d l e r   f r o m   ' s u p e r c e l l - a p i - s c r a p e r ' ; 
 
 n e w   S u p e r c e l l H a n d l e r ( { 
 	 t o k e n s : { 
 	 	 C l a s h O f C l a n s :   " Y o u r   A P I   t o k e n " , 
 	 	 C l a s h R o y a l e :   " Y o u r   A P I   t o k e n " , 
 	 	 B r a w l   S t a r s :   " Y o u r   A P I   t o k e n " 
 	 } 
 } ) 
 ` ` ` 
 
 G e t   y o u r   A P I   t o k e n s   f o r   e a c h   g a m e   o n   t h e   f o l l o w i n g   s i t e s . 
 
 >   -   [ C l a s h   o f   C l a n s ] ( h t t p s : / / d e v e l o p e r . c l a s h o f c l a n s . c o m / # / ) 
 >   -   [ C l a s h   R o y a l e ] ( h t t p s : / / d e v e l o p e r . c l a s h r o y a l e . c o m / # / ) 
 >   -   [ B r a w l   S t a r s ] ( h t t p s : / / d e v e l o p e r . b r a w l s t a r s . c o m / # / ) 
 
 # #   M e t h o d s 
 
 # # #   P l a y e r 
 
 T h e s e   a r e   m e t h o d s   a l l   t o   d o   w i t h   p l a y e r s . 
 
 # # # #   f i n d P l a y e r 
 
 ` ` ` j s 
 i m p o r t   {   P l a y e r   }   f r o m   " s u p e r c e l l - a p i - s c r a p e r " ; 
 
 a w a i t   P l a y e r . f i n d P l a y e r ( " # Y 9 9 C C L C 0 R " ) ; 
 ` ` ` 
 
 T h i s   w i l l   r e t u r n   a n   a r r a y   w i t h   a l l   t h e   p l a y e r   o b j e c t s   w i t h   t h e   s a m e   t a g .   I n   t h i s   o b j e c t   y o u   c a n   f i n d   t h e   f o l l o w i n g : 
 
 ` ` ` j s o n 
 [ 
 	 { 
 	 	 " n a m e " :   " T h e D u m m i " , 
 	 	 " t a g " :   " # Y 9 9 C C L C 0 R " , 
 	 	 " g a m e " :   " C l a s h O f C l a n s " , 
 	 	 " f o r m a t t e d G a m e " :   " C l a s h   o f   C l a n s " 
 	 } 
 ] 
 ` ` ` 
 
 # # # #   f e t c h C h i e f 
 
 ` ` ` j s 
 i m p o r t   {   P l a y e r   }   f r o m   " s u p e r c e l l - a p i - s c r a p e r " ; 
 
 a w a i t   P l a y e r . f e t c h C h i e f ( " # Y 9 9 C C L C 0 R " ) ; 
 ` ` ` 
 
 T h i s   w i l l   r e t u r n   a n   o b j e c t   w i t h   e v e r y t h i n g   t h e   C l a s h   o f   C l a n s   A P I   p r o v i d e s .   B e f o r e   g i v i n g   y o u   t h e   d a t a   I   h a v e   m a d e   s o m e   m o d i f i c a t i o n s   t o   t h e   d a t a   a n d   c a t e g o r i z e d   i t   m o r e . 
 
 # # # #   f e t c h K i n g 
 
 ` ` ` j s 
 i m p o r t   {   P l a y e r   }   f r o m   " s u p e r c e l l - a p i - s c r a p e r " ; 
 
 a w a i t   P l a y e r . f e t c h K i n g ( " # 2 U L Y 0 C U P Y " ) ; 
 ` ` ` 
 
 T h i s   w i l l   r e t u r n   a n   o b j e c t   w i t h   e v e r y t h i n g   t h e   C l a s h   R o y a l e   A P I   p r o v i d e s . 
 
 # # # #   f e t c h B r a w l e r 
 
 T h i s   w i l l   r e t u r n   a n   o b j e c t   w i t h   e v e r y t h i n g   t h e   B r a w l   S t a r s   A P I   p r o v i d e s . 
 
 ` ` ` j s 
 i m p o r t   {   P l a y e r   }   f r o m   " s u p e r c e l l - a p i - s c r a p e r " ; 
 
 a w a i t   P l a y e r . f e t c h B r a w l e r ( " # Q Y G G 9 L L " ) ; 
 ` ` ` 
 
 # #   N o t e s 
 
 -   c o m p a t i b l e   w i t h   t y p e s c r i p t   a n d   j a v a s c r i p t 
 -   r e q u i r e s   e s m 
 
