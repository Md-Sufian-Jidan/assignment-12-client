import PropTypes from 'prop-types'
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle, } from '@headlessui/react'
import { Fragment } from 'react'
import { PiSpinnerBold } from 'react-icons/pi';

const DownloadUser = ({ closeModal, isOpen, bookingInfo }) => {
    console.log(bookingInfo);
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='div' className='relative z-10' onClose={closeModal}>
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
                            <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                <DialogTitle
                                    as='h3'
                                    className='text-lg font-medium text-center leading-6 text-gray-900'
                                >
                                    Review Info Before Booked
                                </DialogTitle>
                                <div className='mt-2'>
                                    <p className='text-sm text-gray-500'>
                                        Test Name :
                                    </p>
                                </div>
                                <div className='mt-2'>
                                    <p className='text-sm text-gray-500'>
                                        Test Category :
                                    </p>
                                </div>
                                <div className='mt-2'>
                                    <p className='text-sm text-gray-500'>
                                        Price: $
                                    </p>
                                </div>
                                <hr className='mt-8 ' />
                                <div className='flex mt-2 justify-around'>
                                    <button
                                        type="submit"
                                        className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
                                    // onClick={closeModal}
                                    >
                                        <PiSpinnerBold className="animate-spin m-auto" size={24} /> :
                                        (`Download`)
                                    </button>
                                    <button
                                        onClick={() => {
                                            // handleDelete(id);
                                            closeModal();
                                        }}
                                        type='button'
                                        className='inline-flex justify-center rounded-md border border-transparent bg-red-400/40 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                                    >
                                        Cancel
                                    </button>
                                </div>

                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

DownloadUser.propTypes = {
    bookingInfo: PropTypes.object,
    closeModal: PropTypes.func,
    isOpen: PropTypes.bool,
    refetch: PropTypes.func,
    disable: PropTypes.bool,
    // closeModal: PropTypes.func,
}

export default DownloadUser