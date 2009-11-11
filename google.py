#!/usr/bin/env python
#-*- encoding:utf-8 -*-

import sys
import re
import httplib

def request_and_save(conn, query_str, f):
        conn.request("GET", query_str)
        r1 = conn.getresponse()
        line = r1.read()

        p1 = re.compile("<a href=")
        p2 = re.compile("</a>")
        match_start = 0
        match_end = 0

        while line:
                m = p1.search(line)
                if m is None:
                        break
                match_start = m.start()
                line = line[match_start:]
                m = p2.search(line)
                if m is None:
                        break
                match_end = m.end()
                item = line[:match_end]
                if item.find("class=l") == -1:
                        line = line[match_end:]
                        continue
                f.write(item)
                f.write("<br>\n");
                line = line[match_end:]
# end function

if len(sys.argv) < 2:
        print "Usage: google.py words"
        sys.exit(0)

query_str = "/search?aq=f\&complete=1\&hl=zh-CN\&newwindow=1\&q=" + sys.argv[1]
query_str2 = "/search?q=" + sys.argv[1] + "\&complete=1\&hl=zh-CN\&newwindow=1\&start=10\&sa=N"
query_str3 = "/search?q=" + sys.argv[1] + "\&complete=1\&hl=zh-CN\&newwindow=1\&start=20\&sa=N"
query_str4 = "/search?q=" + sys.argv[1] + "\&complete=1\&hl=zh-CN\&newwindow=1\&start=30\&sa=N"
query_str5 = "/search?q=" + sys.argv[1] + "\&complete=1\&hl=zh-CN\&newwindow=1\&start=40\&sa=N"
query_str6 = "/search?q=" + sys.argv[1] + "\&complete=1\&hl=zh-CN\&newwindow=1\&start=50\&sa=N"
query_str7 = "/search?q=" + sys.argv[1] + "\&complete=1\&hl=zh-CN\&newwindow=1\&start=60\&sa=N"

html_header = "<html><head><meta http-equiv=\"content-type\" content=\"text/html;charset=gb2312\"><title>kf701 python search tool</title></head><body>\n"
html_header += "<p align=center><font size=3>kf701 python search tool</font></p>"
html_end = "</body></html>"

conn = httplib.HTTPConnection("www.google.cn")

print 'Search ' + sys.argv[1] + ', Save result in ' +  sys.argv[1] + '-search.html'
f = file( sys.argv[1] + "-search.html", "w")
f.write(html_header);

request_and_save(conn, query_str, f)
request_and_save(conn, query_str2, f)
request_and_save(conn, query_str3, f)
request_and_save(conn, query_str4, f)
request_and_save(conn, query_str5, f)
request_and_save(conn, query_str6, f)
request_and_save(conn, query_str7, f)

f.write(html_end)
f.close()
conn.close()
