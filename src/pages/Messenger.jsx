import { message } from 'antd'
import React from 'react'

const Messenger = () => {



    function ChatList () {
        return (
            <div className="flex flex-col w-1/4 h-screen p-2 gap-1 bg-gray-500 dark:bg-gray-900 overflow-scroll">
                
                <ChatSearch />
                <ChatPerson />
                <ChatPerson />
                <ChatPerson />
            </div>
        )
    }

    function ChatSearch () {
        return (
            <div className="flex flex-row w-full h-12 py-2 bg-gray-500 dark:bg-gray-900">
                <input className="w-full h-full p-4 bg-gray-400 dark:bg-gray-700 rounded-lg text-white" placeholder="Search" />
            </div>
        )
    }

    function ChatPerson () {
        return (
            <div className="flex flex-col w-full gap-3 h-18 p-3 dark:bg-gray-700 bg-gray-400 hover:bg-gray-600 dark:hover:bg-gray-600 cursor-pointer dark:cursor-pointer rounded-xl">
                <div className="flex flex-row w-full  h-full">
                    <div className="flex flex-row justify-center gap-3 items-center w-full ">
                        <img className="w-14 h-14 rounded-full" src="https://picsum.photos/200" alt="profile" />
                        <div className="hidden flex-col w-full h-full  sm:flex md:flex xl:flex">
                                <h1 className="text-lg font-bold dark:text-gray-200">Ahmed</h1>
                                <div className="flex flex-row w-full justify-between ">
                                <p className="text-sm dark:text-gray-300 text-gray-900">Hi Ozama</p>
                                <p className="text-sm dark:text-gray-300">1 hour ago</p>
                        </div>
                    </div>

                    </div>
                    
                </div>
            </div>
        )
    }


    function Chat () {
        return (
            <div className="flex flex-col w-3/4 h-screen bg-gray-300 dark:bg-gray-800">
                <ChatHeader />
                <ChatBody />
                <ChatFooter />
            </div>
        
        )
    }

    function ChatHeader () {
        return (
            <div className="flex flex-row w-full h-16 bg-gray-400 dark:bg-gray-700">
                <div className="flex flex-row w-full h-full items-center px-4 gap-3">
                    <img className="w-12 h-12 rounded-full" src="https://picsum.photos/200" alt="profile" />
                    <div className="flex flex-col w-full h-full ">
                        <h1 className="text-lg font-bold dark:text-gray-300">Ahmed</h1>
                        <p className="text-sm text-green-400">Active now</p>
                    </div>
                </div>
            </div>
        )
    }

    function ChatBody () {
        return (
            <div className="flex flex-col  w-full h-[70%] bg-gray-300 dark:bg-gray-800 overflow-scroll">
                <div className="flex flex-col w-full h-full p-3 gap-3 ">
                    <ChatSender />
                    <ChatSender />
                    
                    <div className="flex flex-row  w-full h-full justify-end">
                        <ChatReciever />
                    </div>
                    <ChatSender />
                    <ChatSender />
                    <div className="flex flex-row w-full gap-4 h-full justify-end">
                        <ChatReciever />
                    </div>
                    <ChatSender />
                    <ChatSender />
                    <div className="flex flex-row w-full h-full justify-end">
                        <ChatReciever />
                    </div>
                    
                </div>
            </div>
        )
    }

    function ChatSender () {
        return (
            <div className="flex flex-row float-right m-4  h-16 max-w-lg rounded-xl">
                <div className="flex flex-row w-full h-full items-center gap-3">
                    <div className="flex flex-col bg-gray-400 dark:bg-gray-500 rounded-lg justify-center p-2">
                        <p className="text-sm text-white dark:text-gray-200">Hi Ozama, How are you?, This is a test text for how the chat will look like, I hope you like it. This is a test text for how the chat will look like, I hope you like it. This text is for testing the chat.</p>
                    </div>
                </div>
                
            </div>
        )
    }

    function ChatReciever () {
        return (
            
                <div className="flex flex-col-reverse items-center w-fit p-2 h-fit max-w-lg bg-blue-500 dark:bg-blue-500 rounded-xl m-4">
                <div className="flex flex-row w-full h-full items-center justify-end">
                    <div className="flex flex-col ">
                        <p className="text-md text-gray-100">
                            Hi Ahmed, How are you?, This is a test text for how the chat will look like, I hope you like it.
                            This is a test text for how the chat will look like, I hope you like it. This text is for testing the chat.
                            
                        </p>
                    </div>
                </div>
                </div>
            
        )
    }

    function ChatSenderImg  () {
        return (
            <div className="flex flex-row float-right m-4  h-16 rounded-xl">
                <div className="flex flex-row w-full h-full items-center gap-3">
                    <div className="flex flex-col bg-gray-400 dark:bg-gray-500 rounded-lg justify-center p-2">
                        <img className="w-32 h-32 rounded-xl" src="https://picsum.photos/200" alt="profile" />
                    </div>
                </div>
            </div>
            
        )
    }
    

    function ChatFooter () {
        return (
            <div className=" flex-row w-full ">
                <div className="flex  flex-row mt-3 w-full items-center gap-3 px-4">
                    <input className="flex flex-row w-full h-12 bg-gray-400 dark:bg-gray-700 p-2 rounded-lg text-white" placeholder="Type a message" />
                    

                    

                    <label className="flex flex-row w-12 h-12 bg-gray-400 dark:bg-gray-700 rounded-lg text-white cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 m-auto">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                    </svg>
                    <input type="file" className="hidden" onChange={(e) => message.success(e.target.files)} />
                    </label>

                    <button className="flex flex-row w-12 h-12 bg-gray-400 dark:bg-gray-700 rounded-lg text-white" onClick={() => message.success('Message sent')}>
                        
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        <input type='file' className='hidden'  />
                    </button>
                    
                </div>
            </div>
        )
    }
    

    return (
        <>
            <div className=" flex flex-row bg-gray-600">
                <ChatList />
                <Chat />
                
            </div>
                
        </>
    )
}

export default Messenger