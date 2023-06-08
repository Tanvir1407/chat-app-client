import { useEffect, useState } from "react";
import isEmailValied from "../../pages/utilitis/isEmailValied";
import { useGetUsersQuery } from "../../features/users/UserApi";
import Error from "../ui/Error";
import { useDispatch, useSelector } from "react-redux";
import { ConversationsApi } from "../../features/Conversations/ConversationsApi";

// eslint-disable-next-line react/prop-types
export default function Modal({ open, control }) {
  const [to, setTo] = useState('');
  const [message, setMessage] = useState('');
  const [check, setCheck] = useState(false);
  const [conversation , setConversation] = useState(undefined)
  
  const { user: LoggedInUser } = useSelector(state => state.auth) || {};
  const { email:myEmail } = LoggedInUser || {};

  const dispatch = useDispatch();
  const {data:participant, isLoading, error  } = useGetUsersQuery(to, {
    skip: !check
  })

  useEffect(() => {
    if (participant?.length > 0 && participant[0].email !== myEmail) {
      dispatch(
        ConversationsApi.endpoints.getConversation.initiate({
          userEmail: myEmail,
          participantEmail: to,
        })
      ).unwrap().then(data => {
        setConversation(data)
      }).catch()
      //conversations existance  
    }
  },[participant,dispatch,myEmail,to])

  const debounceHandler = (fn, delay) => {
    let timeoutId;
    return function (e) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        fn(e)
      }, delay)
    }
  }
  const doSearch = (e) => {
    if (isEmailValied(e.target.value)) {
      setTo(e.target.value)
      setCheck(true)
    }
  }

  const handleSearch = debounceHandler(doSearch, 1000)

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    open && (
      <>
        <div
          onClick={control}
          className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
        ></div>
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Send message
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="to" className="sr-only">
                  To
                </label>
                <input
                  id="to"
                  name="to"
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Send to"
                  onChange={handleSearch}
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  type="message"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Message"
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 disabled:bg-slate-500 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                disabled={
                  conversation === undefined ||
                  (participant?.length > 0 && participant[0].email === myEmail)
                }
              >
                Send Message
              </button>
            </div>

            {participant?.length === 0 && (
              <Error message="This user does not exist" />
            )}
            {participant?.length > 0 && participant[0].email === myEmail && (
              <Error message="You can not send message to yourself" />
            )}
          </form>
        </div>
      </>
    )
  );
}
