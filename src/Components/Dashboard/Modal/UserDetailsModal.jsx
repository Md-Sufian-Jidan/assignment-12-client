import PropTypes from 'prop-types'
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle, } from '@headlessui/react'
import { Fragment, useState } from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const UserDetailsModal = ({ closeModal, isOpen, bookingInfo, refetch }) => {
    console.log(bookingInfo);
    const [isLoading, setIsLoading] = useState(false);

    const download = () => {
        console.log('download');
        const capture = document.querySelector('#download-pdf');
        setIsLoading(true);
        html2canvas(capture)
            .then((canvas) => {
                const imageData = canvas.toDataURL("img/png");
                const doc = new jsPDF("p", "mm", "a4");
                const width = doc.internal.pageSize.getWidth();
                const hight = doc.internal.pageSize.getHeight();
                doc.addImage(imageData, 'png', 0, 0, width, hight);
                setIsLoading(false);
                doc.save('report.pdf');
            })

    }

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
                    <div id='download-pdf' className='flex min-h-full items-center justify-center p-4 text-center'>
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
                                    Review Info Before Reserve
                                </DialogTitle>
                                <div className='mt-2'>
                                    <p className='text-sm text-gray-500'>
                                        User Name : {bookingInfo.name}
                                    </p>
                                </div>
                                <div className='mt-2'>
                                    <p className='text-sm text-gray-500'>
                                        User Email : {bookingInfo.email}
                                    </p>
                                </div>
                                {/* <div className='mt-2'>
                                    <p className='text-sm text-gray-500'>
                                        : {bookingInfo.price}
                                    </p>
                                </div> */}

                                <div className='mt-2'>
                                    <p className='text-sm text-gray-500'>
                                        Blood Group : {bookingInfo.bloodGroup}
                                    </p>
                                </div>
                                <div className='mt-2'>
                                    <p className='text-sm text-gray-500'>
                                        District : {bookingInfo.districts}
                                    </p>
                                </div>
                                <div className='mt-2'>
                                    <p className='text-sm text-gray-500'>
                                        Upozila : {bookingInfo.upozilas}
                                    </p>
                                </div>
                                <hr className='mt-8 ' />
                                {/* user download  */}
                                <div className='flex mt-2 justify-around'>
                                    <button
                                        type="submit"
                                        disabled={!(isLoading === false)}
                                        className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
                                        onClick={() => download()}
                                    >
                                        {
                                            isLoading ? 'Downloading...' : `Download`
                                        }
                                    </button>
                                    <button
                                        onClick={() => {
                                            refetch();
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

UserDetailsModal.propTypes = {
    bookingInfo: PropTypes.object,
    closeModal: PropTypes.func,
    isOpen: PropTypes.bool,
    refetch: PropTypes.func,
    isLoading: PropTypes.bool,
    setDisable: PropTypes.func,
}

export default UserDetailsModal