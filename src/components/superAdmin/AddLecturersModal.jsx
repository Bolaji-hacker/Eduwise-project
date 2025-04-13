import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { registerUser } from '../../lib/services'
import toast from 'react-hot-toast'
import CustomInput from '../common/CustomInput'
import CustomButton from '../common/CustomButton'
import { useGlobalContext } from '../../context/ContextExport'

export default function AddLecturersModal() {
    const { getUsersFunc } = useGlobalContext()
    let [isOpen, setIsOpen] = useState(false)

    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    // const [role, setRole] = useState("user")
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)




    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true)

        let payload = {
            fullName: name,
            email: email,
            password: password,
            role: "lecturer"
            // interests: interests,
        };
        try {
            const response = await registerUser(payload);
            // console.log("Login Successful:", response);
            toast.success(response?.message);
            getUsersFunc()
            close()
        } catch (error) {
            toast.error(error?.response?.data?.error);
            console.error(error);
        } finally {
            setLoading(false)
        }
    };

    return (
        <>
            <Button
                onClick={open}
                className="rounded-md bg-white/20 py-2 px-4 text-sm font-medium text-black focus:outline-none data-[hover]:bg-white/30 data-[focus]:outline-1 data-[focus]:outline-white"
            >
                Create lecturer
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

                                <form onSubmit={handleSignIn}>
                                    <div className="space-y-4">
                                        <div>
                                            <CustomInput
                                                label={" Full Name"}
                                                id="name"
                                                name="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                type="text"
                                                required
                                                placeholder={"Enter your Full Name"}
                                                autoComplete="name"
                                            />
                                        </div>{" "}
                                        <div>
                                            <CustomInput
                                                label={" Email address"}
                                                placeholder={"Enter your email"}
                                                id="email"
                                                name="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                type="email"
                                                required
                                                autoComplete="email"
                                            />
                                        </div>
                                        <div>
                                            <CustomInput
                                                label={"Password"}
                                                id="password"
                                                name="password"
                                                type={"password"}
                                                required
                                                placeholder={"Enter your password"}
                                                autoComplete="current-password"
                                                // className="input"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-5">
                                        <CustomButton type="submit" style="btn btn_primary"
                                            showAnimation={loading}
                                        >
                                            Create Lecturer
                                        </CustomButton>
                                    </div>

                                </form>
                            </div>

                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
