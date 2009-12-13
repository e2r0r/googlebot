#!/usr/bin/env python
#coding:utf-8
from goparse.search import GoogleSearch
import re
rawstr = r"""://(\S*link.php\?ref=\w*)"""
compile_obj = re.compile(rawstr)

gs = GoogleSearch("link.php?ref=吉沢明歩")
gs.results_per_page = 10
gs.page=1
results = gs.get_results()
for res in results:
    print res.title
    match_obj = compile_obj.search(res.desc)
    if match_obj:
        print match_obj.group(1)
    else:
        print res.url

