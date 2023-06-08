import { useDispatch, useSelector } from "react-redux";
import { useGetConversationsQuery } from "../../features/Conversations/ConversationsApi";
import ChatItem from "./ChatItem";
import Error from "../ui/Error";
import getPartnerInfo from "../../pages/utilitis/getPartnerInfo";
import gravatarUrl from 'gravatar-url';
import moment from 'moment'
import { Link } from "react-router-dom";
import { userLoggedOut } from "../../features/auth/authSlice";

export default function ChatItems() {
  const dispatch = useDispatch();
  const email = useSelector((state) => state?.auth?.user?.email) || {};
  const {
    data: conversations,
    isLoading,
    isError,
    error,
  } = useGetConversationsQuery(email);

  if (error?.data === "jwt expired") {
    dispatch(userLoggedOut());
  }
  let content = null;

  if (isLoading) {
    content = <li className="m-2">Loading...</li>;
  } else if (!isLoading && isError) {
    content = (
      <li>
        <Error message={error?.data}></Error>
      </li>
    );
  } else if (!isLoading && !isError && conversations?.length === 0) {
    content = <li>No Conversations found!</li>;
  } else if (!isLoading && !isError && conversations?.length > 0) {
    content = conversations.map((conversation) => {
      const { id, message, timestamp } = conversation;
      const partner = getPartnerInfo(conversation.users, email)
      return (
        <li key={id}>
          <Link to={`/inbox/${id}`}>
            <ChatItem
              avatar={gravatarUrl(partner?.email)}
              name={partner.name}
              lastMessage={message}
              lastTime={moment(timestamp).fromNow()}
            />
          </Link>
        </li>
      );
    });
  }

  return <ul>{content}</ul>;
}
