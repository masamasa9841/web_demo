#!/usr/bin/env python3
# -*- coding: EUC-JP -*-
import os
import time
from websocket import create_connection
def times(x):
    start = time.time()
    elpased_time = 0
    while elpased_time < x:
        os.system('echo 1 > /dev/myled0')
        time.sleep(0.5)
        os.system('echo 0 > /dev/myled0')
        time.sleep(0.5)
        elpased_time = time.time() - start
    os.system('echo 0 > /dev/myled0')

ws = create_connection("ws://192.168.3.6:8080/")

while True:
    result =  ws.recv()
    print (result)
    if result.isdigit():
        times(int(result))
    if result == "on" or result == "Japanese":
        os.system('echo 1 > /dev/myled0')
    if result == "off" or result == "English":
        os.system('echo 0 > /dev/myled0')

ws.close()
