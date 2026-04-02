import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { websocketUrl } from "../utils/runtimeConfig";

export function useQueueSocket(queueId, tokenId, userId) {
  const [queueUpdate, setQueueUpdate] = useState(null);
  const [tokenUpdate, setTokenUpdate] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(websocketUrl),
      reconnectDelay: 5000
    });

    client.onConnect = () => {
      if (queueId) client.subscribe(`/topic/queues/${queueId}`, (message) => setQueueUpdate(JSON.parse(message.body)));
      if (tokenId) client.subscribe(`/topic/tokens/${tokenId}`, (message) => setTokenUpdate(JSON.parse(message.body)));
      if (userId) client.subscribe(`/topic/notifications/${userId}`, (message) => setNotification(JSON.parse(message.body)));
    };

    client.activate();
    return () => client.deactivate();
  }, [queueId, tokenId, userId]);

  return { queueUpdate, tokenUpdate, notification };
}
