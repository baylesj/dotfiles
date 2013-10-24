#!/usr/bin/env python

# Copyright (c) 2008 Nick Jensen
# MIT License

import xml.dom.minidom
import urllib.request, sys, datetime

class Dominos:


    def __init__(self, *args, **kw):
        self.__feed_url = "http://trkweb.dominos.com/orderstorage/GetTrackerData"

    def get_order_info(self, phone_number):
        xml_data = urllib.request.urlopen('%s?Phone=%s' % (self.__feed_url, phone_number))
        dom = xml.dom.minidom.parse(xml_data)
        orders_node = dom.getElementsByTagName('OrderStatuses')
        order = orders_node[0].getElementsByTagName('OrderStatus')

        if order.length > 0:
            description = order[0].getElementsByTagName('OrderDescription')[0].firstChild.data
            starttime = self.get_time(order[0].getElementsByTagName('StartTime')[0].firstChild)
            oventime = self.get_time(order[0].getElementsByTagName('OvenTime')[0].firstChild)
            racktime = self.get_time(order[0].getElementsByTagName('RackTime')[0].firstChild)
            routetime = self.get_time(order[0].getElementsByTagName('RouteTime')[0].firstChild)
            deliverytime = self.get_time(order[0].getElementsByTagName('DeliveryTime')[0].firstChild)
            return {'description':description, 'starttime':starttime, 'deliverytime':deliverytime, 'oventime':oventime, 'racktime':racktime, 'routetime':routetime}
        else:
            return False


    def get_time(self, time_node):
        if time_node:
            [date, time] = time_node.data.split("T")
            [hour, minute, second] = time.split(":")
            ampm = 'pm'
            if int(hour) < 12:
                ampm = 'am'
            return '%s:%s%s' % (int(hour) % 12, minute, ampm)
        else:
            return None


if __name__ == "__main__":

    if len(sys.argv) != 2:
        print( 'usage: %s <phone number>', sys.argv[0] )
        sys.exit(1)

    print( "Dominos pizza tracker." )
    d = Dominos()
    order_info = d.get_order_info(sys.argv[1])

    if not order_info:
        print( "No Orders Found for %s", sys.argv[1] )
    else:
        print( order_info['description'] )
        if order_info['starttime']: print( "Your pizza is being made!", order_info['starttime'] )
        if order_info['oventime']: print( "Your pizza is in the oven!", order_info['oventime'] )
        if order_info['racktime']: print( "Your pizza is done and awaiting delivery!", order_info['racktime'] )
        if order_info['routetime']: print( "Your pizza is on the way!", order_info['routetime'] )
        if order_info['deliverytime']: print( "Your pizza was delivered!", order_info['deliverytime'] )
