<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                    <span className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                                        <span
                                            aria-hidden='true'
                                            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                                        ></span>
                                        <button onClick={() => setUpdateRole(true)} className='relative'>Update Role</button>
                                    </span>
                                    {/* Update User Modal */}
                                    <UpdateUserRoleModal isOpen={updateRole} setIsOpen={setUpdateRole} handleRole={handleRole} user={test} closeModal={closeModal} />
                                </td>