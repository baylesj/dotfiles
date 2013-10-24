#!/usr/bin/env bash
#
# Start masquering wireless over the ethernet port.
# Process shamelessly taken from Archlinux wiki
#

ip link set up dev eth0
ip addr add 139.96.30.100/24 dev eth0

sysctl net.ipv4.ip_forward=1

iptables -t nat -A POSTROUTING -o wlan0 -j MASQUERADE
iptables-save > /etc/iptables/iptables.rules

systemctl start iptables

systemctl start dhcpd4
