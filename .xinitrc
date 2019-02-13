#!/bin/sh
#
# ~/.xinitrc
#
# Executed by startx (run your window manager from here)

# test for an existing bus daemon, just to be safe
#if test -z "$DBUS_SESSION_BUS_ADDRESS" ; then
#   # if not found, launch a new one
#   eval `dbus-launch --sh-syntax --exit-with-session`
#   echo "D-Bus per-session daemon address is: $DBUS_SESSION_BUS_ADDRESS"
#fi

if [ -d /etc/X11/xinit/xinitrc.d ]; then
  for f in /etc/X11/xinit/xinitrc.d/*; do
    [ -x "$f" ] && . "$f"
  done
  unset f
fi

xrdb -merge ~/.Xresources

# Enable Ctrl+Alt+Backspace
setxkbmap -option terminate:ctrl_alt_bksp

# Start urxvt daemon
urxvtd &

# Start apache daemon
DEFAULT_SESSION=awesome

# Start xscreensaver
xscreensaver -no-splash &

case $1 in
xfce4)
	exec startxfce4
	;;
kde)
	exec startkde
	;;
openbox)
	exec openbox-session
	;;
gnome)
	exec dbus-launch gnome-session
	;;
cinnamon)
	exec dbus-launch gnome-session-cinnamon
	;;
awesome)
	exec awesome
	;;
*)
	exec $DEFAULT_SESSION
	;;
esac

