import PropTypes from 'prop-types'
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle, } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form';
import { ImSpinner5 } from 'react-icons/im';

const UpdateUserProfile = ({ closeModal, isOpen, bookingInfo }) => {
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        setLoading(true);
        console.log(data);
    }
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
                                    Check The Infos Before Update
                                </DialogTitle>

                                <form onSubmit={handleSubmit(onSubmit)} className="bg-orange-400/40 px-16 py-5 rounded-xl space-y-2">
                                    {/* test name && test price*/}
                                    <div>
                                        <label className="text-xl font-medium" htmlFor="username">User Name</label>
                                        <input id="username" type="text" className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-violet-00/70 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-slate-400 focus:outline-none focus:ring"
                                            {...register("name", { required: true })} />
                                        {errors.name && <span className="text-red-500">User Name is required</span>}
                                    </div>
                                    <div>
                                        <label className="text-xl font-medium" htmlFor="username">User Email</label>
                                        <input id="username" type="text" className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-violet-00/70 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-slate-400 focus:outline-none focus:ring"
                                            {...register("email", { required: true })} />
                                        {errors.price && <span className="text-red-500">User Email is required</span>}
                                    </div>
                                    {/* Test category && test image */}
                                    <div>
                                        <label htmlFor='image' className='text-xl font-medium'>
                                            Select Image:
                                        </label>
                                        <input
                                            className="block w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-slate-300 focus:outline-none focus:ring"
                                            required
                                            type='file'
                                            id='image'
                                            name='image'
                                            accept='image/*'
                                            {...register("photo", { required: true })}
                                        />
                                        {errors.photo && <span className="text-red-600">Photo is required</span>}
                                    </div>
                                    {/* test description */}
                                    <div>
                                        <label className="text-xl font-medium" htmlFor="username">Test Price</label>
                                        <textarea rows={5} id="username" type="text" className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-violet-00/70 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-slate-400 focus:outline-none focus:ring"
                                            {...register("testDescription", { required: true })}></textarea>
                                        {errors.testDescription && <span className="text-red-500">Test Description is required</span>}
                                    </div>

                                    <div className="flex justify-center mt-6">
                                        {loading ? <button className="w-full px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-lime-700/60 rounded-md hover:bg-sky-500 focus:outline-none focus:bg-sky-600 flex justify-center items-center">
                                            <ImSpinner5 className=" animate-spin" size={20} />
                                        </button> :
                                            <button className="w-full px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-lime-700/60 rounded-md hover:bg-sky-500 focus:outline-none focus:bg-sky-600">Update User</button>}
                                    </div>
                                </form>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

UpdateUserProfile.propTypes = {
    bookingInfo: PropTypes.object,
    closeModal: PropTypes.func,
    isOpen: PropTypes.bool,
    refetch: PropTypes.func,
    disable: PropTypes.bool,
    setDisable: PropTypes.func,
}

export default UpdateUserProfile