import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export const WelcomePage = function() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        {/* Slack Logo & Title */}
        <div className="flex flex-col items-center">
          <img src="src\assets\slacklogo.svg" alt="Slack Logo" className="w-20 h-20 mb-3" />
          <h1 className="text-4xl font-bold text-white">Welcome to Slack Clone</h1>
        </div>
        
        {/* Description */}
        <p className="text-lg text-gray-300 max-w-md mx-auto">
          Connect, collaborate, and chat in real time with your team. Sign up to get started!
        </p>
      </motion.div>

      {/* Sign Up Button */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-6 flex space-x-4"
      >
        <Link to="/auth/signup">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg text-lg">
            Sign Up
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};
