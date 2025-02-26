import { Dialog, DialogClose,DialogContent, DialogTrigger } from '@/components/ui/dialog';

export const MessageImageThumbnail = ({ url }) => {
    return (
        <Dialog>
            <DialogTrigger>
                <div className='relative overflow-hidden cursor-zoom-in border rounded-lg max-w-[200px] max-h-[200px]'>
                    <img 
                        src={url} 
                        className='rounded-md object-cover w-full h-full' 
                    />
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-[90vw] max-h-[90vh] border-none bg-transparent p-0 shadow-none flex justify-center items-center">
                <div className="relative">
                    <img 
                        src={url}
                        className='rounded-md object-contain max-w-full max-h-[80vh]'
                    />
                    <DialogClose asChild>
                        <button 
                            className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2"
                            aria-label="Close"
                        >
                            ✕
                        </button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
};
