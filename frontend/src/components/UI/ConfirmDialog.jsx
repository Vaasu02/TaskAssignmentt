import { createPortal } from 'react-dom';
import Button from './Button';
import Card from './Card';
import { AlertTriangle } from 'lucide-react';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <Card className="max-w-sm w-full bg-white animate-in zoom-in-95 duration-200">
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="p-3 bg-red-100 rounded-full border-2 border-black">
                        <AlertTriangle size={32} className="text-red-500" />
                    </div>

                    <div>
                        <h3 className="text-2xl font-black uppercase mb-2">{title}</h3>
                        <p className="font-medium text-gray-600">{message}</p>
                    </div>

                    <div className="flex gap-4 w-full mt-4">
                        <Button
                            variant="neutral"
                            onClick={onClose}
                            className="flex-1"
                        >
                            CANCEL
                        </Button>
                        <Button
                            variant="danger"
                            onClick={onConfirm}
                            className="flex-1"
                        >
                            DELETE
                        </Button>
                    </div>
                </div>
            </Card>
        </div>,
        document.body
    );
};

export default ConfirmDialog;
