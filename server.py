#! /usr/bin/env python3
from websocket_server import WebsocketServer

def new_client(client, server):
    server.send_message_to_all("Hey all, a new client has joined us")

def send_msg_allclient(client, server,message):
    server.send_message_to_all(message)

server = WebsocketServer(8080, host='192.168.3.6')
server.set_fn_new_client(new_client)
server.set_fn_message_received(send_msg_allclient)
server.run_forever()
