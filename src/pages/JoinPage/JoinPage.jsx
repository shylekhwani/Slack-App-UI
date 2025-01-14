import { Link, useParams } from "react-router-dom";
import VerificationInput from "react-verification-input";

import { Button } from "@/components/ui/button";

export const JoinPage = function () {
    const { workspaceId } = useParams();

    async function handelAddMemberToWorkspace() {
        console.log('Adding Member To Workspace');
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
                {/* Heading Section */}
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Join Workspace
                    </h1>
                    <p className="text-gray-600">
                        Enter the code you received to join the workspace.
                    </p>
                </div>

                {/* Verification Input */}
                <div className="flex justify-center">
                    <VerificationInput
                        onComplete={handelAddMemberToWorkspace}
                        length={6}
                        classNames={{
                            container: 'flex space-x-2',
                            character:
                                'w-10 h-12 text-center border border-gray-300 rounded-md text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                            characterInactive: 'text-gray-400',
                            characterFilled: 'bg-gray-100 text-gray-800',
                            characterSelected: 'ring-2 ring-blue-500',
                        }}
                        autoFocus
                    />
                </div>

                {/* Back Button */}
                <div className="flex justify-center">
                    <Button size="lg" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">
                        <Link to={`/workspaces/${workspaceId}`} className="text-white">
                            Back To Workspace
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};
