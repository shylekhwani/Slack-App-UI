import { Button } from "@/components/ui/button";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
 } from "@/components/ui/tooltip";

export const ToolTip = function({ align, side, label, children }) {
   return (
      <TooltipProvider>
        <Tooltip delayDuration={20}>
         
          <TooltipTrigger asChild>
            <Button variant="outline">{children}</Button>
          </TooltipTrigger>

          <TooltipContent 
              side={side} 
              align={align} 
              className="bg-gray-800 text-white p-2 rounded-md shadow-lg text-sm"
          >
            <p>{label}</p>
          </TooltipContent>

        </Tooltip>
      </TooltipProvider>
   );
};
