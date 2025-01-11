import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCreateChannelModal } from "@/hooks/context/useCreateChannel";

export const CreateChannelModal = function () {
    
    const { openCreateChannelModal, setOpenCreateChannelModal } = useCreateChannelModal();

    const [channelName, setChannelName] = useState();

    function handelClose() {
        setOpenCreateChannelModal(false);
    }

    function handelFormSubmit(e) {
        e.preventDefault(); // Prevent page reload
    };

    return (
        <Dialog open={openCreateChannelModal} onOpenChange={handelClose}>
        <DialogContent className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-xl font-semibold text-gray-800">
                Create a Channel
            </DialogTitle>
            </DialogHeader>

            <form onSubmit={handelFormSubmit} className="mt-6 space-y-4">
            {/* Input Field */}
            <Input
                className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                minLength={3}
                placeholder="Channel Name"
                required
            />

            {/* Button */}
            <div className="flex justify-end">
                <Button
                type="submit"
                className="bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                >
                Create Channel
                </Button>
            </div>
            </form>
        </DialogContent>
        </Dialog>
    );
};
