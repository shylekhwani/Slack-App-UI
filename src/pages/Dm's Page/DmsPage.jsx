import { ChatInput } from "../../components/molecules/ChatInput/ChatInput";

export const DmsPage = function() {
    return (
        <div className="flex flex-col h-screen bg-gray-50">
                {/* Channel Header */}
                <div className="flex-none p-4 border-b border-gray-200 bg-white">
                    <h1>Welcome To Private Chat</h1>
                </div>

                {/* Messages Content */}
                <div  className="flex-1 overflow-y-auto p-4 space-y-4">
                    
                </div>

                {/* Chat Input Section */}
                <div className="flex-none p-4 border-t border-gray-200 bg-white">
                    <ChatInput />
                </div>
            </div>
    );
};