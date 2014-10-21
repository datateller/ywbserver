# -*- coding: UTF-8 -*-
import sys
from urllib import *
import requests, json
def get_baidu_address(latitude, longitude, detail = True):
    from io import BytesIO
    ak = 'GLbmnUGjCe4B62dqW6l695fL'
    url = 'http://api.map.baidu.com/geocoder/v2/?ak=%s&callback=renderReverse&location=%s,%s&output=json&pois=1'%(ak, latitude, longitude)
    r = requests.get(url)
    addr = json.loads((r.text[29:-1]))
    if detail:
        return addr['result']['formatted_address']
    else:
        return addr['result']['addressComponent']['city']


def get_baidu_location(address):
    ak = 'GLbmnUGjCe4B62dqW6l695fL'
    address = quote(address)
    url = 'http://api.map.baidu.com/geocoder/v2/?ak=%s&callback=showLocation&address=%s&output=json'%(ak, address)
    r = requests.get(url)
    response = json.loads((r.text[27:-1]))
    return response

def convert_baidu_location(latitude, longitude):
    ak = 'GLbmnUGjCe4B62dqW6l695fL'
    url = 'http://api.map.baidu.com/geoconv/v1/?coords=%s,%s&from=1&to=5&ak=%s&output=json'%(longitude, latitude, ak)
    r = requests.get(url)
    response = json.loads((r.text.decode()))#[27:-1]))
    return response['result'][0]['y'], response['result'][0]['x']

#print(sys.getdefaultencoding())
#print(get_baidu_location('xxxxx')['result']['location']['lng'])

#print(get_baidu_address('39.971353229973','116.30799772131'))
#print(convert_baidu_location('39.965202','116.301544'))

