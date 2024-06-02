import PropTypes from 'prop-types'
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle, } from '@headlessui/react'
import { Fragment, useState } from 'react'

// payment gateway implement
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from '../Form/CheckOutFrom';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_GATEWAY);

const BookingModal = ({ closeModal, isOpen, bookingInfo, refetch, disable, setDisable }) => {
    const [discount, setDiscount] = useState('');
    const [afterDiscount, setAfterDiscount] = useState(0);

    const handleDiscount = () => {
        console.log(typeof discount);
        if (discount === 'SUMMER20') {
            const discountPrice = bookingInfo?.price * .20;
            const totalPrice = bookingInfo?.price - discountPrice;
            console.log(totalPrice);
            setAfterDiscount(totalPrice);
            setDisable(true);
        }
        if (discount === 'WINTER15') {
            const discountPrice = bookingInfo?.price * .15;
            const totalPrice = bookingInfo?.price - discountPrice;
            console.log(totalPrice);
            setAfterDiscount(totalPrice);
            setDisable(true);
        }
        if (discount === 'NEWYEAR10') {
            const discountPrice = bookingInfo?.price * .10;
            const totalPrice = bookingInfo?.price - discountPrice;
            console.log(totalPrice);
            setAfterDiscount(totalPrice);
            setDisable(true);
        }
    }
    // console.log(bookingInfo);
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
                                    Review Info Before Reserve
                                </DialogTitle>
                                <div className='mt-2'>
                                    <p className='text-sm text-gray-500'>
                                        Test Name : {bookingInfo.name}
                                    </p>
                                </div>
                                <div className='mt-2'>
                                    <p className='text-sm text-gray-500'>
                                        Test Category : {bookingInfo.testCategory}
                                    </p>
                                </div>
                                {/* <div className='mt-2'>
                                    <p className='text-sm text-gray-500'>
                                        : {bookingInfo.price}
                                    </p>
                                </div> */}

                                <div className='mt-2'>
                                    <p className='text-sm text-gray-500'>
                                        Price: $ {bookingInfo.price}
                                    </p>
                                </div>
                                <div className='mt-2'>
                                    <label className="text-xl font-medium" htmlFor="username">Discount</label>
                                    {/* <input id="username" type="text" className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-violet-00/70 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-slate-400 focus:outline-none focus:ring" />
                                        <button className='btn'>Discount</button> */}
                                    <label className="input input-bordered flex items-center gap-2">
                                        <input name='discount' type="text" className="grow" placeholder="Search" onBlur={(e) => setDiscount(e.target.value)} />
                                        <button disabled={disable} onClick={() => handleDiscount()} className="btn bg-gradient-to-br from-pink-400 to-gray-400 text-white">Get Discount</button>
                                    </label>
                                    {/* {...register("name", { required: true })} */}
                                    {/* {errors.name && <span className="text-red-500">Test Name is required</span>} */}
                                </div>

                                <div className='mt-2'>
                                    <p className='text-sm text-gray-500'>
                                        After Discount: $ {afterDiscount}
                                    </p>
                                </div>
                                <hr className='mt-8 ' />
                                {/* checkout form */}
                                <Elements stripe={stripePromise}>
                                    <CheckOutForm closeModal={closeModal} bookingInfo={bookingInfo} refetch={refetch}  afterDiscount={afterDiscount} setAfterDiscount={setAfterDiscount} />
                                </Elements>
                                {/* checkout form end */}

                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

BookingModal.propTypes = {
    bookingInfo: PropTypes.object,
    closeModal: PropTypes.func,
    isOpen: PropTypes.bool,
    refetch: PropTypes.func,
    disable: PropTypes.bool,
    setDisable: PropTypes.func,
}

export default BookingModal