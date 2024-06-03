import PropTypes from 'prop-types'
import { Fragment } from 'react'
import { Dialog, Transition, TransitionChild, DialogTitle, DialogPanel, } from '@headlessui/react'
// import { BsCheckLg } from 'react-icons/bs'
// import { AiOutlineDown } from 'react-icons/ai'
// const roles = ['guest', 'host', 'admin']

const UpdateUserRoleModal = ({ setIsOpen, isOpen, handleRole, user }) => {
    console.log(user);
    // const [selected, setSelected] = useState(user.role);
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as='div'
                className='relative z-10'
                onClose={() => setIsOpen(false)}
            >
                <TransitionChild
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black bg-opacity-25' />
                </TransitionChild>

                <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center'>
                        <TransitionChild
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >
                            <DialogPanel className='w-full h-56 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                <DialogTitle
                                    as='h3'
                                    className='text-lg font-medium text-center leading-6 text-gray-900'
                                >
                                    Update User Role
                                </DialogTitle>
                                <div className='mt-4 w-full flex justify-evenly'>
                                    <button onClick={() => handleRole('admin')} className='btn bg-gradient-to-bl from-green-500 to-green-700 btn-outline text-white'>admin</button>
                                    <button onClick={() => handleRole('guest')} className='btn bg-gradient-to-tr from-violet-300 to-violet-500 btn-outline'>guest</button>
                                </div>
                                {/* <hr className='mt-16 ' /> */}

                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

UpdateUserRoleModal.propTypes = {
    user: PropTypes.object,
    handleRole: PropTypes.func,
    setIsOpen: PropTypes.func,
    isOpen: PropTypes.bool,
}

export default UpdateUserRoleModal;