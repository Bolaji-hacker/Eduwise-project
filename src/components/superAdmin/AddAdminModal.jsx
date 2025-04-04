import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import AddAdminForm from './AddAdminForm'
import { FaTimes } from 'react-icons/fa'

export default function AddAdminModal() {
    let [isOpen, setIsOpen] = useState(false)

    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }

    return (
        <>
            <Button
                onClick={open}
                className="rounded-md bg-white/20 py-2 px-4 text-sm font-medium text-black focus:outline-none data-[hover]:bg-white/30 data-[focus]:outline-1 data-[focus]:outline-white"
            >
                Create admin
            </Button>


            <Dialog open={isOpen} as="div" className="relative z-[1000] focus:outline-none" onClose={close}>
                <DialogBackdrop className="fixed inset-0 bg-black/80" />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-white  backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 text-black "
                        >

                            <DialogTitle as="h3" className="text-base/7 font-medium border-b p-4">
                                <div className="flex justify-between items-center">
                                    <h1>Create Admin</h1>

                                    <button onClick={close} >
                                        <FaTimes />
                                    </button>
                                </div>
                            </DialogTitle>

                            {/* form section */}
                            <div className="p-4 pb-6">

                                <AddAdminForm close={close} />
                            </div>

                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
