// The function takes multiple context providers as arguments (...providers) and combines them.
export const combineContext = function(...providers) { 

    // Returns a new component that wraps children with all the provided context providers.
    return function({children}) {

     return providers.reduceRight((accumulator, CurrentProvider) => {
        return <CurrentProvider>{accumulator}</CurrentProvider>;
      }, children /* Initial Value */ );

    };
};

/*
 
 * Detailed Explanation of combineContext :
        The combineContext function is a utility that combines multiple context providers into a single wrapper component. 
        This is useful when you have multiple contexts (like AuthContext, ThemeContext, etc.)
        and you want to avoid deeply nesting them in your app.

 */

/** ------ Without Combined Context ----------
 
 * <ThemeProvider>
    <AuthProvider>
     <ToastProvider>
       <Children /> (In our case Routes)
    </ToastProvider>
   </AuthProvider>
  </ThemeProvider>
  
 */


/** ------- With Combine Context --------
 * 
 * <CombinedComponent>
 *    <Children />
 * <CombinedComponent>
 */